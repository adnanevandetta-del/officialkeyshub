"use client";

const promises = [
  {
    icon: "fas fa-shield-alt",
    color: "from-emerald-500 to-emerald-600",
    title: "30-Day Money-Back Guarantee",
    text: "If your key doesn't activate and we can't fix it, you get your money back. No awkward questions.",
  },
  {
    icon: "fab fa-windows",
    color: "from-sky-500 to-blue-600",
    title: "Activates on Microsoft's Servers",
    text: "Every key is genuine and activates directly with Microsoft, so you can see for yourself that it works.",
  },
  {
    icon: "fas fa-headset",
    color: "from-orange-500 to-orange-600",
    title: "Help When You Need It",
    text: "Clear step-by-step activation guides, plus support on WhatsApp and email if you ever get stuck.",
  },
];

export default function CustomerReviews() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-3">Buy with <span className="gradient-text">Confidence</span></h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Every order is backed by real guarantees and genuine keys. Here&rsquo;s what you can count on.
          </p>
        </div>

        {/* Promise Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-10">
          {promises.map((p) => (
            <div key={p.title} className="bg-white border border-gray-200 rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <div className={`w-14 h-14 bg-gradient-to-br ${p.color} rounded-xl flex items-center justify-center text-white text-2xl shadow-md mb-5`}>
                <i className={p.icon}></i>
              </div>
              <h3 className="text-gray-900 font-bold text-xl mb-2">{p.title}</h3>
              <p className="text-gray-600 text-base leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>

        {/* Review us badge */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-gray-50 border border-gray-200 px-8 py-5 rounded-2xl">
            <div className="flex items-center gap-1 text-yellow-400" aria-hidden="true">
              <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
            </div>
            <p className="text-gray-700 text-sm sm:text-base">
              Bought from us? Share how it went &mdash; your feedback helps other customers.
            </p>
            <a
              href="/reviews"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg whitespace-nowrap"
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
