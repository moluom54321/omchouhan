import ServicePageLayout from "../../components/ServicePageLayout";
import { projects } from "../../constants";

const SchoolWebService = () => {
  const relevantProjects = projects.filter(
    (p) => p.id === "music-school"
  );

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "School & Institute Website Development",
        "serviceType": "Education & Academic Web Development",
        "provider": {
          "@type": "Person",
          "name": "Om Prakash Chouhan",
          "url": "https://omchouhan.vercel.app/"
        },
        "description": "Professional school, coaching institute, and academy website development in Delhi. Showcase curriculums, faculty, fee structures, and manage online admission inquiries.",
        "areaServed": "Delhi, India & Worldwide"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://omchouhan.vercel.app/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://omchouhan.vercel.app/services/" },
          { "@type": "ListItem", "position": 3, "name": "School Website Development", "item": "https://omchouhan.vercel.app/services/school-website-development/" }
        ]
      }
    ]
  };

  return (
    <ServicePageLayout
      seoTitle="School Website Development | Websites for Schools & Institutes"
      seoDescription="Professional school and coaching institute website development services in Delhi. Showcase academic courses, faculty credentials, notice boards, and capture online admission inquiries."
      canonicalPath="/services/school-website-development"
      serviceName="School & Institute Website Development"
      heroBadge="Education & Academies"
      heroHeading="School & Institute Website Development"
      heroSubheading="Informative, structured, and accessible websites for schools, coaching institutes, colleges, and music/art academies designed to build parent trust and streamline admission inquiries."
      targetAudienceText="Schools, Coaching Institutes, Music & Performing Arts Academies, Skill Centers, Tutors, Training Centers"
      problems={[
        "Parents struggling to find clear admission criteria, course curriculums, fee structures, or school timings.",
        "Outdated notice boards and announcements that require manual phone calls and front-desk congestion.",
        "No simple digital form for prospective students or parents to book an orientation or campus visit.",
        "Websites that are cluttered, hard to navigate on mobile, and inaccessible for non-technical visitors.",
        "Inability to highlight faculty achievements, student accomplishments, and facility infrastructure."
      ]}
      solutions={[
        "Clean, intuitive course directories categorized by age, grade, skill level, and academic stream.",
        "Prominent admission inquiry lead capture forms sending instant notifications to your admissions office.",
        "Digital notice board and upcoming event calendar for term schedules, holidays, and workshops.",
        "Accessible, high-contrast UI designed for effortless navigation by parents, students, and educators on all devices.",
        "Faculty showcase highlighting educational credentials, experience, and student success stories."
      ]}
      keyFeatures={[
        {
          title: "Comprehensive Course Directory",
          description: "Detailed course pages with syllabus overviews, duration, batches, age groups, and learning outcomes."
        },
        {
          title: "Online Admission & Inquiry Forms",
          description: "Streamlined forms capturing student details, grade selection, parent contact info, and preferred batch timing."
        },
        {
          title: "Faculty & Mentor Profiles",
          description: "Spotlight your teaching staff, academic background, musical/artistic achievements, and teaching experience."
        },
        {
          title: "Notices & Event Announcements",
          description: "Dedicated digital notice board for important examination dates, holiday circulars, and campus events."
        },
        {
          title: "Campus & Infrastructure Gallery",
          description: "High-resolution photo tours of your classrooms, science labs, music studios, library, and sports grounds."
        },
        {
          title: "Parent & Student Friendly UI",
          description: "Intuitive menus, fast page load speeds, and clean typography tested for readability across all screen sizes."
        }
      ]}
      relevantProjects={relevantProjects}
      faqs={[
        {
          question: "Can parents apply for admission or book a campus tour online?",
          answer: "Yes. I implement an online admission inquiry form that captures all necessary student information and sends it straight to your administrative email and WhatsApp."
        },
        {
          question: "Can we post regular circulars, notices, and exam schedules?",
          answer: "Yes. The notice board and announcement sections are designed to be easily updated with new circulars, downloadable PDFs, and event dates."
        },
        {
          question: "Is the website easy to use on parents' mobile phones?",
          answer: "Yes, 100%. The layout is fully responsive with clear phone call buttons, WhatsApp chat links, and simple dropdown menus that work smoothly on every smartphone."
        },
        {
          question: "Can you build portals for specialized academies like music or dance schools?",
          answer: "Absolutely! I have built dedicated platforms like the Music School of Delhi featuring instrument tracks, vocal courses, instructor bios, and student dashboard integration."
        }
      ]}
      schema={schema}
    />
  );
};

export default SchoolWebService;
