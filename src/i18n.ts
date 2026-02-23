import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
    fr: {
        translation: {
            navbar: {
                home: 'Accueil',
                projects: 'Projets',
                products: 'Produits',
                about: 'A Propos',
                quote: 'Demander un Devis',
            },
            hero: {
                slide1: {
                    tagline: 'Marbre · Granit · Pierre Naturelle',
                    title: "Transformer vos espaces en oeuvres d'art intemporelles",
                    description: "Spécialiste du marbre, granit et pierre naturelle, Moussa Marbre allie savoir-faire artisanal et précision pour sublimer chaque projet architectural."
                },
                slide2: {
                    tagline: 'Excellence & Précision',
                    title: "Des matériaux nobles pour des projets d'exception",
                    description: "Nous sélectionnons les meilleures pierres à travers le monde pour vous offrir une qualité inégalée et un rendu spectaculaire."
                },
                slide3: {
                    tagline: 'Design sur Mesure',
                    title: "Façonner la pierre selon votre vision",
                    description: "De la conception à l'installation, notre bureau d'études vous accompagne pour réaliser vos projets les plus audacieux."
                },
                btnProjects: 'Voir nos Projets',
                btnContact: 'Nous Contacter'
            },
            about: {
                tag: 'Notre Héritage',
                title1: "L'art de la pierre au service de vos",
                title2: "ambitions.",
                p1: "<0>Moussa Marbre</0> s'est rapidement imposé comme une référence dans la transformation du marbre, du granit et de la pierre naturelle au Maroc. Notre savoir-faire artisanal pur, combiné à des techniques industrielles de pointe, nous permet de réaliser des projets d'exception.",
                p2: "De la conception architecturale à l'installation minutieuse, chaque détail est pensé pour sublimer vos espaces et créer des environnements intemporels, à la hauteur de vos plus hautes exigences.",
                btn: 'Découvrir Notre Histoire',
                statNum: '30+',
                statLabel: 'Variétés exclusives de pierres naturelles'
            },
            services: {
                tag: 'Nos Services',
                title1: "Un savoir-faire complet au service de la",
                title2: "pierre",
                items: {
                    "1": {
                        title: "Revêtement Mural Et De Sol",
                        desc: "Réalisation de revêtements muraux, de sols et habillage de façades en marbre et pierre naturelle pour des espaces élégants et durables."
                    },
                    "2": {
                        title: "Plans De Travail De Cuisine",
                        desc: "Conception et équipement de plans de travail avec des matériaux spéciaux et haut de gamme adaptés à vos besoins."
                    },
                    "3": {
                        title: "Habillage Escaliers Et Terrasses",
                        desc: "Habillage des escaliers et terrasses pour ajouter une touche naturelle et raffinée à vos espaces."
                    },
                    "4": {
                        title: "Aménagement Des Espaces Extérieurs",
                        desc: "Mise en valeur de vos espaces de vie extérieurs grâce à notre collection de pierres naturelles, créant un environnement chaleureux et confortable."
                    }
                }
            },
            projects: {
                tag: 'Projets en Vedette',
                title1: 'Des réalisations qui',
                title2: 'inspirent',
                btn: 'Voir Tous les Projets',
                empty: 'Aucun projet à afficher actuellement.',
                fallbackCategory: 'Projet'
            },
            cta: {
                title: 'Prêt à transformer votre espace ?',
                p: "Parlez-nous de votre projet et découvrez comment <0>Moussa Marbre</0> peut donner vie à vos ambitions les plus audacieuses.",
                btn1: 'Demander un Devis',
                btn2: 'Voir nos Réalisations'
            },
            productsPage: {
                tag: 'Catalogue',
                title1: 'Nos ',
                title2: 'Produits',
                desc: "Explorez notre gamme complète de pierres naturelles, du marbre le plus fin au granit le plus résistant. Chaque matériau est sélectionné avec soin pour sa qualité et sa beauté.",
                all: "TOUS",
                price: 'Prix (MAD)',
                empty: "Aucun produit dans cette gamme de prix.",
                productCount: "Produits",
                processTag: "Notre Processus",
                processTitle1: "De la ",
                processTitle2: "carrière",
                processTitle3: " à votre ",
                processTitle4: "intérieur",
                processItems: {
                    "1": { title: 'Sélection', desc: 'Choix minutieux des blocs de pierre directement en carrière.' },
                    "2": { title: 'Transformation', desc: 'Découpe, façonnage et finition dans notre atelier équipé.' },
                    "3": { title: 'Contrôle Qualité', desc: 'Inspection rigoureuse de chaque pièce avant livraison.' },
                    "4": { title: 'Installation', desc: 'Pose professionnelle par notre équipe de maîtres artisans.' }
                },
                ctaTitle: "Demandez votre devis gratuit",
                ctaDesc: "Recevez une estimation détaillée et personnalisée pour votre projet, sans aucun engagement.",
                ctaBtn: "Demander un Devis"
            },
            productDetail: {
                formTitle: 'Commander via WhatsApp',
                formName: 'Nom Complet',
                formNamePlaceholder: 'Votre nom',
                formPhone: 'Téléphone',
                formPhonePlaceholder: '+212 6 00 00 00 00',
                formMsg: 'Message (Optionnel)',
                formMsgPlaceholder: 'Précisez votre demande, quantité, dimensions...',
                formBtn: 'Envoyer via WhatsApp',
                whatsappGreeting: 'Bonjour, je suis intéressé(e) par le produit',
                whatsappName: 'Nom',
                whatsappPhone: 'Téléphone',
                whatsappMessage: 'Message'
            },
            projectsPage: {
                title1: 'Nos ',
                title2: 'Réalisations',
                desc: "Découvrez une sélection de nos projets les plus remarquables. Chaque réalisation témoigne de notre engagement envers l'excellence et la qualité artisanale.",
                all: "TOUS",
                empty: 'Aucun projet trouvé pour cette catégorie.',
                general: 'Général',
                ctaTitle: 'Vous avez un projet en tête ?',
                ctaDesc: "Contactez-nous pour discuter de votre vision. Nous serons ravis de vous accompagner à chaque étape.",
                ctaBtn: 'Parlons de Votre Projet'
            },
            aboutPage: {
                heroTag: 'Notre Histoire',
                heroTitle1: "L'art du marbre, une ",
                heroTitle2: "tradition",
                heroP1: "Fondée à Taza, <0>Moussa Marbre</0> est née de la passion d'un homme pour la pierre naturelle et de sa volonté de transformer chaque espace en une oeuvre d'art durable.",
                heroP2: "Aujourd'hui, l'entreprise est devenue une référence dans la transformation du marbre, servant architectes et particuliers à travers tout le royaume.",
                founderTag: 'Le Fondateur',
                founderTitle: 'Une vision, un heritage',
                founderQuote: "\"Ma passion pour la pierre naturelle est nee dans les carrieres de Taza. Chaque bloc de marbre raconte une histoire de millions d'annees — notre role est de reveler sa beaute et de lui donner une nouvelle vie dans vos espaces.\"",
                founderName: 'M. Moussa',
                founderRole: 'Fondateur & Directeur General, <0>Moussa Marbre</0>',
                stats: {
                    "1": { val: "30+", label: "Types de pierres" },
                    "2": { val: "80+", label: "Projets livres" },
                    "3": { val: "50+", label: "Artisans formes" }
                },
                missionTag: 'Notre Mission',
                missionTitle: 'Sublimer chaque espace',
                missionDesc: "Transformer les espaces de vie en oeuvres d'art intemporelles grâce à un travail artisanal d'exception sur la pierre naturelle. Nous offrons une expérience unique, du conseil à l'installation parfaite.",
                visionTag: 'Notre Vision',
                visionTitle: 'Leader reconnu au Maroc',
                visionDesc: "Devenir le leader dans la transformation du marbre et du granit, en alliant innovation technologique, savoir-faire artisanal et respect immuable de l'environnement.",
                valuesTag: 'Nos Valeurs',
                valuesTitle: 'Ce qui nous anime',
                valuesItems: {
                    "1": { title: 'Excellence', desc: 'Chaque pièce qui sort de notre atelier répond aux standards les plus exigeants de qualité et de finition.' },
                    "2": { title: 'Ecoute Client', desc: 'Nous travaillons main dans la main avec nos clients pour comprendre et concrétiser leur vision.' },
                    "3": { title: 'Précision', desc: "La découpe, le façonnage et l'installation sont exécutés avec une précision millimétrique." },
                    "4": { title: 'Passion', desc: 'Notre amour pour la pierre naturelle est le moteur de notre créativité et de notre engagement.' }
                },
                servicesTag: 'Ce que nous faisons',
                servicesTitle: 'La valeur réside dans un processus d’exception',
                ctaTitle: 'Collaborons ensemble',
                ctaDesc: 'Que vous soyez architecte ou particulier, nous serons ravis de discuter de votre projet.',
                ctaBtn: 'Prendre Contact'
            },
            contactPage: {
                tag: 'Contact',
                title1: 'Parlons de votre ',
                title2: 'projet',
                desc: "Que vous ayez une idée précise ou que vous cherchiez des conseils, notre équipe est à votre écoute. Remplissez le formulaire ou contactez-nous directement.",
                infoText: {
                    phone: 'Téléphone',
                    email: 'Email',
                    address: 'Adresse',
                    hours: 'Horaires'
                },
                loc1: 'Ouled Slama',
                loc2: 'Temara 12000, Maroc',
                hours1: 'Lun - Ven : 8h - 18h',
                hours2: 'Sam : 8h - 13h',
                formTitle: 'Demander un Devis Gratuit',
                formDesc: 'Remplissez le formulaire ci-dessous et nous vous répondrons dans les 24 heures.',
                successTitle: 'Message envoyé avec succès!',
                successDesc: 'Nous vous contacterons dans les plus brefs délais.',
                labels: {
                    name: 'Nom Complet',
                    namePlaceholder: 'Votre nom',
                    email: 'Email',
                    emailPlaceholder: 'votre@email.com',
                    phone: 'Téléphone',
                    phonePlaceholder: '+212 6 00 00 00 00',
                    city: 'Ville',
                    cityPlaceholder: 'Votre ville',
                    service: 'Service Souhaité',
                    servicePlaceholder: 'Sélectionnez un service',
                    message: 'Message',
                    messagePlaceholder: 'Décrivez votre projet, les matériaux souhaités, les dimensions approximatives...'
                },
                btn: 'Envoyer le Message',
                sidebarTitle: 'Pourquoi Nous Choisir ?',
                mapText: 'Voir sur Google Maps',
                whyItems: [
                    'Devis gratuit sous 24h',
                    '30+ types de pierres naturelles',
                    'Livraison partout au Maroc',
                    'Garantie sur tous nos travaux'
                ]
            },
            footer: {
                desc: "Transformer vos espaces en oeuvres d'art intemporelles. Spécialiste du marbre, granit et pierre naturelle au Maroc.",
                navTitle: 'Navigation',
                servicesTitle: 'Services',
                contactTitle: 'Contact',
                contactBtn: 'NOUS CONTACTER',
                rights: '© {{year}} Moussa Marbre. Tous droits réservés.',
                tagline: 'Marbre · Granit · Pierre Naturelle'
            }
        }
    },
    en: {
        translation: {
            navbar: {
                home: 'Home',
                projects: 'Projects',
                products: 'Products',
                about: 'About',
                quote: 'Request a Quote',
            },
            hero: {
                slide1: {
                    tagline: 'Marble · Granite · Natural Stone',
                    title: "Transforming your spaces into timeless works of art",
                    description: "Specializing in marble, granite, and natural stone, Moussa Marbre combines artisanal expertise and precision to elevate every architectural project."
                },
                slide2: {
                    tagline: 'Excellence & Precision',
                    title: "Noble materials for exceptional projects",
                    description: "We select the very best stones from around the world to offer you unparalleled quality and spectacular results."
                },
                slide3: {
                    tagline: 'Custom Design',
                    title: "Shaping stone to your vision",
                    description: "From conception to installation, our design office works with you to realize your most ambitious projects."
                },
                btnProjects: 'View our Projects',
                btnContact: 'Contact Us'
            },
            about: {
                tag: 'Our Heritage',
                title1: "The art of stone serving your",
                title2: "ambitions.",
                p1: "<0>Moussa Marbre</0> has quickly established itself as a benchmark in the transformation of marble, granite, and natural stone in Morocco. Our pure artisanal know-how, combined with cutting-edge industrial techniques, allows us to deliver exceptional projects.",
                p2: "From architectural design to meticulous installation, every detail is considered to enhance your spaces and create timeless environments that meet your highest expectations.",
                btn: 'Discover Our History',
                statNum: '30+',
                statLabel: 'Exclusive varieties of natural stone'
            },
            services: {
                tag: 'Our Services',
                title1: "Complete expertise dedicated to",
                title2: "stone",
                items: {
                    "1": {
                        title: "Wall and Floor Coverings",
                        desc: "Creation of wall coverings, floors, and facade cladding in marble and natural stone for elegant and durable spaces."
                    },
                    "2": {
                        title: "Kitchen Countertops",
                        desc: "Design and installation of worktops with special, high-end materials tailored to your needs."
                    },
                    "3": {
                        title: "Staircase and Terrace Cladding",
                        desc: "Cladding for stairs and terraces to add a natural, refined touch to your outdoor and indoor spaces."
                    },
                    "4": {
                        title: "Outdoor Landscaping",
                        desc: "Enhancing your outdoor living areas with our collection of natural stones, creating a warm and comfortable environment."
                    }
                }
            },
            projects: {
                tag: 'Featured Projects',
                title1: 'Creations that',
                title2: 'inspire',
                btn: 'View All Projects',
                empty: 'No projects to display currently.',
                fallbackCategory: 'Project'
            },
            cta: {
                title: 'Ready to transform your space?',
                p: "Tell us about your project and discover how <0>Moussa Marbre</0> can bring your boldest ambitions to life.",
                btn1: 'Request a Quote',
                btn2: 'View our Portfolio'
            },
            productsPage: {
                tag: 'Catalog',
                title1: 'Our ',
                title2: 'Products',
                desc: "Explore our full range of natural stones, from the finest marble to the most resilient granite. Each material is carefully selected for its quality and beauty.",
                all: "ALL",
                price: 'Price (MAD)',
                empty: "No products in this price range.",
                productCount: "Products",
                processTag: "Our Process",
                processTitle1: "From the ",
                processTitle2: "quarry",
                processTitle3: " to your ",
                processTitle4: "interior",
                processItems: {
                    "1": { title: 'Selection', desc: 'Meticulous choice of stone blocks directly from the quarry.' },
                    "2": { title: 'Transformation', desc: 'Cutting, shaping, and finishing in our equipped workshop.' },
                    "3": { title: 'Quality Control', desc: 'Rigorous inspection of each piece before delivery.' },
                    "4": { title: 'Installation', desc: 'Professional installation by our team of master craftsmen.' }
                },
                ctaTitle: "Request your free quote",
                ctaDesc: "Receive a detailed and personalized estimate for your project, without any obligation.",
                ctaBtn: "Request a Quote"
            },
            productDetail: {
                formTitle: 'Order via WhatsApp',
                formName: 'Full Name',
                formNamePlaceholder: 'Your name',
                formPhone: 'Phone',
                formPhonePlaceholder: '+212 6 00 00 00 00',
                formMsg: 'Message (Optional)',
                formMsgPlaceholder: 'Specify your request, quantity, dimensions...',
                formBtn: 'Send via WhatsApp',
                whatsappGreeting: 'Hello, I am interested in the product',
                whatsappName: 'Name',
                whatsappPhone: 'Phone',
                whatsappMessage: 'Message'
            },
            projectsPage: {
                title1: 'Our ',
                title2: 'Portfolio',
                desc: "Discover a selection of our most remarkable projects. Each realization testifies to our commitment to excellence and artisanal quality.",
                all: "ALL",
                empty: 'No projects found for this category.',
                general: 'General',
                ctaTitle: 'Have a project in mind?',
                ctaDesc: "Contact us to discuss your vision. We would be delighted to guide you through every step.",
                ctaBtn: "Let's Talk About Your Project"
            },
            aboutPage: {
                heroTag: 'Our History',
                heroTitle1: "The art of marble, a ",
                heroTitle2: "tradition",
                heroP1: "Founded in Taza, <0>Moussa Marbre</0> was born from one man's passion for natural stone and his desire to transform every space into a lasting work of art.",
                heroP2: "Today, the company has become a benchmark in marble transformation, serving architects and individuals across the kingdom.",
                founderTag: 'The Founder',
                founderTitle: 'A vision, a heritage',
                founderQuote: "\"My passion for natural stone was born in the quarries of Taza. Every block of marble tells a story spanning millions of years — our role is to reveal its beauty and give it a new life in your spaces.\"",
                founderName: 'Mr. Moussa',
                founderRole: 'Founder & General Manager, <0>Moussa Marbre</0>',
                stats: {
                    "1": { val: "30+", label: "Stone types" },
                    "2": { val: "80+", label: "Projects delivered" },
                    "3": { val: "50+", label: "Craftsmen trained" }
                },
                missionTag: 'Our Mission',
                missionTitle: 'Enhancing every space',
                missionDesc: "Transforming living spaces into timeless works of art through exceptional craftsmanship on natural stone. We offer a unique experience, from consulting to perfect installation.",
                visionTag: 'Our Vision',
                visionTitle: 'Recognized leader in Morocco',
                visionDesc: "To become the leader in marble and granite transformation, combining technological innovation, artisanal expertise, and an unwavering respect for the environment.",
                valuesTag: 'Our Values',
                valuesTitle: 'What drives us',
                valuesItems: {
                    "1": { title: 'Excellence', desc: 'Every piece that leaves our workshop meets the most demanding standards of quality and finish.' },
                    "2": { title: 'Listening to the Client', desc: 'We work hand in hand with our clients to understand and realize their vision.' },
                    "3": { title: 'Precision', desc: "Cutting, shaping, and installation are executed with millimeter precision." },
                    "4": { title: 'Passion', desc: 'Our love for natural stone is the driving force behind our creativity and commitment.' }
                },
                servicesTag: 'What we do',
                servicesTitle: 'Value lies in an exceptional process',
                ctaTitle: 'Let’s work together',
                ctaDesc: 'Whether you are an architect or an individual, we would be delighted to discuss your project.',
                ctaBtn: 'Get in Touch'
            },
            contactPage: {
                tag: 'Contact',
                title1: 'Let’s talk about your ',
                title2: 'project',
                desc: "Whether you have a specific idea or are looking for advice, our team is at your disposal. Fill out the form or contact us directly.",
                infoText: {
                    phone: 'Phone',
                    email: 'Email',
                    address: 'Address',
                    hours: 'Hours'
                },
                loc1: 'Ouled Slama',
                loc2: 'Temara 12000, Morocco',
                hours1: 'Mon - Fri: 8am - 6pm',
                hours2: 'Sat: 8am - 1pm',
                formTitle: 'Request a Free Quote',
                formDesc: 'Fill out the form below and we will get back to you within 24 hours.',
                successTitle: 'Message sent successfully!',
                successDesc: 'We will contact you as soon as possible.',
                labels: {
                    name: 'Full Name',
                    namePlaceholder: 'Your name',
                    email: 'Email',
                    emailPlaceholder: 'your@email.com',
                    phone: 'Phone',
                    phonePlaceholder: '+212 6 00 00 00 00',
                    city: 'City',
                    cityPlaceholder: 'Your city',
                    service: 'Desired Service',
                    servicePlaceholder: 'Select a service',
                    message: 'Message',
                    messagePlaceholder: 'Describe your project, desired materials, approximate dimensions...'
                },
                btn: 'Send Message',
                sidebarTitle: 'Why Choose Us?',
                mapText: 'View on Google Maps',
                whyItems: [
                    'Free quote within 24h',
                    '30+ types of natural stone',
                    'Delivery anywhere in Morocco',
                    'Warranty on all our work'
                ]
            },
            footer: {
                desc: "Transforming your spaces into timeless works of art. Specialist in marble, granite, and natural stone in Morocco.",
                navTitle: 'Navigation',
                servicesTitle: 'Services',
                contactTitle: 'Contact',
                contactBtn: 'CONTACT US',
                rights: '© {{year}} Moussa Marbre. All rights reserved.',
                tagline: 'Marble · Granite · Natural Stone'
            }
        }
    },
    ar: {
        translation: {
            navbar: {
                home: 'الرئيسية',
                projects: 'المشاريع',
                products: 'المنتجات',
                about: 'معلومات عنا',
                quote: 'اطلب عرض سعر',
            },
            hero: {
                slide1: {
                    tagline: 'رخام · جرانيت · حجر طبيعي',
                    title: "نحوّل مساحاتك إلى أعمال فنية خالدة",
                    description: "تتخصص مؤسسة موسى للرخام في الرخام والجرانيت والحجر الطبيعي، وتجمع بين الحرفية اليدوية والدقة للارتقاء بكل مشروع معماري."
                },
                slide2: {
                    tagline: 'الامتياز والدقة',
                    title: "مواد نبيلة لمشاريع استثنائية",
                    description: "نختار أفضل الأحجار من جميع أنحاء العالم لنقدم لك جودة لا مثيل لها ونتائج مذهلة."
                },
                slide3: {
                    tagline: 'تصميم مخصص',
                    title: "تشكيل الحجر حسب رؤيتك",
                    description: "من الفكرة إلى التركيب، يرافقك مكتب التصميم لدينا لتحقيق مشاريعك الأكثر طموحًا."
                },
                btnProjects: 'شاهد مشاريعنا',
                btnContact: 'اتصل بنا'
            },
            about: {
                tag: 'تراثنا',
                title1: "فن الحجر في خدمة",
                title2: "طموحاتك.",
                p1: "أثبتت <0>موسى للرخام</0> مكانتها كمرجع في تحويل الرخام والجرانيت والحجر الطبيعي في المغرب. تتيح لنا حرفيتنا الأصيلة، إلى جانب التقنيات الصناعية المتطورة، تنفيذ مشاريع استثنائية.",
                p2: "من التصميم المعماري إلى التركيب الدقيق، يُدرس كل تفصيل للارتقاء بمساحاتك وخلق بيئات خالدة ترقى إلى أعلى تطلعاتك.",
                btn: 'اكتشف تاريخنا',
                statNum: '+30',
                statLabel: 'أصناف حصرية من الحجر الطبيعي'
            },
            services: {
                tag: 'خدماتنا',
                title1: "خبرة شاملة في خدمة",
                title2: "الحجر",
                items: {
                    "1": {
                        title: "تلبيس الجدران والأرضيات",
                        desc: "إنجاز أغطية الجدران والأرضيات وتلبيس الواجهات بالرخام والحجر الطبيعي لمساحات أنيقة وعملية."
                    },
                    "2": {
                        title: "أسطح المطابخ",
                        desc: "تصميم وتجهيز أسطح العمل بمواد خاصة وعالية الجودة تتناسب مع احتياجاتك."
                    },
                    "3": {
                        title: "تلبيس السلالم والشرفات",
                        desc: "تلبيس السلالم والشرفات لإضفاء لمسة طبيعية وراقية على مساحاتك."
                    },
                    "4": {
                        title: "تهيئة المساحات الخارجية",
                        desc: "إبراز مساحات المعيشة الخارجية الخاصة بك باستخدام تشكيلتنا من الأحجار الطبيعية، لخلق بيئة دافئة ومريحة."
                    }
                }
            },
            projects: {
                tag: 'مشاريع مميزة',
                title1: 'إنجازات',
                title2: 'تلهم',
                btn: 'عرض كل المشاريع',
                empty: 'لا توجد مشاريع لعرضها حاليا.',
                fallbackCategory: 'مشروع'
            },
            cta: {
                title: 'مستعد لتحويل مساحتك؟',
                p: "حدثنا عن مشروعك واكتشف كيف يمكن لـ <0>موسى للرخام</0> أن يجسد طموحاتك الأكثر جرأة.",
                btn1: 'اطلب عرض سعر',
                btn2: 'شاهد إنجازاتنا'
            },
            productsPage: {
                tag: 'الكتالوج',
                title1: 'منتجاتنا ',
                title2: '',
                desc: "استكشف مجموعتنا الكاملة من الأحجار الطبيعية، من أرقى أنواع الرخام إلى الجرانيت الأكثر صلابة. يتم اختيار كل مادة بعناية لجودتها وجمالها.",
                all: "الكل",
                price: 'السعر (درهم)',
                empty: "لا توجد منتجات في هذا النطاق السعري.",
                productCount: "منتجات",
                processTag: "عمليتنا",
                processTitle1: "من ",
                processTitle2: "المحجر",
                processTitle3: " إلى ",
                processTitle4: "داخلك",
                processItems: {
                    "1": { title: 'الاختيار', desc: 'اختيار دقيق لكتل الحجر مباشرة في المحجر.' },
                    "2": { title: 'التحويل', desc: 'القطع والتشكيل والتشطيب في ورشتنا المجهزة.' },
                    "3": { title: 'مراقبة الجودة', desc: 'فحص صارم لكل قطعة قبل التسليم.' },
                    "4": { title: 'التركيب', desc: 'تركيب احترافي بواسطة فريقنا من الحرفيين المتخصصين.' }
                },
                ctaTitle: "اطلب عرض سعر مجاني",
                ctaDesc: "احصل على تقدير مفصل ومخصص لمشروعك، دون أي التزام.",
                ctaBtn: "اطلب عرض سعر"
            },
            productDetail: {
                formTitle: 'اطلب عبر واتساب',
                formName: 'الاسم الكامل',
                formNamePlaceholder: 'اسمك',
                formPhone: 'الهاتف',
                formPhonePlaceholder: '+212 6 00 00 00 00',
                formMsg: 'الرسالة (اختياري)',
                formMsgPlaceholder: 'حدد طلبك، الكمية، الأبعاد...',
                formBtn: 'أرسل عبر واتساب',
                whatsappGreeting: 'مرحبًا، أنا مهتم بالمنتج',
                whatsappName: 'الاسم',
                whatsappPhone: 'الهاتف',
                whatsappMessage: 'الرسالة'
            },
            projectsPage: {
                title1: 'إنجازاتنا ',
                title2: '',
                desc: "اكتشف مجموعة مختارة من أبرز مشاريعنا. كل إنجاز يشهد على التزامنا بالتميز والجودة الحرفية.",
                all: "الكل",
                empty: 'لم يتم العثور على مشاريع لهذه الفئة.',
                general: 'عام',
                ctaTitle: 'هل لديك مشروع في الاعتبار؟',
                ctaDesc: "اتصل بنا لمناقشة رؤيتك. يسعدنا أن نرافقك في كل خطوة.",
                ctaBtn: "لنتحدث عن مشروعك"
            },
            aboutPage: {
                heroTag: 'تاريخنا',
                heroTitle1: "فن الرخام، ",
                heroTitle2: "تقليد",
                heroP1: "تأسست <0>موسى للرخام</0> في تازة، ولدت من شغف رجل بالحجر الطبيعي ورغبته في تحويل كل مساحة إلى عمل فني دائم.",
                heroP2: "اليوم، أصبحت الشركة مرجعًا في تحويل الرخام، وتخدم المهندسين المعماريين والأفراد في جميع أنحاء المملكة.",
                founderTag: 'المؤسس',
                founderTitle: 'رؤية، وتراث',
                founderQuote: "\"ولد شغفي بالحجر الطبيعي في محاجر تازة. تحكي كل كتلة رخام قصة ملايين السنين — دورنا هو إبراز جمالها وإعطائها حياة جديدة في مساحاتك.\"",
                founderName: 'السيد موسى',
                founderRole: 'المؤسس والمدير العام، <0>موسى للرخام</0>',
                stats: {
                    "1": { val: "+30", label: "أنواع الأحجار" },
                    "2": { val: "+80", label: "مشاريع منجزة" },
                    "3": { val: "+50", label: "حرفيون متدربون" }
                },
                missionTag: 'مهمتنا',
                missionTitle: 'الارتقاء بكل مساحة',
                missionDesc: "تحويل مساحات المعيشة إلى أعمال فنية خالدة من خلال العمل الحرفي الاستثنائي على الحجر الطبيعي. نقدم تجربة فريدة، من الاستشارة إلى التركيب المثالي.",
                visionTag: 'رؤيتنا',
                visionTitle: 'رائد معترف به في المغرب',
                visionDesc: "أن نصبح الرائد في تحويل الرخام والجرانيت، من خلال الجمع بين الابتكار التكنولوجي والخبرة الحرفية والاحترام الثابت للبيئة.",
                valuesTag: 'قيمنا',
                valuesTitle: 'ما يحركنا',
                valuesItems: {
                    "1": { title: 'الامتياز', desc: 'كل قطعة تخرج من ورشتنا تلبي أدق معايير الجودة والتشطيب.' },
                    "2": { title: 'الاستماع للعميل', desc: 'نعمل جنبًا إلى جنب مع عملائنا لفهم رؤيتهم وتحقيقها.' },
                    "3": { title: 'الدقة', desc: "يتم تنفيذ القطع والتشكيل والتركيب بدقة مليمترية." },
                    "4": { title: 'الشغف', desc: 'حبنا للحجر الطبيعي هو القوة الدافعة وراء إبداعنا والتزامنا.' }
                },
                servicesTag: 'ما نقوم به',
                servicesTitle: 'تكمن القيمة في عملية استثنائية',
                ctaTitle: 'لنتعاون معًا',
                ctaDesc: 'سواء كنت مهندسًا معماريًا أو فردًا، يسعدنا مناقشة مشروعك.',
                ctaBtn: 'اتصل بنا'
            },
            contactPage: {
                tag: 'اتصل بنا',
                title1: 'لنتحدث عن ',
                title2: 'مشروعك',
                desc: "سواء كانت لديك فكرة محددة أو تبحث عن نصيحة، فإن فريقنا تحت تصرفك. املأ النموذج أو اتصل بنا مباشرة.",
                infoText: {
                    phone: 'الهاتف',
                    email: 'البريد الإلكتروني',
                    address: 'العنوان',
                    hours: 'ساعات العمل'
                },
                loc1: 'أولاد سلامة',
                loc2: 'تمارة 12000، المغرب',
                hours1: 'الإثنين - الجمعة: 8 ص - 6 م',
                hours2: 'السبت: 8 ص - 1 م',
                formTitle: 'اطلب عرض سعر مجاني',
                formDesc: 'املأ النموذج أدناه وسنرد عليك في غضون 24 ساعة.',
                successTitle: 'تم إرسال الرسالة بنجاح!',
                successDesc: 'سنتصل بك في أقرب وقت ممكن.',
                labels: {
                    name: 'الاسم الكامل',
                    namePlaceholder: 'اسمك',
                    email: 'البريد الإلكتروني',
                    emailPlaceholder: 'your@email.com',
                    phone: 'الهاتف',
                    phonePlaceholder: '+212 6 00 00 00 00',
                    city: 'المدينة',
                    cityPlaceholder: 'مدينتك',
                    service: 'الخدمة المطلوبة',
                    servicePlaceholder: 'اختر خدمة',
                    message: 'الرسالة',
                    messagePlaceholder: 'صف مشروعك، المواد المطلوبة، الأبعاد التقريبية...'
                },
                btn: 'إرسال الرسالة',
                sidebarTitle: 'لماذا تختارنا ؟',
                mapText: 'شاهد على خرائط جوجل',
                whyItems: [
                    'عرض سعر مجاني خلال 24 ساعة',
                    '+30 نوعاً من الأحجار الطبيعية',
                    'التوصيل إلى جميع أنحاء المغرب',
                    'ضمان على جميع أعمالنا'
                ]
            },
            footer: {
                desc: "نحوّل مساحاتك إلى أعمال فنية خالدة. متخصصون في الرخام والجرانيت والحجر الطبيعي في المغرب.",
                navTitle: 'تنقل',
                servicesTitle: 'الخدمات',
                contactTitle: 'تواصل معنا',
                contactBtn: 'اتصل بنا',
                rights: '© {{year}} موسى للرخام. جميع الحقوق محفوظة.',
                tagline: 'رخام · جرانيت · حجر طبيعي'
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'fr', // Default to French if detection fails
        supportedLngs: ['fr', 'en', 'ar'],
        interpolation: {
            escapeValue: false, // React already safe from XSS
        },
    });

// Setup dynamic RTL direction changes based on selected language
i18n.on('languageChanged', (lng) => {
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
});

export default i18n;
