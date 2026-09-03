import ServicePageLayout from "../../components/ServicePageLayout";
import { projects } from "../../constants";

const EcommerceWebService = () => {
  const relevantProjects = projects.filter(
    (p) => p.id === "kenangan-coffee" || p.id === "fameflex"
  );

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Ecommerce Website Development",
        "serviceType": "Online Store & Ecommerce Development",
        "provider": {
          "@type": "Person",
          "name": "Om Prakash Chouhan",
          "url": "https://omchouhan.vercel.app/"
        },
        "description": "Professional ecommerce website development services. Custom product catalogs, frictionless shopping cart, WhatsApp checkout, fast mobile performance, and secure payments.",
        "areaServed": "Delhi, India & Worldwide"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://omchouhan.vercel.app/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://omchouhan.vercel.app/services/" },
          { "@type": "ListItem", "position": 3, "name": "Ecommerce Website Development", "item": "https://omchouhan.vercel.app/services/ecommerce-website-development/" }
        ]
      }
    ]
  };

  return (
    <ServicePageLayout
      seoTitle="Ecommerce Website Development | Online Store Development"
      seoDescription="Custom ecommerce website development services. Fast-loading online stores, clean product catalogs, shopping carts, WhatsApp ordering, and mobile-first checkout flows."
      canonicalPath="/services/ecommerce-website-development"
      serviceName="Ecommerce Website Development"
      heroBadge="Online Retail & Direct-to-Consumer"
      heroHeading="Ecommerce Website Development"
      heroSubheading="Fast, secure, and conversion-optimized online stores designed to showcase your products beautifully, eliminate cart abandonment, and drive repeat customer purchases."
      targetAudienceText="Direct-to-Consumer (D2C) Brands, Boutique Retailers, Specialty Product Creators, Wholesalers"
      problems={[
        "Slow-loading e-commerce templates that cause frustrated mobile shoppers to bounce before checkout.",
        "Complicated, multi-step checkout processes that lead to high cart abandonment rates.",
        "Generic store layouts that don't differentiate your product quality from mass-market competitors.",
        "Heavy platform transaction fees and unpredictable monthly plugin subscription costs.",
        "Lack of direct customer communication options like WhatsApp order confirmation and inquiries."
      ]}
      solutions={[
        "Blazing-fast product catalogs powered by modern React architecture with zero lag filtering.",
        "Frictionless, one-page checkout and direct WhatsApp ordering options tailored for Indian and global buyers.",
        "High-end custom visual design with product feature breakdowns, customer reviews, and high-res imagery.",
        "Clean, custom code with zero unnecessary recurring third-party plugin fees.",
        "Direct integration with WhatsApp and email notifications for seamless order fulfillment and communication."
      ]}
      keyFeatures={[
        {
          title: "Structured Product Catalogs",
          description: "Clean category organization, variant selectors (size, color, weight), search bar, and instant filter tags."
        },
        {
          title: "Frictionless Cart & Checkout",
          description: "Quick slide-out cart drawer, transparent price calculation, and streamlined shipping address inputs."
        },
        {
          title: "Direct WhatsApp Order Checkout",
          description: "Allow shoppers to submit their cart directly via WhatsApp with auto-calculated totals for instant personal service."
        },
        {
          title: "Mobile-First Shopping Experience",
          description: "Sticky 'Buy Now' buttons, touch-friendly product image carousels, and responsive typography."
        },
        {
          title: "SEO-Optimized Product Pages",
          description: "Schema.org Product markup, breadcrumb navigation, and meta tags to help search engines index your items."
        },
        {
          title: "Payment Gateway Readiness",
          description: "Architecture structured for clean integration with major payment providers (Razorpay, Stripe, UPI)."
        }
      ]}
      relevantProjects={relevantProjects}
      faqs={[
        {
          question: "Can customers order via WhatsApp instead of entering credit cards?",
          answer: "Yes! For many boutique Indian brands and D2C startups, WhatsApp ordering has a much higher conversion rate. Customers add items to their cart, click 'Order on WhatsApp', and send a structured order message directly to you."
        },
        {
          question: "How fast will the online store load?",
          answer: "Because we build with modern React and optimized images instead of heavy Shopify/WooCommerce theme stacks, pages load almost instantly (<1 second), significantly boosting conversion rates."
        },
        {
          question: "Can I manage inventory and add new products easily?",
          answer: "Yes. Product data is organized in structured data schemas or connected to a headless CMS / database so adding new items, prices, and stock statuses is straightforward."
        },
        {
          question: "Is the store secure for customer transactions?",
          answer: "Yes. All pages are served over end-to-end HTTPS SSL encryption and use standard secure RESTful architectures."
        }
      ]}
      schema={schema}
    />
  );
};

export default EcommerceWebService;
