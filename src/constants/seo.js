/**
 * Single source of truth for route-level SEO metadata.
 * Keep this file dependency-free: it is imported by both React and the build script.
 */
export const SITE_URL = "https://omchouhan.vercel.app";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const HOME_SEO = {
  title: "Website Designer in Delhi | Om Prakash Chouhan",
  description:
    "Om Prakash Chouhan is a freelance website designer and web developer in Delhi, creating responsive business websites, service websites and custom web applications for Delhi NCR businesses.",
  canonicalPath: "/",
};

export const SEO_ROUTES = [
  {
    outDir: "about",
    canonicalPath: "/about/",
    title: "About Om Prakash Chouhan | Web Developer in Delhi",
    description:
      "Meet Om Prakash Chouhan, a freelance web developer and website designer based in Delhi, India. Explore his approach, technical skills and selected web projects.",
    pageType: "AboutPage",
  },
  {
    outDir: "projects",
    canonicalPath: "/projects/",
    title: "Web Development Portfolio & Projects | Om Prakash Chouhan",
    description:
      "Explore web development projects by Om Prakash Chouhan, including business websites, restaurant and fitness concepts, and full-stack web experiences built with modern technologies.",
    pageType: "CollectionPage",
  },
  {
    outDir: "services",
    canonicalPath: "/services/",
    title: "Website Development Services in Delhi | Om Prakash Chouhan",
    description:
      "Explore website development services in Delhi NCR: custom business websites, restaurant and gym websites, school platforms, online stores and website maintenance.",
    pageType: "WebPage",
    serviceName: "Website Development Services",
    serviceDescription:
      "Website planning, design and development for businesses and organisations, including service websites, industry-specific websites and custom web applications.",
  },
  {
    outDir: "contact",
    canonicalPath: "/contact/",
    title: "Contact Om Prakash Chouhan | Website Development in Delhi",
    description:
      "Discuss a website or web application project with Om Prakash Chouhan, a freelance website designer and developer based in Delhi, India. Share your goals and requirements.",
    pageType: "ContactPage",
  },
  {
    outDir: "services/web-development",
    canonicalPath: "/services/web-development/",
    title: "Web Development Services in Delhi | Om Prakash Chouhan",
    description:
      "Custom web development in Delhi NCR for business websites and web applications. Plan responsive interfaces, React frontends, backend features and technical SEO foundations.",
    pageType: "WebPage",
    serviceName: "Web Development",
    serviceDescription:
      "Custom website and web application development for businesses, startups and organisations, from responsive marketing websites to data-driven applications.",
  },
  {
    outDir: "services/restaurant-website-development",
    canonicalPath: "/services/restaurant-website-development/",
    title: "Restaurant Website Development in Delhi | Om Prakash Chouhan",
    description:
      "Restaurant website development in Delhi NCR with mobile-friendly menus, location and opening-hour details, reservation enquiries and WhatsApp contact options.",
    pageType: "WebPage",
    serviceName: "Restaurant Website Development",
    serviceDescription:
      "Website design and development for restaurants, cafes, bakeries and cloud kitchens, with digital menus, location details and customer enquiry options.",
  },
  {
    outDir: "services/gym-website-development",
    canonicalPath: "/services/gym-website-development/",
    title: "Gym Website Development in Delhi | Om Prakash Chouhan",
    description:
      "Gym and fitness website development in Delhi NCR. Present membership plans, trainer profiles, class schedules, facility details and trial-session enquiries.",
    pageType: "WebPage",
    serviceName: "Gym Website Development",
    serviceDescription:
      "Website development for gyms, fitness studios, yoga centres and personal trainers, including membership information, schedules and enquiry forms.",
  },
  {
    outDir: "services/small-business-website-development",
    canonicalPath: "/services/small-business-website-development/",
    title: "Small Business Website Development in Delhi | Om Prakash Chouhan",
    description:
      "Small business website development in Delhi NCR. Explain your services, showcase your work, answer customer questions and make it easy to contact your business.",
    pageType: "WebPage",
    serviceName: "Small Business Website Development",
    serviceDescription:
      "Website design and development for local businesses, independent professionals, consultants and service providers who need a clear online presence.",
  },
  {
    outDir: "services/ecommerce-website-development",
    canonicalPath: "/services/ecommerce-website-development/",
    title: "E-commerce Website Development in Delhi | Om Prakash Chouhan",
    description:
      "E-commerce website development in Delhi NCR, including product catalogues, product details, shopping cart flows and payment or enquiry integrations based on your needs.",
    pageType: "WebPage",
    serviceName: "E-commerce Website Development",
    serviceDescription:
      "Design and development of online stores with product catalogues, product information, cart and checkout experiences, and suitable payment integrations.",
  },
  {
    outDir: "services/school-website-development",
    canonicalPath: "/services/school-website-development/",
    title: "School Website Development in Delhi | Om Prakash Chouhan",
    description:
      "School and institute website development in Delhi NCR. Present courses, faculty, admissions information, notices, events and enquiry forms clearly on mobile.",
    pageType: "WebPage",
    serviceName: "School Website Development",
    serviceDescription:
      "Website development for schools, coaching institutes and academies, with course information, faculty profiles, announcements and admission enquiries.",
  },
  {
    outDir: "services/website-maintenance",
    canonicalPath: "/services/website-maintenance/",
    title: "Website Maintenance & Support in Delhi | Om Prakash Chouhan",
    description:
      "Website maintenance and support for businesses in Delhi NCR, including content updates, bug fixes, form checks, dependency updates and technical SEO checks.",
    pageType: "WebPage",
    serviceName: "Website Maintenance and Support",
    serviceDescription:
      "Ongoing website support covering content updates, troubleshooting, form checks, software dependency maintenance and technical website reviews.",
  },
];

export const getSeoRoute = (outDir) => SEO_ROUTES.find((route) => route.outDir === outDir);
