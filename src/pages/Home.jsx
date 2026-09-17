import { Link } from "react-router-dom";
import { memo, useEffect, useRef, useState } from "react";

const HERO_CONFIG = {
  eyebrow: "South Africa's trusted industrial partner",
  subheadline:
    "Reliable transport, plant hire, maintenance and industrial services delivered safely, on time and ready for the demands of your operation.",
  truckImage:
    "https://res.cloudinary.com/doaj3nv5i/image/upload/v1782854521/mwhrii8ebicu0wyu5t5q.jpg",
  stats: [
    { value: 8, suffix: "+", label: "Years experience" },
    { value: 20, suffix: "+", label: "Projects delivered" },
    { value: 12, suffix: "+", label: "Heavy vehicles" },
    { value: 100, suffix: "%", label: "Safety focused" },
  ],
};

const SERVICES = [
  {
    title: "Transport & hauling",
    desc: "Dependable heavy-duty transport and site logistics that keep materials and operations moving.",
    icon: "🚛",
  },
  {
    title: "Plant hire",
    desc: "Capable equipment for earthworks, construction and mining projects, with practical support when you need it.",
    icon: "⚙️",
  },
  {
    title: "Maintenance & support",
    desc: "Responsive mechanical support and preventive maintenance designed to reduce downtime on site.",
    icon: "🔧",
  },
];

function useInView(threshold = 0.15) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView];
}

function useCountUp(end, duration = 1400) {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView(0.4);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return undefined;
    hasAnimated.current = true;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setCount(end);
      return undefined;
    }

    let frame;
    const start = performance.now();
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [duration, end, isInView]);

  return [ref, count];
}

const StatCard = memo(function StatCard({ value, suffix, label }) {
  const [ref, count] = useCountUp(value);

  return (
    <div ref={ref} className="border-l border-white/20 px-4 first:border-l-0 md:px-6">
      <p className="text-3xl font-black tracking-tight text-white sm:text-4xl">
        {count}
        {suffix}
      </p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
        {label}
      </p>
    </div>
  );
});

const ServiceCard = memo(function ServiceCard({ title, desc, icon, index }) {
  const [ref, isInView] = useInView(0.2);

  return (
    <article
      ref={ref}
      className={`group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-700 hover:-translate-y-2 hover:border-[#16A34A]/50 hover:shadow-xl hover:shadow-[#0B2E13]/10 ${
        isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#0B2E13] text-3xl shadow-lg shadow-[#0B2E13]/20 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#0B2E13]">{title}</h3>
      <p className="mt-3 leading-7 text-slate-600">{desc}</p>
      <Link
        to="/services"
        className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#16A34A] transition-all group-hover:gap-3"
      >
        Explore service <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
});

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => setIsLoaded(true), []);

  return (
    <main>
      <section className="relative isolate min-h-[720px] overflow-hidden bg-[#0B2E13] sm:min-h-screen">
        <div className="absolute inset-0 -z-10">
          <img
            src={HERO_CONFIG.truckImage}
            alt="Heavy duty mining truck at work"
            className="h-full w-full scale-105 object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#061b0b]/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061b0b] via-[#0B2E13]/80 to-[#0B2E13]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061b0b] via-transparent to-[#0B2E13]/30" />
        </div>

        <div className="pointer-events-none absolute right-[-10%] top-0 hidden h-full w-1/2 -skew-x-12 bg-white/[0.05] lg:block" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 opacity-20 [background-image:radial-gradient(#8BC34A_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

        <div className="mx-auto flex min-h-[720px] max-w-7xl flex-col justify-center px-6 pb-36 pt-28 sm:min-h-screen sm:px-10 lg:px-16">
          <div className={`max-w-3xl transition-all duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#8BC34A]/30 bg-[#16A34A]/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#B8E986]">
              <span className="h-2 w-2 rounded-full bg-[#8BC34A] shadow-[0_0_14px_#8BC34A]" />
              {HERO_CONFIG.eyebrow}
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl lg:text-8xl">
              Mining & logistics, <span className="text-[#8BC34A]">built stronger.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              {HERO_CONFIG.subheadline}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-lg bg-[#8BC34A] px-7 py-4 text-sm font-black uppercase tracking-wider text-[#0B2E13] shadow-lg shadow-[#8BC34A]/20 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                View our services <span className="ml-3 text-lg" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[#061b0b]/80 backdrop-blur-md">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-5 px-6 py-6 sm:px-10 md:grid-cols-4 md:py-7 lg:px-16">
            {HERO_CONFIG.stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#16A34A]">What we do</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-[#0B2E13] sm:text-5xl">Capability you can count on.</h2>
            </div>
            <p className="max-w-md leading-7 text-slate-600">Practical solutions, experienced people and equipment ready to perform when your project cannot slow down.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {SERVICES.map((service, index) => <ServiceCard key={service.title} {...service} index={index} />)}
          </div>
        </div>
      </section>

      <section className="bg-[#0B2E13] px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-2xl border border-white/10 bg-white/[0.04] p-8 sm:p-12 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8BC34A]">Ready to move?</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black text-white sm:text-4xl">Let&apos;s make your next project run better.</h2>
          </div>
          <Link to="/contact" className="shrink-0 rounded-lg bg-white px-7 py-4 text-sm font-black uppercase tracking-wider text-[#0B2E13] transition hover:bg-[#8BC34A]">Contact us <span className="ml-2" aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}

export default memo(Home);
