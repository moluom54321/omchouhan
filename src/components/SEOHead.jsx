import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://omchouhan.vercel.app";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

/**
 * SEOHead component to dynamically manage document title, meta tags, canonical link,
 * and JSON-LD structured data for every individual page.
 */
const SEOHead = ({
  title = "Om Prakash Chouhan | Full Stack Web Developer",
  description = "Om Prakash Chouhan is a Full Stack Web Developer building modern, fast, and SEO-friendly websites and web applications for businesses.",
  canonicalPath = "",
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  schema = null,
}) => {
  const location = useLocation();
  const currentPath = canonicalPath || location.pathname;
  const canonicalUrl = `${BASE_URL}${currentPath === "/" ? "" : currentPath.replace(/\/$/, "")}/`;

  useEffect(() => {
    // 1. Update Title
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
    updateMeta("name", "robots", "index, follow");
    updateMeta("name", "author", "Om Prakash Chouhan");

    // 3. Canonical Link
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
    updateMeta("property", "og:site_name", "Om Prakash Chouhan | Web Development Services");

    // 5. Twitter Card Meta Tags
    updateMeta("name", "twitter:card", "summary_large_image");
    updateMeta("name", "twitter:title", title);
    updateMeta("name", "twitter:description", description);
    updateMeta("name", "twitter:image", ogImage);

    // 6. JSON-LD Structured Data
    let schemaScript = document.getElementById("page-structured-data");
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.setAttribute("id", "page-structured-data");
      schemaScript.setAttribute("type", "application/ld+json");
      document.head.appendChild(schemaScript);
    }

    const defaultSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": `${BASE_URL}/#person`,
          "name": "Om Prakash Chouhan",
          "url": BASE_URL,
          "jobTitle": "Full Stack Web Developer",
          "description": "Full Stack Web Developer specializing in custom web applications and business website development.",
          "sameAs": ["https://github.com/moluom54321"],
          "knowsAbout": [
            "Full Stack Web Development",
            "MERN Stack",
            "React.js",
            "Next.js",
            "Node.js",
            "Express.js",
            "MongoDB",
            "Tailwind CSS",
            "JavaScript",
            "TypeScript"
          ]
        },
        {
          "@type": "WebSite",
          "@id": `${BASE_URL}/#website`,
          "url": BASE_URL,
          "name": "Om Prakash Chouhan | Web Development Services",
          "publisher": {
            "@id": `${BASE_URL}/#person`
          }
        }
      ]
    };

    if (schema) {
      schemaScript.textContent = JSON.stringify(schema);
    } else {
      schemaScript.textContent = JSON.stringify(defaultSchema);
    }
  }, [title, description, canonicalUrl, ogType, ogImage, schema]);

  return null;
};

export default SEOHead;
