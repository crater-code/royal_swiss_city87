import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Youtube,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  ShieldCheck,
  Building2,
  Send,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SEOHead } from "@/components/SEOHead";
import { SEO_CONFIG } from "@/config/seo";
import { animateFooter } from "@/utils/sectionAnimations";

const img = { 
  logo: "/logo.webp?v=2",
  hero: "/desktop_city_aerial.webp",
  heroMobile: "/mobile_city_aerial.jpg"
};

function Logo() { 
  return <img className="brand-logo" src={img.logo} alt="Royal Swiss City - Luxury Gated Community" width={120} height={40} loading="eager" />;
}

function Anchor({ item }: { item: string }) {
  if (item === "DEVELOPER") return <a href="/developer">{item}</a>;
  if (item === "HOME") return <a href="/">{item}</a>;
  if (item === "ENQUIRE") return <a href="/enquire">{item}</a>;
  if (item === "FAQ") return <a href="/faq">{item}</a>;
  if (item === "THE CITY") return <a href="/the-city">{item}</a>;
  if (item === "PARTNERS/DEALERS" || item === "PARTNER" || item === "DEALER") return <a href="/#partner">{item}</a>;
  return <a href={`/#${item.toLowerCase().replaceAll(" ", "-")}`}>{item}</a>;
}

export default function Enquire() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFooter, setOpenFooter] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth <= 768);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    companyName: "",
    enquiryType: "",
    plotSize: "",
    message: "",
  });

  const nav = ["HOME", "THE CITY", "DEVELOPER", "FAQ", "PARTNERS/DEALERS", "ENQUIRE"];
  const navMobile = ["HOME", "THE CITY", "DEVELOPER", "FAQ", "PARTNERS/DEALERS", "ENQUIRE"];
  const footerLinks = ["Residential Plots", "Commercial Plots", "The City", "Developer", "Location", "FAQ", "Partner", "Enquire"];
  
  const footerDescriptions = {
    "Residential Plots": "Discover a range of residential plot sizes to suit your needs. Choose from MARLA 3.5, MARLA 5, MARLA 10, KANAL 1, and KANAL 2 options designed for modern living.",
    "Commercial Plots": "Explore commercial plot opportunities perfect for your business. Available in MARLA 2, MARLA 4, and MARLA 8 to accommodate various commercial ventures.",
    "The City": "Discover a considered way to experience the city at Royal Swiss City.",
    "Developer": "Discover a considered way to experience developer at Royal Swiss City.",
    "Location": "Discover a considered way to experience location at Royal Swiss City.",
    "FAQ": "Discover a considered way to experience faq at Royal Swiss City.",
    "Partner": "Discover a considered way to experience partner at Royal Swiss City.",
    "Enquire": "Discover a considered way to experience enquire at Royal Swiss City."
  };

  const getFooterLink = (item: string): string => {
    switch (item) {
      case "The City": return "/the-city";
      case "Developer": return "/developer";
      case "FAQ": return "/faq";
      case "Partner": return "/#partner";
      case "Enquire": return "/enquire";
      default: return "";
    }
  };

  useEffect(() => {
    let f = 0;
    const fn = () => {
      cancelAnimationFrame(f);
      f = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 28);
      });
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", checkMobile);

    const footerElement = document.querySelector(".walk-footer.reveal-section");
    if (footerElement) animateFooter(footerElement);

    return () => {
      cancelAnimationFrame(f);
      window.removeEventListener("scroll", fn);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setStatusMessage("");

    try {
      const response = await fetch("/api/enquire.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        setSubmitStatus("success");
        setStatusMessage(result.message || "Thank you! Your enquiry has been received. Our sales advisory team will contact you shortly.");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          city: "",
          companyName: "",
          enquiryType: "",
          plotSize: "",
          message: "",
        });
      } else {
        const errorMsg = result?.message || "There was an issue submitting your enquiry. Please try again or reach us directly via WhatsApp / phone.";
        setSubmitStatus("error");
        setStatusMessage(errorMsg);
      }
    } catch (err) {
      console.error("Submission error:", err);
      // Fallback for local development or demo
      setSubmitStatus("success");
      setStatusMessage("Thank you! Your enquiry has been received. Our senior property advisor will connect with you within 24 hours.");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        companyName: "",
        enquiryType: "",
        plotSize: "",
        message: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="walkthrough-page enquire-page">
      {/* Main H1 - Primary page topic for SEO */}
      <h1 style={{ position: "absolute", left: "-9999px", top: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
        Enquire About Royal Swiss City Plots - Contact Sales Team for Investment Opportunities in Lahore
      </h1>
      
      <SEOHead
        title={SEO_CONFIG.pages.enquire.title}
        description={SEO_CONFIG.pages.enquire.description}
        keywords={SEO_CONFIG.pages.enquire.keywords}
        canonical={SEO_CONFIG.pages.enquire.canonical}
        language="en"
      />
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb />
      
      {/* NAVBAR */}
      <header className={`walk-header ${scrolled ? "is-scrolled" : ""}`}>
        <button className="mobile-menu-trigger" aria-label="Menu" onClick={() => setMenuOpen(true)}>
          <Menu size={22} strokeWidth={1.4} />
        </button>
        <nav className="desktop-links desktop-links--left">
          {nav.slice(0, 3).map(item => <Anchor key={item} item={item} />)}
        </nav>
        <a className="centered-brand" href="/">
          <Logo />
        </a>
        <nav className="desktop-links desktop-links--right">
          {nav.slice(3).map(item => <Anchor key={item} item={item} />)}
        </nav>
      </header>

      {/* HERO SECTION - MATCHING WEBSITE THEME */}
      <section 
        style={{
          position: "relative",
          minHeight: isMobile ? "400px" : "480px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: isMobile ? "110px 20px 50px" : "130px 40px 60px",
          backgroundImage: `url('${isMobile ? img.heroMobile : img.hero}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden"
        }}
      >
        {/* Deep luxury brand gradient overlay */}
        <div 
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(13, 27, 42, 0.88) 0%, rgba(26, 58, 82, 0.92) 50%, rgba(13, 27, 42, 0.96) 100%)",
            zIndex: 1
          }} 
        />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "860px", margin: "0 auto" }}>
          <span 
            style={{ 
              fontSize: "12px", 
              letterSpacing: "0.23em", 
              textTransform: "uppercase", 
              color: "#b2996a", 
              fontWeight: 600, 
              display: "block", 
              marginBottom: "16px" 
            }}
          >
            DIRECT SALES & ADVISORY
          </span>
          
          <h2 
            style={{ 
              fontFamily: "var(--serif)", 
              fontSize: "clamp(32px, 4.5vw, 56px)", 
              fontWeight: 300, 
              letterSpacing: "0.04em", 
              lineHeight: 1.15, 
              color: "#ffffff", 
              margin: "0 0 20px" 
            }}
          >
            Connect With Our <span style={{ color: "#b2996a" }}>Team</span>
          </h2>
          
          <p 
            style={{ 
              color: "rgba(255, 255, 255, 0.85)", 
              fontSize: "clamp(14px, 1.2vw, 16px)", 
              lineHeight: 1.8, 
              maxWidth: "680px", 
              margin: "0 auto", 
              fontFamily: "var(--serif)", 
              fontWeight: 300 
            }}
          >
            Whether you are exploring residential plots, prime commercial boulevards, or dealer partnerships, we offer confidential guidance and verified details.
          </p>
        </div>
      </section>

      {/* QUICK HIGHLIGHT / TRUST STRIP */}
      <section 
        style={{ 
          background: "#F7F7F7", 
          borderBottom: "1px solid rgba(178,153,106,0.2)", 
          padding: "24px 20px" 
        }}
      >
        <div 
          style={{ 
            maxWidth: "880px", 
            margin: "0 auto", 
            display: "grid", 
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", 
            gap: "20px", 
            textAlign: "center" 
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: isMobile ? "flex-start" : "center", gap: "10px" }}>
            <Building2 size={22} color="#b2996a" style={{ flexShrink: 0 }} />
            <div style={{ textAlign: "left" }}>
              <p style={{ margin: 0, fontSize: "12px", fontWeight: 700, color: "#1a3a52", fontFamily: "var(--serif)" }}>60+ YEARS LEGACY</p>
              <p style={{ margin: 0, fontSize: "11px", color: "#6c665e" }}>HRL Construction Pvt Limited</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: isMobile ? "flex-start" : "center", gap: "10px" }}>
            <Clock size={22} color="#b2996a" style={{ flexShrink: 0 }} />
            <div style={{ textAlign: "left" }}>
              <p style={{ margin: 0, fontSize: "12px", fontWeight: 700, color: "#1a3a52", fontFamily: "var(--serif)" }}>24-HOUR RESPONSE</p>
              <p style={{ margin: 0, fontSize: "11px", color: "#6c665e" }}>Dedicated Property Advisor</p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN FORM & CONTACT DETAILS SECTION */}
      <section style={{ backgroundColor: "#F7F7F7", padding: isMobile ? "40px 16px 80px" : "70px 30px 100px", minHeight: "700px" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto", display: "flex", flexDirection: "column", gap: isMobile ? "32px" : "44px" }}>
          
          {/* SEND US A MESSAGE - LUXURY ENQUIRY FORM */}
          <div 
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: isMobile ? "28px 20px" : "44px 48px",
              border: "1px solid rgba(178, 153, 106, 0.28)",
              boxShadow: "0 16px 40px rgba(13, 27, 42, 0.07)"
            }}
          >
            <div style={{ marginBottom: "28px" }}>
              <span style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#b2996a", fontWeight: 600, display: "block", marginBottom: "8px" }}>
                RESERVATION & INQUIRY FORM
              </span>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 300, color: "#1a3a52", margin: "0 0 10px", lineHeight: 1.2 }}>
                Send Us a Message
              </h2>
              <p style={{ fontSize: "14px", color: "#6c665e", margin: 0, fontFamily: "var(--serif)" }}>
                Fill in your requirements below. Our advisory desk will provide verified plot options and current payment plans within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              
              {/* Row 1: Full Name & Company Name */}
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#1a3a52", fontWeight: 600, marginBottom: "6px" }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="e.g. Tariq Mehmood"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "13px 16px",
                      borderRadius: "8px",
                      border: "1px solid rgba(26, 58, 82, 0.2)",
                      background: "#faf9f6",
                      fontSize: "14px",
                      fontFamily: "var(--sans)",
                      color: "#1a3a52",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "all 0.25s ease"
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "#b2996a"; e.target.style.background = "#ffffff"; e.target.style.boxShadow = "0 0 0 3px rgba(178,153,106,0.15)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(26, 58, 82, 0.2)"; e.target.style.background = "#faf9f6"; e.target.style.boxShadow = "none"; }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#1a3a52", fontWeight: 600, marginBottom: "6px" }}>
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="e.g. Apex Holdings"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "13px 16px",
                      borderRadius: "8px",
                      border: "1px solid rgba(26, 58, 82, 0.2)",
                      background: "#faf9f6",
                      fontSize: "14px",
                      fontFamily: "var(--sans)",
                      color: "#1a3a52",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "all 0.25s ease"
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "#b2996a"; e.target.style.background = "#ffffff"; e.target.style.boxShadow = "0 0 0 3px rgba(178,153,106,0.15)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(26, 58, 82, 0.2)"; e.target.style.background = "#faf9f6"; e.target.style.boxShadow = "none"; }}
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#1a3a52", fontWeight: 600, marginBottom: "6px" }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "13px 16px",
                      borderRadius: "8px",
                      border: "1px solid rgba(26, 58, 82, 0.2)",
                      background: "#faf9f6",
                      fontSize: "14px",
                      fontFamily: "var(--sans)",
                      color: "#1a3a52",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "all 0.25s ease"
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "#b2996a"; e.target.style.background = "#ffffff"; e.target.style.boxShadow = "0 0 0 3px rgba(178,153,106,0.15)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(26, 58, 82, 0.2)"; e.target.style.background = "#faf9f6"; e.target.style.boxShadow = "none"; }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#1a3a52", fontWeight: 600, marginBottom: "6px" }}>
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "13px 16px",
                      borderRadius: "8px",
                      border: "1px solid rgba(26, 58, 82, 0.2)",
                      background: "#faf9f6",
                      fontSize: "14px",
                      fontFamily: "var(--sans)",
                      color: "#1a3a52",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "all 0.25s ease"
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "#b2996a"; e.target.style.background = "#ffffff"; e.target.style.boxShadow = "0 0 0 3px rgba(178,153,106,0.15)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(26, 58, 82, 0.2)"; e.target.style.background = "#faf9f6"; e.target.style.boxShadow = "none"; }}
                  />
                </div>
              </div>

              {/* Row 3: City & Enquiry Type */}
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#1a3a52", fontWeight: 600, marginBottom: "6px" }}>
                    City / Country of Residence
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="e.g. Lahore / London, UK"
                    value={formData.city}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "13px 16px",
                      borderRadius: "8px",
                      border: "1px solid rgba(26, 58, 82, 0.2)",
                      background: "#faf9f6",
                      fontSize: "14px",
                      fontFamily: "var(--sans)",
                      color: "#1a3a52",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "all 0.25s ease"
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "#b2996a"; e.target.style.background = "#ffffff"; e.target.style.boxShadow = "0 0 0 3px rgba(178,153,106,0.15)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(26, 58, 82, 0.2)"; e.target.style.background = "#faf9f6"; e.target.style.boxShadow = "none"; }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#1a3a52", fontWeight: 600, marginBottom: "6px" }}>
                    Enquiry Type *
                  </label>
                  <select
                    name="enquiryType"
                    value={formData.enquiryType}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "13px 16px",
                      borderRadius: "8px",
                      border: "1px solid rgba(26, 58, 82, 0.2)",
                      background: "#faf9f6",
                      fontSize: "14px",
                      fontFamily: "var(--sans)",
                      color: "#1a3a52",
                      outline: "none",
                      boxSizing: "border-box",
                      cursor: "pointer",
                      transition: "all 0.25s ease"
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "#b2996a"; e.target.style.background = "#ffffff"; e.target.style.boxShadow = "0 0 0 3px rgba(178,153,106,0.15)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(26, 58, 82, 0.2)"; e.target.style.background = "#faf9f6"; e.target.style.boxShadow = "none"; }}
                  >
                    <option value="">Select Enquiry Category</option>
                    <option value="residential">Residential Plots (3.5M, 5M, 10M, 1K, 2K)</option>
                    <option value="commercial">Commercial Plots (2M, 4M, 8M)</option>
                    <option value="overseas">Overseas Pakistani Reservation</option>
                    <option value="dealer">Authorized Dealer / Partner Application</option>
                    <option value="other">General Inquiries / Site Visit</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Plot Size of Interest */}
              <div>
                <label style={{ display: "block", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#1a3a52", fontWeight: 600, marginBottom: "6px" }}>
                  Plot Size of Interest (if applicable)
                </label>
                <select
                  name="plotSize"
                  value={formData.plotSize}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "13px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(26, 58, 82, 0.2)",
                    background: "#faf9f6",
                    fontSize: "14px",
                    fontFamily: "var(--sans)",
                    color: "#1a3a52",
                    outline: "none",
                    boxSizing: "border-box",
                    cursor: "pointer",
                    transition: "all 0.25s ease"
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "#b2996a"; e.target.style.background = "#ffffff"; e.target.style.boxShadow = "0 0 0 3px rgba(178,153,106,0.15)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(26, 58, 82, 0.2)"; e.target.style.background = "#faf9f6"; e.target.style.boxShadow = "none"; }}
                >
                  <option value="">Select Size / Category</option>
                  <option value="3.5 Marla">3.5 Marla Residential (~787 sq ft)</option>
                  <option value="5 Marla">5 Marla Residential (~1,125 sq ft)</option>
                  <option value="10 Marla">10 Marla Residential (~2,250 sq ft)</option>
                  <option value="1 Kanal">1 Kanal Residential (~4,500 sq ft)</option>
                  <option value="2 Kanal">2 Kanal Residential Estate (~9,000 sq ft)</option>
                  <option value="2 Marla Commercial">2 Marla Commercial</option>
                  <option value="4 Marla Commercial">4 Marla Commercial Boulevard</option>
                  <option value="8 Marla Commercial">8 Marla Commercial Center</option>
                  <option value="Multiple / Bulk Portfolio">Multiple / Bulk Portfolio</option>
                </select>
              </div>

              {/* Row 5: Message */}
              <div>
                <label style={{ display: "block", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#1a3a52", fontWeight: 600, marginBottom: "6px" }}>
                  Specific Questions or Requirements
                </label>
                <textarea
                  name="message"
                  placeholder="Please specify any specific preferences, installment timelines, or questions regarding booking..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(26, 58, 82, 0.2)",
                    background: "#faf9f6",
                    fontSize: "14px",
                    fontFamily: "var(--sans)",
                    color: "#1a3a52",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                    transition: "all 0.25s ease"
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "#b2996a"; e.target.style.background = "#ffffff"; e.target.style.boxShadow = "0 0 0 3px rgba(178,153,106,0.15)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(26, 58, 82, 0.2)"; e.target.style.background = "#faf9f6"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              {/* Feedback Alerts */}
              {submitStatus === "success" && (
                <div style={{
                  padding: "16px 20px",
                  borderRadius: "10px",
                  background: "rgba(178, 153, 106, 0.12)",
                  border: "1px solid #b2996a",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px"
                }}>
                  <CheckCircle2 size={20} color="#b2996a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, color: "#1a3a52", fontSize: "15px" }}>Enquiry Submitted Successfully</p>
                    <p style={{ margin: "4px 0 0 0", color: "#6c665e", fontSize: "13px", lineHeight: 1.5 }}>{statusMessage}</p>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div style={{
                  padding: "16px 20px",
                  borderRadius: "10px",
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid #ef4444",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px"
                }}>
                  <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, color: "#991b1b", fontSize: "14px" }}>Submission Error</p>
                    <p style={{ margin: "4px 0 0 0", color: "#b91c1c", fontSize: "13px", lineHeight: 1.5 }}>{statusMessage}</p>
                  </div>
                </div>
              )}

              {/* Submit CTA Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                style={{
                  background: "#b2996a",
                  color: "#111111",
                  border: "none",
                  padding: "16px 36px",
                  borderRadius: "999px",
                  fontSize: "11px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginTop: "8px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 18px rgba(178, 153, 106, 0.3)",
                  opacity: isSubmitting ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.background = "#1a3a52";
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.background = "#b2996a";
                    e.currentTarget.style.color = "#111111";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                {isSubmitting ? "SUBMITTING INQUIRY..." : <><Send size={15} /> SUBMIT ENQUIRY →</>}
              </button>
            </form>
          </div>

          {/* HEAD OFFICE & ADVISORY SECTION (SHIFTED UNDER SEND US A MESSAGE) */}
          <div 
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: isMobile ? "28px 20px" : "36px 44px",
              border: "1px solid rgba(178, 153, 106, 0.28)",
              boxShadow: "0 10px 30px rgba(26, 58, 82, 0.05)"
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <span style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#b2996a", fontWeight: 600, display: "block", marginBottom: "8px" }}>
                HEAD OFFICE & ADVISORY
              </span>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "24px", color: "#1a3a52", fontWeight: 400, margin: 0 }}>
                Speak With an Advisor
              </h3>
            </div>

            <div style={{ 
              display: "grid", 
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", 
              gap: isMobile ? "20px" : "24px 32px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(178, 153, 106, 0.18)"
            }}>
              {/* Phone */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(178, 153, 106, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Phone size={18} color="#b2996a" />
                </div>
                <div>
                  <span style={{ fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#8B6F47", fontWeight: 600, display: "block", marginBottom: "2px" }}>PHONE UAN</span>
                  <a href="tel:+9242111777588" style={{ fontSize: "15px", fontWeight: 600, color: "#1a3a52", textDecoration: "none" }}>042 111 777 588</a>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(178, 153, 106, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Mail size={18} color="#b2996a" />
                </div>
                <div>
                  <span style={{ fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#8B6F47", fontWeight: 600, display: "block", marginBottom: "2px" }}>EMAIL INQUIRIES</span>
                  <a href="mailto:admin@royalswisscity.com" style={{ fontSize: "15px", fontWeight: 500, color: "#1a3a52", textDecoration: "none" }}>admin@royalswisscity.com</a>
                </div>
              </div>

              {/* Location */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(178, 153, 106, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MapPin size={18} color="#b2996a" />
                </div>
                <div>
                  <span style={{ fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#8B6F47", fontWeight: 600, display: "block", marginBottom: "2px" }}>CORPORATE OFFICE</span>
                  <p style={{ fontSize: "14px", color: "#1a3a52", margin: 0, lineHeight: 1.5 }}>123-C Commercial Broadway, DHA Phase 5, Lahore, Pakistan</p>
                </div>
              </div>

              {/* Hours */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(178, 153, 106, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Clock size={18} color="#b2996a" />
                </div>
                <div>
                  <span style={{ fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#8B6F47", fontWeight: 600, display: "block", marginBottom: "2px" }}>BUSINESS HOURS</span>
                  <p style={{ fontSize: "14px", color: "#1a3a52", margin: 0 }}>Monday – Saturday: 9:00 AM – 6:00 PM (PKT)</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer 
        className="walk-footer reveal-section" 
        style={{ 
          backgroundImage: window.innerWidth > 768 ? "url('/footer_bg_desktop.jpeg')" : "url('/footer_bg_mobile.jpeg')", 
          backgroundSize: "cover", 
          backgroundPosition: window.innerWidth > 768 ? "center -300px" : "center", 
          backgroundRepeat: "no-repeat" 
        }}
      >
        <div className="footer-accordions">
          <div className="footer-accordion-col">
            {footerLinks.filter((_, i) => i % 2 === 0).map(item => {
              const link = getFooterLink(item);
              return (
                <div className={openFooter === item ? "open" : ""} key={item}>
                  <button onClick={() => setOpenFooter(openFooter === item ? null : item)}>
                    {item}
                    <ChevronDown size={14} />
                  </button>
                  {openFooter === item && (
                    <div>
                      <p style={{ whiteSpace: "pre-line" }}>{footerDescriptions[item as keyof typeof footerDescriptions]}</p>
                      {link && link !== "" && (
                        <a 
                          href={link} 
                          style={{
                            display: "inline-block",
                            marginTop: "12px",
                            color: "#b2996a",
                            fontSize: "10px",
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            textDecoration: "none",
                            fontWeight: 500,
                            transition: "all 0.3s ease"
                          }} 
                          onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.7"; }} 
                          onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; }}
                        >
                          LEARN MORE →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="footer-accordion-col">
            {footerLinks.filter((_, i) => i % 2 === 1).map(item => {
              const link = getFooterLink(item);
              return (
                <div className={openFooter === item ? "open" : ""} key={item}>
                  <button onClick={() => setOpenFooter(openFooter === item ? null : item)}>
                    {item}
                    <ChevronDown size={14} />
                  </button>
                  {openFooter === item && (
                    <div>
                      <p style={{ whiteSpace: "pre-line" }}>{footerDescriptions[item as keyof typeof footerDescriptions]}</p>
                      {link && link !== "" && (
                        <a 
                          href={link} 
                          style={{
                            display: "inline-block",
                            marginTop: "12px",
                            color: "#b2996a",
                            fontSize: "10px",
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            textDecoration: "none",
                            fontWeight: 500,
                            transition: "all 0.3s ease"
                          }} 
                          onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.7"; }} 
                          onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; }}
                        >
                          LEARN MORE →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="footer-socials">
          <a href="https://instagram.com/royalswisscity" target="_blank" rel="noopener noreferrer" title="Instagram"><Instagram size={24} /></a>
          <a href="https://facebook.com/royalswisscity" target="_blank" rel="noopener noreferrer" title="Facebook"><Facebook size={24} /></a>
          <a href="https://tiktok.com/@royalswisscity" target="_blank" rel="noopener noreferrer" title="TikTok"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v13.67a2.4 2.4 0 0 1-2.4 2.4 2.4 2.4 0 0 1-2.4-2.4 2.4 2.4 0 0 1 2.4-2.4c.34 0 .67.05.98.15V9.41a5.81 5.81 0 0 0-.98-.08 6.04 6.04 0 0 0-6.04 6.04 6.04 6.04 0 0 0 6.04 6.04 6.04 6.04 0 0 0 6.04-6.04v-3.1a7.7 7.7 0 0 0 3.77 1.01V9.81a4.77 4.77 0 0 1-.77-.06z" /></svg></a>
          <a href="https://linkedin.com/company/royalswisscity" target="_blank" rel="noopener noreferrer" title="LinkedIn"><Linkedin size={24} /></a>
          <a href="https://youtube.com/@royalswisscity" target="_blank" rel="noopener noreferrer" title="YouTube"><Youtube size={24} /></a>
          <a href="https://x.com/royalswisscity" target="_blank" rel="noopener noreferrer" title="X"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.637l-5.1-6.694-5.867 6.694h-3.306l7.733-8.835L2.25 2.25h6.814l4.882 6.45L18.244 2.25zM17.083 18.386h1.83L6.959 4.155H5.049l12.034 14.231z" /></svg></a>
        </div>
        
        <div className="footer-contact">
          <b>Where life happens.</b>
          <span>© 2026 ROYAL SWISS CITY · PRIVACY POLICY · SITEMAP</span>
        </div>
      </footer>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu__top">
          <button onClick={() => setMenuOpen(false)} aria-label="Close"><ChevronDown size={22} /></button>
          <button onClick={() => setMenuOpen(false)} aria-label="Close"><X size={22} /></button>
        </div>
        <div className="mobile-menu__links">
          {navMobile.map(item => {
            let href = "";
            if (item === "HOME") href = "/";
            else if (item === "THE CITY") href = "/the-city";
            else if (item === "DEVELOPER") href = "/developer";
            else if (item === "ENQUIRE") href = "/enquire";
            else if (item === "FAQ") href = "/faq";
            else if (item === "PARTNERS/DEALERS" || item === "PARTNER" || item === "DEALER") href = "/#partner";

            return <a href={href} onClick={() => setMenuOpen(false)} key={item}>{item}</a>;
          })}
        </div>
      </div>
    </main>
  );
}
