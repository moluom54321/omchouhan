import ServicePageLayout from "../../components/ServicePageLayout";
import { projects } from "../../constants";

const GymWebService = () => {
  const relevantProjects = projects.filter(
    (p) => p.id === "gym-website"
  );

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Gym Website Development",
        "serviceType": "Gym & Fitness Web Development",
        "provider": {
          "@type": "Person",
          "name": "Om Prakash Chouhan",
          "url": "https://omchouhan.vercel.app/"
        },
        "description": "Professional gym, fitness club, and personal trainer website development in Delhi. High-converting membership pricing cards, trainer profiles, class schedules, and lead funnels.",
        "areaServed": "Delhi, India & Worldwide"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://omchouhan.vercel.app/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://omchouhan.vercel.app/services/" },
          { "@type": "ListItem", "position": 3, "name": "Gym Website Development", "item": "https://omchouhan.vercel.app/services/gym-website-development/" }
        ]
      }
    ]
  };

  return (
    <ServicePageLayout
      seoTitle="Gym Website Development in Delhi | Om Chouhan"
      seoDescription="High-energy gym and fitness website development services. Showcase membership tiers, trainer profiles, workout programs, class schedules, and capture trial session leads."
      canonicalPath="/services/gym-website-development"
      serviceName="Gym Website Development"
      heroBadge="Fitness & Wellness"
      heroHeading="Gym & Fitness Website Development"
      heroSubheading="Dynamic, high-energy websites for gyms, CrossFit boxes, yoga studios, and personal trainers built to convert local fitness enthusiasts into active paying members."
      targetAudienceText="Gyms, Fitness Centers, CrossFit Boxes, Yoga & Pilates Studios, Personal Trainers"
      problems={[
        "Prospective members leaving the site because membership pricing and plan differences are confusing.",
        "No simple way for visitors to book a free trial workout or contact the front desk on WhatsApp.",
        "Trainer qualifications, client transformations, and equipment quality not clearly showcased.",
        "Static, dull website design that fails to communicate the energetic vibe and community of your gym.",
        "Missing local SEO optimization, causing competitors to rank higher in local gym searches."
      ]}
      solutions={[
        "Clear, high-contrast membership comparison tables (Monthly, Quarterly, Annual) with transparent benefits.",
        "Prominent 'Book a Free Trial' and instant WhatsApp inquiry capture buttons on every key section.",
        "Trainer showcase profiles with certifications, specialties (Weight Loss, Muscle Gain, Rehab), and social proof.",
        "Bold, dark-themed fitness aesthetic with motivational imagery, facility tour photos, and video embeds.",
        "Local Delhi search optimization helping nearby fitness seekers find your gym address and timing instantly."
      ]}
      keyFeatures={[
        {
          title: "Membership Pricing Comparison",
          description: "Clear tier comparison highlighting popular plans, discounts, personal training inclusions, and perks."
        },
        {
          title: "Free Trial & Lead Capture Funnels",
          description: "High-converting forms designed to capture visitor name, phone number, and preferred workout time."
        },
        {
          title: "Class Schedules & Timetables",
          description: "Interactive weekly timetable for Zumba, Yoga, HIIT, Spinning, and strength training batches."
        },
        {
          title: "Certified Trainer Profiles",
          description: "Highlight your coaching staff, their industry certifications, experience, and training philosophies."
        },
        {
          title: "Facility & Equipment Showcase",
          description: "Visual tour of your cardio zone, free weights, crossfit rig, sauna, and locker room amenities."
        },
        {
          title: "Local Fitness SEO",
          description: "Google Business Profile linking, location Schema markup, and mobile-first speed optimization."
        }
      ]}
      relevantProjects={relevantProjects}
      faqs={[
        {
          question: "Can prospective members book a free day pass or trial class?",
          answer: "Yes. I implement a dedicated Free Trial booking form that collects member details and notifies you immediately via email and WhatsApp so your sales team can follow up instantly."
        },
        {
          question: "Can we display different plans for general gym vs personal training?",
          answer: "Yes, we can create separate tabbed sections for general membership packages, personal training sessions, student discounts, and couple/group packages."
        },
        {
          question: "Is the website easy to update with new class timings or holiday notices?",
          answer: "Yes. The class schedule and announcement banners are built with clean, modular components that can be updated rapidly without breaking any layout."
        },
        {
          question: "Can we embed Instagram reels and workout videos?",
          answer: "Yes, we can embed high-energy workout videos, member transformation clips, or link directly to your gym's official Instagram feed."
        }
      ]}
      schema={schema}
    />
  );
};

export default GymWebService;
