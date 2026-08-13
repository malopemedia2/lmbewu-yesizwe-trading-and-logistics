import { Link, useLocation } from "react-router-dom";
import { memo, useCallback, useState, useEffect } from "react";

// ─────────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Safety", path: "/safety" },
  { label: "Contact", path: "/contact" },
];

const BRAND = {
  name: "IMBEWU YESIZWE",
  tagline: "MINING & LOGISTICS",
  logo: "https://res.cloudinary.com/doaj3nv5i/image/upload/v1782257545/fmehrvfwgaze1jwfb14f.jpg",
  logoAlt: "Imbewu Yesizwe Logo",
};

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

const Logo = memo(function Logo({ className = "" }) {
  return (
    <Link 
      to="/" 
      className={`flex items-center gap-2 sm:gap-3 shrink-0 group ${className}`}
      aria-label={`${BRAND.name} - Return to homepage`}
    >
      <div className="relative">
        <img
          src={BRAND.logo}
          alt={BRAND.logoAlt}
          className="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 object-contain transition-transform duration-300 group-hover:scale-105"
          loading="eager"
          width={44}
          height={44}
        />
      </div>
      
      <div className="flex flex-col">
        <span className="text-sm sm:text-base md:text-lg font-bold tracking-wide text-[#0B2E13] leading-tight">
          {BRAND.name}
        </span>
        <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 tracking-[0.2em] uppercase leading-tight">
          {BRAND.tagline}
        </span>
      </div>
    </Link>
  );
});

const NavLink = memo(function NavLink({ to, children, isActive }) {
  return (
    <Link
      to={to}
      className={`
        relative px-1 py-1 text-[11px] sm:text-xs md:text-sm font-medium whitespace-nowrap
        transition-colors duration-200 ease-out
        ${isActive 
          ? "text-[#16A34A]" 
          : "text-gray-700 hover:text-[#16A34A]"
        }
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2 rounded-sm
      `}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#16A34A] rounded-full" />
      )}
    </Link>
  );
});

const CTAButton = memo(function CTAButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        bg-[#0B2E13] text-white 
        px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2 
        text-[11px] sm:text-xs md:text-sm 
        font-medium whitespace-nowrap shrink-0
        transition-all duration-200 ease-out
        hover:bg-[#0B2E13]/90 hover:shadow-lg hover:shadow-[#0B2E13]/20
        active:scale-95
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2
      "
      aria-label="Request a quote for mining and logistics services"
    >
      Request Quote
    </button>
  );
});

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleQuoteRequest = useCallback(() => {
    window.location.href = "/contact?intent=quote";
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-50 w-full
        bg-white
        border-b border-gray-200
        transition-shadow duration-300
        ${isScrolled ? "shadow-md shadow-black/5" : ""}
      `}
    >
      <nav 
        className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* LOGO */}
          <Logo />

          {/* NAV LINKS */}
          <div 
            className="
              flex items-center gap-1 sm:gap-2 md:gap-6 lg:gap-8 
              overflow-x-auto no-scrollbar
            "
            role="menubar"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                isActive={location.pathname === link.path}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* CTA */}
          <CTAButton onClick={handleQuoteRequest} />
        </div>
      </nav>
    </header>
  );
}

export default memo(Navbar);