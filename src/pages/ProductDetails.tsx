import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import type { Product } from './Products';

const ProductDetails = () => {
    const { name } = useParams<{ name: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { t, i18n } = useTranslation();

    // Form state
    const [formData, setFormData] = useState({
        clientName: '',
        clientPhone: '',
        message: ''
    });

    useEffect(() => {
        if (!name) return;

        setIsLoading(true);
        fetch(`/api/products/${name}`)
            .then(res => res.json())
            .then((data: Product) => {
                if ((data as any).error) {
                    setProduct(null);
                } else {
                    setProduct(data);
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Failed to load product details:', err);
                setIsLoading(false);
            });
    }, [name]);

    const handleWhatsAppSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!product) return;

        const phoneNumber = "212661829455";

        // Construct the WhatsApp message using translated keys
        let text = `${t('productDetail.whatsappGreeting')}: *${product.name}*\n\n`;
        text += `*${t('productDetail.whatsappName')}:* ${formData.clientName}\n`;
        text += `*${t('productDetail.whatsappPhone')}:* ${formData.clientPhone}\n`;

        if (formData.message.trim()) {
            text += `*${t('productDetail.whatsappMessage')}:* ${formData.message}\n`;
        }

        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

        window.open(whatsappUrl, '_blank');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 flex justify-center items-center bg-background">
                <Loader2 className="w-8 h-8 animate-spin text-foreground/50" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen pt-32 flex flex-col justify-center items-center bg-background text-center">
                <h1 className="text-3xl font-serif text-foreground mb-4">{t('productsPage.empty') || 'Product not found'}</h1>
                <Link to="/produits">
                    <Button variant="outline" className="rounded-none uppercase tracking-widest text-xs">
                        {t('navbar.products') || 'Return to Products'}
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="bg-background min-h-screen pt-[12rem] pb-24">
            <SEO
                title={`${product.name} | Catalogue Moussa Marbre`}
                description={`Découvrez le ${product.name} par Moussa Marbre. Idéal pour vos revêtements de sol, murs, escaliers ou façades. Qualité premium au Maroc.`}
                keywords={`${product.name} prix, acheter ${product.name} maroc, ${product.name} taza, pierre naturelle`}
                url={`https://moussamarbre.com/#/produits/${name}`}
                image={product.images || undefined}
                structuredData={{
                    "@context": "https://schema.org/",
                    "@type": "Product",
                    "name": product.name,
                    "image": product.images ? [product.images] : [],
                    "description": `Matériau en ${product.category?.name || 'pierre'} naturel.`,
                    "brand": {
                        "@type": "Brand",
                        "name": "Moussa Marbre"
                    },
                    ...(product.regularPrice ? {
                        "offers": {
                            "@type": "Offer",
                            "url": `https://moussamarbre.com/#/produits/${name}`,
                            "priceCurrency": "MAD",
                            "price": product.regularPrice,
                            "itemCondition": "https://schema.org/NewCondition",
                            "availability": "https://schema.org/InStock"
                        }
                    } : {})
                }}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <Link to="/produits" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group uppercase tracking-widest">
                    <ArrowLeft className={`w-4 h-4 transition-transform ${i18n.language === 'ar' ? 'rotate-180 group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} />
                    {t('navbar.products') || 'Back'}
                </Link>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Product Image */}
                    <div className="bg-secondary p-8 md:p-16 flex items-center justify-center border border-border/50">
                        <img
                            src={product.images ? product.images.replace('/api/images/', '/images/') : 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=300&q=80'}
                            alt={product.name}
                            decoding="async"
                            className="w-full h-auto object-cover max-h-[60vh] shadow-xl"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=300&q=80';
                            }}
                        />
                    </div>

                    {/* Product Info & Form */}
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest mb-4">
                            <span className="font-medium text-black/60">{product.category?.name || 'Général'}</span>
                        </div>

                        <h1 className="font-sans text-4xl sm:text-5xl text-foreground font-medium mb-6 leading-tight">
                            {product.name}
                        </h1>

                        {product.regularPrice !== null && product.regularPrice > 0 && (
                            <div className="text-2xl text-primary font-sans mb-8">
                                {product.regularPrice} MAD <span className="text-sm text-muted-foreground font-normal">/ m²</span>
                            </div>
                        )}

                        <div className="space-y-6 text-muted-foreground leading-relaxed mb-12 border-t border-border/50 pt-8">
                            <p>{t('productsPage.desc')}</p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className={`w-1 h-1 bg-primary rounded-full mt-2.5 flex-shrink-0 ${i18n.language === 'ar' ? 'ml-0 mr-1' : ''}`} />
                                    <span>{t('contactPage.whyItems.1', { defaultValue: 'Matériau 100% naturel' })}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className={`w-1 h-1 bg-primary rounded-full mt-2.5 flex-shrink-0 ${i18n.language === 'ar' ? 'ml-0 mr-1' : ''}`} />
                                    <span>{t('contactPage.whyItems.2', { defaultValue: 'Finitions personnalisées sur-mesure' })}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className={`w-1 h-1 bg-primary rounded-full mt-2.5 flex-shrink-0 ${i18n.language === 'ar' ? 'ml-0 mr-1' : ''}`} />
                                    <span>{t('contactPage.whyItems.3', { defaultValue: 'Garantie de qualité supérieure' })}</span>
                                </li>
                            </ul>
                        </div>

                        {/* WhatsApp Order Form */}
                        <div className="bg-secondary/30 p-6 md:p-8 border border-border/50">
                            <h3 className="font-serif text-2xl text-foreground mb-6 flex items-center gap-3">
                                <MessageCircle className="w-6 h-6 text-[#25D366]" />
                                {t('productDetail.formTitle')}
                            </h3>

                            <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="clientName" className="text-xs uppercase tracking-widest text-muted-foreground">
                                            {t('productDetail.formName')}
                                        </Label>
                                        <Input
                                            id="clientName"
                                            required
                                            placeholder={t('productDetail.formNamePlaceholder')}
                                            className="rounded-none border-border/50 bg-background"
                                            value={formData.clientName}
                                            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="clientPhone" className="text-xs uppercase tracking-widest text-muted-foreground">
                                            {t('productDetail.formPhone')}
                                        </Label>
                                        <Input
                                            id="clientPhone"
                                            required
                                            type="tel"
                                            placeholder={t('productDetail.formPhonePlaceholder')}
                                            className="rounded-none border-border/50 bg-background text-left"
                                            dir="ltr"
                                            value={formData.clientPhone}
                                            onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground">
                                        {t('productDetail.formMsg')}
                                    </Label>
                                    <Textarea
                                        id="message"
                                        placeholder={t('productDetail.formMsgPlaceholder')}
                                        className="rounded-none border-border/50 bg-background resize-none min-h-[100px]"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-none px-8 py-6 text-xs uppercase tracking-widest mt-4"
                                >
                                    {t('productDetail.formBtn')}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
