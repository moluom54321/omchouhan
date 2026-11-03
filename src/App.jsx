import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

// Homepage loads eagerly — it is the first thing users see
import Home from "./pages/Home";

// All other pages lazy-loaded — only fetched when user navigates there
const ServicesPage             = lazy(() => import("./pages/ServicesPage"));
const ProjectsPage             = lazy(() => import("./pages/ProjectsPage"));
const AboutPage                = lazy(() => import("./pages/AboutPage"));
const ContactPage              = lazy(() => import("./pages/ContactPage"));
const NotFoundPage             = lazy(() => import("./pages/NotFoundPage"));
const WebDevelopmentService    = lazy(() => import("./pages/services/WebDevelopmentService"));
const RestaurantWebService     = lazy(() => import("./pages/services/RestaurantWebService"));
const GymWebService            = lazy(() => import("./pages/services/GymWebService"));
const SmallBusinessWebService  = lazy(() => import("./pages/services/SmallBusinessWebService"));
const EcommerceWebService      = lazy(() => import("./pages/services/EcommerceWebService"));
const SchoolWebService         = lazy(() => import("./pages/services/SchoolWebService"));
const WebsiteMaintenanceService = lazy(() => import("./pages/services/WebsiteMaintenanceService"));

// Minimal fallback — keeps background color consistent, no spinner flash
const PageFallback = () => (
  <div style={{ minHeight: "100vh", background: "#050816" }} aria-hidden="true" />
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          {/* Main Routes — both with and without trailing slash for React Router compatibility */}
          <Route path="/"           element={<Home />} />
          <Route path="/services"   element={<ServicesPage />} />
          <Route path="/services/"  element={<ServicesPage />} />
          <Route path="/projects"   element={<ProjectsPage />} />
          <Route path="/projects/"  element={<ProjectsPage />} />
          <Route path="/about"      element={<AboutPage />} />
          <Route path="/about/"     element={<AboutPage />} />
          <Route path="/contact"    element={<ContactPage />} />
          <Route path="/contact/"   element={<ContactPage />} />

          {/* Dedicated Service Routes */}
          <Route path="/services/web-development"                   element={<WebDevelopmentService />} />
          <Route path="/services/web-development/"                  element={<WebDevelopmentService />} />
          <Route path="/services/restaurant-website-development"    element={<RestaurantWebService />} />
          <Route path="/services/restaurant-website-development/"   element={<RestaurantWebService />} />
          <Route path="/services/gym-website-development"           element={<GymWebService />} />
          <Route path="/services/gym-website-development/"          element={<GymWebService />} />
          <Route path="/services/small-business-website-development"  element={<SmallBusinessWebService />} />
          <Route path="/services/small-business-website-development/" element={<SmallBusinessWebService />} />
          <Route path="/services/ecommerce-website-development"     element={<EcommerceWebService />} />
          <Route path="/services/ecommerce-website-development/"    element={<EcommerceWebService />} />
          <Route path="/services/school-website-development"        element={<SchoolWebService />} />
          <Route path="/services/school-website-development/"       element={<SchoolWebService />} />
          <Route path="/services/website-maintenance"               element={<WebsiteMaintenanceService />} />
          <Route path="/services/website-maintenance/"              element={<WebsiteMaintenanceService />} />

          {/* 404 Fallback Route for non-existent paths */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
