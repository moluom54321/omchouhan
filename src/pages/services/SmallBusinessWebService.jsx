import ServicePageLayout from "../../components/ServicePageLayout";
import { projects } from "../../constants";

const SmallBusinessWebService = () => {
  const relevantProjects = projects.filter(
    (p) => p.id === "fameflex" || p.id === "porter-clone"
  );

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Small Business Website Development",
        "serviceType": "Small & Local Business Web Development",
        "provider": {
          "@type": "Person",
          "name": "Om Prakash Chouhan",
          "url": "https://omchouhan.vercel.app/"
        },
        "description": "Professional website development for small businesses, consultants, and local service providers in Delhi. Build trust, establish credibility, and generate qualified customer leads.",
        "areaServed": "Delhi, India & Worldwide"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://omchouhan.vercel.app/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://omchouhan.vercel.app/services/" },
          { "@type": "ListItem", "position": 3, "name": "Small Business Website Development", "item": "https://omchouhan.vercel.app/services/small-business-website-development/" }
        ]
      }
    ]
  };

  return (
    <ServicePageLayout
      seoTitle="Small Business Website Development | Professional Business Websites"
      seoDescription="Professional, conversion-focused small business website development services in Delhi. Build customer trust, showcase services clearly, and turn searchers into paying clients."
      canonicalPath="/services/small-business-website-development"
      serviceName="Small Business Website Development"
      heroBadge="Local & Service Businesses"
      heroHeading="Small Business Website Development"
      heroSubheading="Establish immediate digital authority, build consumer trust, and turn everyday local web searches into loyal, paying clients with a custom-engineered business website."
      targetAudienceText="Local Service Providers, Consultants, Legal & Financial Advisors, Medical Clinics, Real Estate Agents, B2B Companies"
      problems={[
        "Relying solely on social media pages where competitors distract your audience and algorithms limit reach.",
        "Outdated websites that give potential clients a negative first impression of your business credibility.",
        "Losing local customers to competitors who rank higher and have cleaner, faster mobile sites.",
        "Websites full of generic buzzwords that fail to explain clearly what services you provide and what they cost.",
        "High ongoing maintenance fees from generic agencies with slow turnaround on simple updates."
      ]}
      solutions={[
        "A dedicated digital asset owned 100% by you, engineered to convert visitors into direct phone and email inquiries.",
        "Polished, modern UI/UX that positions your small business as an established, trustworthy market leader.",
        "Local SEO foundation, fast page load speeds, and structured schema to maximize regional search discovery.",
        "Crystal-clear service breakdowns, FAQs, client guarantees, and transparent process walkthroughs.",
        "Direct communication with a single developer with zero hidden agency markups or slow support queues."
      ]}
      keyFeatures={[
        {
          title: "Trust-Building Modern UI",
          description: "Clean typography, balanced color palettes, and professional aesthetic that inspires immediate customer confidence."
        },
        {
          title: "Service Breakdown & Offerings",
          description: "Structured pages detailing exactly what services you offer, who they are for, and how your process works."
        },
        {
          title: "One-Click WhatsApp & Phone CTAs",
          description: "Frictionless direct contact buttons so mobile users can call or WhatsApp your team with a single tap."
        },
        {
          title: "Lead Generation Inquiry Forms",
          description: "Customized contact forms that collect essential client project details directly to your email inbox."
        },
        {
          title: "Local Delhi & Regional SEO",
          description: "On-page metadata, local schema markup, and Google Business Profile integration for maximum local search visibility."
        },
        {
          title: "Zero Monthly Template Bloat",
          description: "Clean custom code running on high-speed global cloud hosting with no expensive recurring plugin subscriptions."
        }
      ]}
      relevantProjects={relevantProjects}
      faqs={[
        {
          question: "Why does my small business need a custom website instead of just an Instagram or Facebook page?",
          answer: "Social media platforms don't rank for commercial Google search intent (like 'commercial web developer in Delhi' or 'legal advisor near me'). A dedicated website provides full ownership, ranks on Google, displays your comprehensive service portfolio, and builds significantly greater corporate trust."
        },
        {
          question: "How much does a small business website cost?",
          answer: "Pricing is transparent and customized based on the number of pages, custom features, and timeline. I provide fixed-price quotes with zero surprise fees."
        },
        {
          question: "Will you help me connect my domain name (.com / .in)?",
          answer: "Yes, I handle the complete domain configuration, DNS setup, SSL certificate installation, and cloud deployment on Vercel."
        },
        {
          question: "Can I add more pages or services later as my business expands?",
          answer: "Yes. The website architecture is modular and scalable, allowing new service pages, blogs, and team members to be added effortlessly in the future."
        }
      ]}
      schema={schema}
    />
  );
};

export default SmallBusinessWebService;
