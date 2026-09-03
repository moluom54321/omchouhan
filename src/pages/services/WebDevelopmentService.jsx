import ServicePageLayout from "../../components/ServicePageLayout";
import { projects } from "../../constants";

const WebDevelopmentService = () => {
  const relevantProjects = projects.filter(
    (p) => p.id === "solis-estate" || p.id === "porter-clone" || p.id === "fameflex"
  );

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Web Development Services",
        "serviceType": "Custom Web Development",
        "provider": {
          "@type": "Person",
          "name": "Om Prakash Chouhan",
          "url": "https://omchouhan.vercel.app/"
        },
        "description": "Professional custom web development services in Delhi, building fast, responsive, and high-converting websites and React/Next.js web applications.",
        "areaServed": "Delhi, India & Worldwide"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://omchouhan.vercel.app/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://omchouhan.vercel.app/services/" },
          { "@type": "ListItem", "position": 3, "name": "Web Development", "item": "https://omchouhan.vercel.app/services/web-development/" }
        ]
      }
    ]
  };

  return (
    <ServicePageLayout
      seoTitle="Web Development Services | Full Stack Web Developer"
      seoDescription="Professional custom web development services in Delhi. Fast, responsive, and scalable websites and web applications built with modern React, Next.js, and MERN stack."
      canonicalPath="/services/web-development"
      serviceName="Web Development"
      heroBadge="Core Engineering Service"
      heroHeading="Web Development Services"
      heroSubheading="Custom-engineered websites and scalable web applications built from scratch to match your specific business requirements, workflows, and growth targets."
      targetAudienceText="Startups, Established Businesses, Tech Founders, Digital Agencies"
      problems={[
        "Slow, bloated website templates that take 5+ seconds to load and lose potential customers.",
        "Generic designs that look identical to competitors and fail to build brand authority.",
        "Websites that break or look disjointed on modern smartphones and tablets.",
        "Spaghetti code that is difficult to maintain, upgrade, or add new business features to.",
        "Poor technical foundation with zero SEO readiness or Schema markup."
      ]}
      solutions={[
        "Hand-crafted React web applications with zero bloated theme dependencies.",
        "Custom, tailor-made UI/UX designed specifically around your brand identity and conversion goals.",
        "Fluid, mobile-first responsive design tested across real mobile and desktop viewports.",
        "Clean, modular, and maintainable component architecture following modern engineering best practices.",
        "Built-in technical SEO, structured data, fast Core Web Vitals, and secure RESTful backend APIs."
      ]}
      keyFeatures={[
        {
          title: "Custom React & Modern Web Architecture",
          description: "High-performance frontend architecture utilizing React 19, Vite, and modern JavaScript for instant client interactions."
        },
        {
          title: "Mobile-First Responsive Engineering",
          description: "Pixel-perfect layout execution tailored for touch interactions, dynamic viewport heights (100dvh), and high-DPI screens."
        },
        {
          title: "Full-Stack Node.js & MongoDB",
          description: "Secure server-side logic, custom REST APIs, database design, and authentication workflows when your app needs dynamic data."
        },
        {
          title: "Interactive Animations & Micro-UX",
          description: "Subtle, butter-smooth Framer Motion and GSAP animations that guide user attention without hurting device performance."
        },
        {
          title: "Technical SEO & Schema Markup",
          description: "Semantic HTML5 structure, clean URL routing, OpenGraph social cards, and JSON-LD schema to assist search engines."
        },
        {
          title: "Global Vercel Cloud Deployment",
          description: "Fast, reliable deployment on Vercel's global edge network with SSL certificates and automatic build workflows."
        }
      ]}
      relevantProjects={relevantProjects}
      faqs={[
        {
          question: "Do you use WordPress or custom code?",
          answer: "I specialize in custom code using React, Next.js, Tailwind CSS, and Node.js. Custom-coded websites are significantly faster, more secure, and offer complete design freedom without being constrained by heavy WordPress plugins or vulnerabilities."
        },
        {
          question: "How long does it take to develop a custom website?",
          answer: "A typical business website takes 2 to 4 weeks from discovery to final deployment, depending on the complexity of features, custom animations, and content readiness."
        },
        {
          question: "Will my website be mobile-friendly and fast?",
          answer: "Yes, 100%. Every website is developed with a mobile-first philosophy, optimized image assets, and clean code to ensure top scores on Google PageSpeed Insights and smooth performance on all devices."
        },
        {
          question: "Do you provide post-launch support and revisions?",
          answer: "Yes. I provide dedicated post-launch support to assist with deployment, domain setup, minor tweaks, and ongoing maintenance."
        }
      ]}
      schema={schema}
    />
  );
};

export default WebDevelopmentService;
