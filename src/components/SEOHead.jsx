import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://omchouhan.vercel.app";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

/**
 * SEOHead component to dynamically manage document title, meta tags, canonical link,
 * and JSON-LD structured data for every individual page.
 */
const SEOHead = ({
  title = "Website Designer in Delhi | Om Prakash Chouhan",
  description = "I'm Om Prakash Chouhan, a freelance website designer and developer in Delhi. I create modern, responsive and SEO-friendly websites for businesses, restaurants, gyms and startups across Delhi NCR.",
  canonicalPath = "",
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  robots = "index, follow, max-image-preview:large",
  schema = null,
}) => {
  const location = useLocation();
  const currentPath = canonicalPath || location.pathname;
  const canonicalUrl = `${BASE_URL}${currentPath === "/" ? "" : currentPath.replace(/\/$/, "")}/`;

  useEffect(() => {
    // 1. Update document language and title
    document.documentElement.lang = "en-IN";
    document.title = title;

    // Helper to update or create meta tags
    const updateMeta = (nameAttr, nameValue, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[${nameAttr}="${nameValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(nameAttr, nameValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // 2. Primary Meta Tags
    updateMeta("name", "description", description);
    updateMeta("name", "robots", robots);
    updateMeta("name", "author", "Om Prakash Chouhan");

    // 3. Canonical Link — remove all existing canonical tags first to prevent
    //    duplicates when navigating between pre-rendered per-route index.html
    //    files (each bakes in its own canonical) and the React-managed one.
    const existingCanonicals = document.querySelectorAll('link[rel="canonical"]');
    existingCanonicals.forEach((el, i) => {
      if (i > 0) el.remove(); // keep only the first; update it below
    });
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 4. Open Graph Meta Tags
    updateMeta("property", "og:title", title);
    updateMeta("property", "og:description", description);
    updateMeta("property", "og:url", canonicalUrl);
    updateMeta("property", "og:type", ogType);
    updateMeta("property", "og:image", ogImage);
    updateMeta("property", "og:site_name", "Om Prakash Chouhan");
    updateMeta("property", "og:locale", "en_IN");
    updateMeta("property", "og:image:alt", "Om Prakash Chouhan - Website Designer and Web Developer");

    // 5. Twitter Card Meta Tags
    updateMeta("name", "twitter:card", "summary_large_image");
    updateMeta("name", "twitter:title", title);
    updateMeta("name", "twitter:description", description);
    updateMeta("name", "twitter:image", ogImage);
    updateMeta("name", "twitter:url", canonicalUrl);

    // 6. JSON-LD Structured Data
    let schemaScript = document.getElementById("page-structured-data");
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.setAttribute("id", "page-structured-data");
      schemaScript.setAttribute("type", "application/ld+json");
      document.head.appendChild(schemaScript);
    }

    const personId = `${BASE_URL}/#person`;
    const websiteId = `${BASE_URL}/#website`;
    const commonGraph = [
      {
        "@type": "Person",
        "@id": personId,
        name: "Om Prakash Chouhan",
        url: `${BASE_URL}/`,
        jobTitle: "Website Designer and Web Developer",
        description: "Freelance website designer and web developer based in Delhi, India.",
        sameAs: ["https://github.com/moluom54321"],
        knowsAbout: [
          "Website Design", "Web Development", "Frontend Development",
          "Full Stack Web Development", "React", "Next.js", "Node.js",
          "Express.js", "MongoDB", "Tailwind CSS", "Technical SEO"
        ]
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${BASE_URL}/`,
        name: "Om Prakash Chouhan - Website Designer and Web Developer",
        publisher: { "@id": personId },
        inLanguage: "en-IN"
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        description,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        inLanguage: "en-IN"
      }
    ];

    const suppliedGraph = schema
      ? (Array.isArray(schema["@graph"]) ? schema["@graph"] : [schema])
      : [];
    const suppliedIds = new Set(suppliedGraph.map((item) => item && item["@id"]).filter(Boolean));
    const mergedGraph = [
      ...commonGraph.filter((item) => !suppliedIds.has(item["@id"])),
      ...suppliedGraph
    ];
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": mergedGraph
    });
  }, [title, description, canonicalUrl, ogType, ogImage, robots, schema]);

  return null;
};

export default SEOHead;
