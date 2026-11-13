import ServicePageLayout from "../../components/ServicePageLayout";
import { projects } from "../../constants";
import { getSeoRoute } from "../../constants/seo";

const EcommerceWebService = () => {
  const pageSeo = getSeoRoute("services/ecommerce-website-development");
  const relevantProjects = projects.filter(
    (p) => p.id === "kenangan-coffee" || p.id === "fameflex"
  );

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
                "@id": "https://omchouhan.vercel.app/services/ecommerce-website-development/#service",
        "name": "Ecommerce Website Development",
        "serviceType": "Ecommerce Website Development & Online Stores",
        "provider": { "@id": "https://omchouhan.vercel.app/#person" },
        "description": "Custom ecommerce website development services. Fast-loading online stores, clean product catalogs, WhatsApp ordering, and mobile-first checkout flows.",
        "areaServed": "Delhi NCR, India"
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
      seoTitle={pageSeo.title}
      seoDescription={pageSeo.description}
      canonicalPath={pageSeo.canonicalPath}
      serviceName="Ecommerce Website Development"
      heroBadge="Online Retail & Direct-to-Consumer"
      heroHeading="Ecommerce Website Development for Your Online Store"
      heroSubheading="Mobile-friendly online stores planned around your catalogue, product details, cart flow and customer support needs. The final scope is shaped by your products, fulfilment process and chosen payment setup."
      targetAudienceText="Direct-to-Consumer (D2C) Brands, Boutique Retailers, Specialty Product Creators, Wholesalers"
      
      serviceOverview="For a brand or retailer in Delhi NCR, an online store needs more than a product grid. The project scope should account for product categories, variants, product information, cart behaviour, delivery and return information, and the payment or assisted-order flow that fits the business. These details are planned before implementation so shoppers understand each step."
      problems={[
        "Slow-loading e-commerce templates that cause frustrated mobile shoppers to bounce before checkout.",
        "Complicated, multi-step checkout processes that lead to high cart abandonment rates.",
        "Generic store layouts that don't differentiate your product quality from mass-market competitors.",
        "Heavy platform transaction fees and unpredictable monthly plugin subscription costs.",
        "Lack of direct customer communication options like WhatsApp order confirmation and inquiries."
      ]}
      solutions={[
        "Responsive product catalogues with clear categories, filters and product information, with performance considered during implementation.",
        "Frictionless, one-page checkout and direct WhatsApp ordering options tailored for Indian and global buyers.",
        "High-end custom visual design with product feature breakdowns, customer reviews, and high-res imagery.",
        "Clean, custom code with zero unnecessary recurring third-party plugin fees.",
        "Direct integration with WhatsApp and email notifications for seamless order fulfillment and communication."
      ]}
      keyFeatures={[
        {
          title: "Structured Product Catalogs",
          description: "Clear category organisation, variant selectors (size, colour, weight), search and product filters."
        },
        {
          title: "Frictionless Cart & Checkout",
          description: "Quick slide-out cart drawer, transparent price calculation, and streamlined shipping address inputs."
        },
        {
          title: "Direct WhatsApp Order Checkout",
          description: "Allow shoppers to share their selected items and order details through a WhatsApp message, when this ordering flow suits the store."
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
          answer: "Yes! WhatsApp ordering can be useful when customers prefer to confirm product details or delivery before paying. Whether it is suitable depends on the products and order process. Customers can review their selected items and send an order enquiry through a pre-filled WhatsApp message, if that flow is included in the project."
        },
        {
          question: "How fast will the online store load?",
          answer: "Because we build with modern React and optimized images instead of heavy Shopify/WooCommerce theme stacks, loading performance depends on the final content, integrations, hosting and third-party scripts. I test the built pages and address avoidable bottlenecks before launch."
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
