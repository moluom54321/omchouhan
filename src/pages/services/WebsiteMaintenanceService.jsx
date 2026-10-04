import ServicePageLayout from "../../components/ServicePageLayout";
import { projects } from "../../constants";

const WebsiteMaintenanceService = () => {
  const relevantProjects = projects.filter(
    (p) => p.id === "fameflex" || p.id === "solis-estate"
  );

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Website Maintenance & Support Services",
        "serviceType": "Website Maintenance & Technical Support",
        "provider": {
          "@type": "Person",
          "name": "Om Prakash Chouhan",
          "url": "https://omchouhan.vercel.app/"
        },
        "description": "Professional website maintenance, speed optimization, regular content updates, security updates, and bug fixes for businesses in Delhi and worldwide.",
        "areaServed": "Delhi, India & Worldwide"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://omchouhan.vercel.app/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://omchouhan.vercel.app/services/" },
          { "@type": "ListItem", "position": 3, "name": "Website Maintenance", "item": "https://omchouhan.vercel.app/services/website-maintenance/" }
        ]
      }
    ]
  };

  return (
    <ServicePageLayout
      seoTitle="Website Maintenance Services | Website Support & Updates"
      seoDescription="Professional website maintenance and support services. Regular content updates, bug fixing, page speed optimization, security monitoring, and priority technical assistance."
      canonicalPath="/services/website-maintenance"
      serviceName="Website Maintenance & Support"
      heroBadge="Ongoing Technical Care"
      heroHeading="Website Maintenance & Support Services"
      heroSubheading="Keep your website fast, secure, up-to-date, and glitch-free with reliable ongoing technical maintenance, content updates, and direct developer support."
      targetAudienceText="Business Owners, Agencies, E-commerce Stores, Restaurants, Educational Institutes"
      problems={[
        "Broken layouts, outdated pricing, or expired promotional banners hurting customer trust.",
        "Websites slowing down over time, failing Google Core Web Vitals, and losing SEO positions.",
        "Unresolved contact form errors causing valuable customer inquiries to be lost silently.",
        "Agencies charging exorbitant monthly retainers while taking weeks to make simple text updates.",
        "Security vulnerabilities, expired SSL certificates, and broken external API integrations."
      ]}
      solutions={[
        "Prompt, on-demand content and image updates handled directly by an experienced developer.",
        "Routine speed audits, asset optimization, and Core Web Vitals maintenance for peak performance.",
        "Active form verification and email deliverability checks ensuring you never miss a lead.",
        "Transparent, flexible maintenance support with zero hidden contract traps or slow ticketing queues.",
        "Regular dependency updates, HTTPS SSL monitoring, and technical troubleshooting."
      ]}
      keyFeatures={[
        {
          title: "Regular Content & Price Updates",
          description: "Update product catalogs, service descriptions, menu items, phone numbers, and banners on schedule."
        },
        {
          title: "Bug Fixes & Error Diagnostics",
          description: "Identify and resolve layout misalignments, broken buttons, console errors, and script conflicts."
        },
        {
          title: "Speed & Performance Optimization",
          description: "Continual compression of media assets, script minification, and caching checks to maintain <1s load times."
        },
        {
          title: "Lead Form & Inquiry Testing",
          description: "Regular testing of contact forms, WhatsApp links, and checkout flows to guarantee zero lead loss."
        },
        {
          title: "SEO Health & Link Checks",
          description: "Audit broken 404 links, check canonical tags, and maintain up-to-date XML sitemaps for search engines."
        },
        {
          title: "Priority Developer Support",
          description: "Direct WhatsApp and email channel with fast response times when you need urgent website changes."
        }
      ]}
      relevantProjects={relevantProjects}
      faqs={[
        {
          question: "Can you maintain a website that someone else built?",
          answer: "Yes, in most cases. I can inspect your existing codebase (React, Next.js, HTML/CSS/JavaScript, Node.js) and help optimize, fix bugs, or perform ongoing updates."
        },
        {
          question: "How fast do you implement requested updates?",
          answer: "Most routine text, image, price, and banner updates are completed within 24 to 48 hours. Urgent bug fixes are prioritized immediately."
        },
        {
          question: "Do you offer one-off fixes or monthly maintenance?",
          answer: "Both! You can hire me for one-time troubleshooting/speed optimization or choose an ongoing monthly support plan depending on your business frequency."
        },
        {
          question: "How do I request updates?",
          answer: "Simply send a direct message on WhatsApp or email with your desired changes, and I will handle implementation and testing directly."
        }
      ]}
      schema={schema}
    />
  );
};

export default WebsiteMaintenanceService;
