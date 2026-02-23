import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: t('navbar.home'), path: '/' },
    { name: t('navbar.projects'), path: '/projets' },
    { name: t('navbar.products'), path: '/produits' },
    { name: t('navbar.about'), path: '/a-propos' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === '/';

  const languages = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
    { code: 'ar', label: 'عرب' }
  ];

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setIsLangMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !isHomePage
        ? 'bg-foreground/95 backdrop-blur-md border-b border-border/20'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-8">
        <div className="flex sm:px-6 items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center">
              <img src="/logo2.png" alt="Moussa Marbre Logo" className="h-14 w-auto" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs uppercase tracking-widest font-medium transition-colors ${isActive(link.path)
                  ? 'text-background'
                  : 'text-background/70 hover:text-background'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-4">

            {/* Language Switcher */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1 text-sm text-background/80 hover:text-background transition-colors p-2"
                aria-expanded={isLangMenuOpen}
                aria-haspopup="true"
              >
                {languages.find(l => l.code === i18n.language)?.label || 'FR'}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-background ring-1 ring-black ring-opacity-5 divide-y divide-border/20 z-50 overflow-hidden">
                  <div className="py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`group flex items-center justify-between w-full px-4 py-3 text-sm transition-colors ${i18n.language === lang.code ? 'bg-muted text-foreground font-medium' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}
                      >
                        {lang.label}
                        {i18n.language === lang.code && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/contact">
              <Button className="bg-background hover:bg-background/90 text-foreground rounded-none px-8 py-6 text-xs uppercase tracking-widest">
                {t('navbar.quote')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-background" />
            ) : (
              <Menu className="w-6 h-6 text-background" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden w-full sm:px-6 bg-foreground border-t border-border/20">
            <nav className="flex flex-col w-full py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 text-xs uppercase tracking-widest font-medium transition-colors ${isActive(link.path)
                    ? 'text-foreground bg-background'
                    : 'text-background/70 hover:text-background hover:bg-white/10'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Language Selection */}
              <div className="px-4 py-3 border-t border-border/10 mt-2">
                <p className="text-xs text-background/50 uppercase tracking-widest mb-3">Langue / Language / لغة</p>
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        handleLanguageChange(lang.code);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex-1 py-2 text-sm text-center rounded-sm transition-colors ${i18n.language === lang.code ? 'bg-background text-foreground font-medium' : 'border border-background/20 text-background/80 hover:bg-background/10'}`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-4 py-4">
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-background hover:bg-background/90 text-foreground rounded-none py-6 text-xs uppercase tracking-widest">
                    {t('navbar.quote')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
