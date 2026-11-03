/**
 * inject-seo.mjs
 *
 * Post-build script: generates per-route index.html files with correct
 * canonical, title, description and Open Graph tags baked into the
 * static HTML — before JavaScript loads.
 *
 * This is a zero-dependency solution compatible with Vite 8 + React SPA
 * deployed on Vercel. No SSR or prerendering framework is needed.
 *
 * Run: node scripts/inject-seo.mjs
 * Called automatically by: npm run build (via package.json)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "..", "dist");
const BASE_URL = "https://omchouhan.vercel.app";

// ─── Route definitions ────────────────────────────────────────────────────────
// Each entry generates dist/<outDir>/index.html with patched SEO tags.
// Keep in sync with src/pages/* and sitemap.xml.
const ROUTES = [
  {
    outDir: "about",
    canonical: `${BASE_URL}/about/`,
    title: "About Om Prakash Chouhan | Web Developer in Delhi",
    description:
      "Learn about Om Prakash Chouhan, a freelance website designer and web developer in Delhi NCR. I build modern, responsive, and SEO-friendly websites for businesses in Delhi, Noida, and Gurugram.",
    ogImage: `${BASE_URL}/og-image.png`,
  },
  {
    outDir: "projects",
    canonical: `${BASE_URL}/projects/`,
    title: "Web Development Projects | Om Prakash Chouhan — Delhi",
    description:
      "Browse the portfolio of Om Prakash Chouhan — freelance web developer in Delhi. See real-world React, Next.js and full-stack web projects built for businesses across Delhi NCR.",
    ogImage: `${BASE_URL}/og-image.png`,
  },
  {
    outDir: "services",
    canonical: `${BASE_URL}/services/`,
    title: "Web Design & Development Services in Delhi | Om Prakash Chouhan",
    description:
      "Professional web design and development services in Delhi NCR. Restaurant, gym, school, e-commerce and custom business websites. Get a free quote today.",
    ogImage: `${BASE_URL}/og-image.png`,
  },
  {
    outDir: "contact",
    canonical: `${BASE_URL}/contact/`,
    title: "Contact Om Prakash Chouhan | Hire a Web Developer in Delhi",
    description:
      "Get in touch with Om Prakash Chouhan for freelance web development, website design and digital solutions in Delhi NCR. Free consultation available.",
    ogImage: `${BASE_URL}/og-image.png`,
  },
  {
    outDir: "services/web-development",
    canonical: `${BASE_URL}/services/web-development/`,
    title: "Web Development Services in Delhi | Om Prakash Chouhan",
    description:
      "Custom web development services in Delhi NCR. React, Next.js, Node.js, full-stack applications. Built for performance, SEO and business growth.",
    ogImage: `${BASE_URL}/og-image.png`,
  },
  {
    outDir: "services/restaurant-website-development",
    canonical: `${BASE_URL}/services/restaurant-website-development/`,
    title: "Restaurant Website Development in Delhi | Om Prakash Chouhan",
    description:
      "Professional restaurant website design and development in Delhi NCR. Online menus, booking forms, food ordering integration. Get a free quote.",
    ogImage: `${BASE_URL}/og-image.png`,
  },
  {
    outDir: "services/gym-website-development",
    canonical: `${BASE_URL}/services/gym-website-development/`,
    title: "Gym Website Development in Delhi | Om Prakash Chouhan",
    description:
      "Custom gym and fitness website development in Delhi NCR. Membership portals, class schedules, online booking. Built to convert visitors into members.",
    ogImage: `${BASE_URL}/og-image.png`,
  },
  {
    outDir: "services/small-business-website-development",
    canonical: `${BASE_URL}/services/small-business-website-development/`,
    title: "Small Business Website Development in Delhi | Om Prakash Chouhan",
    description:
      "Affordable small business website development in Delhi NCR. Modern, mobile-first, SEO-optimised websites that generate real leads.",
    ogImage: `${BASE_URL}/og-image.png`,
  },
  {
    outDir: "services/ecommerce-website-development",
    canonical: `${BASE_URL}/services/ecommerce-website-development/`,
    title: "E-commerce Website Development in Delhi | Om Prakash Chouhan",
    description:
      "Custom e-commerce website development in Delhi NCR. Product catalogues, payment gateways, admin dashboards. Built to sell.",
    ogImage: `${BASE_URL}/og-image.png`,
  },
  {
    outDir: "services/school-website-development",
    canonical: `${BASE_URL}/services/school-website-development/`,
    title: "School Website Development in Delhi | Om Prakash Chouhan",
    description:
      "Professional school and academy website development in Delhi NCR. Admissions, fee portals, notice boards, responsive design.",
    ogImage: `${BASE_URL}/og-image.png`,
  },
  {
    outDir: "services/website-maintenance",
    canonical: `${BASE_URL}/services/website-maintenance/`,
    title: "Website Maintenance Services in Delhi | Om Prakash Chouhan",
    description:
      "Reliable website maintenance and support services in Delhi NCR. Updates, security, performance monitoring and content management.",
    ogImage: `${BASE_URL}/og-image.png`,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Replace the value of a specific HTML attribute in a tag.
 * Handles both single and double quotes.
 */
function patchAttr(html, selector, attr, newValue) {
  // Match <tag ... attr="value" ...> or <tag ... attr='value' ...>
  const re = new RegExp(
    `(<[^>]*\\b${selector}[^>]*\\s${attr}=["'])([^"']*)(['"][^>]*>)`,
    "i"
  );
  return html.replace(re, `$1${newValue}$3`);
}

/**
 * Replace the content attribute of a <meta name|property="key"> tag.
 *
 * All meta tags in index.html use double quotes for attribute values,
 * so we match content="..." with a regex that captures everything up to
 * the closing double-quote (allowing single quotes inside the content).
 */
function patchMeta(html, nameOrProp, key, newContent) {
  // Attribute order: property/name first, then content
  // e.g. <meta property="og:description" content="..." />
  const re = new RegExp(
    `(<meta[^>]*(?:name|property)="${key}"[^>]*content=")([^"]*)(")`,
    "i"
  );
  if (re.test(html)) {
    return html.replace(re, `$1${newContent}$3`);
  }
  // Content-first order: <meta content="..." name="key">
  // This form is NOT used in index.html but kept as a fallback.
  const re2 = new RegExp(
    `(<meta[^>]*content=")([^"]*)("[^>]*(?:name|property)="${key}"[^>]*>)`,
    "i"
  );
  return html.replace(re2, `$1${newContent}$3`);
}

/**
 * Replace <title>...</title>
 */
function patchTitle(html, newTitle) {
  return html.replace(/(<title>)[^<]*(<\/title>)/, `$1${newTitle}$2`);
}

/**
 * Replace <link rel="canonical" href="...">
 * All link tags in index.html use double-quoted attributes.
 */
function patchCanonical(html, newCanonical) {
  // <link rel="canonical" href="https://.../" />
  return html.replace(
    /(<link\s[^>]*rel="canonical"[^>]*href=")([^"]*)(")/, 
    `$1${newCanonical}$3`
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const baseHtml = fs.readFileSync(path.join(DIST, "index.html"), "utf-8");

let errorCount = 0;

for (const route of ROUTES) {
  const { outDir, canonical, title, description, ogImage } = route;

  let html = baseHtml;

  // Patch <title>
  html = patchTitle(html, title);

  // Patch <link rel="canonical">
  html = patchCanonical(html, canonical);

  // Patch primary meta description
  html = patchMeta(html, "name", "description", description);

  // Patch Open Graph tags
  html = patchMeta(html, "property", "og:title", title);
  html = patchMeta(html, "property", "og:description", description);
  html = patchMeta(html, "property", "og:url", canonical);
  html = patchMeta(html, "property", "og:image", ogImage);

  // Patch Twitter tags
  html = patchMeta(html, "name", "twitter:title", title);
  html = patchMeta(html, "name", "twitter:description", description);
  html = patchMeta(html, "name", "twitter:image", ogImage);
  html = patchMeta(html, "name", "twitter:url", canonical);

  // Verify canonical was actually patched (sanity check)
  if (!html.includes(`href="${canonical}"`)) {
    console.error(`  ✗ ERROR: canonical patch failed for /${outDir}/`);
    errorCount++;
  }

  // Write output file
  const outPath = path.join(DIST, outDir, "index.html");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, "utf-8");

  console.log(`  ✓ dist/${outDir}/index.html  →  canonical: ${canonical}`);
}

if (errorCount > 0) {
  console.error(`\n[inject-seo] ${errorCount} route(s) failed. Check output above.`);
  process.exit(1);
} else {
  console.log(`\n[inject-seo] ${ROUTES.length} route HTML files generated successfully.`);
}
