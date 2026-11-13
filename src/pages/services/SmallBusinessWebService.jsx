import ServicePageLayout from "../../components/ServicePageLayout";
import { projects } from "../../constants";
import { getSeoRoute } from "../../constants/seo";

const SmallBusinessWebService = () => {
  const pageSeo = getSeoRoute("services/small-business-website-development");
  const relevantProjects = projects.filter(
    (p) => p.id === "fameflex" || p.id === "porter-clone"
  );

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
                "@id": "https://omchouhan.vercel.app/services/small-business-website-development/#service",
        "name": "Small Business Website Development",
        "serviceType": "Small Business Website Development",
        "provider": { "@id": "https://omchouhan.vercel.app/#person" },
        "description": "Professional small business website development in Delhi. Turn local searchers into clients with fast, clean, and conversion-focused business websites.",
        "areaServed": "Delhi NCR, India"
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
      seoTitle={pageSeo.title}
      seoDescription={pageSeo.description}
      canonicalPath={pageSeo.canonicalPath}
      serviceName="Small Business Website Development"
      heroBadge="Local & Service Businesses"
      heroHeading="Website Development for Small Businesses"
      heroSubheading="Establish immediate digital authority, build consumer trust, and turn everyday local web searches into loyal, paying clients with a custom-engineered business website."
      targetAudienceText="Local Service Providers, Consultants, Legal & Financial Advisors, Medical Clinics, Real Estate Agents, B2B Companies"
      
      serviceOverview="For a local business in Delhi NCR, the website should make its offering, service area and next step clear. We can organise individual service pages, work examples, customer questions, contact details and enquiry forms around the decisions a prospective customer needs to make."
      problems={[
        "Relying solely on social media pages where competitors distract your audience and algorithms limit reach.",
        "Outdated websites that give potential clients a negative first impression of your business credibility.",
        "Losing local customers to competitors who rank higher and have cleaner, faster mobile sites.",
        "Websites full of generic buzzwords that fail to explain clearly what services you provide and what they cost.",
        "High ongoing maintenance fees from generic agencies with slow turnaround on simple updates."
      ]}
      solutions={[
        "A business website that you can manage as your own digital channel, with clear paths for visitors to call, email or send an enquiry.",
        "Polished, modern UI/UX that positions your small business as an established, trustworthy market leader.",
        "Local SEO foundation, fast page load speeds, and structured schema to maximize regional search discovery.",
        "Clear service breakdowns, useful FAQs, project scope and a transparent explanation of the working process.",
        "Direct communication with a single developer with direct communication and a clearly agreed project scope."
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
          title: "Lean Custom Website Architecture",
          description: "Clean custom code running on high-speed global cloud hosting with no expensive recurring plugin subscriptions."
        }
      ]}
      relevantProjects={relevantProjects}
      faqs={[
        {
          question: "Why does my small business need a custom website instead of just an Instagram or Facebook page?",
          answer: "Social media profiles can help people discover a business, but they do not replace the structure and control of a dedicated website. A website gives you space to explain services, publish useful information, show work examples and provide clear contact options. Search visibility depends on relevance, content quality, competition and technical accessibility; rankings are not guaranteed."
        },
        {
          question: "How much does a small business website cost?",
          answer: "Pricing depends on the number of pages, required features and timeline. I outline the agreed scope and provide a project quote before development begins."
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
