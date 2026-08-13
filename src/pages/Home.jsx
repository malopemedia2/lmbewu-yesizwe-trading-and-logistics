import { Link } from "react-router-dom";
import { memo, useState, useEffect, useCallback, useRef } from "react";

// ─────────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────────
const HERO_CONFIG = {
  headline: "Mining & Logistics Solutions",
  subheadline:
    "Reliable transport, plant hire, maintenance & industrial services in South Africa.",
  ctaText: "Request a Quote",
  ctaLink: "/contact?intent=quote",
  truckImage:
    "https://res.cloudinary.com/doaj3nv5i/image/upload/v1782854521/mwhrii8ebicu0wyu5t5q.jpg",
  stats: [
    { value: "8+", label: "Years Experience" },
    { value: "20+", label: "Projects Delivered" },
    { value: "12+", label: "Heavy Vehicles" },
    { value: "100%", label: "Safety Record" },
  ],
};

// ─────────────────────────────────────────────
// AUTOMATION HOOKS (Enterprise Ready)
// ─────────────────────────────────────────────

// Intersection Observer for scroll animations
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

// Counter animation hook
function useCountUp(end, duration = 2000, startOnView = false) {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView(0.3);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!startOnView || (isInView && !hasAnimated.current)) {
      hasAnimated.current = true;
      let startTime = null;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }, [isInView, end, duration, startOnView]);

  return [ref, count];
}

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

const StatCard = memo(function StatCard({ value, label, delay }) {
  const numericValue = parseInt(value);
  const suffix = value.replace(/[0-9]/g, "");
  const [ref, count] = useCountUp(numericValue, 2000, true);

  return (
    <div
      ref={ref}
      className="text-center px-4 py-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-3xl md:text-4xl font-bold text-white">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-white/80 mt-1 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
});

const DiagonalAccent = memo(function DiagonalAccent() {
  return (
    <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
      {/* White diagonal band - using SVG for reliability */}
      <svg
        className="absolute top-0 right-0 w-full h-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M800 0 L1440 0 L1440 800 L600 800 Z"
          fill="white"
          fillOpacity="0.08"
        />
        <path
          d="M900 0 L1440 0 L1440 600 L700 600 Z"
          fill="white"
          fillOpacity="0.05"
        />
      </svg>

      {/* Green accent line */}
      <div
        className="absolute top-0 right-[20%] w-0.5 h-full bg-[#16A34A]/30"
        style={{ transform: "rotate(15deg)", transformOrigin: "top center" }}
      />
    </div>
  );
});

const DotPattern = memo(function DotPattern() {
  return (
    <div className="absolute bottom-0 left-0 w-96 h-96 opacity-20 pointer-events-none">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="dots"
            x="0"
            y="0"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="2" fill="#8BC34A" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  );
});

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleQuoteClick = useCallback(() => {
    // Enterprise: Integrate with your CRM/analytics here
    window.location.href = HERO_CONFIG.ctaLink;
  }, []);

  return (
    <main>
      {/* ═══════════════════════════════════════ */}
      {/* HERO SECTION */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden bg-[#0B2E13]">
        
        {/* BACKGROUND LAYERS */}
        
        {/* 1. Truck Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_CONFIG.truckImage}
            alt="Heavy duty mining truck"
            className="w-full h-full object-cover object-center"
            style={{
              transform: `translateY(${scrollY * 0.3}px) scale(1.1)`,
              transition: "transform 0.1s linear",
            }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-[#0B2E13]/75" />
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-linear-to-r from-[#0B2E13]/90 via-[#0B2E13]/60 to-transparent" />
        </div>

        {/* 2. Decorative Elements */}
        <DiagonalAccent />
        <DotPattern />

        {/* 3. Animated grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-1"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* CONTENT */}
        <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-20 pb-32">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div
              className={`
                inline-flex items-center gap-2 px-4 py-2 bg-[#16A34A]/20 border border-[#16A34A]/30 rounded-full mb-6
                transition-all duration-700 delay-100
                ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
            >
              <span className="w-2 h-2 bg-[#16A34A] rounded-full animate-pulse" />
              <span className="text-[#16A34A] text-sm font-medium uppercase tracking-wider">
                South Africa's Trusted Partner
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`
                text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight
                transition-all duration-700 delay-200
                ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
            >
              Mining &{" "}
              <span className="text-[#16A34A]">Logistics</span>
              <br />
              Solutions
            </h1>

            {/* Subheadline */}
            <p
              className={`
                mt-6 text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed
                transition-all duration-700 delay-300
                ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
            >
              {HERO_CONFIG.subheadline}
            </p>

            {/* CTA Group */}
            <div
              className={`
                mt-8 flex flex-col sm:flex-row gap-4
                transition-all duration-700 delay-500
                ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
            >
              <button
                onClick={handleQuoteClick}
                className="
                  bg-white text-[#0B2E13] px-8 py-4 text-sm font-bold uppercase tracking-wider
                  transition-all duration-300
                  hover:bg-[#16A34A] hover:text-white hover:shadow-xl hover:shadow-[#16A34A]/30
                  active:scale-95
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B2E13]
                "
              >
                {HERO_CONFIG.ctaText}
              </button>

              <Link
                to="/services"
                className="
                  inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white border-2 border-white/30
                  transition-all duration-300
                  hover:bg-white/10 hover:border-white
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B2E13]
                "
              >
                Our Services
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Stats Bar - Bottom */}
          <div
            className={`
              absolute bottom-0 left-0 right-0 bg-[#0B2E13]/90 backdrop-blur-md border-t border-white/10
              transition-all duration-1000 delay-700
              ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
          >
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {HERO_CONFIG.stats.map((stat, index) => (
                  <StatCard
                    key={stat.label}
                    value={stat.value}
                    label={stat.label}
                    delay={index * 150}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`
            absolute bottom-28 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2
            transition-opacity duration-1000 delay-1000
            ${isLoaded ? "opacity-60" : "opacity-0"}
          `}
        >
          <span className="text-white/60 text-xs uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-px h-8 bg-white/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* SERVICES PREVIEW SECTION (Automation Ready) */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-16">
            <span className="text-[#16A34A] text-sm font-bold uppercase tracking-widest">
              What We Do
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0B2E13]">
              Comprehensive Mining Services
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Transport & Hauling",
                desc: "End-to-end logistics with a fleet of 50+ heavy-duty vehicles.",
                icon: "🚛",
              },
              {
                title: "Plant Hire",
                desc: "Excavators, bulldozers, and specialized mining equipment.",
                icon: "⚙️",
              },
              {
                title: "Maintenance",
                desc: "24/7 on-site mechanical support and preventive servicing.",
                icon: "🔧",
              },
            ].map((service, i) => (
              <ServiceCard key={service.title} {...service} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

const ServiceCard = memo(function ServiceCard({
  title,
  desc,
  icon,
  index,
}) {
  const [ref, isInView] = useInView(0.2);

  return (
    <div
      ref={ref}
      className={`
        group p-8 border border-gray-200 hover:border-[#16A34A]/30 transition-all duration-500
        hover:shadow-xl hover:shadow-[#0B2E13]/5 hover:-translate-y-1
        ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#0B2E13] mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
      <Link
        to="/services"
        className="inline-flex items-center gap-2 mt-4 text-[#16A34A] font-semibold text-sm uppercase tracking-wider group-hover:gap-3 transition-all"
      >
        Learn More
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
});

export default memo(Home);