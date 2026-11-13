import ServicePageLayout from "../../components/ServicePageLayout";
import { projects } from "../../constants";
import { getSeoRoute } from "../../constants/seo";

const WebDevelopmentService = () => {
  const pageSeo = getSeoRoute("services/web-development");
  const relevantProjects = projects.filter(
    (p) => p.id === "solis-estate" || p.id === "porter-clone" || p.id === "fameflex"
  );

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
                "@id": "https://omchouhan.vercel.app/services/web-development/#service",
        "name": "Custom Web Development Services",
        "serviceType": "Custom Web Development Services",
        "provider": { "@id": "https://omchouhan.vercel.app/#person" },
        "description": "Custom web development services for businesses. Fast, responsive, and scalable websites and web applications built with modern React and clean architecture.",
        "areaServed": "Delhi NCR, India"
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
      seoTitle={pageSeo.title}
      seoDescription={pageSeo.description}
      canonicalPath={pageSeo.canonicalPath}
      serviceName="Web Development"
      heroBadge="Core Engineering Service"
      heroHeading="Custom Web Development for Your Business"
      heroSubheading="Custom-engineered websites and scalable web applications built from scratch to match your specific business requirements, workflows, and growth targets."
      targetAudienceText="Startups, Established Businesses, Tech Founders, Digital Agencies"
      
      serviceOverview="A web development project for a Delhi NCR business should start with the task the website or application needs to perform. I work with you to define key user journeys, page structure, integrations and content before choosing the frontend and backend approach. The scope can range from a focused marketing website to a data-driven application with accounts, dashboards or custom workflows."
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
          description: "Modern frontend architecture using React, Vite and JavaScript for responsive client-side interactions."
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
          answer: "I specialize in custom code using React, Next.js, Tailwind CSS, and Node.js. Custom-coded websites offer control over the interface and codebase. Performance and security still depend on implementation, hosting, updates and ongoing maintenance; the right platform depends on your project requirements."
        },
        {
          question: "How long does it take to develop a custom website?",
          answer: "A typical business website takes 2 to 4 weeks from discovery to final deployment, depending on the complexity of features, custom animations, and content readiness."
        },
        {
          question: "Will my website be mobile-friendly and fast?",
          answer: "Every website is developed with a mobile-first philosophy, optimized image assets, and clean code to check responsive behaviour and review performance using tools such as Google PageSpeed Insights. Actual scores depend on page content, hosting, devices and third-party services."
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
