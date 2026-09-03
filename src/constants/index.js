import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaUtensils,
  FaDumbbell,
  FaBriefcase,
  FaShoppingCart,
  FaGraduationCap,
  FaTools,
  FaCode,
  FaCheckCircle,
  FaMobileAlt,
  FaRocket,
  FaSearchDollar,
  FaShieldAlt,
  FaHeadset
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiJsonwebtokens,
  SiNextdotjs,
  SiTypescript
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { MdDevices } from "react-icons/md";

// ─── Skills Grouped for Professional Clarity ──────────────────────────
export const categorizedSkills = {
  frontend: [
    { name: "React.js", icon: FaReact, color: "text-cyan-400" },
    { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
    { name: "JavaScript (ES6+)", icon: FaJsSquare, color: "text-yellow-400" },
    { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-300" },
    { name: "HTML5 & CSS3", icon: FaHtml5, color: "text-orange-500" },
    { name: "Responsive Design", icon: MdDevices, color: "text-purple-400" },
  ],
  backend: [
    { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
    { name: "Express.js", icon: SiExpress, color: "text-gray-300" },
    { name: "RESTful APIs", icon: TbApi, color: "text-blue-400" },
    { name: "JWT Auth", icon: SiJsonwebtokens, color: "text-pink-500" },
  ],
  database: [
    { name: "MongoDB", icon: SiMongodb, color: "text-green-600" },
  ],
  tools: [
    { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
    { name: "GitHub", icon: FaGithub, color: "text-white" },
    { name: "Vercel", icon: FaRocket, color: "text-white" },
  ]
};

// Flat skills array for backward compatibility with existing components
export const skills = [
  { name: "React.js", icon: FaReact, color: "text-cyan-400", progress: 90 },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white", progress: 88 },
  { name: "JavaScript", icon: FaJsSquare, color: "text-yellow-400", progress: 90 },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-400", progress: 85 },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-300", progress: 95 },
  { name: "HTML5", icon: FaHtml5, color: "text-orange-500", progress: 95 },
  { name: "CSS3", icon: FaCss3Alt, color: "text-blue-500", progress: 92 },
  { name: "Node.js", icon: FaNodeJs, color: "text-green-500", progress: 80 },
  { name: "Express.js", icon: SiExpress, color: "text-gray-300", progress: 80 },
  { name: "MongoDB", icon: SiMongodb, color: "text-green-600", progress: 82 },
  { name: "REST APIs", icon: TbApi, color: "text-blue-400", progress: 85 },
  { name: "Git & GitHub", icon: FaGithub, color: "text-white", progress: 90 },
];

// ─── Business Services Architecture ──────────────────────────────────
export const services = [
  {
    id: "web-development",
    slug: "web-development",
    title: "Web Development",
    shortTitle: "Custom Web Development",
    icon: FaCode,
    badge: "Core Service",
    description: "Custom-built, high-performance websites and full-stack web applications tailored to your business operations and customer acquisition goals.",
    targetAudience: "Startups, Businesses, Entrepreneurs, Agencies",
    features: [
      "Custom React / Next.js architecture",
      "Mobile-first responsive engineering",
      "Blazing-fast load times & 0ms lag UX",
      "API integrations & custom backend solutions",
      "Technical SEO foundation built-in"
    ],
    path: "/services/web-development"
  },
  {
    id: "restaurant-website-development",
    slug: "restaurant-website-development",
    title: "Restaurant Website Development",
    shortTitle: "Restaurant & Cafe Websites",
    icon: FaUtensils,
    badge: "Food & Hospitality",
    description: "Visually appetizing websites for restaurants, cafes, cloud kitchens, and dining brands with interactive menus, WhatsApp ordering, and Google Maps integration.",
    targetAudience: "Restaurants, Cafes, Bakeries, Cloud Kitchens, Bars",
    features: [
      "Interactive digital menus with categories & prices",
      "Table reservation & inquiry forms",
      "Direct WhatsApp ordering integration",
      "Google Maps location & opening hours display",
      "Mouth-watering visual gallery & brand story"
    ],
    path: "/services/restaurant-website-development"
  },
  {
    id: "gym-website-development",
    slug: "gym-website-development",
    title: "Gym Website Development",
    shortTitle: "Gym & Fitness Websites",
    icon: FaDumbbell,
    badge: "Fitness & Wellness",
    description: "High-energy, conversion-optimized websites for gyms, fitness clubs, and personal trainers with membership plan tiers, class schedules, and lead capture.",
    targetAudience: "Gyms, Crossfit Boxes, Yoga Studios, Personal Trainers",
    features: [
      "Membership pricing tiers & plan comparison",
      "Trainer profiles & specialty showcases",
      "Class schedules & trial session booking forms",
      "High-converting inquiry lead funnels",
      "Mobile-optimized for on-the-go members"
    ],
    path: "/services/gym-website-development"
  },
  {
    id: "small-business-website-development",
    slug: "small-business-website-development",
    title: "Small Business Website Development",
    shortTitle: "Small Business Websites",
    icon: FaBriefcase,
    badge: "Local & Services",
    description: "Professional, trust-building websites for local businesses, service providers, and consultants looking to turn local searchers into paying clients.",
    targetAudience: "Local Service Providers, Consultants, Clinics, Agencies",
    features: [
      "Trust-building modern UI and clear value proposition",
      "Direct call-to-actions and consultation booking",
      "Service breakdown with transparent offerings",
      "Local SEO optimization for Delhi and regional search",
      "Fast, lightweight, and zero monthly template bloat"
    ],
    path: "/services/small-business-website-development"
  },
  {
    id: "ecommerce-website-development",
    slug: "ecommerce-website-development",
    title: "Ecommerce Website Development",
    shortTitle: "Ecommerce & Online Stores",
    icon: FaShoppingCart,
    badge: "Online Retail",
    description: "Fast, secure online stores with clean product catalogs, seamless shopping carts, frictionless checkout, and direct customer inquiry channels.",
    targetAudience: "Direct-to-Consumer Brands, Retailers, Boutique Stores",
    features: [
      "Product catalog with categories & filtering",
      "Smooth shopping cart and checkout flows",
      "WhatsApp inquiry and direct order confirmation",
      "Fast page load speed for higher conversion rates",
      "Mobile-first checkout experience"
    ],
    path: "/services/ecommerce-website-development"
  },
  {
    id: "school-website-development",
    slug: "school-website-development",
    title: "School & Institute Website Development",
    shortTitle: "School & Academy Websites",
    icon: FaGraduationCap,
    badge: "Education & Academies",
    description: "Informative, structured websites for schools, coaching institutes, music academies, and tutors to showcase courses, faculty, and manage admission inquiries.",
    targetAudience: "Schools, Coaching Centers, Music/Art Academies, Tutors",
    features: [
      "Course curriculums and fee structure presentation",
      "Online admission & inquiry capture forms",
      "Faculty profiles and institution credentials",
      "Notice board & event announcements",
      "Accessible and clean UI for parents and students"
    ],
    path: "/services/school-website-development"
  },
  {
    id: "website-maintenance",
    slug: "website-maintenance",
    title: "Website Maintenance & Support",
    shortTitle: "Maintenance & Support",
    icon: FaTools,
    badge: "Ongoing Care",
    description: "Reliable technical maintenance, speed optimization, regular content updates, security monitoring, and bug fixes to keep your website running smoothly.",
    targetAudience: "Business Owners with Existing Websites Needing Upkeep",
    features: [
      "Regular content, image, and menu updates",
      "Bug fixing, link checks, and troubleshooting",
      "Speed, performance, and Core Web Vitals optimization",
      "Security best practices and dependency updates",
      "Priority technical assistance when you need changes"
    ],
    path: "/services/website-maintenance"
  }
];

// ─── Real & Transparent Projects Portfolio ────────────────────────────
export const projects = [
  {
    id: "solis-estate",
    title: "Solis Estate",
    projectType: "Concept Project",
    industry: "Luxury Real Estate",
    category: "Real Estate",
    serviceSlug: "web-development",
    tagline: "3D / Canvas Scrollytelling Real Estate Experience",
    description: "A luxury 3D scrollytelling real estate web experience featuring 593 Full HD frames rendered on HTML5 Canvas for 0ms scrub latency, GSAP ScrollTrigger, Lenis smooth scrolling, DPR retina scaling, and an Apple/Awwwards-inspired luxury glassmorphic UI.",
    problem: "Traditional video tags on websites stutter, buffer, and exhibit 200-500ms input latency when scrubbing on scroll, breaking the immersive storytelling experience for luxury brands.",
    solution: "Extracted 593 sequential 1080p frames using FFmpeg and drew them directly onto a hardware-accelerated 2D HTML5 Canvas synchronized with GSAP ScrollTrigger and Lenis inertial momentum, achieving instant 0ms scrubbing response.",
    features: [
      "593 Full HD video frames rendered on HTML5 Canvas",
      "0ms scrubbing delay on forward & reverse scroll",
      "GSAP ScrollTrigger & Lenis smooth scrolling integration",
      "Aspect-ratio cover-fit & HiDPI / Retina DPR scaling",
      "Nearest-frame fallback ensuring zero visual freezing",
      "Live frame counter HUD (FRAME 0145 / 0593)"
    ],
    tech: ["Next.js 16", "React 19", "TypeScript", "GSAP ScrollTrigger", "HTML5 Canvas", "Lenis", "Tailwind CSS"],
    github: "https://github.com/moluom54321",
    live: "https://solis-estate.vercel.app/",
    featured: true,
    useIframe: true,
  },
  {
    id: "fameflex",
    title: "Fameflex",
    projectType: "Production Project",
    industry: "Business & Digital Services",
    category: "Business",
    serviceSlug: "small-business-website-development",
    tagline: "High-Performance Modern Web Platform",
    description: "A modern, high-performance web platform featuring premium UI/UX, integrated business services, responsive layouts, and interactive animations built for customer engagement.",
    problem: "Digital service agencies require a polished, fast-loading platform that demonstrates technical credibility and makes it effortless for prospective clients to explore services.",
    solution: "Designed and built a modular React interface with custom glassmorphism styling, clean service breakdowns, and optimized performance.",
    features: [
      "Modern dark luxury glassmorphism UI",
      "Responsive layout optimized across mobile & desktop",
      "Integrated business service presentations",
      "Optimized static asset delivery and instant interactions"
    ],
    tech: ["React", "Tailwind CSS", "Modern UI", "Vite"],
    github: "https://github.com/moluom54321",
    live: "https://live.fameflex.in/",
    featured: true,
    useIframe: true,
  },
  {
    id: "gym-website",
    title: "IronPulse Gym & Fitness",
    projectType: "Demo Project",
    industry: "Fitness & Health",
    category: "Fitness",
    serviceSlug: "gym-website-development",
    tagline: "Dynamic Fitness & Membership Web App",
    description: "A dynamic and bold fitness website featuring workout plans, membership tiers, trainer profiles, and a high-energy modern UI built for gyms looking to drive member signups.",
    problem: "Local gyms struggle with generic template websites that fail to excite prospective members or effectively explain membership tiers and personal training value.",
    solution: "Developed an energetic, high-contrast fitness web portal featuring dynamic membership pricing cards, interactive trainer rosters, class schedules, and direct inquiry lead funnels.",
    features: [
      "Tiered membership pricing comparison matrix",
      "Trainer showcase with specialties & certifications",
      "Class schedules and workout program details",
      "High-energy Framer Motion interactive animations",
      "Mobile-first inquiry capture for local fitness leads"
    ],
    tech: ["React", "Tailwind CSS", "Framer Motion", "Modern UI"],
    github: "https://github.com/moluom54321",
    live: "https://gym-web-mu-ashen.vercel.app/",
    featured: true,
    useIframe: true,
  },
  {
    id: "kenangan-coffee",
    title: "Kenangan Coffee India",
    projectType: "Concept Project",
    industry: "Restaurant & Cafe",
    category: "Restaurant / Cafe",
    serviceSlug: "restaurant-website-development",
    tagline: "Premium Coffee Brand & Menu Showcase",
    description: "A premium coffee brand website with elegant UI, dark/light theme options, signature menu showcase, mobile app download section, and smooth micro-animations.",
    problem: "Cafes and food brands often lose walk-in and online discovery when their menu is only available as an unreadable PDF or low-resolution image.",
    solution: "Created an interactive, visually rich digital brand experience with categorized specialty beverages, ingredient highlights, and direct mobile ordering prompts.",
    features: [
      "Interactive digital coffee & beverage menu showcase",
      "Dark and light theme brand aesthetics",
      "Mobile app showcase with download action triggers",
      "Location and store discovery integration",
      "Smooth Framer Motion transitions"
    ],
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Modern UI"],
    github: "https://github.com/moluom54321",
    live: "https://kangana-website-ccyv.vercel.app/",
    featured: true,
    useIframe: true,
  },
  {
    id: "music-school",
    title: "Music School of Delhi",
    projectType: "Concept Project",
    industry: "Education & Academies",
    category: "Education",
    serviceSlug: "school-website-development",
    tagline: "Academy Platform & Course Enrollment Portal",
    description: "A comprehensive platform for a music academy featuring course enrollments, instructor profiles, curriculum breakdowns, and student inquiry dashboard.",
    problem: "Educational institutes and specialized academies need a reliable way to showcase diverse courses (instruments, vocals, production) and capture admission inquiries digitally.",
    solution: "Engineered a full-stack MERN platform with course catalogs, instructor biographies, admission inquiry forms, and a responsive student-focused interface.",
    features: [
      "Comprehensive course directory with levels & instrument tracks",
      "Faculty directory highlighting musical expertise",
      "Admission inquiry and trial class booking forms",
      "Full-stack MERN architecture with MongoDB storage",
      "Fast, accessible, and parent-friendly navigation"
    ],
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1470&auto=format&fit=crop",
    tech: ["React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/moluom54321",
    live: "https://msd-app.vercel.app",
    featured: true,
  },
  {
    id: "porter-clone",
    title: "Logistics & On-Demand Booking App",
    projectType: "Demo Project",
    industry: "Logistics & Services",
    category: "Full Stack",
    serviceSlug: "web-development",
    tagline: "Modern On-Demand Logistics Web App",
    description: "A modern logistics and delivery platform web application featuring a sleek UI, vehicle selection booking flow, and responsive mobile-first design.",
    problem: "Service logistics workflows require intuitive multi-step booking interfaces that don't overwhelm users on smaller mobile screens.",
    solution: "Implemented an interactive vehicle selection and ride/delivery booking simulator with real-time state management and sleek step-by-step UX.",
    features: [
      "Vehicle category selection and fare estimation UI",
      "Multi-step pickup and drop location booking flow",
      "Responsive mobile drawer and map simulation",
      "Clean component architecture and instant client reactivity"
    ],
    tech: ["React", "Tailwind CSS", "Modern UI", "Vite"],
    github: "https://github.com/moluom54321",
    live: "https://porter-web-app.vercel.app/",
    featured: true,
    useIframe: true,
  },
];

// ─── Authentic Client Commitments & Value Propositions ────────────────
export const whyWorkWithMe = [
  {
    icon: FaCode,
    title: "Custom-Built, No Bloat",
    description: "Every website is hand-crafted with clean, modern React, Next.js, and Tailwind CSS. No slow, heavy templates or unnecessary third-party bloat."
  },
  {
    icon: FaMobileAlt,
    title: "100% Mobile-First Responsive",
    description: "Over 70% of your customers visit from mobile devices. Your website will look stunning and function seamlessly across all screen sizes."
  },
  {
    icon: FaRocket,
    title: "High Performance & Speed",
    description: "Optimized code, compressed assets, and modern bundling ensure instant page loads, reducing bounce rates and keeping visitors engaged."
  },
  {
    icon: FaSearchDollar,
    title: "Technical SEO Foundation",
    description: "Built-in semantic HTML5, clean URL structures, meta tags, OpenGraph, sitemaps, and Schema.org structured data to help search engines index your business."
  },
  {
    icon: FaShieldAlt,
    title: "Business & Conversion Focus",
    description: "Websites designed around real business outcomes: clear call-to-actions, WhatsApp integrations, intuitive menus, and inquiry lead capture."
  },
  {
    icon: FaHeadset,
    title: "Direct Communication & Support",
    description: "You work directly with me—the developer. No middleman, transparent milestone updates, and reliable post-launch technical support."
  }
];

// ─── Development Process ──────────────────────────────────────────────
export const developmentProcess = [
  {
    step: "01",
    title: "Discovery & Goals",
    description: "We discuss your business, target audience, brand aesthetic, required features, and project timeline to establish a clear project scope."
  },
  {
    step: "02",
    title: "Structure & UI Design",
    description: "I plan the website layout, content hierarchy, and modern UI components to ensure an intuitive and engaging user experience."
  },
  {
    step: "03",
    title: "Clean Code Development",
    description: "Building the website using modern React/Next.js, responsive Tailwind CSS, smooth animations, and robust backend integrations."
  },
  {
    step: "04",
    title: "Testing & SEO Optimization",
    description: "Rigorous cross-browser testing, mobile responsiveness checks, performance audits, and on-page technical SEO setup."
  },
  {
    step: "05",
    title: "Launch & Post-Launch Support",
    description: "Deploying your website to high-speed global hosting (Vercel), domain connection, search engine submission, and post-launch maintenance."
  }
];

// ─── Developer Journey & Experience ───────────────────────────────────
export const experience = [
  {
    title: "Full Stack Web Developer & Client Solutions",
    company: "Freelance & Independent Practice",
    date: "2024 - Present",
    description: "Designing and developing modern, responsive, and high-performance websites for businesses, startups, and personal brands. Specializing in the MERN stack (MongoDB, Express.js, React, Node.js), Next.js, and modern CSS frameworks. Built full-scale production web applications, scrollytelling real estate experiences (Solis Estate), business web platforms (Fameflex), education management portals (Music School of Delhi), and commercial showcases. Emphasizing clean code architecture, mobile responsiveness, fast Core Web Vitals, and technical SEO readiness.",
  },
];
