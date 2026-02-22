import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Product {
  id: number;
  name: string;
  regularPrice: number | null;
  images: string;
  category: {
    id: number;
    name: string;
  } | null;
  type: string | null;
  published: boolean;
  visibility: string | null;
  inStock: boolean;
}

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState('tous');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch(err => {
        console.error('Failed to load products:', err);
      });
  }, []);

  // Compute unique categories dynamically from the loaded products.
  const uniqueCategories = useMemo(() => {
    const categoriesSet = new Set<string>();
    products.forEach((p) => {
      if (p.category?.name) {
        categoriesSet.add(p.category.name.trim());
      }
    });
    // Convert to an array of usable objects mimicking the old format
    const catsArray = Array.from(categoriesSet).map((catName) => ({
      id: catName.toLowerCase().replace(/[\s&]+/g, '-'), // "Pierre Naturelle & Tahejart" -> "pierre-naturelle-tahejart"
      name: catName.toUpperCase()
    }));
    return catsArray;
  }, [products]);

  // Compute tabs including "TOUS" at the start
  const productTabs = useMemo(() => {
    return [{ id: 'tous', name: 'TOUS' }, ...uniqueCategories];
  }, [uniqueCategories]);

  const getProductsByCategory = (categoryKeyword: string) => {
    return products.filter(p => p.category?.name?.trim().toLowerCase() === categoryKeyword.toLowerCase());
  };

  const renderProductGrid = (gridProducts: Product[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {gridProducts.map((product) => (
        <div key={product.id} className="group cursor-pointer flex flex-col">
          <div className="relative overflow-hidden rounded-none aspect-[4/5] mb-4 bg-secondary flex items-center justify-center">
            <img
              src={product.images || 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=300&q=80'}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                // Fallback to placeholder if local image is missing
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=300&q=80';
              }}
            />
          </div>
          <h3 className="text-sm font-medium text-foreground tracking-wide">{product.name}</h3>
          {product.regularPrice && (
            <p className="text-xs text-muted-foreground mt-1">{product.regularPrice} MAD</p>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Header Section */}
      <section className="pt-32 pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-border" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              Catalogue
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl text-foreground leading-[1.1] tracking-tight mb-8">
            Nos <span className="italic text-muted-foreground">Produits</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Explorez notre gamme complète de pierres naturelles, du marbre le plus fin au
            granit le plus résistant. Chaque matériau est sélectionné avec soin pour sa qualité
            et sa beauté.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 bg-background border-b border-border sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
            {productTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 text-xs uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${activeTab === tab.id
                  ? 'border-primary text-foreground font-semibold'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
              >
                {tab.name}
              </button>
            ))}
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
                  <div className="w-8 h-px bg-border" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                    {categoryProducts.length} Produits
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-8 capitalize">{categoryObj.name.toLowerCase()}</h2>
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
                Notre Processus
              </span>
              <div className="w-8 h-px bg-border" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-[1.1] tracking-tight">
              De la <span className="italic text-muted-foreground">carrière</span> à votre{' '}
              <span className="italic text-muted-foreground">intérieur</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Sélection', desc: 'Choix minutieux des blocs de pierre directement en carrière.' },
              { step: '02', title: 'Transformation', desc: 'Découpe, façonnage et finition dans notre atelier équipé.' },
              { step: '03', title: 'Contrôle Qualité', desc: 'Inspection rigoureuse de chaque pièce avant livraison.' },
              { step: '04', title: 'Installation', desc: 'Pose professionnelle par notre équipe de maîtres artisans.' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="font-serif text-5xl text-muted-foreground mb-6">{item.step}</div>
                <h3 className="font-serif text-2xl text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-foreground text-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl sm:text-5xl text-background leading-[1.1] tracking-tight mb-8">
            Demandez votre devis gratuit
          </h2>
          <p className="text-background/70 text-lg leading-relaxed mb-12">
            Recevez une estimation détaillée et personnalisée pour votre projet, sans aucun engagement.
          </p>
          <Link to="/contact">
            <Button className="bg-background hover:bg-background/90 text-foreground rounded-none px-8 py-6 text-xs uppercase tracking-widest">
              Demander un Devis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default ProductsPage;
