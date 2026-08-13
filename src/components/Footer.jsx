 import { Link } from "react-router-dom";
import { memo } from "react";

// ─────────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────────
const COMPANY = {
  name: "Imbewu Yesizwe Trading",
  tagline: "Mining & Logistics",
  description:
    "Multi-purpose logistics, mining support, and facility services company based in South Africa.",
  email: "sherley@imbewuyesizwetrading.com",
  phone: "076 293 8945",
  location: "Delmas, Mpumalanga, South Africa",
  year: new Date().getFullYear(),
  reg: "(Pty) Ltd",
};

const FOOTER_LINKS = {
  company: [
    { label: "About Us", path: "/about" },
    { label: "Our Services", path: "/services" },
    { label: "Projects", path: "/projects" },
    { label: "Safety", path: "/safety" },
  ],
  services: [
    { label: "Transport & Hauling", path: "/services#transport" },
    { label: "Plant Hire", path: "/services#plant-hire" },
    { label: "Maintenance", path: "/services#maintenance" },
    { label: "Industrial Services", path: "/services#industrial" },
  ],
  legal: [
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms of Service", path: "/terms" },
    { label: "Cookie Policy", path: "/cookies" },
  ],
};

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/imbewu-yesizwe",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com/imbewuyesizwe",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

const FooterColumn = memo(function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-5">
        {title}
      </h3>
      {children}
    </div>
  );
});

const FooterLink = memo(function FooterLink({ to, href, children }) {
  const className =
    "text-sm text-gray-400 hover:text-[#16A34A] transition-colors duration-200 inline-flex items-center gap-1 group";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={className}>
      {children}
      <svg
        className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </Link>
  );
});

const ContactItem = memo(function ContactItem({ icon, children, href }) {
  const content = (
    <span className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-200">
      <span className="text-[#16A34A] mt-0.5 shrink-0">{icon}</span>
      <span>{children}</span>
    </span>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }
  return <div>{content}</div>;
});

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#0B2E13] text-white" role="contentinfo">
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block group">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-[#16A34A]/20 rounded-lg flex items-center justify-center border border-[#16A34A]/30 group-hover:bg-[#16A34A]/30 transition-colors">
                  <span className="text-[#16A34A] font-bold text-lg">IY</span>
                </div>
                <div>
                  <div className="font-bold text-lg tracking-wide">
                    {COMPANY.name}
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
                    {COMPANY.tagline}
                  </div>
                </div>
              </div>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm mb-6">
              {COMPANY.description}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.name}`}
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#16A34A] hover:border-[#16A34A] transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* COMPANY LINKS */}
          <div className="lg:col-span-2 lg:col-start-6">
            <FooterColumn title="Company">
              <ul className="space-y-3">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.path}>
                    <FooterLink to={link.path}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          </div>

          {/* SERVICES LINKS */}
          <div className="lg:col-span-2">
            <FooterColumn title="Services">
              <ul className="space-y-3">
                {FOOTER_LINKS.services.map((link) => (
                  <li key={link.path}>
                    <FooterLink to={link.path}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          </div>

          {/* CONTACT COLUMN */}
          <div className="lg:col-span-3">
            <FooterColumn title="Contact">
              <div className="space-y-4">
                <ContactItem
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                  href={`mailto:${COMPANY.email}`}
                >
                  {COMPANY.email}
                </ContactItem>

                <ContactItem
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                  href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                >
                  {COMPANY.phone}
                </ContactItem>

                <ContactItem
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                >
                  {COMPANY.location}
                </ContactItem>
              </div>
            </FooterColumn>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              © {COMPANY.year} {COMPANY.name} {COMPANY.reg}. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              {FOOTER_LINKS.legal.map((link) => (
                <FooterLink key={link.path} to={link.path}>
                  {link.label}
                </FooterLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);