import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

// ─── EmailJS Config ───────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_4kwtxsm";
const EMAILJS_TEMPLATE_ID = "template_kq067we";
const EMAILJS_PUBLIC_KEY  = "MS-ya8KoSx4IdgAko";
// ──────────────────────────────────────────────────────────────────

// ─── WhatsApp Config ──────────────────────────────────────────────
const ADMIN_WHATSAPP = "918178301837"; // country code + number
// ──────────────────────────────────────────────────────────────────

const buildWhatsAppURL = (formData) => {
  const msg = `🔔 *NEW PORTFOLIO MESSAGE*
━━━━━━━━━━━━━━━━━━━

👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📋 *Subject:* ${formData.subject}

💬 *Message:*
${formData.message}

🕐 *Sent:* ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`;
  
  return `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(msg)}`;
};

// Initialize EmailJS at module level (runs once)
emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
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

    if (!form.name || !form.email || !form.subject || !form.message) {
      setLoading(false);
      return;
    }

    const now = new Date();
    const timeString = now.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Template variables: {{name}}, {{time}}, {{message}} se match
    const templateParams = {
      name:    form.name,
      time:    timeString,
      message: `📧 Email   : ${form.email}\n📋 Subject : ${form.subject}\n\n💬 Message :\n${form.message}`,
      reply_to: form.email,
    };

    try {
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      console.log("EmailJS SUCCESS:", response);
      setLoading(false);
      setStatus("success");
      const waURL = buildWhatsAppURL(form);
      setWhatsappURL(waURL);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus(null), 15000);
    } catch (err) {
      console.error("EmailJS FULL Error:", err);
      console.error("Error text:", err?.text);
      console.error("Error status:", err?.status);
      setLoading(false);
      setStatus("error");
      // Show actual error details
      const errText = err?.text || err?.message || JSON.stringify(err);
      setErrorMsg(errText);
      setTimeout(() => setStatus(null), 15000);
    }
  };

  const contactInfo = [
    { icon: FaMapMarkerAlt, title: "Location", text: "Delhi, India" },
    {
      icon: FaEnvelope,
      title: "Email",
      text: "shivayechouhan6@gmail.com",
      href: "mailto:shivayechouhan6@gmail.com",
    },
    {
      icon: FaPhoneAlt,
      title: "Phone",
      text: "+91 81783 01837",
      href: "tel:+918178301837",
    },
  ];

  return (
    <section id="contact" className="py-32 relative z-10">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">

        <div className="flex flex-col lg:flex-row gap-20">

          {/* ── Left Info Panel ── */}
          <div className="w-full lg:w-1/2 space-y-12">
            <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-[1.1]">
              Let's <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Collaborate</span>
            </h2>
            <p className="text-xl text-muted-text font-light max-w-lg leading-relaxed">
              Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to discussing new projects, creative ideas, or opportunities.
            </p>

            <div className="space-y-6 pt-8">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-full glass-effect border border-white/10 flex items-center justify-center text-2xl text-white group-hover:text-primary transition-colors">
                    <item.icon />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg tracking-wide">{item.title}</h4>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-muted-text text-lg font-light hover:text-primary transition-colors"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <p className="text-muted-text text-lg font-light">{item.text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right Form ── */}
          <div className="w-full lg:w-1/2">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-effect p-10 lg:p-16 rounded-[3rem] border border-white/10 space-y-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -z-10" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-white/70 text-sm font-bold tracking-widest uppercase">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-primary transition-colors text-lg"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-white/70 text-sm font-bold tracking-widest uppercase">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-primary transition-colors text-lg"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-white/70 text-sm font-bold tracking-widest uppercase">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-primary transition-colors text-lg"
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="space-y-3">
                <label className="text-white/70 text-sm font-bold tracking-widest uppercase">Message</label>
                <textarea
                  rows="4"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-primary transition-colors resize-none text-lg"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="magnetic w-full py-6 rounded-full bg-white text-background font-bold text-lg hover:scale-[1.02] transition-transform duration-300 uppercase tracking-widest mt-8 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Sending...
                  </span>
                ) : "Send Message"}
              </button>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 justify-center bg-green-500/10 border border-green-500/30 rounded-2xl px-6 py-4">
                    <span className="text-green-400 text-xl">✓</span>
                    <p className="text-green-400 text-sm font-bold tracking-widest uppercase">
                      Email sent successfully!
                    </p>
                  </div>
                  
                  {/* WhatsApp Button */}
                  <a
                    href={whatsappURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-5 rounded-full font-bold text-lg uppercase tracking-widest mt-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]"
                    style={{ backgroundColor: "#25D366", color: "#fff" }}
                  >
                    <FaWhatsapp className="text-2xl" />
                    Also Send on WhatsApp
                  </a>
                  <p className="text-center text-white/40 text-xs tracking-wide">
                    Click above to also send your message directly via WhatsApp
                  </p>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-3 justify-center bg-red-500/10 border border-red-500/30 rounded-2xl px-6 py-4">
                    <span className="text-red-400 text-xl">✕</span>
                    <p className="text-red-400 text-sm font-bold tracking-widest uppercase">
                      Something went wrong. Please try again.
                    </p>
                  </div>
                  {errorMsg && (
                    <p className="text-red-300/70 text-xs text-center font-mono break-all px-4">
                      Error: {errorMsg}
                    </p>
                  )}
                </motion.div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
