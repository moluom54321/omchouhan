import ServicePageLayout from "../../components/ServicePageLayout";
import { projects } from "../../constants";
import { getSeoRoute } from "../../constants/seo";

const RestaurantWebService = () => {
  const pageSeo = getSeoRoute("services/restaurant-website-development");
  const relevantProjects = projects.filter(
    (p) => p.id === "kenangan-coffee"
  );

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
                "@id": "https://omchouhan.vercel.app/services/restaurant-website-development/#service",
        "name": "Restaurant Website Development in Delhi",
        "serviceType": "Restaurant Website Design and Development",
        "provider": { "@id": "https://omchouhan.vercel.app/#person" },
        "description": "Professional restaurant website design and development services in Delhi. Featuring interactive digital menus, WhatsApp food ordering, Google Maps, and table reservations.",
        "areaServed": "Delhi NCR, India"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://omchouhan.vercel.app/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://omchouhan.vercel.app/services/" },
          { "@type": "ListItem", "position": 3, "name": "Restaurant Website Development", "item": "https://omchouhan.vercel.app/services/restaurant-website-development/" }
        ]
      }
    ]
  };

  return (
    <ServicePageLayout
      seoTitle={pageSeo.title}
      seoDescription={pageSeo.description}
      canonicalPath={pageSeo.canonicalPath}
      serviceName="Restaurant Website Development"
      heroBadge="Hospitality & Food Brands"
      heroHeading="Restaurant Website Design and Development"
      heroSubheading="Captivating, mouth-watering websites designed for restaurants, cafes, cloud kitchens, and dining brands to showcase signature menus, drive table reservations, and capture direct customer inquiries."
      targetAudienceText="Fine Dining Restaurants, Cafes, Bakeries, Cloud Kitchens, Bistros, Lounge Bars"
      
      serviceOverview="For a restaurant or cafe in Delhi NCR, the website should help guests quickly find the menu, location, opening hours and contact options. The page structure can bring menus, food photography, branch details, map links, reservation requests and WhatsApp contact together in a mobile-friendly experience."
      problems={[
        "Menus uploaded as unreadable PDF files or blurry photo images that frustrate smartphone users.",
        "High commission fees from 3rd-party delivery aggregators eating away your profits.",
        "Customers unable to easily find your exact location, operating hours, or contact number on mobile search.",
        "Outdated or nonexistent website failing to reflect the premium ambiance and quality of your food.",
        "Zero direct table booking or WhatsApp inquiry channels for large party reservations."
      ]}
      solutions={[
        "Beautiful, responsive digital menus categorized by cuisines with clear pricing and dietary tags.",
        "Direct WhatsApp ordering integration allowing customers to order directly with 0% third-party commission.",
        "Embedded interactive Google Maps with one-tap navigation directions and clear opening hours.",
        "Appetizing visual gallery showcasing signature dishes, chef specials, and dining ambiance.",
        "Table reservation enquiry forms that can notify the configured restaurant contact."
      ]}
      keyFeatures={[
        {
          title: "Interactive Digital Menu",
          description: "Clean categorization (Starters, Main Course, Desserts, Beverages) with high-res food imagery, ingredients, and prices."
        },
        {
          title: "Direct WhatsApp Ordering",
          description: "Customers can pick items and send a pre-formatted order directly to your WhatsApp business line."
        },
        {
          title: "Table Reservation System",
          description: "Simple online booking form capturing guest count, date, time slot, and special dining requests."
        },
        {
          title: "Google Maps & Location Discovery",
          description: "One-click 'Get Directions' integration making it effortless for hungry local diners to find your doorstep."
        },
        {
          title: "Mouth-Watering Visual Showcase",
          description: "Fast-loading food galleries and aesthetic ambient photos that turn casual website visitors into dining guests."
        },
        {
          title: "Local Restaurant SEO",
          description: "Structured Schema.org Restaurant markup, local Delhi discovery optimization, and social media sharing cards."
        }
      ]}
      relevantProjects={relevantProjects}
      faqs={[
        {
          question: "Can I easily update menu prices and items later?",
          answer: "Yes. I organize menu data cleanly so prices, new seasonal dishes, and sold-out tags can be updated quickly and effortlessly."
        },
        {
          question: "How does the WhatsApp ordering feature work?",
          answer: "When a customer selects their desired dishes or enters an inquiry on the website, clicking 'Order via WhatsApp' opens their WhatsApp with a structured, itemized message ready to send directly to your restaurant's official number."
        },
        {
          question: "Will the menu look good on mobile phones?",
          answer: "Yes. The menu can use a responsive layout with readable text, clear categories and tap-friendly navigation so guests can browse it on a phone without needing to zoom."
        },
        {
          question: "Can you include our Zomato, Swiggy, and Instagram links?",
          answer: "Yes, we can prominently integrate your social media links, delivery aggregator badges, and customer review links alongside your direct booking channels."
        }
      ]}
      schema={schema}
    />
  );
};

export default RestaurantWebService;
