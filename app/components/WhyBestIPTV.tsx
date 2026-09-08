export default function WhyBestIPTV() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[#4ade80]/20 text-[#22c55e] border border-[#4ade80]/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Varför Best IPTV Sverige
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Allt Du Behöver För Att Fatta <span className="gradient-text">Rätt Beslut</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trött på överprissatta kabel-TV och begränsade kanalpaket? Best IPTV Sverige ger dig livesport, filmer, TV-serier och PPV för en bråkdel av vad traditionella leverantörer tar betalt.
          </p>
        </div>

        {/* 30,000+ Live Channels */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              30,000+ <span className="gradient-text">Live-Kanaler</span>
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Plus 190,000+ filmer och serier på begäran. Alla svenska kanaler (SVT, TV4, Kanal 5), internationell sport, HBO, Netflix-original och mycket mer.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-[#4ade80]/10 text-[#22c55e] px-4 py-2 rounded-full text-sm font-semibold border border-[#4ade80]/20">
                Svenska Kanaler
              </span>
              <span className="bg-[#4ade80]/10 text-[#22c55e] px-4 py-2 rounded-full text-sm font-semibold border border-[#4ade80]/20">
                Sport 24/7
              </span>
              <span className="bg-[#4ade80]/10 text-[#22c55e] px-4 py-2 rounded-full text-sm font-semibold border border-[#4ade80]/20">
                VOD Library
              </span>
              <span className="bg-[#4ade80]/10 text-[#22c55e] px-4 py-2 rounded-full text-sm font-semibold border border-[#4ade80]/20">
                4K Kvalitet
              </span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-2xl p-12 text-center shadow-xl">
            <div className="text-white">
              <div className="text-6xl md:text-7xl font-black mb-2">30,000+</div>
              <div className="text-xl font-semibold mb-4">Live-Kanaler</div>
              <div className="text-5xl md:text-6xl font-black mb-2">190,000+</div>
              <div className="text-xl font-semibold">Filmer & Serier</div>
            </div>
          </div>
        </div>

        {/* Buffer-Free Streaming */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 md:order-1">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-12 text-center shadow-xl">
              <i className="fas fa-bolt text-white text-6xl mb-4"></i>
              <div className="text-white">
                <div className="text-3xl font-bold mb-2">99.9%</div>
                <div className="text-xl font-semibold mb-4">Drifttid</div>
                <div className="text-lg">Ingen buffring, ingen fördröjning</div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Bufferingsfri <span className="gradient-text">Streaming i Sverige</span>
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Anti-freeze-teknologi optimerad för svenska internetanslutningar. Stabila, smidiga strömmar även under Allsvenskan, Premier League och Champions League-matcher. Ingen buffring, ingen fördröjning.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-700">
                <i className="fas fa-check-circle text-[#22c55e] text-xl"></i>
                <span className="font-medium">Optimerat för svenska nätverk</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <i className="fas fa-check-circle text-[#22c55e] text-xl"></i>
                <span className="font-medium">Stabil streaming under matcher</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <i className="fas fa-check-circle text-[#22c55e] text-xl"></i>
                <span className="font-medium">4K-kvalitet utan fördröjning</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Works on Every Device */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Fungerar På <span className="gradient-text">Alla Enheter</span>
          </h3>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Firestick, Samsung, LG, Android, iPhone, Windows. Installera på under 5 minuter på vilken enhet du äger.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center hover:border-[#4ade80] hover:shadow-lg transition-all">
              <i className="fas fa-tv text-4xl text-[#22c55e] mb-3"></i>
              <div className="font-bold text-gray-900">Smart TV</div>
              <div className="text-sm text-gray-600">Samsung, LG</div>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center hover:border-[#4ade80] hover:shadow-lg transition-all">
              <i className="fas fa-fire text-4xl text-[#22c55e] mb-3"></i>
              <div className="font-bold text-gray-900">Firestick</div>
              <div className="text-sm text-gray-600">Amazon Fire</div>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center hover:border-[#4ade80] hover:shadow-lg transition-all">
              <i className="fab fa-android text-4xl text-[#22c55e] mb-3"></i>
              <div className="font-bold text-gray-900">Android</div>
              <div className="text-sm text-gray-600">Telefon, Box</div>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center hover:border-[#4ade80] hover:shadow-lg transition-all">
              <i className="fab fa-apple text-4xl text-[#22c55e] mb-3"></i>
              <div className="font-bold text-gray-900">iPhone</div>
              <div className="text-sm text-gray-600">iOS, iPad</div>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center hover:border-[#4ade80] hover:shadow-lg transition-all">
              <i className="fas fa-cube text-4xl text-[#22c55e] mb-3"></i>
              <div className="font-bold text-gray-900">Android Box</div>
              <div className="text-sm text-gray-600">Mi Box, Shield</div>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center hover:border-[#4ade80] hover:shadow-lg transition-all">
              <i className="fab fa-windows text-4xl text-[#22c55e] mb-3"></i>
              <div className="font-bold text-gray-900">Windows</div>
              <div className="text-sm text-gray-600">PC, Laptop</div>
            </div>
          </div>
        </div>

        {/* Every Sport. Every Game. */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Alla Sporter. <span className="gradient-text">Alla Matcher.</span>
          </h3>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Alla sportkanaler live. Fotboll, hockey, handboll, UFC PPV plus catch-up TV så du aldrig missar en match i Sverige.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-center text-white shadow-lg">
              <i className="fas fa-futbol text-4xl mb-3"></i>
              <div className="font-bold text-lg">Fotboll</div>
              <div className="text-sm opacity-90">PL, CL, Allsvenskan</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-center text-white shadow-lg">
              <i className="fas fa-hockey-puck text-4xl mb-3"></i>
              <div className="font-bold text-lg">Hockey</div>
              <div className="text-sm opacity-90">NHL, SHL</div>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-center text-white shadow-lg">
              <i className="fas fa-basketball-ball text-4xl mb-3"></i>
              <div className="font-bold text-lg">Basket</div>
              <div className="text-sm opacity-90">NBA, FIBA</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-center text-white shadow-lg">
              <i className="fas fa-football-ball text-4xl mb-3"></i>
              <div className="font-bold text-lg">NFL</div>
              <div className="text-sm opacity-90">Amerikansk Fotboll</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-center text-white shadow-lg">
              <i className="fas fa-fist-raised text-4xl mb-3"></i>
              <div className="font-bold text-lg">UFC / MMA</div>
              <div className="text-sm opacity-90">PPV Live</div>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-center text-white shadow-lg">
              <i className="fas fa-flag-checkered text-4xl mb-3"></i>
              <div className="font-bold text-lg">Formula 1</div>
              <div className="text-sm opacity-90">Alla Race Live</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-center text-white shadow-lg">
              <i className="fas fa-table-tennis text-4xl mb-3"></i>
              <div className="font-bold text-lg">Tennis</div>
              <div className="text-sm opacity-90">Grand Slam</div>
            </div>
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-6 text-center text-white shadow-lg">
              <i className="fas fa-golf-ball text-4xl mb-3"></i>
              <div className="font-bold text-lg">Golf</div>
              <div className="text-sm opacity-90">PGA, Masters</div>
            </div>
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 text-center text-white shadow-lg">
              <i className="fas fa-hand-rock text-4xl mb-3"></i>
              <div className="font-bold text-lg">Boxing</div>
              <div className="text-sm opacity-90">PPV Events</div>
            </div>
            <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl p-6 text-center text-white shadow-lg">
              <i className="fas fa-handball text-4xl mb-3"></i>
              <div className="font-bold text-lg">Handboll</div>
              <div className="text-sm opacity-90">Svenska Ligan</div>
            </div>
          </div>
        </div>

        {/* Built for Sweden */}
        <div className="bg-gradient-to-br from-[#006AA7] to-[#0052A5] rounded-3xl p-12 text-white mb-20 shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Byggd För <span className="text-[#fbbf24]">Sverige</span>
          </h3>
          <p className="text-lg text-center mb-12 max-w-2xl mx-auto opacity-90">
            Svenskfokuserad IPTV med lokal support, priser i svenska kronor och inbyggt VPN-skydd. Ingen loggning, ingen spårning, bara ren streaming för svenskar.
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-black mb-2 text-[#fbbf24]">Stockholm</div>
              <div className="text-2xl font-bold">2,400+</div>
              <div className="text-sm opacity-80">Nöjda Kunder</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black mb-2 text-[#fbbf24]">Göteborg</div>
              <div className="text-2xl font-bold">1,890+</div>
              <div className="text-sm opacity-80">Nöjda Kunder</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black mb-2 text-[#fbbf24]">Malmö</div>
              <div className="text-2xl font-bold">1,720+</div>
              <div className="text-sm opacity-80">Nöjda Kunder</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black mb-2 text-[#fbbf24]">Uppsala</div>
              <div className="text-2xl font-bold">840+</div>
              <div className="text-sm opacity-80">Nöjda Kunder</div>
            </div>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-12 shadow-lg">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">
            Jämför Oss Med <span className="gradient-text">Andra Leverantörer</span>
          </h3>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Oavsett om du kallar det IPTV, internet-TV eller streaming, är Best IPTV Sverige det mest pålitliga sättet att titta på live-TV i Sverige utan parabol eller kabelabonnemang. Jämför oss med traditionella leverantörer och du hittar fler kanaler, bättre kvalitet och lägre pris.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-[#4ade80]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-tv text-3xl text-[#22c55e]"></i>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">30,000+</div>
              <div className="text-gray-600">Fler Kanaler</div>
            </div>
            <div className="text-center">
              <div className="bg-[#4ade80]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-hd-video text-3xl text-[#22c55e]"></i>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">4K UHD</div>
              <div className="text-gray-600">Bättre Kvalitet</div>
            </div>
            <div className="text-center">
              <div className="bg-[#4ade80]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-piggy-bank text-3xl text-[#22c55e]"></i>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">199 kr</div>
              <div className="text-gray-600">Lägre Pris</div>
            </div>
          </div>
        </div>

        {/* VOD Library CTA */}
        <div className="mt-20 text-center bg-gradient-to-r from-[#4ade80] to-[#22c55e] rounded-2xl p-12 text-white shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Massivt VOD-Bibliotek Till Hands
          </h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Streama tusentals filmer och TV-serier på begäran. Nya utgåvor läggs till varje vecka. 190,000+ titlar i 4K-kvalitet.
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-[#22c55e] font-bold rounded-full hover:scale-105 transition-transform shadow-xl text-lg"
          >
            <i className="fas fa-play-circle"></i> Börja Titta Nu
          </a>
        </div>
      </div>
    </section>
  );
}
