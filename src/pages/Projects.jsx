 import { Helmet } from "react-helmet-async";
import { memo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ─────────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────────
const COMPANY = {
  name: "Imbewu Yesizwe Trading",
  tagline: "Mining & Logistics",
};

const HERO = {
  title: "Our Projects",
  subtitle: "Key operational work delivered across South Africa",
  description:
    "A proven track record of successful project execution in mining logistics, industrial services, and heavy equipment deployment. Every project delivered with zero compromise on safety, efficiency, and compliance.",
};

const PROJECTS = [
  {
    title: "Coal Transport Operations",
    category: "Logistics",
    location: "Mpumalanga, South Africa",
    year: "2019 – Present",
    shortDesc: "Long-haul coal transportation serving major mining clients with dedicated fleet operations.",
    fullDesc:
      "End-to-end coal haulage operations from pit to port, managing over 50 heavy-duty trucks across multiple routes. Real-time GPS tracking, load optimization, and 24/7 dispatch coordination ensure consistent delivery schedules with zero safety incidents.",
    stats: [
      { label: "Tons Moved", value: "2M+" },
      { label: "Fleet Units", value: "35" },
      { label: "On-Time Rate", value: "99.2%" },
    ],
    tags: ["Coal Haulage", "Cross-Border", "GPS Tracking"],
    image: "https://res.cloudinary.com/doaj3nv5i/image/upload/v1782854521/mwhrii8ebicu0wyu5t5q.jpg",
  },
  {
    title: "Fleet Logistics Management",
    category: "Fleet Services",
    location: "Delmas, Mpumalanga",
    year: "2020 – Present",
    shortDesc: "Comprehensive fleet management including scheduling, maintenance, and driver training programs.",
    fullDesc:
      "Full lifecycle fleet management for client-owned and company-operated vehicles. Includes preventive maintenance scheduling, fuel monitoring, driver compliance training, and regulatory documentation. Reduced client downtime by 40% through predictive maintenance protocols.",
    stats: [
      { label: "Vehicles Managed", value: "50+" },
      { label: "Uptime Improvement", value: "40%" },
      { label: "Cost Savings", value: "25%" },
    ],
    tags: ["Fleet Optimization", "Preventive Maintenance", "Driver Training"],
    image: "https://res.cloudinary.com/doaj3nv5i/image/upload/v1782854521/mwhrii8ebicu0wyu5t5q.jpg",
  },
  {
    title: "Industrial Cleaning Contracts",
    category: "Facility Services",
    location: "Multiple Sites, Mpumalanga",
    year: "2021 – Present",
    shortDesc: "Large-scale industrial and mining site cleaning with eco-friendly processes and ISO compliance.",
    fullDesc:
      "Specialized cleaning services for mining processing plants, warehouses, and commercial facilities. Teams trained in hazardous material handling, waste segregation, and environmental compliance. All chemicals meet eco-friendly standards with full MSDS documentation.",
    stats: [
      { label: "Sites Serviced", value: "12" },
      { label: "Team Members", value: "45" },
      { label: "Compliance Rate", value: "100%" },
    ],
    tags: ["Eco-Friendly", "Hazmat Certified", "ISO Standards"],
    image: "https://res.cloudinary.com/doaj3nv5i/image/upload/v1782854521/mwhrii8ebicu0wyu5t5q.jpg",
  },
  {
    title: "Plant Hire Deployments",
    category: "Equipment Rental",
    location: "South Africa",
    year: "2020 – Present",
    shortDesc: "Wet and dry hire of excavators, dump trucks, bulldozers, and specialized mining equipment.",
    fullDesc:
      "Flexible heavy machinery rental solutions for mining and construction projects. Equipment includes 30-ton excavators, articulated dump trucks, dozers, motor graders, and wheel loaders. Both wet hire (with operator) and dry hire options available with on-site delivery and technical support.",
    stats: [
      { label: "Equipment Units", value: "25+" },
      { label: "Client Sites", value: "8" },
      { label: "Hire Flexibility", value: "Daily/Monthly" },
    ],
    tags: ["Wet Hire", "Dry Hire", "On-Site Support"],
    image: "https://res.cloudinary.com/doaj3nv5i/image/upload/v1782854521/mwhrii8ebicu0wyu5t5q.jpg",
  },
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

const ProjectCard = memo(function ProjectCard({ project, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ref, isInView] = useInView(0.12);

  return (
    <div
      ref={ref}
      className={`
        group bg-white border border-gray-200 overflow-hidden
        transition-all duration-600 ease-out
        hover:border-[#16A34A]/30 hover:shadow-xl hover:shadow-[#0B2E13]/5 hover:-translate-y-1
        ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0B2E13]/80 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-[#16A34A] text-white text-xs font-bold uppercase tracking-wider">
            {project.category}
          </span>
        </div>

        {/* Year Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[#0B2E13] text-xs font-bold">
            {project.year}
          </span>
        </div>

        {/* Location */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/90 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {project.location}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-[#0B2E13] group-hover:text-[#16A34A] transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mt-3">
          {isExpanded ? project.fullDesc : project.shortDesc}
        </p>

        {/* Expand Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-[#16A34A] text-xs font-semibold uppercase tracking-wider hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2 rounded"
        >
          {isExpanded ? "Show Less" : "Read Full Case Study"}
        </button>

        {/* Stats - shown when expanded */}
        <div className={`overflow-hidden transition-all duration-400 ${isExpanded ? "max-h-32 opacity-100 mt-5" : "max-h-0 opacity-0"}`}>
          <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-5">
            {project.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl md:text-2xl font-bold text-[#0B2E13]">{stat.value}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium hover:bg-[#16A34A]/10 hover:text-[#16A34A] transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-6 pt-5 border-t border-gray-100">
          <Link
            to={`/contact?project=${encodeURIComponent(project.title)}`}
            className="
              inline-flex items-center gap-2
              text-[#16A34A] text-sm font-bold uppercase tracking-wider
              hover:text-[#0B2E13] transition-colors duration-200
              group/link
            "
          >
            Discuss This Project
            <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
});

const StatsBar = memo(function StatsBar() {
  const stats = [
    { value: "4", label: "Active Projects" },
    { value: "2M+", label: "Tons Transported" },
    { value: "50+", label: "Fleet Vehicles" },
    { value: "100%", label: "Safety Record" },
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

function Projects() {
  return (
    <div>
      <Helmet>
        <title>Projects | {COMPANY.name}</title>
        <meta
          name="description"
          content={`${COMPANY.name} project portfolio: coal transport, fleet management, industrial cleaning, and plant hire across South Africa.`}
        />
        <meta property="og:title" content={`Projects | ${COMPANY.name}`} />
        <meta property="og:description" content={HERO.subtitle} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative bg-[#0B2E13] overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-20 w-64 h-64 border border-[#16A34A]/20 rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 border border-white/5 rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-20 md:pt-32 md:pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#16A34A]/20 border border-[#16A34A]/30 rounded-full mb-6">
            <span className="w-2 h-2 bg-[#16A34A] rounded-full animate-pulse" />
            <span className="text-[#16A34A] text-sm font-medium uppercase tracking-wider">
              Portfolio
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
              Start a Project
            </Link>
            <a
              href="#projects-grid"
              className="border-2 border-white/30 text-white px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-white/10 hover:border-white transition-all duration-300"
            >
              View Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <StatsBar />

      {/* PROJECTS GRID */}
      <section id="projects-grid" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#16A34A] mb-3">
              Delivered Work
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B2E13]">
              Projects That Define Excellence
            </h2>
            <div className="w-16 h-1 mx-auto mt-4 rounded-full bg-[#16A34A]" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-[#16A34A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            We bring the same rigor and commitment to every new engagement. Let's discuss your requirements.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-[#0B2E13] px-10 py-4 font-bold uppercase tracking-wider text-sm hover:bg-[#0B2E13] hover:text-white transition-all duration-300 active:scale-95"
          >
            Request a Proposal
          </Link>
        </div>
      </section>
    </div>
  );
}

export default memo(Projects);