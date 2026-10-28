import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { animateFooter } from "@/utils/sectionAnimations";

const img = { logo: "/logo.webp?v=2" };
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

function Logo() { return <img className="brand-logo" src={img.logo} alt="Royal Swiss City" loading="lazy" /> }
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

export default function TheCity() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFooter, setOpenFooter] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth <= 768);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let f = 0;
    const fn = () => {
      cancelAnimationFrame(f);
      f = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        setScrolled(window.scrollY > 28);
      });
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => {
      cancelAnimationFrame(f);
      window.removeEventListener("scroll", fn);
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const footerElement = document.querySelector(".walk-footer.reveal-section");
    if (footerElement) animateFooter(footerElement);
  }, []);

  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const heroProgress = Math.min(scrollY / Math.max(vh, 800), 1);

  return (
    <main className="walkthrough-page the-city-page" style={{ "--hero-progress": heroProgress } as React.CSSProperties}>
      {/* Main H1 - Primary page topic for SEO */}
      <h1 style={{ position: "absolute", left: "-9999px", top: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
        The City - Royal Swiss City Lahore - Premium Community Living with Nature, Infrastructure & Amenities
      </h1>
      
      {/* HEADER / NAVBAR */}
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

      {/* CONTENT SECTIONS */}
      <div style={{ width: "100vw", height: "100vh", marginLeft: "calc(-50vw + 50%)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
        <img src={isMobile ? "/the-city-1-mobile.webp" : "/the city 1.webp"} alt="The City" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13, 27, 42, 0.8), rgba(13, 27, 42, 0))" }}></div>
        {isMobile && (
          <div style={{ position: "absolute", top: "40px", left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
            <img className="brand-logo" src={img.logo} alt="Royal Swiss City" style={{ height: "60px", width: "auto" }} loading="lazy" />
          </div>
        )}
        <div style={{ position: "absolute", left: isMobile ? "50%" : "60px", transform: isMobile ? "translateX(-50%)" : "none", bottom: isMobile ? "40px" : "auto", top: isMobile ? "auto" : "36%", color: "white", zIndex: 10, textAlign: isMobile ? "center" : "left", width: isMobile ? "90%" : "auto" }}>
          <span className="the-city-hero-kicker" style={{ fontSize: isMobile ? "1.05rem" : "1.25rem", fontWeight: isMobile ? 500 : 600, margin: "0 0 16px 0", letterSpacing: "0.14em", color: "#b2996a", display: "block", textTransform: "uppercase" }}>ROYAL SWISS CITY LAHORE</span>
          <h2 className="the-city-hero-title" style={{ fontSize: isMobile ? "clamp(2.8rem, 8vw, 3.4rem)" : "clamp(4.2rem, 5.5vw, 5rem)", fontWeight: 700, margin: "0", letterSpacing: "-0.04em", lineHeight: 1.08 }}>A City Immersed<br /><span style={{ color: "#b2996a" }}>In Nature</span></h2>
        </div>
        <div style={{ position: "absolute", right: "60px", top: "45%", transform: "translateY(-50%)", color: "white", zIndex: 10, textAlign: "right" }}>
        </div>
      </div>

      {/* CITY 2 SECTION */}
      <div style={{ width: "100vw", height: isMobile ? "70vh" : "30vh", marginLeft: "calc(-50vw + 50%)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
        <img src={isMobile ? "/the city 2_mobile.webp" : "/the city 2.webp"} alt="The City 2" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
      </div>

      {/* CITY 3 SECTION */}
      <div style={{ width: "100vw", height: isMobile ? "80vh" : "65vh", marginLeft: "calc(-50vw + 50%)", display: "flex", alignItems: "flex-end", justifyContent: "flex-end", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "relative", width: isMobile ? "0%" : "35%", height: "100%", background: "white", display: isMobile ? "none" : "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", padding: "60px 40px", boxSizing: "border-box" }}>
          <span style={{ fontSize: "12px", letterSpacing: "0.23em", textTransform: "uppercase", color: "#b2996a", margin: "0 0 16px 0", fontWeight: 600, display: "block" }}>THE ROYAL SWISS EXPERIENCE</span>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 300, letterSpacing: "0.08em", lineHeight: 1.15, margin: "0 0 20px 0", fontFamily: "var(--serif)", color: "#1a3a52" }}>More Than a Home.<br />A Way of Life.</h2>
          <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#666", margin: "0", maxWidth: "100%", fontFamily: "var(--serif)", fontWeight: 300 }}>Royal Swiss City is a thoughtfully planned residential and commercial community where nature, modern infrastructure and world-class amenities come together to create a truly balanced lifestyle.</p>
        </div>
        <div style={{ position: "relative", width: isMobile ? "100%" : "65%", height: "100%" }}>
          <img src={isMobile ? "/the city 3_mobile.webp" : "/the city 3.webp"} alt="The City 3" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.95) 100%)" }}></div>
          <div style={{ position: "absolute", left: "40px", top: "40px", color: "white", zIndex: 10 }}>
            <p style={{ fontSize: "2rem", fontWeight: 300, margin: "0", fontFamily: "var(--serif)", letterSpacing: "0.08em" }}>FOR A HEALTHIER<br />TOMORROW</p>
          </div>
          <div style={{ position: "absolute", left: "40px", bottom: "40px", color: "white", zIndex: 10 }}>
            <p style={{ fontSize: "1.2rem", fontWeight: 300, margin: "0", fontFamily: "var(--serif)", letterSpacing: "0.08em" }}>BREATHE<br /><span style={{ color: "#b2996a" }}>EXPLORE</span><br />BELONG</p>
          </div>
        </div>
      </div>

      {/* WORLD CLASS AMENITIES SECTION */}
      <section style={{ padding: isMobile ? "40px 20px" : "80px 40px", background: "#F7F7F7" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Section Header with Left Title and Right Body Text */}
          <div style={{ display: "flex", gap: isMobile ? "16px" : "60px", marginBottom: isMobile ? "30px" : "60px", alignItems: isMobile ? "flex-start" : "flex-end", flexDirection: isMobile ? "column" : "row" }}>
            <div style={{ flex: 1, minWidth: "0" }}>
              <span style={{ fontSize: "12px", letterSpacing: "0.23em", textTransform: "uppercase", color: "#b2996a", margin: "0 0 16px 0", fontWeight: 600, display: "block" }}>WORLD CLASS AMENITIES</span>
              <h2 style={{ fontSize: isMobile ? "24px" : "clamp(24px, 3vw, 36px)", fontWeight: 300, letterSpacing: "0.08em", lineHeight: 1.15, margin: "0", fontFamily: "var(--serif)", color: "#1a3a52" }}>EVERYTHING YOU NEED.<br />WITHIN YOUR COMMUNITY.</h2>
            </div>
            <div style={{ flex: 1, minWidth: "0", display: "flex", alignItems: isMobile ? "flex-start" : "flex-end", paddingBottom: isMobile ? "0px" : "20px" }}>
              <p style={{ fontSize: isMobile ? "13px" : "16px", lineHeight: 1.8, color: "#666", margin: "0", fontFamily: "var(--serif)", fontWeight: 300 }}>FROM RECREATION TO RELAXATION ROYAL SWISS CITY OFFERS A COMPLETE EXPERIENCE</p>
            </div>
          </div>

          {/* Amenities Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: isMobile ? "12px" : "30px" }}>
            {/* Sports Complex */}
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "100%", height: isMobile ? "200px" : "300px", borderRadius: "8px", overflow: "hidden", marginBottom: isMobile ? "12px" : "20px", background: "#f0f0f0" }}>
                <img src="/Sports_complex.webp" alt="Sports Complex" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
              </div>
              <h3 style={{ fontSize: isMobile ? "12px" : "16px", fontWeight: 300, margin: "0", fontFamily: "var(--serif)", color: "#1a3a52" }}>Sports Complex</h3>
            </div>

            {/* Aquatic Water Park */}
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "100%", height: isMobile ? "200px" : "300px", borderRadius: "8px", overflow: "hidden", marginBottom: isMobile ? "12px" : "20px", background: "#f0f0f0" }}>
                <img src="/Aquatic_water_park.webp" alt="Aquatic Water Park" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
              </div>
              <h3 style={{ fontSize: isMobile ? "12px" : "16px", fontWeight: 300, margin: "0", fontFamily: "var(--serif)", color: "#1a3a52" }}>Aquatic Water Park</h3>
            </div>

            {/* Premium Wildlife Zoo */}
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "100%", height: isMobile ? "200px" : "300px", borderRadius: "8px", overflow: "hidden", marginBottom: isMobile ? "12px" : "20px", background: "#f0f0f0" }}>
                <img src="/Premium_wildlife_zoo.webp" alt="Premium Wildlife Zoo" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
              </div>
              <h3 style={{ fontSize: isMobile ? "12px" : "16px", fontWeight: 300, margin: "0", fontFamily: "var(--serif)", color: "#1a3a52" }}>Premium Wildlife Zoo</h3>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION MAP SECTION */}
      <section style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end", overflow: "hidden", position: "relative", height: isMobile ? "80vh" : "70vh", width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
        {/* Right Side - GIF (Background) */}
        <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}>
          <img src={isMobile ? "/Map_thecity-mobile.gif" : "/Map_thecity.gif"} alt="Royal Swiss City Location Map" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: isMobile ? "center top" : "left top" }} loading="lazy" />
        </div>

        {/* Left Side - Midnight Blue Background with Text */}
        <div style={{ position: "relative", width: isMobile ? "100%" : "35%", height: "100%", background: isMobile ? "transparent" : "#1a3a52", display: "flex", flexDirection: "column", alignItems: isMobile ? "center" : "flex-start", justifyContent: isMobile ? "flex-start" : "center", padding: "60px 40px", boxSizing: "border-box", zIndex: 2, paddingTop: isMobile ? "40px" : "60px", textAlign: isMobile ? "center" : "left" }}>
          <span style={{ fontSize: "12px", letterSpacing: "0.23em", textTransform: "uppercase", color: "#b2996a", margin: "0 0 16px 0", fontWeight: 600, display: "block" }}>LOCATION & STRATEGIC POSITIONING</span>
          <h2 style={{ fontSize: isMobile ? "clamp(28px, 5vw, 48px)" : "clamp(24px, 3vw, 36px)", fontWeight: 300, letterSpacing: "0.08em", lineHeight: 1.15, margin: "0 0 20px 0", fontFamily: "var(--serif)", color: "#ffffff" }}>Connected to What<br />Matters</h2>
          <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#e0e0e0", margin: "0", maxWidth: "100%", fontFamily: "var(--serif)", fontWeight: 300, display: isMobile ? "none" : "block" }}>Strategically located within Lahore's Ravi Riverfront development zone, Royal Swiss City offers seamless access to major highways and key destinations — placing you at the centre of a well-connected and future-ready Lahore.</p>
        </div>
      </section>

      {/* MODERN INFRASTRUCTURE SECTION */}
      <section style={{ padding: isMobile ? "40px 20px" : "80px 40px", background: "#F7F7F7" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", gap: isMobile ? "30px" : "60px", alignItems: "flex-start", flexDirection: isMobile ? "column" : "row" }}>
          {/* Left Side - Text */}
          <div style={{ flex: 1, minWidth: "0" }}>
            <span style={{ fontSize: "12px", letterSpacing: "0.23em", textTransform: "uppercase", color: "#b2996a", margin: "0 0 16px 0", fontWeight: 600, display: "block" }}>MODERN INFRASTRUCTURE</span>
            <h2 style={{ fontSize: isMobile ? "28px" : "clamp(32px, 4vw, 56px)", fontWeight: 300, letterSpacing: "0.08em", lineHeight: 1.15, margin: "0 0 20px 0", fontFamily: "var(--serif)", color: "#1a3a52" }}>Designed for<br />Generations</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#666", margin: "0", fontFamily: "var(--serif)", fontWeight: 300, display: window.innerWidth <= 768 ? "none" : "block" }}>Wide 40-feet roads, landscaped boulevards, organised blocks and a grand entrance create a community that is planned for today and ready for tomorrow.</p>
          </div>

          {/* Right Side - Infrastructure Grid */}
          <div style={{ flex: 1.2, display: "grid", gridTemplateColumns: window.innerWidth <= 768 ? "1fr" : "repeat(3, 1fr)", gap: "20px", width: isMobile ? "100%" : "auto" }}>
            {/* 40 Feet Roads */}
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "100%", height: "250px", borderRadius: "8px", overflow: "hidden", marginBottom: "16px", background: "#f0f0f0" }}>
                <img src="/40_feet_roads.webp" alt="40 Feet Roads" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
              </div>
              <h3 style={{ fontSize: "14px", fontWeight: 300, margin: "0", fontFamily: "var(--serif)", color: "#1a3a52" }}>40 Feet Roads</h3>
            </div>

            {/* Grand Entrance */}
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "100%", height: "250px", borderRadius: "8px", overflow: "hidden", marginBottom: "16px", background: "#f0f0f0" }}>
                <img src="/grand_entrance.webp" alt="Grand Entrance" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
              </div>
              <h3 style={{ fontSize: "14px", fontWeight: 300, margin: "0", fontFamily: "var(--serif)", color: "#1a3a52" }}>Grand Entrance</h3>
            </div>

            {/* Modern Living */}
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "100%", height: "250px", borderRadius: "8px", overflow: "hidden", marginBottom: "16px", background: "#f0f0f0" }}>
                <img src="/modern_living.webp" alt="Modern Living" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
              </div>
              <h3 style={{ fontSize: "14px", fontWeight: 300, margin: "0", fontFamily: "var(--serif)", color: "#1a3a52" }}>Modern Living</h3>
            </div>
          </div>
        </div>
      </section>

      {/* SUSTAINABILITY SECTION */}
      <section style={{ position: "relative", height: window.innerWidth <= 768 ? "90vh" : "70vh", overflow: "hidden", background: "#F7F7F7" }}>
        {/* Full Background Image */}
        <img src={window.innerWidth <= 768 ? "/green_canal_mobile.webp" : "/green_canal_landscape.webp"} alt="Green Landscape" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 1 }} loading="lazy" />
        
        {/* Text Overlay - Left Side */}
        <div style={{ position: "absolute", left: isMobile ? "20px" : "60px", right: isMobile ? "20px" : "auto", top: window.innerWidth <= 768 ? "15%" : "20%", transform: "translateY(-50%)", color: "white", zIndex: 10, maxWidth: isMobile ? "calc(100% - 40px)" : "500px" }}>
          <span style={{ fontSize: window.innerWidth <= 768 ? "12px" : "9px", letterSpacing: "0.23em", textTransform: "uppercase", color: "#b2996a", margin: "0 0 12px 0", fontWeight: 600, display: "block" }}>SUSTAINABILITY BUILT IN</span>
          <h2 style={{ fontSize: window.innerWidth <= 768 ? "clamp(28px, 3.5vw, 48px)" : "clamp(20px, 2.5vw, 32px)", fontWeight: 300, letterSpacing: "0.08em", lineHeight: 1.15, margin: "0", fontFamily: "var(--serif)", color: "#1a3a52" }}>A Cleaner, Greener Future</h2>
        </div>
      </section>

      {/* RIVERFRONT LAHORE SECTION */}
      <section style={{ width: "100vw", height: "60vh", marginLeft: "calc(-50vw + 50%)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
        <img src="/Riverfront_Lahore_banner.webp" alt="Riverfront Lahore" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13, 27, 42, 0.6), rgba(13, 27, 42, 0))" }}></div>
        <div style={{ position: "absolute", left: isMobile ? "20px" : "60px", right: isMobile ? "20px" : "auto", top: "50%", transform: "translateY(-50%)", color: "white", zIndex: 10 }}>
          <span style={{ fontSize: "0.9rem", fontWeight: 300, margin: "0 0 15px 0", fontFamily: "var(--serif)", letterSpacing: "0.08em", color: "#b2996a", textTransform: "uppercase", display: "block" }}>RIVERFRONT LIVING</span>
          <h2 style={{ fontSize: isMobile ? "2rem" : "3.5rem", fontWeight: 300, margin: "0 0 20px 0", fontFamily: "var(--serif)", letterSpacing: "-0.06em", lineHeight: 1.1, maxWidth: "600px" }}>A New Horizon for<br />Lahore</h2>
          <p style={{ fontSize: "1rem", fontWeight: 300, margin: "0", fontFamily: "var(--serif)", lineHeight: 1.6, maxWidth: "600px", color: "#e0e0e0" }}>Be part of the city's largest riverfront vision and experience a unique connection with nature, water and modern urban living.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="walk-footer reveal-section" style={{ backgroundImage: window.innerWidth > 768 ? "url('/footer_bg_desktop.jpeg')" : "url('/footer_bg_mobile.jpeg')", backgroundSize: "cover", backgroundPosition: window.innerWidth > 768 ? "center -300px" : "center", backgroundRepeat: "no-repeat" }}>
        <div className="footer-accordions">
          <div className="footer-accordion-col">
            {footerLinks.filter((_, i) => i % 2 === 0).map(item => {
              let learnMoreLink = "";
              if (item === "The City") learnMoreLink = "/the-city";
              else if (item === "Developer") learnMoreLink = "/developer";
              else if (item === "FAQ") learnMoreLink = "/faq";
              else if (item === "Partner") learnMoreLink = "/#partner";
              else if (item === "Enquire") learnMoreLink = "/enquire";

              return (
                <div className={openFooter === item ? "open" : ""} key={item}>
                  <button onClick={() => setOpenFooter(openFooter === item ? null : item)}>
                    {item}
                    <ChevronDown size={14} />
                  </button>
                  {openFooter === item && (
                    <div>
                      <p style={{ whiteSpace: "pre-line" }}>
                        {footerDescriptions[item as keyof typeof footerDescriptions]}
                      </p>
                      {learnMoreLink && (
                        <a
                          href={learnMoreLink}
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
                          onMouseEnter={(e) => {
                            (e.target as HTMLElement).style.opacity = "0.7";
                            (e.target as HTMLElement).style.transform = "translateY(-2px)";
                          }}
                          onMouseLeave={(e) => {
                            (e.target as HTMLElement).style.opacity = "1";
                            (e.target as HTMLElement).style.transform = "translateY(0)";
                          }}
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
              let learnMoreLink = "";
              if (item === "The City") learnMoreLink = "/the-city";
              else if (item === "Developer") learnMoreLink = "/developer";
              else if (item === "FAQ") learnMoreLink = "/faq";
              else if (item === "Partner") learnMoreLink = "/#partner";
              else if (item === "Enquire") learnMoreLink = "/enquire";

              return (
                <div className={openFooter === item ? "open" : ""} key={item}>
                  <button onClick={() => setOpenFooter(openFooter === item ? null : item)}>
                    {item}
                    <ChevronDown size={14} />
                  </button>
                  {openFooter === item && (
                    <div>
                      <p style={{ whiteSpace: "pre-line" }}>
                        {footerDescriptions[item as keyof typeof footerDescriptions]}
                      </p>
                      {learnMoreLink && (
                        <a
                          href={learnMoreLink}
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
                          onMouseEnter={(e) => {
                            (e.target as HTMLElement).style.opacity = "0.7";
                            (e.target as HTMLElement).style.transform = "translateY(-2px)";
                          }}
                          onMouseLeave={(e) => {
                            (e.target as HTMLElement).style.opacity = "1";
                            (e.target as HTMLElement).style.transform = "translateY(0)";
                          }}
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
          <a href="https://instagram.com/royalswisscity" target="_blank" rel="noopener noreferrer" title="Instagram">
            <Instagram size={24} />
          </a>
          <a href="https://facebook.com/royalswisscity" target="_blank" rel="noopener noreferrer" title="Facebook">
            <Facebook size={24} />
          </a>
          <a href="https://tiktok.com/@royalswisscity" target="_blank" rel="noopener noreferrer" title="TikTok">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v13.67a2.4 2.4 0 0 1-2.4 2.4 2.4 2.4 0 0 1-2.4-2.4 2.4 2.4 0 0 1 2.4-2.4c.34 0 .67.05.98.15V9.41a5.81 5.81 0 0 0-.98-.08 6.04 6.04 0 0 0-6.04 6.04 6.04 6.04 0 0 0 6.04 6.04 6.04 6.04 0 0 0 6.04-6.04v-3.1a7.7 7.7 0 0 0 3.77 1.01V9.81a4.77 4.77 0 0 1-.77-.06z" />
            </svg>
          </a>
          <a href="https://linkedin.com/company/royalswisscity" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <Linkedin size={24} />
          </a>
          <a href="https://youtube.com/@royalswisscity" target="_blank" rel="noopener noreferrer" title="YouTube">
            <Youtube size={24} />
          </a>
          <a href="https://x.com/royalswisscity" target="_blank" rel="noopener noreferrer" title="X">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.637l-5.1-6.694-5.867 6.694h-3.306l7.733-8.835L2.25 2.25h6.814l4.882 6.45L18.244 2.25zM17.083 18.386h1.83L6.959 4.155H5.049l12.034 14.231z" />
            </svg>
          </a>
        </div>
        <div className="footer-contact">
          <b>Where life happens.</b>
          <span>© 2026 ROYAL SWISS CITY · PRIVACY POLICY · SITEMAP</span>
        </div>
      </footer>

      {/* MOBILE MENU */}
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
            
            return (
              <a href={href} onClick={() => setMenuOpen(false)} key={item}>
                {item}
              </a>
            );
          })}
        </div>
      </div>
    </main>
  );
}
