import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { messages, language } = req.body;
        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: 'OPENROUTER_API_KEY is not configured.' });
        }

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
- Achievements: 30+ types of stones, 80+ delivered projects, 50+ trained artisans.
- Mission: Transform spaces into timeless works of art using natural stone.
- Core Services: Wall and floor coverings, kitchen worktops, staircase and terrace cladding, outdoor landscaping.

Products Available:
${activeProducts.map((p) => `- ${p.name} (Category: ${p.category?.name || 'Uncategorized'}, Price: ${p.regularPrice ? p.regularPrice + ' MAD' : 'Contact for price'})`).join('\n')}

Recent Projects:
${activeProjects.map((p) => `- ${p.title} (${p.category?.name || 'Uncategorized'}): ${p.description}`).join('\n')}
`;

        const systemPrompt = `You are an expert consultant for "Moussa Marbre", a premium marble company in Morocco. 
Reply in ${language === 'fr' ? 'French' : language === 'ar' ? 'Arabic' : 'English'}.
Use ONLY HTML tags for formatting. No markdown.
${contextStr}
If the user asks about products/services/pricing, append "[SHOW_CTA]" at the end.
Do NOT append it for greetings or pleasantries.`;

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://moussamarbre.com',
                'X-Title': 'Moussa Marbre AI Chat',
            },
            body: JSON.stringify({
                model: 'google/gemini-2.5-flash',
                max_tokens: 1000,
                messages: [{ role: 'system', content: systemPrompt }, ...messages],
            }),
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
            const whatsappUrl = `https://wa.me/212661829455?text=Bonjour%2C%20je%20souhaite%20avoir%20plus%20d'informations.`;
            let ctaText1 = "Pour plus d'informations, contactez notre équipe via WhatsApp :";
            let ctaButtonText = 'Contacter sur WhatsApp';

            if (language === 'en') {
                ctaText1 = 'For more information, contact our team via WhatsApp:';
                ctaButtonText = 'Contact on WhatsApp';
            } else if (language === 'ar') {
                ctaText1 = 'لمزيد من المعلومات، تواصل مع فريقنا عبر الواتساب:';
                ctaButtonText = 'تواصل عبر الواتساب';
            }

            finalReply += `<br/><br/><div style="margin-top:12px;padding-top:16px;border-top:1px solid #e2e8f0;" dir="${language === 'ar' ? 'rtl' : 'ltr'}"><p style="margin-bottom:12px;">${ctaText1}</p><a href="${whatsappUrl}" target="_blank" style="display:inline-flex;align-items:center;gap:8px;background:#25D366;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:600;">${ctaButtonText}</a></div>`;
        }

        return res.json({ reply: finalReply });
    } catch (error) {
        console.error('Error in /api/chat:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
