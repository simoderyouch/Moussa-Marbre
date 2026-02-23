import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from './_lib/prisma';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { messages, language } = req.body;
        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: 'OPENROUTER_API_KEY is not configured.' });
        }

        // Fetch context from database
        const activeProducts = await prisma.product.findMany({
            where: { published: true },
            take: 20,
            select: { name: true, regularPrice: true, category: { select: { name: true } } },
        });

        const activeProjects = await prisma.project.findMany({
            where: { published: true },
            take: 10,
            select: { title: true, description: true, category: { select: { name: true } } },
        });

        const contextStr = `
Company Background (Moussa Marbre):
- Founded in: Taza, Morocco.
- Founder & General Director: M. Moussa.
- Heritage/Vision: "Ma passion pour la pierre naturelle est nee dans les carrieres de Taza. Chaque bloc de marbre raconte une histoire de millions d'annees — notre role est de reveler sa beaute et de lui donner une nouvelle vie dans vos espaces."
- Achievements: 30+ types of stones, 80+ delivered projects, 50+ trained artisans.
- Mission: Transform spaces into timeless works of art using natural stone.
- Vision: To become the recognized leader in Morocco for the transformation of marble and granite.
- Core Services: Wall and floor coverings, kitchen worktops, staircase and terrace cladding, outdoor landscaping.

Products Available:
${activeProducts.map((p) => `- ${p.name} (Category: ${p.category?.name || 'Uncategorized'}, Price: ${p.regularPrice ? p.regularPrice + ' MAD' : 'Contact for price'})`).join('\n')}

Recent Projects:
${activeProjects.map((p) => `- ${p.title} (${p.category?.name || 'Uncategorized'}): ${p.description}`).join('\n')}
`;

        const systemPrompt = `You are an expert consultant and customer service representative for "Moussa Marbre", a premium marble and natural stone company in Morocco. 
You must respond politely, professionally, and CONCISELY. 
Always reply in ${language === 'fr' ? 'French' : language === 'ar' ? 'Arabic' : 'English'}.

You can use the following database data to answer questions about products and past projects:
${contextStr}

IMPORTANT FORMATTING RULES:
1. Format your response using ONLY HTML tags (like <b>, <i>, <br>, <ul>, <li>). 
2. Do NOT use markdown (like **bold** or *italic*). 
3. Do not wrap your response in \`\`\`html blocks, just return raw HTML text.

CRITICAL INSTRUCTION:
If the user asks ANY question about products, services, pricing, ordering, projects, or technical marble/stone details, you MUST append the exact string "[SHOW_CTA]" at the very end of your response.
Do NOT append "[SHOW_CTA]" for simple greetings, thanks, or general pleasantries.
If a user asks a question not covered by the data, politely inform them they can contact the team directly via WhatsApp.`;

        const openRouterPayload = {
            model: 'google/gemini-2.5-flash',
            max_tokens: 1000,
            messages: [{ role: 'system', content: systemPrompt }, ...messages],
        };

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://moussamarbre.com',
                'X-Title': 'Moussa Marbre AI Chat',
            },
            body: JSON.stringify(openRouterPayload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`OpenRouter API error: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        let reply = data.choices[0].message.content;
        reply = reply.replace(/^```html\n|```$/g, '');

        const showCTA = reply.includes('[SHOW_CTA]');
        let finalReply = reply.replace(/\[SHOW_CTA\]/g, '').trim();

        if (showCTA) {
            const phoneNumber = '212661829455';
            const defaultMessage = "Bonjour%2C%20je%20souhaite%20avoir%20plus%20d'informations.";
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

            let ctaText1 = "Pour plus d'informations ou pour passer commande, n'hésitez pas à contacter notre équipe via WhatsApp :";
            let ctaButtonText = 'Contacter sur WhatsApp';
            let ctaText2 = "Si vous avez d'autres questions ou si vous souhaitez plus de détails, je suis là pour vous aider !";

            if (language === 'en') {
                ctaText1 = 'For more information or to place an order, please feel free to contact our team via WhatsApp:';
                ctaButtonText = 'Contact on WhatsApp';
                ctaText2 = "If you have any other questions or need more details, I'm here to help!";
            } else if (language === 'ar') {
                ctaText1 = 'لمزيد من المعلومات أو لتقديم طلب، لا تتردد في الاتصال بفريقنا عبر الواتساب:';
                ctaButtonText = 'تواصل عبر الواتساب';
                ctaText2 = 'إذا كانت لديك أسئلة أخرى أو تريد المزيد من التفاصيل، أنا هنا لمساعدتك!';
            }

            finalReply += `<br/><br/><div style="margin-top: 12px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 0.9rem;" dir="${language === 'ar' ? 'rtl' : 'ltr'}"><p style="margin-bottom: 12px; line-height: 1.5;">${ctaText1}</p><a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: center; gap: 8px; width: fit-content; background-color: #25D366; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); margin-bottom: 16px;">${ctaButtonText}</a><p style="line-height: 1.5; color: #64748b; font-style: italic;">${ctaText2}</p></div>`;
        }

        return res.json({ reply: finalReply });
    } catch (error) {
        console.error('Error in /api/chat:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
