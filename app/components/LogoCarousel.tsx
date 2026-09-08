"use client";

export default function LogoCarousel() {
  // Streaming service, sports, and Swedish TV channel logos with reliable sources
  const logos = [
    { name: "Netflix", url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { name: "📺 SVT", text: "SVT" },
    { name: "🏆 World Cup 2026", text: "World Cup 2026", icon: "trophy" },
    { name: "Premier League", url: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg" },
    { name: "📺 TV4", text: "TV4" },
    { name: "⚽ Champions League", text: "Champions League", icon: "trophy" },
    { name: "Netflix", url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { name: "📺 Kanal 5", text: "Kanal 5" },
    { name: "🏈 NFL", url: "https://upload.wikimedia.org/wikipedia/en/a/a2/National_Football_League_logo.svg" },
    { name: "📺 TV3", text: "TV3" },
    { name: "🏀 NBA", url: "https://upload.wikimedia.org/wikipedia/en/0/03/National_Basketball_Association_logo.svg" },
    { name: "Disney+", url: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg" },
    { name: "📺 Viaplay", text: "Viaplay" },
    { name: "📺 C More", text: "C More" },
    { name: "Hulu", text: "Hulu" },
    { name: "⚽ La Liga", text: "La Liga" },
    { name: "📺 TV6", text: "TV6" },
    { name: "🥊 UFC", url: "https://upload.wikimedia.org/wikipedia/commons/9/92/UFC_Logo.svg" },
    { name: "📺 Sjuan", text: "Sjuan" },
    { name: "🏎️ Formula 1", url: "https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg" },
    { name: "Prime Video", text: "Prime Video" },
    { name: "📺 TV8", text: "TV8" },
    { name: "⚽ Serie A", text: "Serie A" },
    { name: "Apple TV+", text: "Apple TV+" },
    { name: "📺 TV12", text: "TV12" },
    { name: "⚽ Bundesliga", url: "https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg" },
    { name: "Discovery+", url: "https://logo.clearbit.com/discoveryplus.com" },
    { name: "⚾ MLB", url: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Major_League_Baseball_logo.svg" },
    { name: "ESPN", url: "https://logo.clearbit.com/espn.com" },
    { name: "🏒 NHL", url: "https://upload.wikimedia.org/wikipedia/en/3/3a/National_Hockey_League_logo.svg" },
    { name: "BBC", url: "https://upload.wikimedia.org/wikipedia/commons/4/41/BBC_Logo_2021.svg" },
    { name: "Sky Sports", url: "https://upload.wikimedia.org/wikipedia/en/2/20/Sky_Sports_logo_2020.svg" },
    { name: "Paramount+", url: "https://logo.clearbit.com/paramountplus.com" },
    { name: "Max", url: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Max_logo.svg" },
    { name: "⚽ Ligue 1", url: "https://upload.wikimedia.org/wikipedia/en/b/b2/Ligue_1_Uber_Eats_logo.svg" },
  ];

  // Duplicate logos for infinite scroll effect
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-12 bg-gradient-to-r from-[#006AA7] via-[#0082C8] to-[#006AA7] border-y border-[#fbbf24]/30 overflow-hidden">
      {/* Mobile-optimized header */}
      <div className="container mx-auto px-6 mb-8">
        <p className="text-center text-sm md:text-base font-bold text-white uppercase tracking-wider max-md:text-xs max-md:leading-relaxed">
          🏆 Watch FIFA World Cup 2026, Swedish TV/Shows/Movies + International Channels & Sports All In One Place 🏆
        </p>
      </div>
      
      {/* Scrolling Container */}
      <div className="relative">
        {/* Enhanced gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-[#006AA7] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-[#006AA7] to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex animate-scroll-infinite">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-4 md:mx-6 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center"
            >
              <div className="w-full h-full rounded-full bg-white/95 border-3 border-[#fbbf24] shadow-lg flex items-center justify-center p-2.5 md:p-3 hover:border-[#4ade80] hover:shadow-xl hover:scale-110 transition-all duration-300 group relative overflow-hidden backdrop-blur-sm">
                {logo.text ? (
                  // Styled text logo for Swedish channels with colors and icons - Enhanced visibility
                  <div className="text-center flex flex-col items-center justify-center">
                    {logo.icon === "trophy" && logo.text === "World Cup 2026" && (
                      <div className="flex flex-col items-center">
                        <i className="fas fa-trophy text-[#fbbf24] text-2xl md:text-3xl mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"></i>
                        <div className="text-[8px] md:text-[9px] font-black text-gray-800 leading-tight">World Cup<br/>2026</div>
                      </div>
                    )}
                    {logo.icon === "trophy" && logo.text === "Champions League" && (
                      <div className="flex flex-col items-center">
                        <i className="fas fa-trophy text-blue-600 text-2xl md:text-3xl mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"></i>
                        <div className="text-[8px] md:text-[9px] font-black text-gray-800 leading-tight">Champions<br/>League</div>
                      </div>
                    )}
                    {logo.text === "Prime Video" && (
                      <div className="flex flex-col items-center">
                        <i className="fab fa-amazon text-cyan-600 text-xl md:text-2xl mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"></i>
                        <div className="text-[8px] md:text-[9px] font-black text-gray-800 leading-tight">Prime<br/>Video</div>
                      </div>
                    )}
                    {logo.text === "SVT" && (
                      <div className="flex flex-col items-center">
                        <i className="fas fa-tv text-blue-600 text-xl md:text-2xl mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"></i>
                        <div className="text-[11px] md:text-[12px] font-black text-gray-800">SVT</div>
                      </div>
                    )}
                    {logo.text === "TV4" && (
                      <div className="flex flex-col items-center">
                        <i className="fas fa-broadcast-tower text-red-600 text-xl md:text-2xl mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"></i>
                        <div className="text-[11px] md:text-[12px] font-black text-gray-800">TV4</div>
                      </div>
                    )}
                    {logo.text === "Kanal 5" && (
                      <div className="flex flex-col items-center">
                        <i className="fas fa-star text-purple-600 text-xl md:text-2xl mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"></i>
                        <div className="text-[10px] md:text-[11px] font-black text-gray-800">Kanal 5</div>
                      </div>
                    )}
                    {logo.text === "TV3" && (
                      <div className="flex flex-col items-center">
                        <i className="fas fa-video text-orange-600 text-xl md:text-2xl mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"></i>
                        <div className="text-[11px] md:text-[12px] font-black text-gray-800">TV3</div>
                      </div>
                    )}
                    {logo.text === "Viaplay" && (
                      <div className="flex flex-col items-center">
                        <i className="fas fa-play-circle text-pink-600 text-xl md:text-2xl mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"></i>
                        <div className="text-[10px] md:text-[11px] font-black text-gray-800">Viaplay</div>
                      </div>
                    )}
                    {logo.text === "C More" && (
                      <div className="flex flex-col items-center">
                        <i className="fas fa-film text-indigo-600 text-xl md:text-2xl mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"></i>
                        <div className="text-[10px] md:text-[11px] font-black text-gray-800">C More</div>
                      </div>
                    )}
                    {logo.text === "TV6" && (
                      <div className="flex flex-col items-center">
                        <i className="fas fa-satellite-dish text-teal-600 text-xl md:text-2xl mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"></i>
                        <div className="text-[11px] md:text-[12px] font-black text-gray-800">TV6</div>
                      </div>
                    )}
                    {logo.text === "Sjuan" && (
                      <div className="flex flex-col items-center">
                        <i className="fas fa-dice-seven text-yellow-600 text-xl md:text-2xl mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"></i>
                        <div className="text-[10px] md:text-[11px] font-black text-gray-800">Sjuan</div>
                      </div>
                    )}
                    {logo.text === "TV8" && (
                      <div className="flex flex-col items-center">
                        <i className="fas fa-infinity text-green-600 text-xl md:text-2xl mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"></i>
                        <div className="text-[11px] md:text-[12px] font-black text-gray-800">TV8</div>
                      </div>
                    )}
                    {logo.text === "TV12" && (
                      <div className="flex flex-col items-center">
                        <i className="fas fa-tv-retro text-cyan-600 text-xl md:text-2xl mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"></i>
                        <div className="text-[10px] md:text-[11px] font-black text-gray-800">TV12</div>
                      </div>
                    )}
                    {logo.text === "Hulu" && (
                      <div className="flex flex-col items-center">
                        <i className="fas fa-play text-green-600 text-xl md:text-2xl mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"></i>
                        <div className="text-[11px] md:text-[12px] font-black text-gray-800">Hulu</div>
                      </div>
                    )}
                    {logo.text === "La Liga" && (
                      <div className="flex flex-col items-center">
                        <i className="fas fa-futbol text-orange-600 text-xl md:text-2xl mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"></i>
                        <div className="text-[9px] md:text-[10px] font-black text-gray-800">La Liga</div>
                      </div>
                    )}
                    {logo.text === "Serie A" && (
                      <div className="flex flex-col items-center">
                        <i className="fas fa-shield-alt text-blue-700 text-xl md:text-2xl mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"></i>
                        <div className="text-[9px] md:text-[10px] font-black text-gray-800">Serie A</div>
                      </div>
                    )}
                    {logo.text === "Apple TV+" && (
                      <div className="flex flex-col items-center">
                        <i className="fab fa-apple text-gray-800 text-2xl md:text-3xl mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"></i>
                        <div className="text-[8px] md:text-[9px] font-black text-gray-800">Apple TV+</div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Image-based logo - Enhanced visibility
                  <img
                    src={logo.url}
                    alt={logo.name}
                    className="max-w-full max-h-full object-contain drop-shadow-md"
                    title={logo.name}
                    loading="lazy"
                    onError={(e) => {
                      // Fallback: show name as text
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.fallback-text')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'fallback-text text-[10px] md:text-[11px] font-bold text-gray-800 text-center leading-tight px-1';
                        fallback.textContent = logo.name;
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-infinite {
          animation: scroll-infinite 50s linear infinite;
        }

        @media (max-width: 768px) {
          .animate-scroll-infinite {
            animation: scroll-infinite 25s linear infinite;
          }
        }

        .animate-scroll-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
