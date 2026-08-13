export default function Section({
  title,
  subtitle,
  children,
  dark = false,
  className = "",
}) {
  return (
    <section
      className={`py-16 ${
        dark ? "bg-green-950 text-white" : "bg-white text-gray-900"
      } ${className}`}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold">
                {title}
              </h2>
            )}

            {subtitle && (
              <p
                className={`mt-3 max-w-2xl mx-auto ${
                  dark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {children}

      </div>
    </section>
  );
}