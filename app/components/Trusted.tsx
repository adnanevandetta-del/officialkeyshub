export default function Trusted() {
  const devices = [
    { icon: "fa-tv", name: "Smart TV" },
    { icon: "fa-mobile-alt", name: "Mobile" },
    { icon: "fa-tablet-alt", name: "Tablet" },
    { icon: "fa-laptop", name: "PC / Mac" },
    { icon: "fa-gamepad", name: "Console" },
    { icon: "fa-fire", name: "Firestick" },
    { icon: "fab fa-android", name: "Android Box" },
    { icon: "fab fa-apple", name: "Apple TV" },
  ];

  return (
    <section className="py-12 bg-white border-t border-b border-gray-200">
      <div className="container mx-auto px-6">
        <p className="text-center text-gray-700 text-sm uppercase tracking-wider mb-6 font-semibold">
          Compatible with all your devices
        </p>
        <div className="flex justify-center flex-wrap gap-8">
          {devices.map((device, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 text-[#006AA7] hover:text-[#4ade80] transition-colors"
            >
              <i className={`fas ${device.icon} text-3xl`}></i>
              <span className="text-xs font-semibold">{device.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


