/**
 * Generate route-specific static HTML metadata for the Vite SPA.
 * Route metadata is shared with React through src/constants/seo.js so the
 * browser-managed and pre-JavaScript HTML values cannot drift apart.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SEO_ROUTES, SITE_URL, DEFAULT_OG_IMAGE } from "../src/constants/seo.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "..", "dist");
const BASE_HTML = path.join(DIST, "index.html");

if (!fs.existsSync(BASE_HTML)) {
  console.error("[inject-seo] dist/index.html not found. Run the Vite build first.");
  process.exit(1);
}

const SITEMAP_PATH = path.join(__dirname, "..", "public", "sitemap.xml");
const sitemapContent = fs.readFileSync(SITEMAP_PATH, "utf8");
const expectedUrls = [`${SITE_URL}/`, ...SEO_ROUTES.map((route) => `${SITE_URL}${route.canonicalPath}`)];
const missingSitemapUrls = expectedUrls.filter((url) => !sitemapContent.includes(`<loc>${url}</loc>`));
if (missingSitemapUrls.length) {
  console.error("[inject-seo] Missing canonical URLs in sitemap:", missingSitemapUrls.join(", "));
  process.exit(1);
}

const canonicalPaths = SEO_ROUTES.map((route) => route.canonicalPath);
if (new Set(canonicalPaths).size !== canonicalPaths.length) {
  console.error("[inject-seo] Duplicate canonicalPath found in SEO_ROUTES.");
  process.exit(1);
}

const escapeHtml = (value) => String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const normalizeUrl = (pathName) => `${SITE_URL}${pathName === "/" ? "/" : pathName}`;

function upsertMeta(html, attribute, key, content) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const tagPattern = new RegExp(`<meta\\b(?=[^>]*\\b${attribute}=["']${escapedKey}["'])[^>]*>`, "i");
  const tag = `<meta ${attribute}="${escapeHtml(key)}" content="${escapeHtml(content)}" />`;
  if (tagPattern.test(html)) return html.replace(tagPattern, tag);
  return html.replace("</head>", `  ${tag}\n  </head>`);
}

function upsertLink(html, rel, href) {
  const pattern = new RegExp(`<link\\b(?=[^>]*\\brel=["']${rel}["'])[^>]*>`, "i");
  const tag = `<link rel="${rel}" href="${escapeHtml(href)}" />`;
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `  ${tag}\n  </head>`);
}

function buildStructuredData(route) {
  const canonical = normalizeUrl(route.canonicalPath);
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;
  const graph = [
    {
      "@type": "Person",
      "@id": personId,
      name: "Om Prakash Chouhan",
      url: `${SITE_URL}/`,
      jobTitle: "Website Designer and Web Developer",
      description: "Freelance website designer and web developer based in Delhi, India.",
      sameAs: ["https://github.com/moluom54321"],
      knowsAbout: ["Website Design", "Web Development", "React", "Next.js", "Node.js", "MongoDB", "Technical SEO", "Responsive Web Design"],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${SITE_URL}/`,
      name: "Om Prakash Chouhan - Website Designer and Web Developer",
      publisher: { "@id": personId },
      inLanguage: "en-IN",
    },
    {
      "@type": route.pageType || "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: route.title,
      description: route.description,
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        ...(route.outDir.startsWith("services/")
          ? [
              { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services/` },
              { "@type": "ListItem", position: 3, name: route.serviceName, item: canonical },
            ]
          : route.outDir === "services"
            ? [{ "@type": "ListItem", position: 2, name: "Services", item: canonical }]
            : route.outDir
              ? [{ "@type": "ListItem", position: 2, name: route.outDir[0].toUpperCase() + route.outDir.slice(1), item: canonical }]
              : []),
      ],
    },
  ];

  if (route.serviceName) {
    graph.push({
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: route.serviceName,
      serviceType: route.serviceName,
      description: route.serviceDescription,
      provider: { "@id": personId },
      areaServed: { "@type": "AdministrativeArea", name: "Delhi NCR, India" },
      url: canonical,
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

function patchRoute(baseHtml, route) {
  const canonical = normalizeUrl(route.canonicalPath);
  let html = baseHtml;
  html = html.replace(/<html([^>]*)lang=["'][^"']*["']([^>]*)>/i, '<html$1lang="en-IN"$2>');
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);
  html = upsertMeta(html, "name", "description", route.description);
  html = upsertMeta(html, "name", "robots", "index, follow, max-image-preview:large");
  html = upsertMeta(html, "name", "author", "Om Prakash Chouhan");
  html = upsertMeta(html, "property", "og:type", "website");
  html = upsertMeta(html, "property", "og:locale", "en_IN");
  html = upsertMeta(html, "property", "og:url", canonical);
  html = upsertMeta(html, "property", "og:title", route.title);
  html = upsertMeta(html, "property", "og:description", route.description);
  html = upsertMeta(html, "property", "og:site_name", "Om Prakash Chouhan");
  html = upsertMeta(html, "property", "og:image", DEFAULT_OG_IMAGE);
  html = upsertMeta(html, "property", "og:image:alt", "Om Prakash Chouhan - Website Designer and Web Developer");
  html = upsertMeta(html, "name", "twitter:card", "summary_large_image");
  html = upsertMeta(html, "name", "twitter:title", route.title);
  html = upsertMeta(html, "name", "twitter:description", route.description);
  html = upsertMeta(html, "name", "twitter:image", DEFAULT_OG_IMAGE);
  html = upsertLink(html, "canonical", canonical);

  const schema = JSON.stringify(buildStructuredData(route), null, 2).replace(/</g, "\\u003c");
  const schemaPattern = /<script\s+id="page-structured-data"\s+type="application\/ld\+json">[\s\S]*?<\/script>/i;
  const schemaTag = `<script id="page-structured-data" type="application/ld+json">\n${schema}\n</script>`;
  html = schemaPattern.test(html) ? html.replace(schemaPattern, schemaTag) : html.replace("</head>", `  ${schemaTag}\n  </head>`);
  return html;
}

const baseHtml = fs.readFileSync(BASE_HTML, "utf8");
let failures = 0;
for (const route of SEO_ROUTES) {
  const outputPath = path.join(DIST, route.outDir, "index.html");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  const html = patchRoute(baseHtml, route);
  const canonical = normalizeUrl(route.canonicalPath);
  if (!html.includes(`href="${canonical}"`) || !html.includes(`<title>${escapeHtml(route.title)}</title>`)) {
    console.error(`[inject-seo] Failed metadata verification for ${route.canonicalPath}`);
    failures += 1;
    continue;
  }
  fs.writeFileSync(outputPath, html, "utf8");
  console.log(`✓ ${route.canonicalPath} → ${route.title}`);
}

if (failures) {
  console.error(`[inject-seo] ${failures} route(s) failed.`);
  process.exit(1);
}
console.log(`[inject-seo] Generated ${SEO_ROUTES.length} route-specific HTML files.`);
