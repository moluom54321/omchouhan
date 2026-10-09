import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Background from "../components/Background";
import SEOHead from "../components/SEOHead";
import { services } from "../constants";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const WEB3FORMS_ACCESS_KEY = "4318b3e3-f170-4a59-9727-bd7037cb1828";
const ADMIN_WHATSAPP = "918178301837";

const buildWhatsAppQuoteURL = (formData) => {
  const msg = `🚀 *NEW CLIENT WEBSITE INQUIRY / QUOTE REQUEST*
━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.phone || "Not provided"}
🏢 *Business / Brand:* ${formData.business || "Not provided"}
🌐 *Current Website:* ${formData.website || "None (New Website)"}
🛠️ *Service Needed:* ${formData.service}
💰 *Estimated Timeline / Budget:* ${formData.timeline || "Flexible"}

💬 *Project Scope & Details:*
${formData.message}

🕐 *Sent via Portfolio Website:* ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`;

  return `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(msg)}`;
};

const ContactPage = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    website: "",
    service: "Web Development",
    timeline: "Within 2-4 weeks",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [errorMsg, setErrorMsg] = useState("");
  const [whatsappURL, setWhatsappURL] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setErrorMsg("");

    if (!form.name || !form.email || !form.message) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          phone: form.phone,
          business: form.business,
          service_required: form.service,
          timeline: form.timeline,
          message: form.message,
          subject: `Quote Request for ${form.service} from ${form.name}`,
          from_name: "Om Chouhan Website Inquiries"
        })
      });

      let data = null;
      try {
        data = await response.json();
      } catch (parseErr) {
        console.error("Failed to parse Web3Forms JSON response:", parseErr);
      }

      if (!response.ok || !data || !data.success) {
        const errorDetail = data?.message || "Failed to send message via Web3Forms";
        throw new Error(errorDetail);
      }

      setLoading(false);
      setStatus("success");
      const waURL = buildWhatsAppQuoteURL(form);
      setWhatsappURL(waURL);
      setForm({
        name: "",
        email: "",
        phone: "",
        business: "",
        website: "",
        service: "Web Development",
        timeline: "Within 2-4 weeks",
        message: ""
      });
      setTimeout(() => setStatus(null), 20000);
    } catch (err) {
      console.error("FormSubmit Error:", err);
      setLoading(false);
      setStatus("error");
      setErrorMsg(err.message || "Failed to send message. Please reach out via WhatsApp directly.");
      setTimeout(() => setStatus(null), 20000);
    }
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "name": "Contact & Get a Quote | Om Chouhan",
        "description": "Request a free quote or consultation for custom web development, restaurant websites, gym websites, or website maintenance.",
        "url": "https://omchouhan.vercel.app/contact/"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://omchouhan.vercel.app/" },
          { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://omchouhan.vercel.app/contact/" }
        ]
      }
    ]
  };

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <SEOHead
        title="Get a Free Website Quote & Consultation | Om Chouhan"
        description="Contact Om Prakash Chouhan for a free web development consultation and project quote. Fast response for business, restaurant, gym, school, and ecommerce websites."
        canonicalPath="/contact"
        schema={schema}
      />
      <div className="text-white min-h-screen font-sans bg-transparent selection:bg-primary/30 selection:text-white overflow-x-hidden w-full">
        <Background />
        <Navbar />

        <main className="relative z-10 w-full pt-36 pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            
            {/* ── Breadcrumbs ── */}
            <nav className="flex items-center space-x-2 text-xs text-muted-text mb-8 uppercase tracking-wider">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-primary font-semibold">Contact & Get a Quote</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
              
              {/* ── Left Column: Contact Info & Value ── */}
              <div className="lg:col-span-5 space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                  Start Your Project
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]">
                  Let's Discuss Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                    Website Goals
                  </span>
                </h1>

                <p className="text-muted-text text-base md:text-lg leading-relaxed font-light">
                  Whether you need a brand-new website, an interactive digital menu, or performance maintenance on an existing site, fill out the form or reach out directly on WhatsApp for an instant response.
                </p>

                {/* Direct Contact Methods */}
                <div className="space-y-4 pt-4">
                  <a
                    href="https://wa.me/918178301837"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-effect p-4 rounded-2xl border border-[#25D366]/30 flex items-center gap-4 hover:border-[#25D366] transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      <FaWhatsapp />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-bold">Direct WhatsApp Chat</h4>
                      <p className="text-xs text-muted-text">+91 81783 01837 (Fastest Response)</p>
                    </div>
                  </a>

                  <div className="glass-effect p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl">
                      <FaEnvelope />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-bold">Email Inquiries</h4>
                      <a href="mailto:shivayechouhan6@gmail.com" className="text-xs text-muted-text hover:text-primary transition-colors">
                        shivayechouhan6@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="glass-effect p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-bold">Location & Availability</h4>
                      <p className="text-xs text-muted-text">Delhi, India (Serving Clients Worldwide)</p>
                    </div>
                  </div>
                </div>

                {/* What Happens Next Guarantee */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">What happens next?</h4>
                  <p className="text-xs text-muted-text leading-relaxed font-light">
                    1. I personally review your project details.<br />
                    2. I prepare a breakdown of recommendations, timeline, and pricing.<br />
                    3. We schedule a quick 10-minute call or chat to align on scope.
                  </p>
                </div>
              </div>

              {/* ── Right Column: Project Inquiry / Quote Form ── */}
              <div className="lg:col-span-7">
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="glass-effect p-8 sm:p-12 rounded-3xl border border-white/10 space-y-6 relative overflow-hidden shadow-2xl"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/15 rounded-full blur-[80px] -z-10" />

                  <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                    Request a Free Quote
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-white/70 text-xs font-bold tracking-widest uppercase">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-primary text-sm transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-white/70 text-xs font-bold tracking-widest uppercase">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@business.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-primary text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone / WhatsApp */}
                    <div className="space-y-2">
                      <label className="text-white/70 text-xs font-bold tracking-widest uppercase">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-primary text-sm transition-colors"
                      />
                    </div>

                    {/* Business Name */}
                    <div className="space-y-2">
                      <label className="text-white/70 text-xs font-bold tracking-widest uppercase">
                        Business / Brand Name
                      </label>
                      <input
                        type="text"
                        name="business"
                        value={form.business}
                        onChange={handleChange}
                        placeholder="My Restaurant / Startup"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-primary text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Service Required */}
                    <div className="space-y-2">
                      <label className="text-white/70 text-xs font-bold tracking-widest uppercase">
                        Service Needed *
                      </label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="w-full bg-[#0c1228] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary text-sm transition-colors"
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="Other / Custom Project">Other / Custom Project</option>
                      </select>
                    </div>

                    {/* Desired Timeline */}
                    <div className="space-y-2">
                      <label className="text-white/70 text-xs font-bold tracking-widest uppercase">
                        Desired Timeline
                      </label>
                      <select
                        name="timeline"
                        value={form.timeline}
                        onChange={handleChange}
                        className="w-full bg-[#0c1228] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary text-sm transition-colors"
                      >
                        <option value="As soon as possible">As soon as possible</option>
                        <option value="Within 2-4 weeks">Within 2-4 weeks</option>
                        <option value="1-2 months">1-2 months</option>
                        <option value="Flexible / Planning stage">Flexible / Planning stage</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-2">
                    <label className="text-white/70 text-xs font-bold tracking-widest uppercase">
                      Tell me about your project & goals *
                    </label>
                    <textarea
                      rows="4"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      placeholder="Briefly describe what kind of website you need, any example websites you like, key features needed, and your goals..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-primary text-sm resize-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-accent text-background font-bold text-base hover:scale-[1.01] transition-transform duration-300 uppercase tracking-wider shadow-[0_0_25px_rgba(0,229,255,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Submitting Inquiry...
                      </span>
                    ) : (
                      "Submit Quote Request"
                    )}
                  </button>

                  {/* Status Messages */}
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 pt-2"
                    >
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-2xl text-center">
                        <p className="text-green-400 text-sm font-bold uppercase tracking-wider">
                          ✓ Inquiry Received! I will get back to you within 24 hours.
                        </p>
                      </div>

                      <a
                        href={whatsappURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-4 rounded-full font-bold text-sm uppercase tracking-wider bg-[#25D366] text-white hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all"
                      >
                        <FaWhatsapp className="text-xl" />
                        Also Send via WhatsApp for Faster Reply
                      </a>
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-center"
                    >
                      <p className="text-red-400 text-xs font-bold uppercase tracking-wider">
                        {errorMsg}
                      </p>
                    </motion.div>
                  )}
                </form>
              </div>

            </div>

          </div>
        </main>

        <Footer />
      </div>
    </ReactLenis>
  );
};

export default ContactPage;
