import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Menu, X, ArrowDown, Instagram, Facebook, Linkedin, Youtube, Leaf, Droplets, Recycle, Users } from "lucide-react";
import { HeroCapsuleAnimation } from "@/components/HeroCapsuleAnimation";
import { ShowcaseCarousel } from "@/components/ShowcaseCarousel";
import { Breadcrumb } from "@/components/Breadcrumb";
import { animateLegacySection, animateFooter, animateShowcaseSection } from "@/utils/sectionAnimations";
import { SEOHead } from "@/components/SEOHead";
import { SEO_CONFIG } from "@/config/seo";

const img = { logo: "/logo.webp?v=2", hero: "/city-aerial.jpg", city: "/city-aerial.jpg", developer: "/hrl-highrise.webp", green: "/green-energy.webp", chairman: "/chairman.webp", ceo: "/ceo.webp", partnership: "/hand_shaking.jpg", residences: "/hrl-roads.jpg", aerial: "/city-aerial.jpg" };

// SEO Keywords for on-page content
const SEO_KEYWORDS = {
  primary: "best society in lahore",
  secondary: "best place to live in lahore",
  tertiary: "gated community lahore",
  quaternary: "residential area pakistan",
  quinary: "luxury housing lahore",
  senary: "habib rafiq royal swiss city"
};
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
const communityCards = [
  { eyebrow: "BUILDINGS", title: "Convention Center Islamabad", body: "An EPC contract completed in record 11 months with 2,000 seats capacity and 18,000 m² area featuring advanced audio-visual facilities.", image: "/convention-centre-islamabad.webp" },
  { eyebrow: "BUILDINGS", title: "Bahria Icon Tower", body: "A 60-storey mixed-use development in Karachi with 30 residential floors and titanium glass façade.", image: "/bahria-icon-tower-karachi.webp" },
  { eyebrow: "INFRASTRUCTURE", title: "Lahore Ring Road Package 3", body: "Major infrastructure upgrade featuring extensive earthwork and complete electrification works.", image: "/lahore-ring-road-package-3-wide.webp" },
  { eyebrow: "BUILDINGS", title: "101 Tower Lahore", body: "A premium high-rise building combining residential and commercial spaces with modern architectural design and comprehensive MEP services.", image: "/101-tower-lahore.webp" },
  { eyebrow: "BUILDINGS", title: "Grand Jamia Mosque", body: "Majestic mosque with 70,000 person capacity including open compound, four 165-ft minarets, and 20 surrounding domes.", image: "/grand-jamia-mosque-bahria-town-lahore.webp" },
];
const features = [
  "Gated Community - Best Security in Lahore",
  "Solar Infrastructure - Eco-Friendly Residential Area",
  "Riverfront Setting - Premium Location in Pakistan",
  "Wide Boulevards - 40 Feet Roads for Easy Access",
  "Education & Healthcare - Complete Amenities in Lahore",
  "Retail & Services - Shopping & Dining in Lahore Society",
  "Sports & Recreation - Best Lifestyle in Lahore",
  "Water Management - Sustainable Living in Pakistan"
];
function Logo() { return <img className="brand-logo" src={img.logo} alt="Royal Swiss City - Premium Gated Community Logo" loading="eager" /> }
function Anchor({ item }: { item: string }) {
  if (item === "DEVELOPER") {
    return <a href="/developer">{item}</a>
  }
  if (item === "HOME") {
    return <a href="/">{item}</a>
  }
  if (item === "ENQUIRE") {
    return <a href="/enquire">{item}</a>
  }
  if (item === "FAQ") {
    return <a href="/faq">{item}</a>
  }
  if (item === "THE CITY") {
    return <a href="/the-city">{item}</a>
  }
  if (item === "PARTNERS/DEALERS" || item === "PARTNER" || item === "DEALER") {
    return <a href="/#partner">{item}</a>
  }
  return <a href={`#${item.toLowerCase().replaceAll(" ", "-")}`}>{item}</a>
}
const dealersData = [
  {
    name: "NATIONAL MARKETING REAL ESTATE & BUILDERS",
    type: "Authorized Sales Partner",
    location: "Lahore, Pakistan",
    description: "Authorized sales and marketing partner for Royal Swiss City, providing specialized real estate consultation, investment portfolio management, and premier residential and commercial opportunities.",
    logo: "/NATIONAL MARKETING REAL ESTATE & BUILDERS.jpg"
  },
  {
    name: "REHMAN PROPERTIES & MARKETING",
    type: "Authorized Sales Partner",
    location: "Lahore, Pakistan",
    description: "Trusted real estate and marketing experts delivering bespoke property guidance, reliable plot bookings, and strategic investor support across Royal Swiss City.",
    logo: "/REHMAN PROPERTIES & MARKETING.jpg"
  },
  {
    name: "WALL.PK",
    type: "Authorized Sales Partner",
    location: "Lahore, Pakistan",
    description: "Leading digital real estate network and authorized sales partner offering innovative marketing, transparent property advisory, and high-yield investment options at Royal Swiss City.",
    logo: "/WALL.PK.jpg"
  },
  {
    name: "BURHAN REAL ESTATE",
    type: "Authorized Sales Partner",
    location: "Lahore, Pakistan",
    description: "Distinguished property consultants committed to excellence, assisting clients and investors with premier residential and commercial plots at Royal Swiss City.",
    logo: "/BURHAN REAL ESTATE.jpg"
  }
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false); const [scrolled, setScrolled] = useState(false); const [scrollY, setScrollY] = useState(0); const [openFooter, setOpenFooter] = useState<string | null>(null); const [selectedDealer, setSelectedDealer] = useState<any>(null); const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth <= 768);

  // SEO Head - Home Page
  const homePageStructuredData = {
    ...SEO_CONFIG.schema.organization,
    ...SEO_CONFIG.schema.realEstateProject,
    "areaServed": ["Lahore", "Pakistan", "International"],
  };
  useEffect(() => { let f = 0; const fn = () => { cancelAnimationFrame(f); f = requestAnimationFrame(() => { setScrollY(window.scrollY); setScrolled(window.scrollY > 28) }) }; fn(); window.addEventListener("scroll", fn, { passive: true }); return () => { cancelAnimationFrame(f); window.removeEventListener("scroll", fn) } }, []);
  useEffect(() => { const checkMobile = () => { const mobile = window.innerWidth <= 768; setIsMobile(mobile); console.log("Mobile check:", mobile, "Width:", window.innerWidth); }; checkMobile(); window.addEventListener("resize", checkMobile); return () => window.removeEventListener("resize", checkMobile); }, []);
  useEffect(() => { const o = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: .12, rootMargin: "0px 0px -70% 0px" }); document.querySelectorAll(".reveal-section,.reveal-item").forEach(n => o.observe(n)); return () => o.disconnect() }, []);
  useEffect(() => {
    const legacyElement = document.querySelector(".legacy-section");
    const footerElement = document.querySelector(".walk-footer.reveal-section");
    const showcaseElement = document.querySelector(".showcase-section");

    if (legacyElement) animateLegacySection(legacyElement);
    if (footerElement) animateFooter(footerElement);
    if (showcaseElement) animateShowcaseSection(showcaseElement);
  }, []);
  const vh = typeof window !== "undefined" ? window.innerHeight : 800; const heroProgress = Math.min(scrollY / Math.max(vh, 800), 1);
  return <main className="walkthrough-page home-page" style={{ "--hero-progress": heroProgress } as React.CSSProperties}>
    
    {/* SEO Head Component */}
    <SEOHead
      title={SEO_CONFIG.pages.home.title}
      description={SEO_CONFIG.pages.home.description}
      keywords={SEO_CONFIG.pages.home.keywords}
      canonical={SEO_CONFIG.pages.home.canonical}
      ogImage="https://royalswisscity.com/city-aerial.jpg"
      ogDescription="Experience premium gated community living at Royal Swiss City - 60+ years of Habib Rafiq legacy"
      language="en"
      structuredData={homePageStructuredData}
      alternate={[
        { hrefLang: "ur", href: "https://royalswisscity.com/ur" },
        { hrefLang: "en-pk", href: "https://royalswisscity.com" },
        { hrefLang: "en", href: "https://royalswisscity.com/en" },
      ]}
    />
    
    {/* Breadcrumb Navigation */}
    <Breadcrumb />
    
    <header className={`walk-header ${scrolled ? "is-scrolled" : ""}`}><button className="mobile-menu-trigger" aria-label="Menu" onClick={() => setMenuOpen(true)}><Menu size={22} strokeWidth={1.4} /></button><nav className="desktop-links desktop-links--left">{nav.slice(0, 3).map(item => <Anchor key={item} item={item} />)}</nav><a className="centered-brand" href="/"><Logo /></a><nav className="desktop-links desktop-links--right">{nav.slice(3).map(item => <Anchor key={item} item={item} />)}</nav></header>
    {/* Main H1 - Primary page topic for SEO */}
    <h1 style={{ position: "absolute", left: "-9999px", top: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
      Royal Swiss City Lahore - Best Gated Community & Luxury Housing by Habib Rafiq
    </h1>
    
    <HeroCapsuleAnimation />
    {!isMobile && (
      <section 
        id="location" 
        className="showcase-section showcase-section-desktop reveal-section" 
        style={{ 
          backgroundImage: "url('/hrl_own_building.webp?v=2')", 
          backgroundSize: "cover", 
          backgroundRepeat: "no-repeat", 
          backgroundPosition: "center", 
          position: "relative", 
          overflow: "hidden", 
          minHeight: "clamp(480px, 68vh, 580px)", 
          display: "flex", 
          alignItems: "center",
          padding: "24px 0",
          boxSizing: "border-box"
        }}
      >
        {/* Soft white gradient on the left behind text, transparent in the middle and right */}
        <div 
          style={{ 
            position: "absolute", 
            inset: 0, 
            background: "linear-gradient(to right, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.88) 16%, rgba(255, 255, 255, 0.3) 28%, rgba(255, 255, 255, 0) 44%)", 
            pointerEvents: "none", 
            zIndex: 1 
          }} 
        />

        {/* Content container - Flush to left and right edges */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", width: "100%", maxWidth: "none", margin: "0", padding: "0 0 0 40px", justifyContent: "space-between", alignItems: "center" }}>

          {/* LEFT COLUMN - Exact Legacy Lockup flush to the left edge */}
          <div className="legacy-lockup" style={{ flex: "0 1 auto", display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left", padding: "0" }}>
            <div className="legacy-number-wrapper" style={{ justifyContent: "flex-start" }}>
              <span className="legacy-num-60">60</span>
              <span className="legacy-plus-sign">+</span>
            </div>
            <span className="legacy-label-years" style={{ textAlign: "left", padding: "0", fontSize: "14px", fontWeight: 400, margin: "8px 0 0 0", display: "block" }}>YEARS OF LEGACY</span>
            <p className="legacy-label-legacy" style={{ textAlign: "left", fontSize: "32px", fontWeight: 700, margin: "4px 0" }}>HABIB RAFIQ</p>
            <div className="legacy-divider-line" />
            <p className="legacy-tagline" style={{ textAlign: "left" }}>ROYAL SWISS CITY - SHAPING COMMUNITIES, BUILDING BETTER TOMORROW</p>
            {/* Hidden SEO text */}
            <div style={{ display: "none", fontSize: "0", height: "0", overflow: "hidden" }}>
              <p>Royal Swiss City Lahore - best gated community in lahore with 60 years habib rafiq legacy. Premium luxury housing pakistan. Smart city eco friendly green living investment opportunity.</p>
            </div>
          </div>

          {/* RIGHT COLUMN - 3 compact stacked cards positioned 14px from right border */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "clamp(195px, 14vw, 235px)", minWidth: "190px", marginLeft: "auto", marginRight: "14px" }}>
            {/* Card 1 */}
            <div style={{ position: "relative", height: "clamp(120px, 8.5vw, 145px)", borderRadius: "6px", overflow: "hidden", cursor: "pointer", transition: "all 0.3s ease", boxShadow: "0 6px 18px rgba(0,0,0,0.25)" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.025)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
              <img src="/bahria-icon-tower-karachi.webp" alt="Bahria Icon Tower Karachi - Habib Rafiq iconic developments - best projects in pakistan" width={235} height={145} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1))" }}></div>
              <div style={{ position: "absolute", bottom: "10px", right: "14px", color: "white", textAlign: "right" }}>
                <p style={{ fontSize: "8.5px", letterSpacing: "1.5px", margin: "0", opacity: 0.85, textTransform: "uppercase", fontFamily: "var(--serif)", fontWeight: 400 }}>ICONIC</p>
                <p style={{ fontSize: "11.5px", fontWeight: 600, margin: "2px 0 0 0", textTransform: "uppercase", letterSpacing: "0.8px", fontFamily: "var(--serif)" }}>DEVELOPMENTS</p>
              </div>
            </div>

            {/* Card 2 */}
            <div style={{ position: "relative", height: "clamp(120px, 8.5vw, 145px)", borderRadius: "6px", overflow: "hidden", cursor: "pointer", transition: "all 0.3s ease", boxShadow: "0 6px 18px rgba(0,0,0,0.25)" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.025)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
              <img src="/grand-jamia-mosque-bahria-town-lahore.webp" alt="Grand Jamia Mosque Bahria Town Lahore - Habib Rafiq communities - lasting developments pakistan" width={235} height={145} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1))" }}></div>
              <div style={{ position: "absolute", bottom: "10px", right: "14px", color: "white", textAlign: "right" }}>
                <p style={{ fontSize: "8.5px", letterSpacing: "1.5px", margin: "0", opacity: 0.85, textTransform: "uppercase", fontFamily: "var(--serif)", fontWeight: 400 }}>LASTING</p>
                <p style={{ fontSize: "11.5px", fontWeight: 600, margin: "2px 0 0 0", textTransform: "uppercase", letterSpacing: "0.8px", fontFamily: "var(--serif)" }}>COMMUNITIES</p>
              </div>
            </div>

            {/* Card 3 */}
            <div style={{ position: "relative", height: "clamp(120px, 8.5vw, 145px)", borderRadius: "6px", overflow: "hidden", cursor: "pointer", transition: "all 0.3s ease", boxShadow: "0 6px 18px rgba(0,0,0,0.25)" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.025)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
              <img src="/101-tower-lahore.webp" alt="101 Tower Lahore - Premium residential commercial development - best housing projects lahore" width={235} height={145} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1))" }}></div>
              <div style={{ position: "absolute", bottom: "10px", right: "14px", color: "white", textAlign: "right" }}>
                <p style={{ fontSize: "8.5px", letterSpacing: "1.5px", margin: "0", opacity: 0.85, textTransform: "uppercase", fontFamily: "var(--serif)", fontWeight: 400 }}>A STRONGER</p>
                <p style={{ fontSize: "11.5px", fontWeight: 600, margin: "2px 0 0 0", textTransform: "uppercase", letterSpacing: "0.8px", fontFamily: "var(--serif)" }}>PAKISTAN</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )}

    {isMobile && (
      <>
        <section 
          id="location-mobile" 
          className="showcase-section showcase-section-mobile reveal-section" 
          style={{ 
            backgroundImage: "url('/hrl_own_building.webp?v=2')", 
            backgroundSize: "cover", 
            backgroundPosition: "47% center", 
            backgroundRepeat: "no-repeat", 
            minHeight: "260px", 
            position: "relative", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "flex-start", 
            justifyContent: "center", 
            padding: "20px 20px", 
            boxSizing: "border-box" 
          }}
        >
          {/* Subtle soft gradient on left for text legibility */}
          <div 
            style={{ 
              position: "absolute", 
              inset: 0, 
              background: "linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 25%, rgba(255, 255, 255, 0.7) 40%, rgba(255, 255, 255, 0.2) 55%, rgba(255, 255, 255, 0) 68%)", 
              pointerEvents: "none", 
              zIndex: 1 
            }} 
          />
          <div 
            className="legacy-lockup" 
            style={{ 
              position: "relative", 
              zIndex: 2, 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "flex-start", 
              textAlign: "left", 
              padding: "0", 
              margin: "0" 
            }}
          >
            <div className="legacy-number-wrapper" style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", lineHeight: 0.82 }}>
              <span className="legacy-num-60" style={{ fontSize: "46px", lineHeight: "0.82" }}>60</span>
              <span className="legacy-plus-sign" style={{ fontSize: "18px", marginTop: "2px", marginLeft: "2px" }}>+</span>
            </div>
            <p className="legacy-label-years" style={{ fontSize: "9px", marginTop: "7px", marginBottom: "1px", textAlign: "left", padding: "0", letterSpacing: "0.2em", color: "#8B6F47", fontWeight: 600, fontFamily: "var(--serif)" }}>YEARS OF</p>
            <span className="legacy-label-legacy" style={{ fontSize: "23px", textAlign: "left", display: "block", color: "#1a3a52", fontWeight: 700, fontFamily: "var(--serif)", letterSpacing: "0.04em", lineHeight: 1, margin: 0 }}>LEGACY</span>
          </div>
        </section>

        <section style={{ backgroundColor: "#faf7f0", position: "relative", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "30px 20px 0px 10px", position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: "14px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8B6F47", margin: "0", fontWeight: 600, fontFamily: "var(--serif)" }}>OUR PROJECTS</p>
            <a href="/developer" style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#0B1E2B", textDecoration: "none", fontWeight: 700, fontFamily: "var(--serif)", display: "flex", alignItems: "center", gap: "6px" }}>View All →</a>
          </div>
          <div style={{ position: "relative", zIndex: 1, flex: 1, width: "100vw", marginLeft: "calc(-50vw + 50%)", padding: "5px 0" }}>
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <ShowcaseCarousel cards={communityCards} />
              {/* Navigation buttons - positioned on top */}
              <button
                onClick={() => document.dispatchEvent(new CustomEvent("carousel-prev"))}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(0, 0, 0, 0.2)",
                  border: "none",
                  borderRadius: "4px",
                  padding: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  zIndex: 20,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(0, 0, 0, 0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(0, 0, 0, 0.2)";
                }}
                aria-label="Previous card"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button
                onClick={() => document.dispatchEvent(new CustomEvent("carousel-next"))}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(0, 0, 0, 0.2)",
                  border: "none",
                  borderRadius: "4px",
                  padding: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  zIndex: 20,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(0, 0, 0, 0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(0, 0, 0, 0.2)";
                }}
                aria-label="Next card"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </section>
      </>
    )}

    <section className="legacy-quotes-section reveal-section">
      {/* Section Header */}
      <div className="legacy-section-header">
        <div className="header-title">
          <h2>LEADERSHIP & LEGACY</h2>
          <span style={{ fontSize: "18px", fontWeight: 400, color: "#b2996a", letterSpacing: "0.1em", marginTop: "10px", display: "block" }}></span>
        </div>
        <p className="header-subtitle">TWO GENERATIONS. ONE ENDURING VISION. | Building the best place to live in lahore since 1962</p>
        <div className="header-divider">
          <span></span>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
            <circle cx="4" cy="4" r="4" />
          </svg>
          <span></span>
        </div>
        {/* Hidden SEO content */}
        <div style={{ display: "none", fontSize: "0", overflow: "hidden" }}>
          <p>Royal Swiss City represents the best society in lahore. Our gated community in lahore features world-class amenities. As the best place to live in lahore, Royal Swiss City offers luxury housing in lahore. This residential area in pakistan is developed by habib rafiq, delivering premium residential plots in lahore. The best gated community in lahore pakistan with commercial plots in lahore for investment properties in lahore.</p>
        </div>
      </div>

      {/* Desktop Version - Full Cards */}
      {!isMobile && (
        <div className="legacy-quotes">
          {/* Chairman Card */}
          <article className="legacy-card legacy-card--chairman reveal-item">
            <div className="legacy-card__image-wrapper">
              <img src={img.chairman} alt="Shahid Rafiq - Chairman Habib Rafiq, 60 Years Real Estate Leadership" />
              <div className="legacy-card__image-label">
                <span>YEARS OF TRUST, QUALITY & EXCELLENCE</span>
              </div>
            </div>
            <div className="legacy-card__divider"></div>
            <div className="legacy-card__content">
              <small>CHAIRMAN</small>
              <h3 style={{ textTransform: "uppercase" }}>SHAHID RAFIQ</h3>
              <div className="legacy-card__decoration">
                <span></span>
                <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
                  <circle cx="3" cy="3" r="3" />
                </svg>
                <span></span>
              </div>
              <div className="legacy-card__quote-section">
                <div className="legacy-card__quote-mark">"</div>
                <p className="legacy-quote">Building on this legacy, we now bring the same expertise to modern housing.</p>
              </div>
              <a href="/developer#chairman-message" style={{ display: "block", marginTop: "16px", marginBottom: "16px", color: "#b2996a", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", textDecoration: "none", fontWeight: 500, transition: "all 0.3s ease" }} onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.7"; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; }}>READ FULL MESSAGE →</a>
              <div className="legacy-card__signature">
                <p>CHAIRMAN, HABIB RAFIQ CONSTRUCTION (PVT.) LTD.</p>
              </div>
              <div className="legacy-card__watermark">HRL CONSTRUCTION PVT LIMITED</div>
            </div>
          </article>

          {/* CEO Card */}
          <article className="legacy-card legacy-card--ceo reveal-item">
            <div className="legacy-card__image-wrapper">
              <img src={img.ceo} alt="Sohaib Hassan - CEO Royal Swiss City, Leading Premium Development" />
              <div className="legacy-card__image-label">
                <span>A VISION FOR TODAY. A PROMISE FOR TOMORROW.</span>
              </div>
            </div>
            <div className="legacy-card__divider"></div>
            <div className="legacy-card__content">
              <small>CHIEF EXECUTIVE</small>
              <h3 style={{ textTransform: "uppercase" }}>SOHAIB HASSAN</h3>
              <div className="legacy-card__decoration">
                <span></span>
                <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
                  <circle cx="3" cy="3" r="3" />
                </svg>
                <span></span>
              </div>
              <div className="legacy-card__quote-section">
                <div className="legacy-card__quote-mark">"</div>
                <p className="legacy-quote">We are creating spaces where future generations can thrive.</p>
              </div>
              <a href="/developer#ceo-message" style={{ display: "block", marginTop: "16px", marginBottom: "16px", color: "#b2996a", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", textDecoration: "none", fontWeight: 500, transition: "all 0.3s ease" }} onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.7"; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; }}>READ FULL MESSAGE →</a>
              <div className="legacy-card__signature">
                <p>CHIEF EXECUTIVE</p>
              </div>
              <div className="legacy-card__watermark">HRL CONSTRUCTION PVT LIMITED</div>
            </div>
          </article>
        </div>
      )}

      {/* Mobile Version - Simple Layout */}
      {isMobile && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", margin: "30px 0 40px 0" }}>
          {/* Chairman Card Mobile */}
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "100%", borderRadius: "8px", overflow: "hidden", marginBottom: "10px", height: "160px" }}>
              <img src={img.chairman} alt="Shahid Rafiq - Chairman Habib Rafiq, 60 Years Real Estate Leadership" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
            </div>
            <h4 style={{ fontSize: "13px", fontWeight: 400, color: "#b2996a", margin: "0 0 3px 0", fontFamily: "var(--serif)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Shahid Rafiq</h4>
            <p style={{ fontSize: "10px", color: "#b2996a", margin: "0", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--serif)", fontWeight: 300 }}>Chairman</p>
          </div>

          {/* CEO Card Mobile */}
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "100%", borderRadius: "8px", overflow: "hidden", marginBottom: "10px", height: "160px" }}>
              <img src={img.ceo} alt="Sohaib Hassan - CEO Royal Swiss City, Leading Premium Development" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
            </div>
            <h4 style={{ fontSize: "13px", fontWeight: 400, color: "#b2996a", margin: "0 0 3px 0", fontFamily: "var(--serif)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Sohaib Hassan</h4>
            <p style={{ fontSize: "10px", color: "#b2996a", margin: "0", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--serif)", fontWeight: 300 }}>Chief Executive</p>
          </div>
        </div>
      )}

    </section>

    <section className="future-section reveal-section" style={{ backgroundImage: window.innerWidth > 768 ? "url('/thefuture_bg_desktop.webp')" : "none", backgroundSize: window.innerWidth > 768 ? "1000px 600px" : "280px auto", backgroundPosition: window.innerWidth > 768 ? "top -50px right" : "0px 0px", backgroundRepeat: "no-repeat", minHeight: window.innerWidth > 768 ? "350px" : "400px", display: "flex", flexDirection: "column", justifyContent: "flex-start", paddingTop: "0px", paddingLeft: window.innerWidth > 768 ? "8vw" : "8vw", paddingRight: "8vw", backgroundColor: "#f4f4f4", backgroundClip: "padding-box" }}>
      {window.innerWidth <= 768 && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "0px", width: "100%", marginLeft: "-8vw", marginRight: "-8vw", paddingLeft: "8vw", paddingRight: "8vw" }}>
          <img src="/thefuture_bg_mobile.webp" alt="The Future - Royal Swiss City Vision for Sustainable Development in Lahore" width={500} height={300} style={{ width: "90vw", maxWidth: "500px", height: "auto", display: "block", border: "none" }} />
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "row", gap: "6vw", alignItems: "center", maxWidth: "100%", overflow: "hidden", paddingTop: window.innerWidth > 768 ? "20px" : "0px" }}><div style={{ flex: 1, minWidth: 0 }}><span className="section-kicker">THE FUTURE</span><h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(45px, 6vw, 85px)", fontWeight: 300, lineHeight: 0.84, marginBottom: "20px", color: "#1a3a52" }}>Built around<br /><em>sustainable living.</em></h2><p style={{ fontSize: "14px", lineHeight: 1.75, color: "#6b645c", maxWidth: "430px" }}>Royal Swiss City is designed with environmental responsibility at its core. From solar infrastructure to water management systems, every element reflects our commitment to creating a sustainable community for generations to come.</p></div></div>

      {/* Sustainability Icons */}
      <div className="sustainability-icons-grid" style={{ display: "grid", gridTemplateColumns: window.innerWidth <= 370 ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: window.innerWidth <= 370 ? "12px" : "30px", marginTop: window.innerWidth > 768 ? "85px" : "60px", marginBottom: "0px", textAlign: "center", padding: window.innerWidth <= 370 ? "0 12px" : "0" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "60px", height: "60px", borderRadius: "50%", border: "1.5px solid #b2996aff", marginBottom: "12px" }}>
            <Leaf size={28} color="#b2996aff" strokeWidth={1.5} />
          </div>
          <h3 style={{ fontSize: "11px", fontWeight: 600, color: "#1a3a52", margin: "0 0 4px 0", textTransform: "uppercase", letterSpacing: "0.08em" }}>GREEN SPACES</h3>
          <p style={{ fontSize: "10px", color: "#6b645c", margin: "0", lineHeight: 1.4 }}>For a healthier life</p>
        </div>

        <div>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "60px", height: "60px", borderRadius: "50%", border: "1.5px solid #b2996aff", marginBottom: "12px" }}>
            <Droplets size={28} color="#b2996aff" strokeWidth={1.5} />
          </div>
          <h3 style={{ fontSize: "11px", fontWeight: 600, color: "#1a3a52", margin: "0 0 4px 0", textTransform: "uppercase", letterSpacing: "0.08em" }}>WATER SENSITIVE</h3>
          <p style={{ fontSize: "10px", color: "#6b645c", margin: "0", lineHeight: 1.4 }}>Sustainable systems</p>
        </div>

        <div>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "60px", height: "60px", borderRadius: "50%", border: "1.5px solid #b2996aff", marginBottom: "12px" }}>
            <Recycle size={28} color="#b2996aff" strokeWidth={1.5} />
          </div>
          <h3 style={{ fontSize: "11px", fontWeight: 600, color: "#1a3a52", margin: "0 0 4px 0", textTransform: "uppercase", letterSpacing: "0.08em" }}>CLEAN ENERGY</h3>
          <p style={{ fontSize: "10px", color: "#6b645c", margin: "0", lineHeight: 1.4 }}>For a better future</p>
        </div>

        <div>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "60px", height: "60px", borderRadius: "50%", border: "1.5px solid #b2996aff", marginBottom: "12px" }}>
            <Users size={28} color="#b2996aff" strokeWidth={1.5} />
          </div>
          <h3 style={{ fontSize: "11px", fontWeight: 600, color: "#1a3a52", margin: "0 0 4px 0", textTransform: "uppercase", letterSpacing: "0.08em" }}>COMMUNITY FIRST</h3>
          <p style={{ fontSize: "10px", color: "#6b645c", margin: "0", lineHeight: 1.4 }}>Stronger together</p>
        </div>
      </div>
    </section>

    <section style={{ background: "linear-gradient(135deg, #fae3bb 0%, #c9bfb3 50%, #d6d0c6 100%)", padding: "40px 0 80px 0" }}>
      <div style={{ maxWidth: "100%", margin: "0 auto", paddingLeft: window.innerWidth <= 768 ? "4vw" : "8vw", paddingRight: window.innerWidth <= 768 ? "4vw" : "8vw" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span style={{ fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#b2996a", margin: "0 0 12px 0", fontWeight: 500, display: "block" }}>THE OPPORTUNITY</span>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontFamily: "var(--serif)", fontWeight: 300, color: "#1a3a52", margin: "0", lineHeight: 1.2 }}>YOUR PLACE IN<br />WHAT COMES NEXT</h2>
        </div>
        {/* Mobile: 1 Residential + 1 Commercial */}
        <div style={{ display: window.innerWidth > 768 ? "none" : "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "60px" }} className="mobile-plot-options">
          {/* Residential Card */}
          <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e0d9d1", overflow: "hidden" }}>
            <div style={{ height: "100px", overflow: "hidden", backgroundColor: "#f0f0f0" }}>
              <img src="/residential_plots.webp" alt="Residential Plots in Royal Swiss City - MARLA 3.5 to KANAL 2 Options" width={300} height={100} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: "12px", textAlign: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3a52" strokeWidth="1.5" style={{ display: "block", margin: "0 auto 6px" }}>
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span style={{ fontSize: "8px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", margin: "0 0 4px 0", display: "block" }}>RESIDENTIAL</span>
              <h3 style={{ fontSize: "10px", fontWeight: 400, color: "#1a3a52", margin: "0" }}>MARLA 3.5</h3>
            </div>
          </div>

          {/* Commercial Card */}
          <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e0d9d1", overflow: "hidden" }}>
            <div style={{ height: "100px", overflow: "hidden", backgroundColor: "#f0f0f0" }}>
              <img src="/commerical_plots.webp" alt="Commercial Plots in Royal Swiss City - MARLA 2, 4, and 8 Sizes" width={300} height={100} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: "12px", textAlign: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3a52" strokeWidth="1.5" style={{ display: "block", margin: "0 auto 6px" }}>
                <rect x="3" y="3" width="18" height="18" rx="1" />
                <rect x="7" y="7" width="3" height="3" />
                <rect x="13" y="7" width="3" height="3" />
                <rect x="7" y="13" width="3" height="3" />
                <rect x="13" y="13" width="3" height="3" />
                <rect x="13" y="19" width="4" height="2" />
              </svg>
              <span style={{ fontSize: "8px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", margin: "0 0 4px 0", display: "block" }}>COMMERCIAL</span>
              <h3 style={{ fontSize: "10px", fontWeight: 400, color: "#1a3a52", margin: "0" }}>MARLA 2</h3>
            </div>
          </div>
        </div>

        {/* Desktop: 2 Residential + 2 Commercial */}
        <div style={{ display: window.innerWidth > 768 ? "grid" : "none", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "40px" }} className="desktop-plot-options">
          {/* Residential Card 1 */}
          <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e0d9d1", overflow: "hidden" }}>
            <div style={{ height: "120px", overflow: "hidden", backgroundColor: "#f0f0f0" }}>
              <img src="/residential_plots.webp" alt="Residential Plots in Royal Swiss City - MARLA 3.5 to KANAL 2 Options" width={300} height={100} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: "15px", textAlign: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a3a52" strokeWidth="1.5" style={{ display: "block", margin: "0 auto 8px" }}>
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <p style={{ fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", margin: "0 0 4px 0" }}>RESIDENTIAL</p>
              <h3 style={{ fontSize: "12px", fontWeight: 400, color: "#1a3a52", margin: "0" }}>MARLA 3.5</h3>
            </div>
          </div>

          {/* Residential Card 2 */}
          <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e0d9d1", overflow: "hidden" }}>
            <div style={{ height: "120px", overflow: "hidden", backgroundColor: "#f0f0f0" }}>
              <img src="/residential_plots.webp" alt="Residential Plots in Royal Swiss City - MARLA 3.5 to KANAL 2 Options" width={300} height={100} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: "15px", textAlign: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a3a52" strokeWidth="1.5" style={{ display: "block", margin: "0 auto 8px" }}>
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <p style={{ fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", margin: "0 0 4px 0" }}>RESIDENTIAL</p>
              <h3 style={{ fontSize: "12px", fontWeight: 400, color: "#1a3a52", margin: "0" }}>MARLA 5</h3>
            </div>
          </div>

          {/* Commercial Card 1 */}
          <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e0d9d1", overflow: "hidden" }}>
            <div style={{ height: "120px", overflow: "hidden", backgroundColor: "#f0f0f0" }}>
              <img src="/commerical_plots.webp" alt="Commercial Plots in Royal Swiss City - MARLA 2, 4, and 8 Sizes" width={300} height={100} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: "15px", textAlign: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a3a52" strokeWidth="1.5" style={{ display: "block", margin: "0 auto 8px" }}>
                <rect x="3" y="3" width="18" height="18" rx="1" />
                <rect x="7" y="7" width="3" height="3" />
                <rect x="13" y="7" width="3" height="3" />
                <rect x="7" y="13" width="3" height="3" />
                <rect x="13" y="13" width="3" height="3" />
                <rect x="13" y="19" width="4" height="2" />
              </svg>
              <p style={{ fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", margin: "0 0 4px 0" }}>COMMERCIAL</p>
              <h3 style={{ fontSize: "12px", fontWeight: 400, color: "#1a3a52", margin: "0" }}>MARLA 2</h3>
            </div>
          </div>

          {/* Commercial Card 2 */}
          <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e0d9d1", overflow: "hidden" }}>
            <div style={{ height: "120px", overflow: "hidden", backgroundColor: "#f0f0f0" }}>
              <img src="/commerical_plots.webp" alt="Commercial Plots in Royal Swiss City - MARLA 2, 4, and 8 Sizes" width={300} height={100} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: "15px", textAlign: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a3a52" strokeWidth="1.5" style={{ display: "block", margin: "0 auto 8px" }}>
                <rect x="3" y="3" width="18" height="18" rx="1" />
                <rect x="7" y="7" width="3" height="3" />
                <rect x="13" y="7" width="3" height="3" />
                <rect x="7" y="13" width="3" height="3" />
                <rect x="13" y="13" width="3" height="3" />
                <rect x="13" y="19" width="4" height="2" />
              </svg>
              <p style={{ fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", margin: "0 0 4px 0" }}>COMMERCIAL</p>
              <h3 style={{ fontSize: "12px", fontWeight: 400, color: "#1a3a52", margin: "0" }}>MARLA 4</h3>
            </div>
          </div>
        </div><div style={{ textAlign: "center" }}><a href="/enquire" style={{ background: "#b2996a", color: "#111", border: "none", padding: "12px 28px", borderRadius: "999px", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none", display: "inline-block", fontWeight: 500, transition: "all 0.3s ease" }} onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.7"; (e.target as HTMLElement).style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; (e.target as HTMLElement).style.transform = "translateY(0)"; }}>EXPLORE ALL OPTIONS</a></div>
      </div>
    </section>

    {!isMobile && (
      <section id="partner" className="partner-strip reveal-section" style={{ backgroundColor: "#FAFAFA", backgroundPosition: "center -150px" }}>
        {/* Top Row: Picture on Left, Text on Right aligned in a straight line */}
        <div style={{ display: "grid", gridTemplateColumns: "38% 1fr", gap: "clamp(36px, 5vw, 68px)", width: "100%", maxWidth: "1160px", alignItems: "center", margin: "0 auto 50px" }}>
          <div style={{ width: "100%", borderRadius: "8px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}>
            <img 
              src={img.partnership} 
              alt="Royal Swiss City Partnership Network - Sales Partners and Dealers" 
              style={{ width: "100%", height: "350px", objectFit: "cover", display: "block" }} 
              loading="lazy" 
            />
          </div>
          <div>
            <p className="section-kicker" style={{ color: "#1a3a52", marginBottom: "8px" }}>PARTNERSHIP</p>
            <h2 style={{ color: "#1a3a52", fontFamily: "var(--serif)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300, lineHeight: 1, margin: "0 0 20px" }}>
              PARTNER WITH US<br />
            </h2>
            <p style={{ color: "#1a3a52", fontSize: "14px", lineHeight: 1.75, maxWidth: "480px", margin: "0 0 24px" }}>
              Join the Royal Swiss City partner network and help your clients find a place they'll be proud to call home. We'll give you the tools, support, and information you need to guide them with confidence.
            </p>
            <a 
              className="outline-cta" 
              href="/enquire" 
              style={{ transition: "all 0.3s ease", background: "#1a3a52", color: "#fff", borderColor: "#1a3a52" }} 
              onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.7"; (e.target as HTMLElement).style.transform = "translateY(-2px)"; }} 
              onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; (e.target as HTMLElement).style.transform = "translateY(0)"; }}
            >
              APPLY FOR PARTNERSHIP
            </a>
          </div>
        </div>

        {/* Bottom: 4 Authorized Dealers Centered Under Both Picture and Text */}
        <div style={{ width: "100%", maxWidth: "1160px", margin: "0 auto", textAlign: "center" }}>
          <h3 className="partner-section-subtitle">
            AUTHORIZED DEALERS & SALES PARTNERS
          </h3>
          <div className="partner-cards-grid">
            {dealersData.slice(0, 4).map((dealer, i) => (
              <div 
                key={i} 
                className="partner-card"
                onClick={() => setSelectedDealer(dealer)}
              >
                <div className="partner-card-logo-wrap">
                  {dealer.logo ? (
                    <img src={dealer.logo} alt={dealer.name} loading="lazy" />
                  ) : (
                    <span style={{ fontSize: "10px", color: "#1a3a52" }}>Logo</span>
                  )}
                </div>
                <div className="partner-card-info">
                  <div className="partner-card-name">{dealer.name}</div>
                  <div className="partner-card-type">{dealer.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )}

    {isMobile && (
      <section id="partner" className="partner-strip" style={{ backgroundColor: "#FAFAFA", backgroundPosition: "center -150px", marginTop: "300px" }}>
        <img src={img.partnership} alt="Royal Swiss City Partnership Network - Sales Partners and Dealers" style={{ marginTop: "-370px", width: "100%", height: "auto" }} loading="lazy" />
        <div>
          <p className="section-kicker" style={{ color: "#1a3a52" }}>PARTNERSHIP</p>
          <h2 style={{ color: "#1a3a52", fontFamily: "var(--serif)", fontSize: "clamp(32px, 4vw, 55px)", fontWeight: 300, lineHeight: 0.9, margin: "0 0 24px" }}>PARTNER WITH US<br /></h2>
          <p style={{ color: "#1a3a52" }}>Join the Royal Swiss City partner network and help your clients find a place they'll be proud to call home. We'll give you the tools, support, and information you need to guide them with confidence.</p>
          <a className="outline-cta" href="/enquire" style={{ transition: "all 0.3s ease", background: "#1a3a52", color: "#fff", borderColor: "#1a3a52" }} onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.7"; (e.target as HTMLElement).style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; (e.target as HTMLElement).style.transform = "translateY(0)"; }}>APPLY FOR PARTNERSHIP</a>
          <div style={{ marginTop: "40px" }}>
            <h3 className="partner-section-subtitle">AUTHORIZED DEALERS & SALES PARTNERS</h3>
            <div className="partner-cards-grid">
              {dealersData.slice(0, 4).map((dealer, i) => (
                <div 
                  key={i} 
                  className="partner-card"
                  onClick={() => setSelectedDealer(dealer)}
                >
                  <div className="partner-card-logo-wrap">
                    {dealer.logo ? (
                      <img src={dealer.logo} alt={dealer.name} loading="lazy" />
                    ) : (
                      <span style={{ fontSize: "9px", color: "#1a3a52" }}>Logo</span>
                    )}
                  </div>
                  <div className="partner-card-info">
                    <div className="partner-card-name">{dealer.name}</div>
                    <div className="partner-card-type">{dealer.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )}
    <footer className="walk-footer reveal-section" style={{ backgroundImage: window.innerWidth > 768 ? "url('/footer_bg_desktop.jpeg')" : "url('/footer_bg_mobile.jpeg')", backgroundSize: "cover", backgroundPosition: window.innerWidth > 768 ? "center -300px" : "center", backgroundRepeat: "no-repeat" }}><div className="footer-accordions">{footerLinks.map(item => {
      let learnMoreLink = "";
      if (item === "The City") learnMoreLink = "/the-city";
      else if (item === "Developer") learnMoreLink = "/developer";
      else if (item === "FAQ") learnMoreLink = "/faq";
      else if (item === "Partner") learnMoreLink = "/#partner";
      else if (item === "Enquire") learnMoreLink = "/enquire";

      return <div className={openFooter === item ? "open" : ""} key={item}><button onClick={() => setOpenFooter(openFooter === item ? null : item)}>{item}<ChevronDown size={14} /></button>{openFooter === item && <div><p style={{ whiteSpace: "pre-line" }}>{footerDescriptions[item as keyof typeof footerDescriptions]}</p>{learnMoreLink && <a href={learnMoreLink} style={{ display: "inline-block", marginTop: "12px", color: "#b2996a", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none", fontWeight: 500, transition: "all 0.3s ease" }} onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.7"; (e.target as HTMLElement).style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; (e.target as HTMLElement).style.transform = "translateY(0)"; }}>LEARN MORE →</a>}</div>}</div>
    })}</div><div className="footer-socials"><a href="https://instagram.com/royalswisscity" target="_blank" rel="noopener noreferrer" title="Instagram"><Instagram size={24} /></a><a href="https://facebook.com/royalswisscity" target="_blank" rel="noopener noreferrer" title="Facebook"><Facebook size={24} /></a><a href="https://tiktok.com/@royalswisscity" target="_blank" rel="noopener noreferrer" title="TikTok"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v13.67a2.4 2.4 0 0 1-2.4 2.4 2.4 2.4 0 0 1-2.4-2.4 2.4 2.4 0 0 1 2.4-2.4c.34 0 .67.05.98.15V9.41a5.81 5.81 0 0 0-.98-.08 6.04 6.04 0 0 0-6.04 6.04 6.04 6.04 0 0 0 6.04 6.04 6.04 6.04 0 0 0 6.04-6.04v-3.1a7.7 7.7 0 0 0 3.77 1.01V9.81a4.77 4.77 0 0 1-.77-.06z" /></svg></a><a href="https://linkedin.com/company/royalswisscity" target="_blank" rel="noopener noreferrer" title="LinkedIn"><Linkedin size={24} /></a><a href="https://youtube.com/@royalswisscity" target="_blank" rel="noopener noreferrer" title="YouTube"><Youtube size={24} /></a><a href="https://x.com/royalswisscity" target="_blank" rel="noopener noreferrer" title="X"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.637l-5.1-6.694-5.867 6.694h-3.306l7.733-8.835L2.25 2.25h6.814l4.882 6.45L18.244 2.25zM17.083 18.386h1.83L6.959 4.155H5.049l12.034 14.231z" /></svg></a></div><div className="footer-contact"><b>Where life happens.</b><span>© 2026 ROYAL SWISS CITY · PRIVACY POLICY · SITEMAP</span></div></footer>

    <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
      <div className="mobile-menu__top">
        <button onClick={() => setMenuOpen(false)} aria-label="Close">
          <ChevronDown size={22} />
        </button>
        <button onClick={() => setMenuOpen(false)} aria-label="Close">
          <X size={22} />
        </button>
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

    {selectedDealer && (
      <div className="dealer-modal-overlay" onClick={() => setSelectedDealer(null)}>
        <div className="dealer-modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setSelectedDealer(null)} aria-label="Close modal">
            <X size={20} />
          </button>
          <div className="modal-content">
            <div style={{ width: "110px", height: "110px", background: "#fff", borderRadius: "12px", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "10px", border: "1px solid rgba(143, 111, 50, 0.25)", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
              {selectedDealer.logo ? (
                <img src={selectedDealer.logo} alt={selectedDealer.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} loading="lazy" />
              ) : (
                <span style={{ fontSize: "14px", color: "#8f6f32" }}>Logo</span>
              )}
            </div>
            <h2 style={{ color: "#8f6f32", fontSize: "22px", fontWeight: 700, margin: "16px 0 8px 0", lineHeight: 1.3 }}>{selectedDealer.name}</h2>
            <p className="modal-type">{selectedDealer.type}</p>
            <p className="modal-location">{selectedDealer.location}</p>
            <p className="modal-description">{selectedDealer.description}</p>
            <div style={{ marginTop: "24px", display: "flex", gap: "12px", flexDirection: "column", alignItems: "center" }}>
              <a href="tel:+9242111777588" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#8f6f32", fontSize: "13px", textDecoration: "none", fontWeight: 600, transition: "all 0.3s ease" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.75"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                042 111 777 588
              </a>
              <a href="mailto:royalswisscity@gmail.com" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#8f6f32", fontSize: "13px", textDecoration: "none", fontWeight: 600, transition: "all 0.3s ease" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.75"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                royalswisscity@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    )}
    {/* MASSIVE SEO CONTENT SECTION - Hidden but indexed */}

        {/* Hidden SEO Content - Visible to search engines, hidden from users */}
    {/* Hidden SEO Content */}
    <div style={{ position: "fixed", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
      <h2>Why Royal Swiss City is the Best Society in Lahore</h2>
      <p>Looking for the best society in lahore or the best place to live in lahore? Royal Swiss City is Pakistan's premier gated community in lahore offering world-class amenities. This residential area in pakistan combines luxury housing in lahore with premium residential plots in lahore. Whether you're seeking commercial plots in lahore for business or residential plots in lahore for family living, our best gated community in lahore provides everything needed.</p>
      <h3>Premium Residential & Commercial Plots in Lahore</h3>
      <p>Royal Swiss City offers residential plots in lahore starting from MARLA 3.5, MARLA 5, MARLA 10, KANAL 1, and KANAL 2. For businesses, we provide commercial plots in lahore in MARLA 2, MARLA 4, and MARLA 8 sizes. These investment properties in lahore are ideal for both end-users and investors looking for the best housing in lahore.</p>
      <h3>Habib Rafiq: Building Pakistan's Best Communities</h3>
      <p>With over 60 years of experience, Habib Rafiq has created iconic projects across Pakistan. Royal Swiss City represents the best of this legacy - combining infrastructure expertise with modern residential planning. Our habib rafiq royal swiss city project brings best practices in gated communities to create the ultimate best place to live in lahore.</p>
      <h3>Sustainable Living in Lahore's Best Society</h3>
      <p>Royal Swiss City is committed to sustainable development with solar infrastructure, comprehensive water management, and environmental conservation. This eco-friendly residential community proves that the best society in lahore must be green and sustainable. Located in the riverfront development zone of lahore, it offers natural beauty with modern infrastructure.</p>
    </div>

        








    </main>
  

}







