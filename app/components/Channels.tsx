export default function Channels() {
  const categories = [
    {
      icon: "fa-futbol",
      title: "Sports",
      description: "NFL, NBA, UFC, Premier League, Champions League, F1 & more",
    },
    {
      icon: "fa-film",
      title: "Movies",
      description: "Hollywood blockbusters, indie films, classics & new releases",
    },
    {
      icon: "fa-tv",
      title: "TV Series",
      description: "All major networks: HBO, Netflix originals, Amazon Prime & more",
    },
    {
      icon: "fa-newspaper",
      title: "News",
      description: "CNN, BBC, Fox News, Al Jazeera, Sky News & 200+ news channels",
    },
    {
      icon: "fa-child",
      title: "Kids",
      description: "Disney, Cartoon Network, Nickelodeon & family-friendly content",
    },
    {
      icon: "fa-music",
      title: "Music",
      description: "MTV, VH1, music concerts, live performances & radio stations",
    },
    {
      icon: "fa-flask",
      title: "Documentary",
      description: "National Geographic, Discovery, History Channel & more",
    },
    {
      icon: "fa-globe-americas",
      title: "International",
      description: "Arabic, French, Spanish, German, Italian, Turkish & 50+ languages",
    },
  ];

  return (
    <section className="py-24 bg-white" id="channels">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#006AA7]/20 text-[#006AA7] border border-[#006AA7]/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Content
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Thousands of Channels <span className="gradient-text">Across Every Category</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            From live sports to international news, we have content for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-[#006AA7] border-2 border-[#fbbf24] rounded-xl p-7 text-center hover:opacity-90 transition-all duration-300 shadow-md"
            >
              <i 
                className={`fas ${category.icon} text-4xl text-[#fbbf24] mb-3 block`}
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))',
                }}
              ></i>
              <h4 className="text-base font-bold mb-2 text-white">{category.title}</h4>
              <p className="text-gray-200 text-sm leading-relaxed">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


