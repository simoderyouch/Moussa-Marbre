import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: {
    id: number;
    name: string;
  } | null;
  published: boolean;
}

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState('TOUS');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then((data: Project[]) => {
        setProjects(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load projects:', err);
        setIsLoading(false);
      });
  }, []);

  // Compute unique categories dynamically from the loaded projects
  const uniqueCategories = useMemo(() => {
    const categoriesSet = new Set<string>();
    projects.forEach((p) => {
      if (p.category?.name) {
        categoriesSet.add(p.category.name);
      }
    });
    return ['TOUS', ...Array.from(categoriesSet)];
  }, [projects]);

  const filteredProjects =
    activeCategory === 'TOUS'
      ? projects
      : projects.filter((project) => project.category?.name === activeCategory);

  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header Section */}
      <section className="pt-[12rem] pb-24 bg-background">
        <div className="max-w-7xl text-center mx-auto px-4 sm:px-6 lg:px-8">
          {/* <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-black/60" /> 

            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              Portfolio
            </span>
          </div>
          */}
          <h1 className="font-sans text-5xl sm:text-6xl text-foreground leading-[1.1] tracking-tight mb-8">
            {t('projectsPage.title1')}<span className="italic font-serif text-muted-foreground">{t('projectsPage.title2')}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-4xl mx-auto leading-relaxed">
            {t('projectsPage.desc')}
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 pt-11 bg-background border-b border-border sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
            {uniqueCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`pb-2 text-xs uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${activeCategory === category
                  ? 'border-primary text-foreground font-semibold'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
              >
                {category === 'TOUS' ? t('projectsPage.all') : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-background min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-foreground/50" />
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">
              {t('projectsPage.empty')}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-none aspect-[1/1] mb-6 bg-muted">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest mb-3">
                    <span className="font-medium text-foreground">{project.category?.name || t('projectsPage.general')}</span>
                  </div>
                  <h3 className="font-serif text-3xl text-foreground mb-4 group-hover:text-muted-foreground transition-colors">
                    {project.title}
                  </h3>
                  {/* <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-[1.1] tracking-tight mb-8">
            {t('projectsPage.ctaTitle')}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-12">
            {t('projectsPage.ctaDesc')}
          </p>
          <Link to="/contact">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none px-8 py-6 text-xs uppercase tracking-widest">
              {t('projectsPage.ctaBtn')}
              <ArrowRight className={`w-4 h-4 ${i18n.language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
