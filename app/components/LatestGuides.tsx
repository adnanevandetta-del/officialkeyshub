import Link from "next/link";

export default function LatestGuides() {
  const guides = [
    {
      slug: "can-i-cast-iptv-to-tv",
      title: "Kan Jag Casta IPTV till TV? Ja, Här är Hur",
      excerpt: "Kan jag casta IPTV till TV? Ja - det slår kabel-TV på pris, kanaler och kvalitet. Streama favoritprogram till vilken skärm som helst på minuter.",
      category: "Guide",
      readTime: "14 min",
      date: "Jun 10",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80",
    },
    {
      slug: "how-much-data-does-iptv-use",
      title: "Hur Mycket Data Använder IPTV? Exakta Siffror",
      excerpt: "Bufferingsfri streaming är möjlig. Här är hur mycket data IPTV använder på Fire Stick och andra enheter. Verkliga testresultat inne.",
      category: "Picks",
      readTime: "11 min",
      date: "Jun 9",
      image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80",
    },
    {
      slug: "why-is-my-iptv-buffering",
      title: "Varför Buffrar Min IPTV? 7 Snabba Lösningar",
      excerpt: "30,000+ kanaler, 4K, 199 kr/mån. Varför buffrar min IPTV? Fixa det med serverbyte, hastighetsjusteringar & multi-device streaming tips.",
      category: "Picks",
      readTime: "13 min",
      date: "Jun 8",
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&q=80",
    },
    {
      slug: "f1-streaming-sverige",
      title: "F1 Streaming Sverige: Titta På Varje Race Live",
      excerpt: "Glöm F1-streaming Sverige-myterna. Här är vad som faktiskt spelar roll för att se varje race live via världsomspännande kanalåtkomst.",
      category: "Guide",
      readTime: "13 min",
      date: "Jun 7",
      image: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=800&q=80",
    },
    {
      slug: "watch-nfl-live-sweden",
      title: "Titta På NFL Live Sverige Utan Kabel 2026",
      excerpt: "Efter att ha testat 30+ tjänster, här är vad som faktiskt fungerar för att titta på NFL live Sverige. Streama felfria HD-sportsändningar.",
      category: "Guide",
      readTime: "16 min",
      date: "Jun 6",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
    },
    {
      slug: "cheaper-than-cable-tv-sweden",
      title: "Billigare Än Kabel-TV Sverige: Mina Topval 2026",
      excerpt: "Efter ett års daglig användning, här är min ärliga billigare än kabel-TV Sverige recension. Best IPTV Sverige låter dig streama på flera enheter.",
      category: "Picks",
      readTime: "13 min",
      date: "Jun 5",
      image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&q=80",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[#4ade80]/20 text-[#22c55e] border border-[#4ade80]/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Senaste IPTV-Guider
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Lär Dig Att Få <span className="gradient-text">Mesta Av Din IPTV</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Installations tutorials, prisjämförelser, felsökningstips och ärliga recensioner för att hjälpa svenskar streama smartare.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {guides.map((guide, index) => (
            <Link
              key={index}
              href={`/blog/${guide.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#4ade80] hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-[#4ade80] text-black px-3 py-1 rounded-full text-xs font-bold uppercase">
                    {guide.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#4ade80] transition-colors line-clamp-2">
                  {guide.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                  {guide.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{guide.date}</span>
                  <span className="flex items-center gap-1">
                    <i className="far fa-clock"></i>
                    {guide.readTime}
                  </span>
                </div>

                {/* Read Button */}
                <div className="text-[#4ade80] font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  Läs Mer
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-black font-bold rounded-lg hover:opacity-90 hover:scale-105 transition-all shadow-lg"
          >
            <i className="fas fa-book-open"></i>
            Visa Alla Guider
          </Link>
        </div>
      </div>
    </section>
  );
}
