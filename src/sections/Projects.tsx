import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
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

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then((data: Project[]) => {
        // Only grab the first 3 featured projects for the landing section
        setProjects(data.slice(0, 3));
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load featured projects:', err);
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="pt-16 pb-32 bg-background" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`flex flex-col sm:items-end mb-12 ${i18n.language === 'ar' ? 'sm:flex-row-reverse sm:justify-between' : 'sm:flex-row sm:justify-between'}`}>
          <div>
            <div className={`flex items-center gap-3 mb-6 ${i18n.language === 'ar' ? 'flex-row-reverse justify-end' : ''}`}>
              <div className="w-8 h-[1px] bg-black/60" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                {t('projects.tag')}
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-[1.1] tracking-tight">
              {t('projects.title1')}{' '}
              <span className="italic text-muted-foreground">{t('projects.title2')}</span>
            </h2>
          </div>
          <Link
            to="/projets"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground mt-6 sm:mt-0 transition-colors"
          >
            {t('projects.btn')}
            <ArrowRight className={`w-4 h-4 ${i18n.language === 'ar' ? 'rotate-180 mr-2' : ''}`} />
          </Link>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-foreground/50" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">
            {t('projects.empty')}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-none aspect-[4/5] mb-6 bg-muted">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
                </div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
                  {project.category?.name || t('projects.fallbackCategory')}
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-3 group-hover:text-muted-foreground transition-colors">
                  {project.title}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
