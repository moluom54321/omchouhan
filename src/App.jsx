import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import ProjectsPage from "./pages/ProjectsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

// Dedicated Service Pages
import WebDevelopmentService from "./pages/services/WebDevelopmentService";
import RestaurantWebService from "./pages/services/RestaurantWebService";
import GymWebService from "./pages/services/GymWebService";
import SmallBusinessWebService from "./pages/services/SmallBusinessWebService";
import EcommerceWebService from "./pages/services/EcommerceWebService";
import SchoolWebService from "./pages/services/SchoolWebService";
import WebsiteMaintenanceService from "./pages/services/WebsiteMaintenanceService";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Dedicated Service Routes */}
        <Route path="/services/web-development" element={<WebDevelopmentService />} />
        <Route path="/services/restaurant-website-development" element={<RestaurantWebService />} />
        <Route path="/services/gym-website-development" element={<GymWebService />} />
        <Route path="/services/small-business-website-development" element={<SmallBusinessWebService />} />
        <Route path="/services/ecommerce-website-development" element={<EcommerceWebService />} />
        <Route path="/services/school-website-development" element={<SchoolWebService />} />
        <Route path="/services/website-maintenance" element={<WebsiteMaintenanceService />} />

        {/* 404 Fallback Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
