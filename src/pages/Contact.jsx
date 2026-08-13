
import { Helmet } from "react-helmet-async";
import { memo, useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";

// ─── CONFIGURATION ───
const COMPANY = {
  name: "Imbewu Yesizwe Trading",
  logo: "https://res.cloudinary.com/doaj3nv5i/image/upload/v1782257545/fmehrvfwgaze1jwfb14f.jpg",
  email: "sherley@imbewuyesizwetrading.com",
  phone: "076 293 8945",
  location: "Delmas, Mpumalanga, South Africa",
};

const EMAILJS_CONFIG = {
  SERVICE_ID: "service_f8zr6cs",
  TEMPLATE_ID: "template_m11swhd",
  PUBLIC_KEY: "yMkXd35e0-VQfYtr0",
};

const SERVICES_LIST = [
  "Transportation & Logistics",
  "Maintenance Services",
  "Consulting",
  "Fleet Management",
  "PPE Supply",
  "Cleaning Services",
  "Plant Hire",
  "General Inquiry",
];

// ─── HOOKS ───
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

// ─── MAIN COMPONENT ───
function Contact() {
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    from_phone: "",
    service_interest: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.from_name.trim()) newErrors.from_name = "Full name is required";
    if (!formData.from_email.trim()) {
      newErrors.from_email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email)) {
      newErrors.from_email = "Please enter a valid email address";
    }
    if (!formData.service_interest) newErrors.service_interest = "Please select a service";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        e.target,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setSubmitStatus("success");
      setFormData({
        from_name: "",
        from_email: "",
        from_phone: "",
        service_interest: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }, [validate]);

  const [infoRef, infoInView] = useInView(0.15);
  const [formSectionRef, formSectionInView] = useInView(0.15);

  return (
    <div>
      <Helmet>
        <title>Contact | {COMPANY.name}</title>
        <meta
          name="description"
          content={`Contact ${COMPANY.name} for logistics, mining support, and service inquiries. Email: ${COMPANY.email} | Phone: ${COMPANY.phone}`}
        />
      </Helmet>

      {/* HERO */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-[#0B2E13]">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <img
            src={COMPANY.logo}
            alt=""
            className="w-[70%] max-w-2xl object-contain opacity-[0.15]"
            style={{
              transform: `translateY(${scrollY * 0.08}px)`,
              transition: "transform 0.1s linear",
              filter: "brightness(1.2) contrast(1.1)",
            }}
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-[#0B2E13]/70 via-[#0B2E13]/50 to-[#0B2E13]/90 z-1" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#16A34A]/20 border border-[#16A34A]/30 rounded-full mb-6">
            <span className="w-2 h-2 bg-[#16A34A] rounded-full animate-pulse" />
            <span className="text-[#16A34A] text-sm font-medium uppercase tracking-wider">
              Get in Touch
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Contact Us
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Ready to partner with South Africa's trusted mining and logistics specialist? Reach out and our team will respond within 24 hours.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

            {/* LEFT: Contact Info */}
            <div
              ref={infoRef}
              className={`lg:col-span-2 transition-all duration-700 ${infoInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
            >
              <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#16A34A] mb-3">
                Contact Details
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B2E13] mb-6">
                Let's Start a Conversation
              </h2>
              <p className="text-gray-600 leading-relaxed mb-10">
                Whether you need a transport quote, plant hire, maintenance support, or a full logistics partnership — our team is ready to assist.
              </p>

              <div className="space-y-4">
                {/* Email */}
                <a href={`mailto:${COMPANY.email}`} className="block">
                  <div className="flex items-start gap-4 p-6 bg-[#0B2E13] border border-[#16A34A]/20 hover:border-[#16A34A]/50 transition-all duration-300 group">
                    <div className="w-12 h-12 bg-[#16A34A]/20 rounded-lg flex items-center justify-center text-[#16A34A] group-hover:bg-[#16A34A] group-hover:text-white transition-all duration-300 shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">Email</div>
                      <div className="text-white font-semibold">{COMPANY.email}</div>
                    </div>
                  </div>
                </a>

                {/* Phone */}
                <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="block">
                  <div className="flex items-start gap-4 p-6 bg-[#0B2E13] border border-[#16A34A]/20 hover:border-[#16A34A]/50 transition-all duration-300 group">
                    <div className="w-12 h-12 bg-[#16A34A]/20 rounded-lg flex items-center justify-center text-[#16A34A] group-hover:bg-[#16A34A] group-hover:text-white transition-all duration-300 shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">Phone</div>
                      <div className="text-white font-semibold">{COMPANY.phone}</div>
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-4 p-6 bg-[#0B2E13] border border-[#16A34A]/20">
                  <div className="w-12 h-12 bg-[#16A34A]/20 rounded-lg flex items-center justify-center text-[#16A34A] shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">Location</div>
                    <div className="text-white font-semibold">{COMPANY.location}</div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-8 p-6 bg-[#0B2E13] border border-[#16A34A]/20">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Business Hours
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Monday – Friday</span>
                    <span className="text-white font-medium">08:00 – 17:00</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Saturday</span>
                    <span className="text-white font-medium">08:00 – 12:00</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Sunday</span>
                    <span className="text-[#16A34A] font-medium">Emergency Only</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Contact Form */}
            <div
              ref={formSectionRef}
              className={`lg:col-span-3 transition-all duration-700 delay-200 ${formSectionInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            >
              <div className="bg-white p-8 md:p-10 border border-gray-200 shadow-lg shadow-gray-200/50">
                <h3 className="text-2xl font-bold text-[#0B2E13] mb-2">Send a Message</h3>
                <p className="text-gray-500 text-sm mb-8">
                  Fill in the form below and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="from_name"
                        value={formData.from_name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3.5 bg-white border text-gray-800 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-[#16A34A] ${errors.from_name ? "border-red-400" : "border-gray-200 hover:border-gray-300"}`}
                      />
                      {errors.from_name && <p className="text-red-500 text-xs mt-1">{errors.from_name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="from_email"
                        value={formData.from_email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className={`w-full px-4 py-3.5 bg-white border text-gray-800 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-[#16A34A] ${errors.from_email ? "border-red-400" : "border-gray-200 hover:border-gray-300"}`}
                      />
                      {errors.from_email && <p className="text-red-500 text-xs mt-1">{errors.from_email}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="from_phone"
                        value={formData.from_phone}
                        onChange={handleChange}
                        placeholder="076 293 8945"
                        className="w-full px-4 py-3.5 bg-white border border-gray-200 text-gray-800 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-[#16A34A] hover:border-gray-300"
                      />
                    </div>

                    {/* Service Select */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Interest <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="service_interest"
                          value={formData.service_interest}
                          onChange={handleChange}
                          className={`w-full px-4 py-3.5 bg-white border text-gray-800 pr-10 transition-all duration-200 appearance-none focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-[#16A34A] ${errors.service_interest ? "border-red-400" : "border-gray-200 hover:border-gray-300"} ${!formData.service_interest ? "text-gray-400" : ""}`}
                        >
                          <option value="" disabled>Select a service</option>
                          {SERVICES_LIST.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {errors.service_interest && <p className="text-red-500 text-xs mt-1">{errors.service_interest}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                      rows={5}
                      className={`w-full px-4 py-3.5 bg-white border text-gray-800 placeholder-gray-400 resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-[#16A34A] ${errors.message ? "border-red-400" : "border-gray-200 hover:border-gray-300"}`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3 ${isSubmitting ? "bg-gray-400 text-white cursor-not-allowed" : "bg-[#0B2E13] text-white hover:bg-[#16A34A] hover:shadow-lg hover:shadow-[#16A34A]/30 active:scale-[0.98]"} focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </button>

                  {/* Success Message */}
                  {submitStatus === "success" && (
                    <div className="p-4 bg-[#16A34A]/10 border border-[#16A34A]/30 text-[#0B2E13] text-sm flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">Thank you! Your message has been sent successfully. We'll get back to you shortly.</span>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
                      We could not send your message right now. Please email us directly at <a href={`mailto:${COMPANY.email}`} className="font-semibold underline">{COMPANY.email}</a>.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default memo(Contact);
        