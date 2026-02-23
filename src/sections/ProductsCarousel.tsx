import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { generateSlug } from '../utils/slugify';

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

const ProductsCarousel = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then((data: Product[]) => {
                // Filter out unpublished or missing image products, then grab the first 8 for the carousel
                const featured = data
                    .filter(p => p.published && p.images)
                    .slice(0, 8);
                setProducts(featured);
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Failed to load products for carousel:', err);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <section className="py-32 bg-secondary/50 flex justify-center items-center min-h-[500px]">
                <Loader2 className="w-8 h-8 animate-spin text-foreground/50" />
            </section>
        );
    }

    // If the database fails or is completely empty, we can return null to safely hide the section.
    if (products.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-black/90">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-[1px] bg-white/60" />
                            <span className="text-xs font-medium text-white uppercase tracking-widest">
                                Collections Exclusives
                            </span>
                        </div>
                        <h2 className="font-sans text-4xl sm:text-5xl text-white leading-[1.1] tracking-tight">
                            Découvrez nos <span className="italic font-serif text-white">matériaux</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link to="/produits">
                            <Button variant="outline" className="rounded-none border-border hover:bg-background uppercase tracking-widest text-xs px-6 py-6 font-medium">
                                Voir le catalogue complet
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full relative"
                    >
                        <CarouselContent className="-ml-4 md:-ml-8">
                            {products.map((product) => (
                                <CarouselItem key={product.id} className="pl-4 md:pl-8 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                    <Link to={`/produits/${generateSlug(product.name)}`} className="group cursor-pointer block">
                                        {/* Image Container */}
                                        <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-background flex items-center justify-center">
                                            <img
                                                src={product.images || 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80'}
                                                alt={product.name}
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80';
                                                }}
                                            />
                                            {/* Overlay Category Tag */}
                                            {product.category?.name && (
                                                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest font-medium">
                                                    {product.category.name}
                                                </div>
                                            )}

                                            {/* Price Tag (Optional visual layer) */}

                                        </div>

                                        {/* Content 
                                        <div>
                                            <h3 className="font-serif text-2xl text-foreground mb-2 group-hover:text-primary transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-muted-foreground text-xs uppercase tracking-widest line-clamp-1">
                                                {product.type || 'Variété exclusive'}
                                            </p>
                                        </div>*/}
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Custom positioned navigation arrows */}
                        <div className="flex gap-4 justify-end mt-6 hidden sm:flex">
                            <CarouselPrevious className="relative inset-auto translate-y-0 translate-x-0 h-12 w-12 rounded-none border-border hover:bg-foreground hover:text-background transition-colors" />
                            <CarouselNext className="relative inset-auto translate-y-0 translate-x-0 h-12 w-12 rounded-none border-border hover:bg-foreground hover:text-background transition-colors" />
                        </div>
                    </Carousel>
                </motion.div>

            </div>
        </section>
    );
};

export default ProductsCarousel;
