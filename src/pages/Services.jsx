 import { Helmet } from "react-helmet-async";
import { memo, useState, useEffect, useRef } from "react"; // ← ADDED useRef
import { Link } from "react-router-dom";

// ─────────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────────
const COMPANY = {
  name: "Imbewu Yesizwe Trading",
  tagline: "Mining & Logistics",
};

const HERO = {
  title: "Our Services",
  subtitle: "Integrated solutions across logistics, mining support, and facility management",
  description:
    "From heavy-duty transport to precision maintenance, we deliver end-to-end solutions that keep South Africa's mining and industrial sectors moving forward.",
};

const SERVICES = [
  {
    title: "Transportation & Logistics",
    shortDesc: "Reliable freight, coal transport, and supply chain solutions across South Africa.",
    fullDesc:
      "End-to-end logistics management including long-haul freight, coal transportation, cross-border logistics, and just-in-time supply chain coordination. Our fleet operates 24/7 with real-time GPS tracking and dedicated route optimization.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
    features: ["Long-haul freight", "Coal transport", "Cross-border logistics", "GPS fleet tracking"],
    cta: "Get Transport Quote",
  },
  {
    title: "Maintenance Services",
    shortDesc: "Vehicle, equipment, and facility maintenance ensuring operational efficiency.",
    fullDesc:
      "Comprehensive maintenance programs covering heavy vehicle servicing, plant equipment overhaul, and facility upkeep. Preventive and reactive maintenance with certified technicians and genuine parts sourcing.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    features: ["Heavy vehicle servicing", "Plant equipment overhaul", "Facility upkeep", "Certified technicians"],
    cta: "Schedule Maintenance",
  },
  {
    title: "Consulting",
    shortDesc: "Business operations, compliance, and strategic advisory services.",
    fullDesc:
      "Expert consulting in mining compliance, operational audits, BEE strategy, risk management, and business process optimization. We help clients navigate regulatory frameworks and unlock operational excellence.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    features: ["Mining compliance", "Operational audits", "BEE strategy", "Risk management"],
    cta: "Book Consultation",
  },
  {
    title: "Fleet Management",
    shortDesc: "Full truck fleet tracking, scheduling, maintenance, and optimization.",
    fullDesc:
      "Complete fleet lifecycle management including acquisition planning, driver training programs, fuel monitoring, route optimization, and regulatory compliance. Real-time dashboards and automated reporting.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7" />
      </svg>
    ),
    features: ["Acquisition planning", "Driver training", "Fuel monitoring", "Route optimization"],
    cta: "Manage My Fleet",
  },
  {
    title: "PPE Supply",
    shortDesc: "Personal protective equipment for industrial and mining environments.",
    fullDesc:
      "Certified PPE procurement and supply chain for mining, construction, and industrial sites. Hard hats, safety boots, high-visibility clothing, respiratory protection, and custom-branded safety gear.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    features: ["Certified safety gear", "Bulk procurement", "Custom branding", "Site delivery"],
    cta: "Order PPE",
  },
  {
    title: "Cleaning Services",
    shortDesc: "Industrial and commercial cleaning using professional eco-friendly teams.",
    fullDesc:
      "Specialized industrial cleaning for mining sites, warehouses, and commercial facilities. Eco-friendly chemicals, waste management compliance, and trained teams operating to ISO standards.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    features: ["Industrial site cleaning", "Eco-friendly chemicals", "Waste management", "ISO standards"],
    cta: "Book Cleaning",
  },
  {
    title: "Plant Hire",
    shortDesc: "Excavators, dump trucks, bulldozers, loaders, graders and more (wet & dry hire).",
    fullDesc:
      "Heavy machinery rental with operator (wet hire) or without (dry hire). Excavators, articulated dump trucks, bulldozers, wheel loaders, motor graders, and specialized mining equipment. Flexible daily, weekly, and monthly rates.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    features: ["Wet & dry hire", "Excavators & dump trucks", "Flexible rates", "On-site delivery"],
    cta: "Hire Equipment",
  },
];

// ─────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null); // ← useRef NOW IMPORTED

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

const ServiceCard = memo(function ServiceCard({ service, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ref, isInView] = useInView(0.15);

  return (
    <div
      ref={ref}
      className={`
        group bg-white border border-gray-200 p-6 md:p-8
        transition-all duration-500 ease-out
        hover:border-[#16A34A]/30 hover:shadow-xl hover:shadow-[#0B2E13]/5 hover:-translate-y-1
        ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="w-14 h-14 bg-[#16A34A]/10 rounded-xl flex items-center justify-center text-[#16A34A] mb-5 group-hover:bg-[#16A34A] group-hover:text-white transition-all duration-300">
        {service.icon}
      </div>

      <h3 className="text-lg md:text-xl font-bold text-[#0B2E13] mb-2 group-hover:text-[#16A34A] transition-colors duration-300">
        {service.title}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        {isExpanded ? service.fullDesc : service.shortDesc}
      </p>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-[#16A34A] text-xs font-semibold uppercase tracking-wider mb-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2 rounded"
      >
        {isExpanded ? "Show Less" : "Read More"}
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
        <ul className="space-y-2 mb-5">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-1.5 h-1.5 bg-[#16A34A] rounded-full shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <Link
        to={`/contact?service=${encodeURIComponent(service.title)}`}
        className="
          inline-flex items-center gap-2
          bg-[#0B2E13] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider
          transition-all duration-300
          hover:bg-[#16A34A] hover:shadow-lg hover:shadow-[#16A34A]/30
          active:scale-95
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2
        "
      >
        {service.cta}
        <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  );
});

const StatsBar = memo(function StatsBar() {
  const stats = [
    { value: "7", label: "Core Services" },
    { value: "24/7", label: "Operations" },
    { value: "50+", label: "Fleet Vehicles" },
    { value: "100%", label: "Compliance" },
  ];

  return (
    <div className="bg-[#0B2E13] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

function Services() {
  return (
    <div>
      <Helmet>
        <title>Services | {COMPANY.name}</title>
        <meta
          name="description"
          content={`${COMPANY.name} offers integrated logistics, mining support, maintenance, fleet management, PPE supply, cleaning services, and plant hire across South Africa.`}
        />
        <meta property="og:title" content={`Services | ${COMPANY.name}`} />
        <meta property="og:description" content={HERO.subtitle} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative bg-[#0B2E13] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-20 w-64 h-64 border border-[#16A34A]/20 rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 border border-white/5 rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-20 md:pt-32 md:pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#16A34A]/20 border border-[#16A34A]/30 rounded-full mb-6">
            <span className="w-2 h-2 bg-[#16A34A] rounded-full animate-pulse" />
            <span className="text-[#16A34A] text-sm font-medium uppercase tracking-wider">
              What We Do
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {HERO.title}
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {HERO.description}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="bg-white text-[#0B2E13] px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-[#16A34A] hover:text-white transition-all duration-300 active:scale-95"
            >
              Request a Quote
            </Link>
            <a
              href="#services-grid"
              className="border-2 border-white/30 text-white px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-white/10 hover:border-white transition-all duration-300"
            >
              Explore Services
            </a>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <StatsBar />

      {/* SERVICES GRID */}
      <section id="services-grid" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#16A34A] mb-3">
              Comprehensive Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B2E13]">
              Services Tailored to Your Needs
            </h2>
            <div className="w-16 h-1 mx-auto mt-4 rounded-full bg-[#16A34A]" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-[#16A34A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Not Sure What You Need?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Our team will assess your project and recommend the right combination of services.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-[#0B2E13] px-10 py-4 font-bold uppercase tracking-wider text-sm hover:bg-[#0B2E13] hover:text-white transition-all duration-300 active:scale-95"
          >
            Speak to an Expert
          </Link>
        </div>
      </section>
    </div>
  );
}

export default memo(Services);