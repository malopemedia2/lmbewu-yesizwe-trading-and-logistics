 import { Helmet } from "react-helmet-async";
import { memo, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ─────────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────────
const COMPANY = {
  name: "Imbewu Yesizwe Trading",
  reg: "(Pty) Ltd",
  founded: "2019",
  founder: "Sherly Ntombikayise Mtombeni",
  location: "Delmas, Mpumalanga, South Africa",
  logo: "https://res.cloudinary.com/doaj3nv5i/image/upload/v1782257545/fmehrvfwgaze1jwfb14f.jpg",
  founderImage: "https://res.cloudinary.com/doaj3nv5i/image/upload/v1782857970/xwdoji5teyw03ofjzj9b.jpg",
  tagline: "Seed of the Nation",
  meaning: "growth, empowerment, and sustainable development",
};

const MISSION_VISION = [
  {
    title: "Mission",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    content:
      "To deliver integrated, high-quality services that empower clients and communities through logistics and support solutions.",
  },
  {
    title: "Vision",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    content:
      "To become a leading multi-purpose service provider in South Africa known for innovation and excellence.",
  },
  {
    title: "Values",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    isList: true,
    items: ["Integrity", "Innovation", "Sustainability", "Community Focus", "Excellence"],
  },
];

const VALUES = [
  { label: "Founded", value: "2019" },
  { label: "Location", value: "Delmas, Mpumalanga" },
  { label: "Founder", value: "Sherly Ntombikayise Mtombeni" },
  { label: "Status", value: "Active & Growing" },
];

// ─────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────

function useInView(threshold = 0.15) {
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

const SectionHeader = memo(function SectionHeader({ title, subtitle, light = true }) {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      className={`text-center mb-12 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {subtitle && (
        <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] mb-3 text-[#16A34A]">
          {subtitle}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${light ? "text-[#0B2E13]" : "text-white"}`}>
        {title}
      </h2>
      <div className="w-16 h-1 mx-auto mt-4 rounded-full bg-[#16A34A]" />
    </div>
  );
});

const AnimatedSection = memo(function AnimatedSection({ children, className = "", delay = 0 }) {
  const [ref, isInView] = useInView();

  return (
    <section
      ref={ref}
      className={`transition-all duration-700 ${className} ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
});

const ValueCard = memo(function ValueCard({ label, value }) {
  return (
    <div className="text-center p-6 bg-white border border-gray-200 hover:border-[#16A34A]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#0B2E13]/5 group">
      <div className="text-2xl md:text-3xl font-bold text-[#0B2E13] group-hover:text-[#16A34A] transition-colors">
        {value}
      </div>
      <div className="text-xs uppercase tracking-widest text-gray-500 mt-2 font-medium">
        {label}
      </div>
    </div>
  );
});

const MissionCard = memo(function MissionCard({ item, index }) {
  const [ref, isInView] = useInView(0.2);

  return (
    <div
      ref={ref}
      className={`bg-white p-8 border border-gray-200 hover:border-[#16A34A]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#0B2E13]/5 hover:-translate-y-1 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="w-12 h-12 bg-[#16A34A]/10 rounded-lg flex items-center justify-center text-[#16A34A] mb-5">
        {item.icon}
      </div>
      <h3 className="text-xl font-bold text-[#0B2E13] mb-3">{item.title}</h3>
      {item.isList ? (
        <ul className="space-y-2">
          {item.items.map((val) => (
            <li key={val} className="flex items-center gap-2 text-gray-600 text-sm">
              <span className="w-1.5 h-1.5 bg-[#16A34A] rounded-full shrink-0" />
              {val}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 leading-relaxed text-sm">{item.content}</p>
      )}
    </div>
  );
});

// ─────────────────────────────────────────────
// HERO SECTION WITH LOGO BACKGROUND
// ─────────────────────────────────────────────

const HeroSection = memo(function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#0B2E13]">
      {/* Logo Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={COMPANY.logo}
          alt=""
          className="w-full h-full object-contain opacity-[0.06] scale-150"
          style={{
            transform: `translateY(${scrollY * 0.15}px) scale(1.5)`,
            transition: "transform 0.1s linear",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#0B2E13]/80 via-[#0B2E13]/60 to-[#0B2E13]" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0B2E13] via-transparent to-[#0B2E13]" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-1">
        <div className="absolute top-20 left-10 w-32 h-32 border border-[#16A34A]/20 rounded-full" />
        <div className="absolute bottom-20 right-10 w-48 h-48 border border-[#16A34A]/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 border border-white/5 rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#16A34A]/20 border border-[#16A34A]/30 rounded-full mb-6">
          <span className="w-2 h-2 bg-[#16A34A] rounded-full animate-pulse" />
          <span className="text-[#16A34A] text-sm font-medium uppercase tracking-wider">
            Est. {COMPANY.founded}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
          About <span className="text-[#16A34A]">{COMPANY.name}</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          A versatile, multi-purpose private limited company specializing in logistics, transportation, maintenance, and facility management.
        </p>

        <div className="mt-4 inline-flex items-center gap-2 text-[#16A34A] text-sm font-medium">
          <span className="italic">"{COMPANY.tagline}"</span>
          <span className="text-gray-500">— {COMPANY.meaning}</span>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/services"
            className="bg-white text-[#0B2E13] px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-[#16A34A] hover:text-white transition-all duration-300 active:scale-95"
          >
            Our Services
          </Link>
          <Link
            to="/contact"
            className="border-2 border-white/30 text-white px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
        <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
});

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

function About() {
  return (
    <div>
      <Helmet>
        <title>About Us | {COMPANY.name}</title>
        <meta
          name="description"
          content={`${COMPANY.name} ${COMPANY.reg} is a South African logistics, maintenance and multi-service company founded in ${COMPANY.founded}.`}
        />
        <meta property="og:title" content={`About Us | ${COMPANY.name}`} />
        <meta property="og:description" content={`Discover the story behind ${COMPANY.name} - ${COMPANY.tagline}`} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* HERO */}
      <HeroSection />

      {/* COMPANY PROFILE */}
      <AnimatedSection className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <SectionHeader title="Company Profile" subtitle="Who We Are" />

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-600 leading-relaxed text-lg">
              {COMPANY.name} {COMPANY.reg} is a versatile, multi-purpose private limited company based in {COMPANY.location},
              specializing in logistics, transportation, maintenance, cleaning, and facility management services.
              The name <span className="font-semibold text-[#0B2E13]">"{COMPANY.tagline}"</span> represents{" "}
              <span className="text-[#16A34A] font-medium">{COMPANY.meaning}</span>.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
            {VALUES.map((item) => (
              <ValueCard key={item.label} {...item} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* HISTORY */}
      <AnimatedSection className="py-20 md:py-28 bg-[#0B2E13] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <SectionHeader title="History & Establishment" subtitle="Our Journey" light={false} />

          <div className="max-w-3xl mx-auto">
            <div className="relative pl-8 md:pl-0">
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-[#16A34A]/30 md:-translate-x-px" />

              <div className="space-y-12">
                <TimelineItem
                  year="2019"
                  title="Foundation"
                  description={`Established on 6 February 2019 in ${COMPANY.location} by ${COMPANY.founder}.`}
                  align="left"
                />
                <TimelineItem
                  year="2020"
                  title="Expansion"
                  description="Ventured beyond transport into maintenance, plant hire, and consulting services."
                  align="right"
                />
                <TimelineItem
                  year="Today"
                  title="Multi-Service Enterprise"
                  description="A full-service provider including logistics, maintenance, plant hire, consulting, and cleaning services."
                  align="left"
                  highlight
                />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* MISSION / VISION / VALUES */}
      <AnimatedSection className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <SectionHeader title="Mission, Vision & Values" subtitle="What Drives Us" />

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {MISSION_VISION.map((item, index) => (
              <MissionCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* LEADERSHIP - WITH REAL PROFILE PICTURE */}
      <AnimatedSection className="py-20 md:py-28 bg-[#0B2E13] relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={COMPANY.logo}
            alt=""
            className="w-full h-full object-contain opacity-[0.04] scale-125"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#0B2E13] via-[#0B2E13]/90 to-[#0B2E13]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <SectionHeader title="Leadership Team" subtitle="Meet Our Founder" light={false} />

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-lg">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* REAL PROFILE PICTURE */}
                <div className="shrink-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#16A34A]/40 ring-4 ring-[#16A34A]/20 shadow-2xl shadow-black/30">
                    <img
                      src={COMPANY.founderImage}
                      alt={`${COMPANY.founder} - Founder & CEO`}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                </div>

                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {COMPANY.founder}
                  </h3>
                  <p className="text-[#16A34A] font-medium uppercase tracking-wider text-sm mt-1">
                    Founder & Chief Executive Officer
                  </p>
                  <p className="text-gray-300 mt-4 leading-relaxed">
                    Leads the company with a focus on strategic planning, operational efficiency, and client relationships.
                    Also involved in logistics ventures such as <span className="text-white font-medium">Ubuhle Bendalo Logistics</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA SECTION */}
      <AnimatedSection className="py-16 bg-[#16A34A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Partner with South Africa's trusted mining and logistics specialist.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-[#0B2E13] px-10 py-4 font-bold uppercase tracking-wider text-sm hover:bg-[#0B2E13] hover:text-white transition-all duration-300 active:scale-95"
          >
            Request a Quote
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}

// ─────────────────────────────────────────────
// TIMELINE COMPONENT
// ─────────────────────────────────────────────

const TimelineItem = memo(function TimelineItem({ year, title, description, align, highlight = false }) {
  const [ref, isInView] = useInView(0.2);

  const isLeft = align === "left";

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-[#16A34A] rounded-full border-4 border-[#0B2E13] z-10" />

      <div className={`md:w-1/2 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"} pl-8 md:pl-0`}>
        <div
          className={`transition-all duration-700 ${isInView ? "opacity-100 translate-x-0" : `opacity-0 ${isLeft ? "-translate-x-8" : "translate-x-8"}`}`}
        >
          <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded mb-2 ${highlight ? "bg-[#16A34A] text-white" : "bg-[#16A34A]/20 text-[#16A34A]"}`}>
            {year}
          </span>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2" />
    </div>
  );
});

export default memo(About);