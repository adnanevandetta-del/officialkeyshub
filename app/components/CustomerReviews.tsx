"use client";

const promises = [
  {
    icon: "fas fa-shield-alt",
    color: "bg-emerald-600",
    title: "30-Day Money-Back Guarantee",
    text: "If your key doesn't activate and we can't fix it, you get your money back. No awkward questions.",
  },
  {
    icon: "fab fa-windows",
    color: "bg-[#005A9E]",
    title: "Activates on Microsoft's Servers",
    text: "Every key activates directly with Microsoft, so you can see for yourself that it works.",
  },
  {
    icon: "fas fa-headset",
    color: "bg-orange-600",
    title: "Help When You Need It",
    text: "Clear step-by-step activation guides, plus support on WhatsApp and email if you ever get stuck.",
  },
];

export default function CustomerReviews() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-black tracking-[-0.025em] text-gray-900 mb-3">Buy with Confidence</h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Every order comes with the same three promises.
          </p>
        </div>

        {/* Promise Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8 max-w-6xl mx-auto mb-8 md:mb-10">
          {promises.map((p) => (
            <div key={p.title} className="flex items-start gap-4 md:block bg-white border border-gray-200 rounded-2xl p-5 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <div className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 ${p.color} rounded-xl flex items-center justify-center text-white text-xl md:text-2xl shadow-md md:mb-5`}>
                <i className={p.icon}></i>
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-base md:text-xl mb-1 md:mb-2">{p.title}</h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">{p.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Review us badge */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-gray-50 border border-gray-200 px-5 md:px-8 py-5 rounded-2xl">
            <div className="flex items-center gap-1 text-yellow-400" aria-hidden="true">
              <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
            </div>
            <p className="text-gray-700 text-sm sm:text-base">
              Bought from us? Share how it went &mdash; your feedback helps other customers.
            </p>
            <a
              href="/reviews"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-lg whitespace-nowrap"
            >
              <i className="fas fa-star"></i>
              Review us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
