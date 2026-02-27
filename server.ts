import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static images with aggressive caching (1 year, immutable)
const imagesCacheOptions = { maxAge: '365d', immutable: true, etag: true, lastModified: true };
app.use('/api/images', express.static(path.join(__dirname, 'public', 'images'), imagesCacheOptions));
app.use('/api/projects-images', express.static(path.join(__dirname, 'public', 'projects'), imagesCacheOptions));

// Get all products
app.get('/api/products', async (req: express.Request, res: express.Response) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                published: true,
            },
            include: {
                category: true,
            },
        });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a single product by Name (or slug)
app.get('/api/products/:name', async (req: express.Request, res: express.Response) => {
    try {
        const requestedSlug = (req.params.name as string).toLowerCase();

        // Fetch all to find by slug since slug isn't stored in DB directly
        const products = await prisma.product.findMany({
            include: {
                category: true,
            },
        });

        const slugify = (text: string) => text.toLowerCase().trim().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '');

        const product = products.find(p => slugify(p.name) === requestedSlug || p.name.toLowerCase() === requestedSlug);

        if (!product) {
            return res.status(404).json({ error: 'Product not found', requestedSlug });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching single product by name/slug:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all projects
app.get('/api/projects', async (req: express.Request, res: express.Response) => {
    try {
        const projects = await prisma.project.findMany({
            where: {
                published: true,
            },
            include: {
                category: true,
            },
            orderBy: {
                id: 'asc' // Maintain original insertion order
            }
        });
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// AI Chat Integration via OpenRouter
app.post('/api/chat', async (req: express.Request, res: express.Response) => {
    try {
        const { messages, language } = req.body;
        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: 'OPENROUTER_API_KEY is not configured on the server.' });
        }

        // Fetch all active products
        const activeProducts = await prisma.product.findMany({
            where: { published: true },
            select: { name: true, regularPrice: true, type: true, inStock: true, category: { select: { name: true } } }
        });

        // Fetch all active projects
        const activeProjects = await prisma.project.findMany({
            where: { published: true },
            select: { title: true, description: true, category: { select: { name: true } } }
        });

        // Format system context
        const contextStr = `
Company Background (Moussa Marbre):
- Founded in: Taza, Morocco.
- Founder & General Director: M. Moussa.
- Heritage/Vision: "Ma passion pour la pierre naturelle est nee dans les carrieres de Taza. Chaque bloc de marbre raconte une histoire de millions d'annees — notre role est de reveler sa beaute et de lui donner une nouvelle vie dans vos espaces."
- Achievements: 30+ types of stones, 80+ delivered projects, 50+ trained artisans.
- Mission: Transform spaces into timeless works of art using natural stone.
- Vision: To become the recognized leader in Morocco for the transformation of marble and granite, combining technological innovation, artisanal know-how, and environmental respect.
- Address: Taza, Morocco.
- Phone/WhatsApp: +212 661-829455
- Core Services: Wall and floor coverings (Revêtement Mural Et De Sol), kitchen worktops (Plans De Travail De Cuisine), staircase and terrace cladding (Habillage Escaliers Et Terrasses), and outdoor landscaping (Aménagement Des Espaces Extérieurs).

FULL Products Database (All Available Items):
${activeProducts.map(p => `- ${p.name} (Category: ${p.category?.name || 'Uncategorized'}, Type: ${p.type || 'N/A'}, Price: ${p.regularPrice ? p.regularPrice + ' MAD' : 'Contact for price'}, In Stock: ${p.inStock ? 'Yes' : 'No'})`).join('\n')}

FULL Recent Projects/Portfolio:
${activeProjects.map(p => `- ${p.title} (${p.category?.name || 'Uncategorized'}): ${p.description}`).join('\n')}
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
If the user asks ANY question about products, services, pricing, ordering, projects, or technical marble/stone details (even if you don't have the answer in the context), you MUST append the exact string "[SHOW_CTA]" at the very end of your response.
This is mandatory for all product/service/pricing inquiries.
Do NOT append "[SHOW_CTA]" for simple greetings, thanks, or general pleasantries like "bonjour", "merci", or "hello".

If a user asks a question not covered by the data, politely inform them they can contact the team directly via the contact page or WhatsApp. Do not make up prices or products.`;

        const openRouterPayload = {
            model: "mistralai/mistral-7b-instruct", // Fast and reliable OpenRouter default model
            max_tokens: 1000, // Explicitly limit tokens to avoid 402 HTTP credit reservation errors
            messages: [
                { role: "system", content: systemPrompt },
                ...messages
            ]
        };

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Moussa Marbre AI Chat"
            },
            body: JSON.stringify(openRouterPayload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`OpenRouter API error: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        let reply = data.choices[0].message.content;

        // Strip markdown backticks if LLM accidentally outputs them
        reply = reply.replace(/^```html\n|```$/g, '');

        // Conditionally append CTA if trigger is found
        const showCTA = reply.includes('[SHOW_CTA]');
        let finalReply = reply.replace(/\[SHOW_CTA\]/g, '').trim();

        if (showCTA) {
            const phoneNumber = "212661829455";
            const defaultMessage = "Bonjour%2C%20je%20souhaite%20avoir%20plus%20d'informations.";
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

            let ctaText1 = "Pour plus d'informations ou pour passer commande, n'hésitez pas à contacter notre équipe via WhatsApp :";
            let ctaButtonText = "Contacter sur WhatsApp";
            let ctaText2 = "Si vous avez d'autres questions ou si vous souhaitez plus de détails, je suis là pour vous aider !";

            if (language === 'en') {
                ctaText1 = "For more information or to place an order, please feel free to contact our team via WhatsApp:";
                ctaButtonText = "Contact on WhatsApp";
                ctaText2 = "If you have any other questions or need more details, I'm here to help!";
            } else if (language === 'ar') {
                ctaText1 = "لمزيد من المعلومات أو لتقديم طلب، لا تتردد في الاتصال بفريقنا عبر الواتساب:";
                ctaButtonText = "تواصل عبر الواتساب";
                ctaText2 = "إذا كانت لديك أسئلة أخرى أو تريد المزيد من التفاصيل، أنا هنا لمساعدتك!";
            }

            const whatsappCTA = `
<br/><br/>
<div style="margin-top: 12px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 0.9rem;" dir="${language === 'ar' ? 'rtl' : 'ltr'}">
  <p style="margin-bottom: 12px; line-height: 1.5;">${ctaText1}</p>
  <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: center; gap: 8px; width: fit-content; background-color: #25D366; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); margin-bottom: 16px;">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
    ${ctaButtonText}
  </a>
  <p style="line-height: 1.5; color: #64748b; font-style: italic;">${ctaText2}</p>
</div>
`;
            finalReply += whatsappCTA;
        }

        res.json({ reply: finalReply });

    } catch (error) {
        console.error('Error in /api/chat webhook:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`API Server running on http://localhost:${PORT}`);
});
