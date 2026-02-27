import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useTranslation } from 'react-i18next';
import { generateSlug } from '../utils/slugify';
import SEO from '../components/SEO';

export interface Product {
  id: number;
  name: string;
  regularPrice: number | null;
  images: string;
  category: {
    id: number;
    name: string;
    order?: number;
  } | null;
  type: string | null;
  published: boolean;
  visibility: string | null;
  inStock: boolean;
}

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState('tous');
  const [products, setProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
  const [maxPrice, setMaxPrice] = useState<number>(10000);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        const max = Math.max(...data.map(p => p.regularPrice || 0));
        const finalMax = max > 0 ? max : 10000;
        setMaxPrice(finalMax);
        setPriceRange([0, finalMax]);
      })
      .catch(err => {
        console.error('Failed to load products:', err);
      });
  }, []);

  // Compute unique categories dynamically from the loaded products.
  const uniqueCategories = useMemo(() => {
    const categoryMap = new Map<string, number>();
    products.forEach((p) => {
      if (p.category?.name) {
        // Record the smallest order we find for this category name just in case
        const currentOrder = categoryMap.get(p.category.name.trim()) ?? 999;
        const newOrder = p.category.order ?? 99;
        categoryMap.set(p.category.name.trim(), Math.min(currentOrder, newOrder));
      }
    });

    // Convert to an array of usable objects mimicking the old format, sorted by the matched order
    const catsArray = Array.from(categoryMap.entries())
      .map(([catName, order]) => ({
        id: catName.toLowerCase().replace(/[\s&]+/g, '-'), // "Pierre Naturelle & Tahejart" -> "pierre-naturelle-tahejart"
        name: catName.toUpperCase(),
        order
      }))
      .sort((a, b) => a.order - b.order);

    return catsArray;
  }, [products]);

  // Compute tabs including "TOUS" at the start
  const productTabs = useMemo(() => {
    return [{ id: 'tous', name: 'TOUS' }, ...uniqueCategories];
  }, [uniqueCategories]);

  const getProductsByCategory = (categoryKeyword: string) => {
    return products.filter(p => {
      const matchesCategory = p.category?.name?.trim().toLowerCase() === categoryKeyword.toLowerCase();

      // If product has no price, we can optionally include/exclude it. Let's include it only if range encompasses 0 or if we ignore price.
      // Usually it's better to just skip price filter if price is null, or only show if price is within range. We'll show it if price is null OR within range.
      const price = p.regularPrice || 0;
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

      return matchesCategory && matchesPrice;
    });
  };

  const renderProductGrid = (gridProducts: Product[]) => {
    if (gridProducts.length === 0) {
      return <p className="text-muted-foreground py-8">{t('productsPage.empty')}</p>;
    }
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-8">
        {gridProducts.map((product) => (
          <Link key={product.id} to={`/produits/${generateSlug(product.name)}`} className="group cursor-pointer  rounded-xl flex flex-col">
            <div className="relative overflow-hidden  aspect-[3/3] rounded-xl mb-4 bg-secondary flex items-center justify-center">
              <img
                src={product.images ? product.images.replace('/api/images/', '/images/') : 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=300&q=80'}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=300&q=80';
                }}
              />
            </div>
            <h3 className="text-sm font-medium font-sans text-foreground tracking-wide">{product.name}</h3>
            {product.regularPrice !== null && false && (
              <p className="text-xs text-muted-foreground mt-1">{product.regularPrice} MAD</p>
            )}
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <SEO
        title={`${t('productsPage.title1')} ${t('productsPage.title2')} | Moussa Marbre`}
        description="Consultez notre catalogue complet de marbre, granit et pierre naturelle. Choisissez parmi plus de 30 variétés pour tous vos projets d'aménagement intérieur et extérieur au Maroc."
        keywords="catalogue marbre, prix granit maroc, pierre naturelle construction, Moussa Marbre Taza"
        url="https://moussamarbre.com/#/produits"
      />
      {/* Header Section */}
      <section className="pt-[12rem] pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-black/60" />
            <span className="text-xs font-medium text-black/60 uppercase tracking-widest">
              {t('productsPage.tag')}
            </span>
          </div>
          <h1 className="font-sans text-5xl sm:text-6xl text-foreground leading-[1.1] tracking-tight mb-8">
            {t('productsPage.title1')}<span className="italic font-serif text-muted-foreground">{t('productsPage.title2')}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {t('productsPage.desc')}
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 pt-11 bg-background border-b border-border sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

            <div className="flex items-center flex-1 gap-6 overflow-x-auto scrollbar-hide">
              {productTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-2 text-xs uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${activeTab === tab.id
                    ? 'border-primary text-foreground font-semibold'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                >
                  {tab.id === 'tous' ? t('productsPage.all') : tab.name}
                </button>
              ))}
            </div>

            <div className={`flex items-center gap-4 min-w-[300px] ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                {t('productsPage.price')}
              </span>
              <Slider
                value={priceRange}
                min={0}
                max={maxPrice}
                step={50}
                onValueChange={setPriceRange}
                className={`w-full ${i18n.language === 'ar' ? 'rotate-180' : ''}`}
              />
              <span className="text-xs font-medium text-foreground whitespace-nowrap min-w-[80px] text-right" dir="ltr">
                {priceRange[0]} - {priceRange[1]}
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Products Content */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {uniqueCategories.map((categoryObj) => {
            const isVisible = activeTab === 'tous' || activeTab === categoryObj.id;
            if (!isVisible) return null;

            const categoryProducts = getProductsByCategory(categoryObj.name);

            return (
              <div key={categoryObj.id} className="mb-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-black/60" />
                  <span className="text-xs font-medium text-black/60 uppercase tracking-widest">
                    {categoryProducts.length} {t('productsPage.productCount')}
                  </span>
                </div>
                <h2 className="font-sans text-3xl sm:text-4xl text-foreground mb-8 capitalize">{categoryObj.name.toLowerCase()}</h2>
                {renderProductGrid(categoryProducts)}
              </div>
            );
          })}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-border" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                {t('productsPage.processTag')}
              </span>
              <div className="w-8 h-px bg-border" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-[1.1] tracking-tight">
              {t('productsPage.processTitle1')}<span className="italic text-muted-foreground">{t('productsPage.processTitle2')}</span>{t('productsPage.processTitle3')}
              <span className="italic text-muted-foreground">{t('productsPage.processTitle4')}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1' },
              { step: '2' },
              { step: '3' },
              { step: '4' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="font-serif text-5xl text-muted-foreground mb-6">0{item.step}</div>
                <h3 className="font-serif text-2xl text-foreground mb-3">{t(`productsPage.processItems.${item.step}.title`)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t(`productsPage.processItems.${item.step}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-foreground text-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl sm:text-5xl text-background leading-[1.1] tracking-tight mb-8">
            {t('productsPage.ctaTitle')}
          </h2>
          <p className="text-background/70 text-lg leading-relaxed mb-12">
            {t('productsPage.ctaDesc')}
          </p>
          <Link to="/contact">
            <Button className="bg-background hover:bg-background/90 text-foreground rounded-none px-8 py-6 text-xs uppercase tracking-widest">
              {t('productsPage.ctaBtn')}
              <ArrowRight className={`w-5 h-5 ${i18n.language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
