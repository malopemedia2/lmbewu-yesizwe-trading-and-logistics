 import { Helmet } from "react-helmet-async";
import { memo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ─────────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────────
const COMPANY = {
  name: "Imbewu Yesizwe Trading",
  tagline: "Mining & Logistics",
  logo: "https://res.cloudinary.com/doaj3nv5i/image/upload/v1782257545/fmehrvfwgaze1jwfb14f.jpg",
};

const HERO = {
  title: "Health & Safety",
  subtitle: "Zero Compromise. Zero Incidents.",
  description:
    "Safety is not a checkbox — it is the foundation of every operation we undertake. From risk assessment to continuous training, we maintain an unwavering commitment to protecting our people, our clients, and our environment.",
};

const SAFETY_PILLARS = [
  {
    title: "Risk Assessment",
    shortDesc: "Identifying hazards before operations begin.",
    fullDesc:
      "Comprehensive pre-operation risk assessments for every project site. Our teams conduct hazard identification, job safety analysis (JSA), and method statement reviews before any work commences. Proactive mitigation strategies are documented and communicated to all personnel.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    stats: { label: "Assessments Completed", value: "500+" },
  },
  {
    title: "Training & Certification",
    shortDesc: "Continuous employee safety training programs.",
    fullDesc:
      "Mandatory safety inductions, toolbox talks, and specialized training for hazardous work environments. All operators hold valid certifications for their equipment. Regular refresher courses and emergency response drills ensure readiness at every level.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    stats: { label: "Training Hours", value: "10,000+" },
  },
  {
    title: "Regulatory Compliance",
    shortDesc: "Following South African safety regulations and audits.",
    fullDesc:
      "Full adherence to the Occupational Health and Safety Act (OHSA), Mine Health and Safety Act (MHSA), and all relevant SANS standards. Regular third-party audits, incident reporting protocols, and continuous improvement programs maintain our 100% compliance record.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    stats: { label: "Compliance Rate", value: "100%" },
  },
];

const SAFETY_STATS = [
  { value: "0", label: "Lost-Time Incidents" },
  { value: "100%", label: "PPE Compliance" },
  { value: "24/7", label: "Safety Monitoring" },
  { value: "ISO 45001", label: "Aligned Standards" },
];

const SAFETY_PROTOCOLS = [
  "Daily pre-start safety briefings",
  "Weekly toolbox talks",
  "Monthly safety audits",
  "Quarterly emergency drills",
  "Incident reporting within 1 hour",
  "Near-miss tracking and analysis",
];

// ─────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView];
}

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

const SafetyPillarCard = memo(function SafetyPillarCard({ pillar, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ref, isInView] = useInView(0.15);

  return (
    <div
      ref={ref}
      className={`
        group bg-white/5 backdrop-blur-sm border border-white/10 p-8
        transition-all duration-500 ease-out
        hover:bg-white/10 hover:border-[#16A34A]/30 hover:shadow-xl hover:shadow-[#16A34A]/10 hover:-translate-y-1
        ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Icon */}
      <div className="w-14 h-14 bg-[#16A34A]/20 rounded-xl flex items-center justify-center text-[#16A34A] mb-6 group-hover:bg-[#16A34A] group-hover:text-white transition-all duration-300">
        {pillar.icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#16A34A] transition-colors duration-300">
        {pillar.title}
      </h3>

      {/* Description */}
      <p className="text-gray-300 text-sm leading-relaxed mb-4">
        {isExpanded ? pillar.fullDesc : pillar.shortDesc}
      </p>

      {/* Expand Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-[#16A34A] text-xs font-semibold uppercase tracking-wider mb-5 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B2E13] rounded"
      >
        {isExpanded ? "Show Less" : "Learn More"}
      </button>

      {/* Stat - shown when expanded */}
      <div className={`overflow-hidden transition-all duration-400 ${isExpanded ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="pt-4 border-t border-white/10">
          <div className="text-2xl font-bold text-white">{pillar.stats.value}</div>
          <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">{pillar.stats.label}</div>
        </div>
      </div>
    </div>
  );
});

const ProtocolItem = memo(function ProtocolItem({ protocol, index }) {
  const [ref, isInView] = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`
        flex items-center gap-4 p-4 bg-white border border-gray-200
        transition-all duration-500 hover:border-[#16A34A]/30 hover:shadow-md
        ${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}
      `}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="w-10 h-10 bg-[#16A34A]/10 rounded-lg flex items-center justify-center text-[#16A34A] shrink-0">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-gray-700 font-medium text-sm">{protocol}</span>
    </div>
  );
});

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

function Safety() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Health & Safety | {COMPANY.name}</title>
        <meta
          name="description"
          content={`Safety policies, compliance standards and risk management at ${COMPANY.name} (Pty) Ltd.`}
        />
        <meta property="og:title" content={`Health & Safety | ${COMPANY.name}`} />
        <meta property="og:description" content={HERO.subtitle} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ═══════════════════════════════════════ */}
      {/* HERO SECTION */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#0B2E13]">
        {/* Logo Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={COMPANY.logo}
            alt=""
            className="w-full h-full object-contain opacity-[0.05] scale-150"
            style={{
              transform: `translateY(${scrollY * 0.1}px) scale(1.5)`,
              transition: "transform 0.1s linear",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#0B2E13]/90 via-[#0B2E13]/70 to-[#0B2E13]" />
          <div className="absolute inset-0 bg-linear-to-r from-[#0B2E13] via-transparent to-[#0B2E13]" />
        </div>

        {/* Diagonal accent */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-1">
          <svg
            className="absolute top-0 right-0 w-full h-full"
            viewBox="0 0 1440 600"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M800 0 L1440 0 L1440 400 L600 600 Z"
              fill="white"
              fillOpacity="0.03"
            />
          </svg>
        </div>

        {/* Dot pattern */}
        <div className="absolute bottom-0 left-0 w-64 h-64 opacity-10 pointer-events-none z-1">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="safety-dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="2" fill="#16A34A" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#safety-dots)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#16A34A]/20 border border-[#16A34A]/30 rounded-full mb-6">
            <span className="w-2 h-2 bg-[#16A34A] rounded-full animate-pulse" />
            <span className="text-[#16A34A] text-sm font-medium uppercase tracking-wider">
              Safety First
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {HERO.title}
          </h1>

          <p className="mt-4 text-xl md:text-2xl text-[#16A34A] font-medium">
            {HERO.subtitle}
          </p>

          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {HERO.description}
          </p>

          <div className="mt-10">
            <a
              href="#safety-pillars"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-white/10 hover:border-white transition-all duration-300"
            >
              Our Safety Framework
              <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* SAFETY PILLARS */}
      {/* ═══════════════════════════════════════ */}
      <section id="safety-pillars" className="py-20 md:py-28 bg-[#0B2E13] relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#16A34A] mb-3">
              Three Pillars
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Our Safety Framework
            </h2>
            <div className="w-16 h-1 mx-auto mt-4 rounded-full bg-[#16A34A]" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {SAFETY_PILLARS.map((pillar, index) => (
              <SafetyPillarCard key={pillar.title} pillar={pillar} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* SAFETY STATS BAR */}
      {/* ═══════════════════════════════════════ */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {SAFETY_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#0B2E13]">{stat.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mt-2 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* SAFETY PROTOCOLS */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#16A34A] mb-3">
                Daily Operations
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B2E13] mb-6">
                Safety Protocols in Action
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our safety culture is built on consistency. Every team member follows standardized protocols 
                that have been refined through years of operational experience in high-risk mining and industrial environments.
              </p>

              <div className="space-y-3">
                {SAFETY_PROTOCOLS.map((protocol, index) => (
                  <ProtocolItem key={protocol} protocol={protocol} index={index} />
                ))}
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative">
              <div className="bg-[#0B2E13] p-8 md:p-12 relative overflow-hidden">
                {/* Logo watermark */}
                <img
                  src={COMPANY.logo}
                  alt=""
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 object-contain opacity-10"
                  aria-hidden="true"
                />
                
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-[#16A34A]/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#16A34A]/30">
                    <svg className="w-10 h-10 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Safety Certified</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    All operations align with ISO 45001 standards and South African occupational health legislation.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <span className="px-4 py-2 bg-white/10 text-white text-xs font-bold uppercase tracking-wider border border-white/20">
                      OHSA Compliant
                    </span>
                    <span className="px-4 py-2 bg-white/10 text-white text-xs font-bold uppercase tracking-wider border border-white/20">
                      MHSA Aligned
                    </span>
                    <span className="px-4 py-2 bg-white/10 text-white text-xs font-bold uppercase tracking-wider border border-white/20">
                      SANS Certified
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-4 border-b-4 border-[#16A34A]" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* CTA SECTION */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-16 bg-[#16A34A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Safety Questions?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Our safety officers are available to discuss compliance requirements, risk assessments, and site-specific protocols.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-[#0B2E13] px-10 py-4 font-bold uppercase tracking-wider text-sm hover:bg-[#0B2E13] hover:text-white transition-all duration-300 active:scale-95"
          >
            Contact Safety Team
          </Link>
        </div>
      </section>
    </div>
  );
}

export default memo(Safety);