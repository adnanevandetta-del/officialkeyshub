export default function Testimonials() {
  const testimonials = [
    {
      stars: 4,
      text: "Had a little problem in setup but they guided me thru with everything I recommend ^^",
      name: "Erik Andersson",
      plan: "12 Month Plan",
      avatar: "EA",
    },
    {
      stars: 5,
      text: "I've tried many IPTV services but IPTV PRO is by far the best. Over 30,000 channels, perfect streaming quality, and their WhatsApp support is incredibly fast. Worth every krona!",
      name: "Sofia Bergström",
      plan: "6 Month Plan",
      avatar: "SB",
    },
    {
      stars: 4,
      text: "Crystal clear streams, zero buffering, and an incredible selection of sports channels. I can watch all the football matches in 4K! IPTV PRO has exceeded all my expectations.",
      name: "Johan Larsson",
      plan: "12 Month Plan",
      avatar: "JL",
    },
    {
      stars: 5,
      text: "The movie and series library is massive - over 190,000 titles! IPTV PRO works flawlessly on my Firestick. The built-in VPN protection gives me peace of mind. Highly recommended!",
      name: "Anna Nilsson",
      plan: "3 Month Plan",
      avatar: "AN",
    },
    {
      stars: 5,
      text: "Best IPTV service in Sweden! The setup guide made installation on my iPhone super easy. The catch-up TV feature is brilliant. IPTV PRO has replaced all my other subscriptions.",
      name: "Marcus Johansson",
      plan: "12 Month Plan",
      avatar: "MJ",
    },
    {
      stars: 4,
      text: "IPTV PRO delivers exactly what they promise. Excellent channel selection, stable connection, and the EPG guide works perfectly. Their 24/7 support team is always helpful. Five stars!",
      name: "Linda Karlsson",
      plan: "6 Month Plan",
      avatar: "LK",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#4ade80]/20 text-[#22c55e] border border-[#4ade80]/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Reviews
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            What Our <span className="gradient-text">Customers Say About Us</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-yellow-500 mb-4 text-sm">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
                {Array.from({ length: 5 - testimonial.stars }).map((_, i) => (
                  <i key={`empty-${i}`} className="fas fa-star text-gray-300"></i>
                ))}
              </div>
              <p className="text-gray-600 text-[0.95rem] leading-relaxed mb-6 italic">{testimonial.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-r from-[#4ade80] to-[#22c55e] flex items-center justify-center font-bold text-sm flex-shrink-0 text-black">
                  {testimonial.avatar}
                </div>
                <div>
                  <strong className="block text-[0.95rem] text-gray-900">{testimonial.name}</strong>
                  <span className="text-xs text-gray-600">{testimonial.plan}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


