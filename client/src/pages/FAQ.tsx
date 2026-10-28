import { useState, useEffect, useMemo } from "react";
import { 
  ChevronDown, 
  Menu, 
  X, 
  Search, 
  Sparkles, 
  HelpCircle, 
  Phone, 
  Mail, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  MapPin, 
  Wallet, 
  TreePine, 
  Globe, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Youtube 
} from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SEO_CONFIG } from "@/config/seo";
import { animateFooter } from "@/utils/sectionAnimations";

const img = { 
  logo: "/logo.webp?v=2", 
  hero: "/desktop_city_aerial.webp",
  heroMobile: "/mobile_city_aerial.jpg"
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

function Logo() { 
  return <img className="brand-logo" src={img.logo} alt="Royal Swiss City - Luxury Gated Community" loading="eager" />;
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

interface FAQItem {
  id: string;
  category: "General" | "Master Plan" | "Plots & Pricing" | "Payment Plans" | "Legal & Approvals" | "Developer" | "Location" | "Overseas";
  question: string;
  summary: string;
  highlights?: string[];
  details: string;
}

const comprehensiveFAQs: FAQItem[] = [
  // 1. General & Vision
  {
    id: "gen-1",
    category: "General",
    question: "What is Royal Swiss City and what is its founding vision?",
    summary: "Royal Swiss City is Pakistan's premier master-planned gated residential and commercial sanctuary located in Lahore along the Ravi Riverfront corridor.",
    highlights: [
      "Master-developed by Habib Rafiq Construction (Pvt.) Ltd. (HRL CONSTRUCTION PVT LIMITED) with 60+ years of civil engineering excellence.",
      "Integrates Swiss-inspired environmental urbanism with cutting-edge smart city utilities.",
      "Features 40-ft to 100-ft wide boulevards, solar arrays, and high-efficiency water conservation grids."
    ],
    details: "Royal Swiss City represents the benchmark in luxury gated community living in Pakistan. Designed to bridge timeless architectural grandeur with sustainable 21st-century infrastructure, the development delivers a self-contained ecosystem comprising elite residential sectors, high-street commercial hubs, international healthcare, world-class schools, and over 40% dedicated green open spaces."
  },
  {
    id: "gen-2",
    category: "General",
    question: "What signature lifestyle amenities are integrated within the community?",
    summary: "Residents enjoy unprecedented leisure, spiritual, wellness, and sporting infrastructure crafted to international standards.",
    highlights: [
      "Aquatic Water Park: State-of-the-art water sports, wave pools, and family recreational zones.",
      "Grand Jamia Mosque: Architectural landmark with a capacity exceeding 70,000 worshippers.",
      "Multi-Sport Complex: Olympic-standard gymnasium, tennis courts, football pitches, and jogging trails.",
      "Smart Utilities: Underground electricity, 24/7 solar backup, fiber-optic data connectivity, and pure filtration plants."
    ],
    details: "Every amenity within Royal Swiss City is strategically positioned within a 5-minute walkability radius from residential enclaves. In addition to signature leisure complexes, the master development incorporates dedicated civic emergency centers, retail boulevards, fine-dining riverfront promenades, and landscaped botanical parks."
  },
  {
    id: "gen-3",
    category: "General",
    question: "How does Royal Swiss City incorporate environmental sustainability?",
    summary: "The master plan is built upon sustainable eco-urbanism, renewable energy grids, and water stewardship.",
    highlights: [
      "Extensive solar power infrastructure powering street lighting, filtration, and public amenities.",
      "Zero-runoff rainwater harvesting and modern graywater recycling for lush green landscapes.",
      "Natural riverfront microclimate buffers reducing urban heat island effects."
    ],
    details: "By blending active ecological conservation with modern construction methodologies, Royal Swiss City minimizes its carbon footprint while guaranteeing clean air, low environmental noise, and long-term utility resilience for generations of homeowners."
  },

  // 2. Developer & Legacy
  {
    id: "dev-1",
    category: "Developer",
    question: "Who is the developer behind Royal Swiss City?",
    summary: "The project is proudly conceived, engineered, and delivered by Habib Rafiq Construction (Pvt.) Ltd. (HRL CONSTRUCTION PVT LIMITED).",
    highlights: [
      "Over 6 decades (since 1962) of continuous engineering and infrastructure leadership in Pakistan.",
      "Pioneers behind landmark national projects in energy, aviation, high-rise construction, and mega-societies.",
      "Led by Chairman Shahid Rafiq and CEO Sohaib Hassan."
    ],
    details: "Habib Rafiq Construction (Pvt.) Ltd. is Pakistan's most trusted name in infrastructure and mega-development. With an unblemished 60+ year track record, HRL CONSTRUCTION PVT LIMITED has executed complex EPC contracts across power, oil & gas, aviation, motorways, and luxury housing schemes that define modern Pakistan."
  },
  {
    id: "dev-2",
    category: "Developer",
    question: "What iconic national developments are in Habib Rafiq's portfolio?",
    summary: "HRL CONSTRUCTION PVT LIMITED's engineering pedigree includes some of the most celebrated high-rises, motorways, and landmarks across Pakistan.",
    highlights: [
      "Bahria Icon Tower Karachi: 60-storey mixed-use skyscraper with advanced titanium façade.",
      "Convention Center Islamabad: State-of-the-art 2,000-seat national EPC landmark completed in record 11 months.",
      "101 Tower Lahore: Premier luxury commercial and residential high-rise.",
      "Strategic Infrastructure: M-1 Motorway (Islamabad–Peshawar), Lahore Ring Road (Package 3), and Multan International Airport."
    ],
    details: "HRL CONSTRUCTION PVT LIMITED's profound experience in delivering foundational national infrastructure guarantees that Royal Swiss City benefits from superior civil construction quality, robust storm drainage, and flawless engineering execution."
  },

  // 3. Plots & Pricing
  {
    id: "plots-1",
    category: "Plots & Pricing",
    question: "What residential plot sizes and configurations are available?",
    summary: "A diverse portfolio of residential options tailored for contemporary families and visionary investors.",
    highlights: [
      "MARLA 3.5 (~787 sq ft): Optimized entry-point luxury living for young professionals and smart investors.",
      "MARLA 5 (~1,125 sq ft): The ideal contemporary family home layout with maximum space efficiency.",
      "MARLA 10 (~2,250 sq ft): Executive residence with ample space for dual living rooms, private lawn, and garage.",
      "KANAL 1 (~4,500 sq ft) & KANAL 2 (~9,000 sq ft): Palatial estate plots for bespoke luxury villa architecture."
    ],
    details: "All residential plots are fronted by wide boulevards (minimum 40 feet) with underground utility stubs pre-installed at the boundary line, ensuring seamless construction without road cuts."
  },
  {
    id: "plots-2",
    category: "Plots & Pricing",
    question: "What commercial plot sizes are available along the primary boulevards?",
    summary: "High-density commercial plots positioned for maximum footfall and sustained rental yield.",
    highlights: [
      "MARLA 2: Boutique commercial spaces ideal for retail outlets, cafés, and financial service branches.",
      "MARLA 4: Mid-scale commercial buildings suitable for corporate offices, diagnostic clinics, and restaurants.",
      "MARLA 8: Flagship multi-storey commercial complexes with dedicated basement parking allowances."
    ],
    details: "Commercial districts in Royal Swiss City are strategically distributed along the 100-foot main thoroughfares, ensuring uninterrupted traffic circulation, ample parking, and unmatched business visibility."
  },
  {
    id: "plots-3",
    category: "Plots & Pricing",
    question: "What is the projected return on investment (ROI) and appreciation potential?",
    summary: "Historically, early-stage investments in Habib Rafiq developments yield 15%–20% annualized capital gains.",
    highlights: [
      "High-growth development corridor near M-2 Motorway and Lahore Ring Road.",
      "Prime off-plan entry pricing offering significant capital appreciation during infrastructure progression.",
      "Substantial rental yields driven by institutional demand and gated community lifestyle premiums."
    ],
    details: "Due to the scarcity of high-tier gated developments in northern/western Lahore and the rapid acceleration of the Ravi Riverfront zone, Royal Swiss City plots represent an exceptional hedge against inflation and a prime wealth-preservation asset."
  },

  // 4. Payment Plans & Booking
  {
    id: "pay-1",
    category: "Payment Plans",
    question: "What payment schedules and installment options are available?",
    summary: "Flexible, buyer-friendly 3 to 5-year installment structures designed to accommodate diverse financial portfolios.",
    highlights: [
      "Convenient initial booking down payment (typically 10%–15%).",
      "Easy quarterly or monthly installment breakdown spread comfortably across project milestones.",
      "Attractive cash discount incentives on full upfront lump-sum settlements."
    ],
    details: "Our payment schedules are designed to align seamlessly with infrastructure completion milestones. For personalized payment plans tailored to your investment timeline, please connect directly with our advisory desk."
  },
  {
    id: "pay-2",
    category: "Payment Plans",
    question: "What is the official step-by-step booking procedure?",
    summary: "A transparent, secure 5-step acquisition process handled through authorized channels.",
    highlights: [
      "Step 1: Consultation & plot category selection with an authorized HRL CONSTRUCTION PVT LIMITED advisor.",
      "Step 2: Submission of KYC documentation (CNIC / NICOP / Passport copy & passport photos).",
      "Step 3: Deposit of down payment directly into the designated HRL CONSTRUCTION PVT LIMITED Royal Swiss City escrow account.",
      "Step 4: Issuance of official verified Payment Receipt and Booking Application Form.",
      "Step 5: Delivery of the official HRL CONSTRUCTION PVT LIMITED Allocation Certificate & Welcome Package."
    ],
    details: "All financial transactions must be conducted via official banking channels (cross cheque, pay order, or direct swift/RDA transfer) made payable exclusively to Habib Rafiq Construction (Pvt.) Ltd. / Royal Swiss City."
  },
  {
    id: "pay-3",
    category: "Payment Plans",
    question: "Are bank financing or Islamic home finance facilities supported?",
    summary: "Yes, structured financing options are accessible through partnered commercial and Islamic banks.",
    highlights: [
      "Eligible for home purchase and plot financing schemes with major banking institutions.",
      "Shariah-compliant Islamic financing models (Diminishing Musharakah / Murabaha).",
      "Dedicated facilitation desk to assist buyers through loan documentation and fast-track processing."
    ],
    details: "Our corporate finance team coordinates directly with leading banking partners to verify documentation, streamline approvals, and ensure competitive profit/interest rates for qualified applicants."
  },
  {
    id: "pay-4",
    category: "Payment Plans",
    question: "Are there any hidden costs, escalations, or unexpected surcharges?",
    summary: "100% pricing transparency is an institutional guarantee at Habib Rafiq developments.",
    highlights: [
      "Zero hidden overheads: Plot cost, government taxes, and registration fees are clearly line-itemed.",
      "Development charges are scheduled upfront with no retroactive mid-development surprises.",
      "Transparent annual community maintenance fee schedule published prior to possession."
    ],
    details: "Every client receives a comprehensive Statement of Account with every installment, providing real-time visibility into paid balances, upcoming dues, and verifiable receipts."
  },

  // 5. Legal & Regulatory Approvals
  {
    id: "legal-1",
    category: "Legal & Approvals",
    question: "What is the legal status and regulatory compliance of Royal Swiss City?",
    summary: "Royal Swiss City is a fully verified, legally approved development with complete land ownership title.",
    highlights: [
      "Clear, unencumbered land titles verified and registered with provincial revenue authorities.",
      "Comprehensive planning, environmental, and infrastructure approvals in place.",
      "Backed by HRL CONSTRUCTION PVT LIMITED's 60-year institutional compliance record with government regulatory bodies."
    ],
    details: "All layout plans, zoning demarcations, and environmental impact assessments undergo rigorous multi-tier statutory vetting. Prospective buyers are welcome to review certified legal credentials at our corporate head office."
  },
  {
    id: "legal-2",
    category: "Legal & Approvals",
    question: "What legal ownership documentation do homeowners receive?",
    summary: "Buyers receive complete, indisputable legal title and registered ownership instruments.",
    highlights: [
      "Initial Stage: Official Verified Allocation Letter and Intimation Record.",
      "Post-Completion: Formal Transfer Deed & Possession Letter.",
      "Final Stage: Registered Title Deed registered with the relevant revenue department."
    ],
    details: "This comprehensive legal framework guarantees complete peace of mind, unencumbered ownership rights, and seamless inheritance or resale capabilities under Pakistani property law."
  },
  {
    id: "legal-3",
    category: "Legal & Approvals",
    question: "What is the procedure for plot resale or title transfer?",
    summary: "A secure, biometric-verified transfer mechanism managed directly by the HRL CONSTRUCTION PVT LIMITED Customer Service Center.",
    highlights: [
      "Issuance of No Demand Certificate (NDC) verifying zero outstanding balance.",
      "Biometric verification and photographic authentication of both seller and purchaser.",
      "Immediate issuance of transfer confirmation followed by the new Allocation Letter."
    ],
    details: "Our centralized transfer protocol eliminates intermediary risks, fraud, and duplicate claims, safeguarding the financial equity of both buyers and secondary-market sellers."
  },

  // 6. Location & Connectivity
  {
    id: "loc-1",
    category: "Location",
    question: "Where is Royal Swiss City strategically positioned in Lahore?",
    summary: "Situated in Lahore's high-velocity western development zone with direct M-2 Motorway and Ravi Riverfront access.",
    highlights: [
      "Direct link to the M-2 Motorway through the dedicated Kohat Tunnel access route.",
      "Rapid connection to Lahore Ring Road: 15–20 minutes to DHA, Gulberg, and Allama Iqbal International Airport.",
      "Scenic riverfront proximity offering fresh air, low pollution, and panoramic water views."
    ],
    details: "The strategic gateway positioning allows effortless transit toward Islamabad (under 3 hours), Faisalabad, and Multan while maintaining swift access to central Lahore's commercial and healthcare districts."
  },
  {
    id: "loc-2",
    category: "Location",
    question: "What educational, healthcare, and civic facilities surround the location?",
    summary: "A self-sufficient nexus close to premier universities, specialized medical centers, and transport hubs.",
    highlights: [
      "Planned on-site university campus, international grammar schools, and daycare centers.",
      "24/7 emergency trauma center and multi-specialty tertiary care hospital.",
      "Integrated emergency civic services: fire department, police station, and municipal maintenance center."
    ],
    details: "Residents do not need to commute into crowded city centers for daily necessities, high-level healthcare, or elite education, making Royal Swiss City a truly complete standalone metropolis."
  },

  // 7. Overseas Buyers
  {
    id: "overseas-1",
    category: "Overseas",
    question: "Can Overseas Pakistanis book and manage property remotely?",
    summary: "Yes, we offer a 100% digital, embassy-certified remote acquisition pathway tailored for overseas expatriates.",
    highlights: [
      "Full digital onboarding: Select plots via interactive master plan maps and 3D walkthroughs.",
      "Payment facilitation through State Bank of Pakistan's Roshan Digital Account (RDA) or direct SWIFT transfers.",
      "Embassy / Consulate attested Power of Attorney (POA) support for nominee management.",
      "Courier delivery of original stamped Allocation Certificates to your international address."
    ],
    details: "Thousands of overseas Pakistanis in the UK, UAE, USA, Canada, Saudi Arabia, and Europe trust Habib Rafiq for secure, transparent property investments with dedicated 24/7 diaspora relationship managers."
  },
  {
    id: "overseas-2",
    category: "Overseas",
    question: "Can foreign nationals or international corporate entities purchase plots?",
    summary: "Foreign nationals and multinational corporations can acquire real estate in accordance with official statutory guidelines.",
    highlights: [
      "Dedicated Foreign Investor Concierge handling Ministry of Interior / regulatory paperwork.",
      "Specialized commercial plot allocations for foreign corporate branch offices and logistics hubs.",
      "Repatriation-friendly banking channels via verified foreign currency accounts."
    ],
    details: "Our legal and international corporate advisory teams guide foreign investors through every step, ensuring full compliance with national investment laws and title security."
  }
];

const categoryList = [
  "All",
  "General",
  "Master Plan",
  "Plots & Pricing",
  "Payment Plans",
  "Legal & Approvals",
  "Developer",
  "Location",
  "Overseas"
] as const;

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<string | null>("gen-1");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFooter, setOpenFooter] = useState<string | null>(null);

  // Scroll listener for hero progress & header transitions
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

  // Intersection observer for scroll animations
  useEffect(() => {
    const o = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    document.querySelectorAll(".reveal-section,.reveal-item").forEach(n => o.observe(n));
    return () => o.disconnect();
  }, []);

  // Animate footer on mount
  useEffect(() => {
    const footerElement = document.querySelector(".walk-footer.reveal-section");
    if (footerElement) animateFooter(footerElement);
  }, []);

  // Filtered FAQs based on category and live search query
  const filteredFAQs = useMemo(() => {
    return comprehensiveFAQs.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        item.question.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.details.toLowerCase().includes(q) ||
        (item.highlights && item.highlights.some(h => h.toLowerCase().includes(q)))
      );
    });
  }, [selectedCategory, searchQuery]);

  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const heroProgress = Math.min(scrollY / Math.max(vh, 800), 1);

  return (
    <main className="walkthrough-page faq-page" style={{ "--hero-progress": heroProgress } as React.CSSProperties}>
      {/* Hidden SEO H1 */}
      <h1 style={{ position: "absolute", left: "-9999px", top: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
        Royal Swiss City Lahore FAQs - Master Plan, Plot Sizes, Payment Plans, Approvals & Habib Rafiq Legacy
      </h1>

      {/* Structured SEO Head */}
      <SEOHead
        title="FAQ & Buyer Knowledge Base - Royal Swiss City Lahore | Habib Rafiq"
        description="Find verified answers to common questions about Royal Swiss City Lahore. Explore residential & commercial plot sizes, flexible payment installment plans, legal approvals, NOC status, and HRL CONSTRUCTION PVT LIMITED development milestones."
        keywords="Royal Swiss City FAQ, frequently asked questions, royal swiss city plots, lahore gated community, property investment lahore, habib rafiq legacy, plot prices lahore"
        canonical="https://royalswisscity.com/faq"
        ogImage="https://royalswisscity.com/desktop_city_aerial.webp"
        ogDescription="Explore the official knowledge base and FAQs for Royal Swiss City Lahore - 60+ years of Habib Rafiq engineering legacy."
        language="en"
      />

      <Breadcrumb />

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

      {/* Mobile Menu */}
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

      {/* HERO SECTION - MATCHING WEBSITE THEME */}
      <section 
        className="reveal-section"
        style={{
          position: "relative",
          minHeight: "clamp(460px, 60vh, 580px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 24px 60px",
          backgroundImage: `url('${img.hero}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          boxSizing: "border-box",
          overflow: "hidden"
        }}
      >
        {/* Deep luxury gradient overlay */}
        <div 
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(13, 27, 42, 0.88) 0%, rgba(26, 58, 82, 0.85) 60%, rgba(13, 27, 42, 0.94) 100%)",
            zIndex: 1
          }} 
        />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "860px", margin: "0 auto" }}>
          <span 
            className="section-kicker"
            style={{ 
              color: "#b2996a", 
              fontSize: "13px", 
              letterSpacing: "0.2em", 
              textTransform: "uppercase", 
              fontWeight: 600, 
              display: "inline-block", 
              marginBottom: "14px" 
            }}
          >
            KNOWLEDGE BASE & GUIDELINES
          </span>
          
          <h2 
            style={{ 
              fontFamily: "var(--serif)", 
              fontSize: "clamp(34px, 5.5vw, 64px)", 
              fontWeight: 300, 
              color: "#ffffff", 
              lineHeight: 1.1, 
              margin: "0 0 20px" 
            }}
          >
            Frequently Asked <em style={{ fontStyle: "italic", color: "#b2996a" }}>Questions.</em>
          </h2>
          
          <p 
            style={{ 
              color: "rgba(255, 255, 255, 0.82)", 
              fontSize: "clamp(14px, 1.2vw, 16px)", 
              lineHeight: 1.75, 
              maxWidth: "680px", 
              margin: "0 auto 36px", 
              fontFamily: "var(--serif)", 
              fontWeight: 300 
            }}
          >
            Everything you need to know about Royal Swiss City — from plot categories, flexible installment plans, and legal clearances to Habib Rafiq’s 60-year development legacy.
          </p>

          {/* Interactive Live Search Input */}
          <div 
            style={{ 
              position: "relative", 
              maxWidth: "580px", 
              margin: "0 auto", 
              display: "flex", 
              alignItems: "center" 
            }}
          >
            <Search 
              size={20} 
              color="#b2996a" 
              style={{ position: "absolute", left: "20px", pointerEvents: "none" }} 
            />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics: e.g. plot sizes, installment plan, NOC, Mosque..." 
              style={{
                width: "100%",
                padding: "16px 48px 16px 52px",
                background: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(178, 153, 106, 0.4)",
                borderRadius: "999px",
                color: "#ffffff",
                fontSize: "14px",
                fontFamily: "var(--sans)",
                outline: "none",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
              }}
              onFocus={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
                e.target.style.borderColor = "#b2996a";
                e.target.style.boxShadow = "0 8px 36px rgba(178, 153, 106, 0.25)";
              }}
              onBlur={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.12)";
                e.target.style.borderColor = "rgba(178, 153, 106, 0.4)";
                e.target.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                style={{
                  position: "absolute",
                  right: "18px",
                  background: "none",
                  border: "none",
                  color: "#b2996a",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* QUICK HIGHLIGHT STRIP */}
      <section 
        style={{ 
          background: "#F7F7F7", 
          borderBottom: "1px solid rgba(178,153,106,0.2)", 
          padding: "24px 20px" 
        }}
      >
        <div 
          style={{ 
            maxWidth: "1200px", 
            margin: "0 auto", 
            display: "grid", 
            gridTemplateColumns: window.innerWidth <= 768 ? "repeat(2, 1fr)" : "repeat(4, 1fr)", 
            gap: "20px", 
            textAlign: "center" 
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <Building2 size={22} color="#b2996a" />
            <div style={{ textAlign: "left" }}>
              <p style={{ margin: 0, fontSize: "12px", fontWeight: 700, color: "#1a3a52", fontFamily: "var(--serif)" }}>60+ YEARS LEGACY</p>
              <p style={{ margin: 0, fontSize: "11px", color: "#6c665e" }}>Habib Rafiq Construction (Pvt.) Ltd.</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <ShieldCheck size={22} color="#b2996a" />
            <div style={{ textAlign: "left" }}>
              <p style={{ margin: 0, fontSize: "12px", fontWeight: 700, color: "#1a3a52", fontFamily: "var(--serif)" }}>100% SECURE TITLE</p>
              <p style={{ margin: 0, fontSize: "11px", color: "#6c665e" }}>Verified Legal Ownership</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <Wallet size={22} color="#b2996a" />
            <div style={{ textAlign: "left" }}>
              <p style={{ margin: 0, fontSize: "12px", fontWeight: 700, color: "#1a3a52", fontFamily: "var(--serif)" }}>FLEXIBLE PLANS</p>
              <p style={{ margin: 0, fontSize: "11px", color: "#6c665e" }}>3 to 5-Year Installments</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <Globe size={22} color="#b2996a" />
            <div style={{ textAlign: "left" }}>
              <p style={{ margin: 0, fontSize: "12px", fontWeight: 700, color: "#1a3a52", fontFamily: "var(--serif)" }}>OVERSEAS DESK</p>
              <p style={{ margin: 0, fontSize: "11px", color: "#6c665e" }}>24/7 Remote Concierge</p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN Q&A INTERFACE */}
      <section style={{ backgroundColor: "#F7F7F7", padding: "60px 20px 100px", minHeight: "600px" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>

          {/* Category Filter Pills */}
          <div style={{ marginBottom: "40px" }}>
            <p 
              style={{ 
                fontSize: "12px", 
                letterSpacing: "0.15em", 
                textTransform: "uppercase", 
                color: "#8B6F47", 
                fontWeight: 600, 
                marginBottom: "16px", 
                fontFamily: "var(--serif)" 
              }}
            >
              FILTER BY TOPIC
            </p>

            <div 
              style={{ 
                display: "flex", 
                flexWrap: "wrap", 
                gap: "10px", 
                alignItems: "center" 
              }}
            >
              {categoryList.map((cat) => {
                const count = cat === "All" 
                  ? comprehensiveFAQs.length 
                  : comprehensiveFAQs.filter(f => f.category === cat).length;
                const isSelected = selectedCategory === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                    }}
                    style={{
                      padding: "10px 20px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: isSelected ? 600 : 500,
                      fontFamily: "var(--sans)",
                      cursor: "pointer",
                      border: isSelected ? "1px solid #1a3a52" : "1px solid rgba(26, 58, 82, 0.2)",
                      background: isSelected ? "#1a3a52" : "rgba(255, 255, 255, 0.85)",
                      color: isSelected ? "#ffffff" : "#1a3a52",
                      boxShadow: isSelected ? "0 4px 16px rgba(26, 58, 82, 0.2)" : "none",
                      transition: "all 0.25s ease",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = "#b2996a";
                        e.currentTarget.style.color = "#b2996a";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = "rgba(26, 58, 82, 0.2)";
                        e.currentTarget.style.color = "#1a3a52";
                      }
                    }}
                  >
                    <span>{cat}</span>
                    <span 
                      style={{ 
                        fontSize: "10px", 
                        padding: "2px 7px", 
                        borderRadius: "999px", 
                        background: isSelected ? "#b2996a" : "rgba(26, 58, 82, 0.08)", 
                        color: isSelected ? "#111111" : "#1a3a52",
                        fontWeight: 700 
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Meta Info */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", borderBottom: "1px solid rgba(26,58,82,0.1)", paddingBottom: "12px" }}>
            <p style={{ margin: 0, fontSize: "13px", color: "#6c665e", fontFamily: "var(--serif)" }}>
              Showing <b style={{ color: "#1a3a52" }}>{filteredFAQs.length}</b> verified answers {searchQuery && <span>for "<b>{searchQuery}</b>"</span>}
            </p>

            {(selectedCategory !== "All" || searchQuery) && (
              <button 
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                style={{ background: "none", border: "none", color: "#b2996a", fontSize: "12px", cursor: "pointer", fontWeight: 600, textDecoration: "underline" }}
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* FAQ Accordion List */}
          {filteredFAQs.length === 0 ? (
            <div 
              style={{ 
                textAlign: "center", 
                padding: "60px 20px", 
                background: "#ffffff", 
                borderRadius: "16px", 
                border: "1px solid rgba(178, 153, 106, 0.25)" 
              }}
            >
              <HelpCircle size={48} color="#b2996a" style={{ margin: "0 auto 16px" }} />
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "22px", color: "#1a3a52", margin: "0 0 8px" }}>No Direct Matches Found</h3>
              <p style={{ color: "#6c665e", fontSize: "14px", maxWidth: "460px", margin: "0 auto 24px" }}>
                We couldn't find an answer matching your exact search term. Feel free to rephrase or reach out directly to our 24/7 property desk.
              </p>
              <a 
                href="/enquire" 
                style={{ 
                  background: "#1a3a52", 
                  color: "#ffffff", 
                  padding: "12px 28px", 
                  borderRadius: "999px", 
                  fontSize: "11px", 
                  letterSpacing: "1.5px", 
                  textTransform: "uppercase", 
                  textDecoration: "none", 
                  fontWeight: 600,
                  display: "inline-block" 
                }}
              >
                Contact Advisory Team
              </a>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {filteredFAQs.map((faq) => {
                const isExpanded = expandedId === faq.id;

                return (
                  <div
                    key={faq.id}
                    style={{
                      background: "#ffffff",
                      borderRadius: "12px",
                      border: isExpanded ? "1px solid #b2996a" : "1px solid rgba(26, 58, 82, 0.12)",
                      boxShadow: isExpanded 
                        ? "0 8px 30px rgba(26, 58, 82, 0.08)" 
                        : "0 2px 10px rgba(0,0,0,0.02)",
                      overflow: "hidden",
                      transition: "all 0.3s ease"
                    }}
                  >
                    {/* Question Header Button */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                      aria-expanded={isExpanded}
                      style={{
                        width: "100%",
                        padding: "22px 24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "16px",
                        background: isExpanded ? "rgba(178, 153, 106, 0.04)" : "#ffffff",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "background 0.2s ease"
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                          <span 
                            style={{ 
                              fontSize: "10px", 
                              letterSpacing: "1px", 
                              textTransform: "uppercase", 
                              color: "#b2996a", 
                              fontWeight: 700, 
                              background: "rgba(178, 153, 106, 0.12)", 
                              padding: "2px 8px", 
                              borderRadius: "4px" 
                            }}
                          >
                            {faq.category}
                          </span>
                        </div>
                        <h3 
                          style={{ 
                            fontFamily: "var(--serif)", 
                            fontSize: "clamp(16px, 1.4vw, 19px)", 
                            fontWeight: isExpanded ? 600 : 500, 
                            color: isExpanded ? "#1a3a52" : "#1a3a52", 
                            margin: 0, 
                            lineHeight: 1.35 
                          }}
                        >
                          {faq.question}
                        </h3>
                      </div>

                      <div 
                        style={{ 
                          width: "36px", 
                          height: "36px", 
                          borderRadius: "50%", 
                          background: isExpanded ? "#1a3a52" : "rgba(26, 58, 82, 0.06)", 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center", 
                          flexShrink: 0,
                          transition: "all 0.3s ease" 
                        }}
                      >
                        <ChevronDown 
                          size={18} 
                          color={isExpanded ? "#b2996a" : "#1a3a52"} 
                          style={{ 
                            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", 
                            transition: "transform 0.3s ease" 
                          }} 
                        />
                      </div>
                    </button>

                    {/* Answer Expanded View */}
                    {isExpanded && (
                      <div 
                        style={{ 
                          padding: "0 24px 28px", 
                          background: "rgba(178, 153, 106, 0.04)", 
                          borderTop: "1px solid rgba(178, 153, 106, 0.15)" 
                        }}
                      >
                        {/* Executive Summary */}
                        <div style={{ paddingTop: "18px", marginBottom: "16px" }}>
                          <p 
                            style={{ 
                              fontSize: "15px", 
                              lineHeight: 1.7, 
                              color: "#1a3a52", 
                              fontWeight: 600, 
                              margin: "0 0 12px 0",
                              fontFamily: "var(--serif)" 
                            }}
                          >
                            {faq.summary}
                          </p>
                        </div>

                        {/* Bullet Highlights if available */}
                        {faq.highlights && faq.highlights.length > 0 && (
                          <div 
                            style={{ 
                              background: "#ffffff", 
                              padding: "16px 20px", 
                              borderRadius: "8px", 
                              borderLeft: "3px solid #b2996a", 
                              marginBottom: "16px",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.03)" 
                            }}
                          >
                            <p style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#8B6F47", fontWeight: 700, margin: "0 0 8px 0" }}>KEY SPECIFICATIONS & HIGHLIGHTS</p>
                            <ul style={{ margin: 0, paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                              {faq.highlights.map((h, i) => (
                                <li key={i} style={{ fontSize: "13.5px", color: "#4a5568", lineHeight: 1.55 }}>
                                  {h}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Detailed Explanation */}
                        <p style={{ fontSize: "14px", lineHeight: 1.8, color: "#4a5568", margin: 0 }}>
                          {faq.details}
                        </p>

                        {/* Action link */}
                        <div style={{ marginTop: "20px", display: "flex", gap: "16px", alignItems: "center" }}>
                          <a 
                            href="/enquire" 
                            style={{ 
                              color: "#b2996a", 
                              fontSize: "11px", 
                              letterSpacing: "1.5px", 
                              textTransform: "uppercase", 
                              textDecoration: "none", 
                              fontWeight: 700, 
                              display: "inline-flex", 
                              alignItems: "center", 
                              gap: "6px",
                              transition: "all 0.2s ease" 
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = "#1a3a52"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = "#b2996a"; }}
                          >
                            Inquire About This Topic →
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* "STILL HAVE QUESTIONS?" CARD - SIGNATURE ROYAL DESIGN */}
          <div 
            style={{ 
              marginTop: "80px", 
              background: "linear-gradient(135deg, #1a3a52 0%, #0d1b2a 100%)", 
              borderRadius: "16px", 
              padding: "48px 32px", 
              color: "#ffffff", 
              textAlign: "center",
              border: "1px solid rgba(178, 153, 106, 0.35)",
              boxShadow: "0 12px 40px rgba(13, 27, 42, 0.25)",
              position: "relative",
              overflow: "hidden" 
            }}
          >
            <div style={{ position: "relative", zIndex: 2, maxWidth: "620px", margin: "0 auto" }}>
              <span 
                style={{ 
                  fontSize: "11px", 
                  letterSpacing: "2px", 
                  textTransform: "uppercase", 
                  color: "#b2996a", 
                  fontWeight: 600, 
                  display: "block", 
                  marginBottom: "12px" 
                }}
              >
                DIRECT ADVISORY SUPPORT
              </span>

              <h2 
                style={{ 
                  fontFamily: "var(--serif)", 
                  fontSize: "clamp(26px, 3.5vw, 38px)", 
                  fontWeight: 300, 
                  margin: "0 0 16px", 
                  lineHeight: 1.2 
                }}
              >
                Require Personalized Guidance?
              </h2>

              <p 
                style={{ 
                  color: "rgba(255, 255, 255, 0.8)", 
                  fontSize: "14px", 
                  lineHeight: 1.7, 
                  margin: "0 0 32px",
                  fontFamily: "var(--serif)",
                  fontWeight: 300 
                }}
              >
                Our Senior Property Advisors and Overseas Concierge team are available 24/7 to provide bespoke layout maps, inventory availability, and customized payment schedules.
              </p>

              <div 
                style={{ 
                  display: "flex", 
                  flexWrap: "wrap", 
                  gap: "14px", 
                  justifyContent: "center", 
                  alignItems: "center" 
                }}
              >
                <a 
                  href="https://wa.me/923004647979" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    background: "#25D366", 
                    color: "#ffffff", 
                    padding: "13px 28px", 
                    borderRadius: "999px", 
                    fontSize: "11px", 
                    letterSpacing: "1.5px", 
                    textTransform: "uppercase", 
                    textDecoration: "none", 
                    fontWeight: 600, 
                    display: "inline-flex", 
                    alignItems: "center", 
                    gap: "8px", 
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 16px rgba(37, 211, 102, 0.3)" 
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <MessageSquare size={16} /> WhatsApp Concierge
                </a>

                <a 
                  href="tel:+9242111777588" 
                  style={{ 
                    background: "rgba(255, 255, 255, 0.12)", 
                    color: "#ffffff", 
                    border: "1px solid rgba(255, 255, 255, 0.3)", 
                    padding: "13px 28px", 
                    borderRadius: "999px", 
                    fontSize: "11px", 
                    letterSpacing: "1.5px", 
                    textTransform: "uppercase", 
                    textDecoration: "none", 
                    fontWeight: 600, 
                    display: "inline-flex", 
                    alignItems: "center", 
                    gap: "8px", 
                    transition: "all 0.3s ease" 
                  }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.background = "#b2996a"; 
                    e.currentTarget.style.color = "#111111"; 
                    e.currentTarget.style.borderColor = "#b2996a";
                    e.currentTarget.style.transform = "translateY(-2px)"; 
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)"; 
                    e.currentTarget.style.color = "#ffffff"; 
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                    e.currentTarget.style.transform = "translateY(0)"; 
                  }}
                >
                  <Phone size={16} /> 042-111-777-588
                </a>

                <a 
                  href="/enquire" 
                  style={{ 
                    background: "#b2996a", 
                    color: "#111111", 
                    padding: "13px 28px", 
                    borderRadius: "999px", 
                    fontSize: "11px", 
                    letterSpacing: "1.5px", 
                    textTransform: "uppercase", 
                    textDecoration: "none", 
                    fontWeight: 600, 
                    display: "inline-flex", 
                    alignItems: "center", 
                    gap: "8px", 
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 16px rgba(178, 153, 106, 0.3)" 
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  Submit Official Enquiry →
                </a>
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
            {footerLinks.filter((_, i) => i % 2 === 0).map((item) => {
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
                      <p style={{ whiteSpace: "pre-line" }}>{footerDescriptions[item as keyof typeof footerDescriptions]}</p>
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
                          onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.7"; (e.target as HTMLElement).style.transform = "translateY(-2px)"; }} 
                          onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; (e.target as HTMLElement).style.transform = "translateY(0)"; }}
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
            {footerLinks.filter((_, i) => i % 2 === 1).map((item) => {
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
                      <p style={{ whiteSpace: "pre-line" }}>{footerDescriptions[item as keyof typeof footerDescriptions]}</p>
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
                          onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.7"; (e.target as HTMLElement).style.transform = "translateY(-2px)"; }} 
                          onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; (e.target as HTMLElement).style.transform = "translateY(0)"; }}
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
          <a href="https://tiktok.com/@royalswisscity" target="_blank" rel="noopener noreferrer" title="TikTok"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v13.67a2.4 2.4 0 0 1-2.4 2.4 2.4 2.4 0 0 1-2.4-2.4 2.4 2.4 0 0 1 2.4-2.4c.34 0 .67.05.98.15V9.41a5.81 5.81 0 0 0-.98-.08 6.04 6.04 0 0 0-6.04 6.04 6.04 6.04 0 0 0 6.04-6.04v-3.1a7.7 7.7 0 0 0 3.77 1.01V9.81a4.77 4.77 0 0 1-.77-.06z" /></svg></a>
          <a href="https://linkedin.com/company/royalswisscity" target="_blank" rel="noopener noreferrer" title="LinkedIn"><Linkedin size={24} /></a>
          <a href="https://youtube.com/@royalswisscity" target="_blank" rel="noopener noreferrer" title="YouTube"><Youtube size={24} /></a>
          <a href="https://x.com/royalswisscity" target="_blank" rel="noopener noreferrer" title="X"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.637l-5.1-6.694-5.867 6.694h-3.306l7.733-8.835L2.25 2.25h6.814l4.882 6.45L18.244 2.25zM17.083 18.386h1.83L6.959 4.155H5.049l12.034 14.231z" /></svg></a>
        </div>

        <div className="footer-contact">
          <b>Where life happens.</b>
          <span>© 2026 ROYAL SWISS CITY · PRIVACY POLICY · SITEMAP</span>
        </div>
      </footer>
    </main>
  );
}
