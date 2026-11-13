# Om Chouhan - Developer Portfolio

A modern, high-performance personal developer portfolio built with React, Vite, Tailwind CSS, and Framer Motion. Showcasing full-stack and modern web engineering projects including luxury 3D Canvas scrollytelling experiences, full-stack web applications, and interactive digital products.

## 🚀 Featured Projects
- **Solis Estate** - 3D/Canvas Scrollytelling Luxury Real Estate Experience (Next.js 16, React 19, TypeScript, HTML5 Canvas, GSAP ScrollTrigger, Lenis)
- **Fameflex** - Modern high-performance web platform
- **Gym Website** - Fitness & workout platform
- **Kenangan Coffee India** - Coffee brand showcase with sleek animations
- **Music School of Delhi** - Full-stack academy management platform
- **Porter Web App** - Logistics & delivery platform clone

## 🛠️ Tech Stack
- **Frontend:** React 19, Vite, JavaScript (ES6+), HTML5 Canvas, Tailwind CSS, Three.js / React Three Fiber, Framer Motion, Lenis Smooth Scroll
- **Backend:** Node.js, Express.js, REST APIs, MongoDB, JWT
- **Tools & Deployment:** Git, GitHub, Vercel, Vite, FFmpeg


## 🔎 SEO configuration

- Route titles, descriptions and canonical paths are maintained in `src/constants/seo.js`.
- React uses the same route configuration for client-side navigation metadata.
- `npm run build` runs `scripts/inject-seo.mjs` after the Vite build to generate route-specific HTML metadata and JSON-LD for the service, portfolio, about and contact routes.
- Keep `public/sitemap.xml` in sync with the canonical paths in `src/constants/seo.js`. The build script checks that every configured route is present in the sitemap.
- Canonical URLs use trailing slashes. `vercel.json` redirects the non-trailing-slash versions to the canonical URLs.
- After deploying meaningful page changes, inspect the live URLs and sitemap in Google Search Console. Request indexing only for canonical pages that are intended to appear in search.

SEO changes help search engines interpret the site, but they do not guarantee rankings, clicks or rich results. Review query and page performance in Search Console over time.
