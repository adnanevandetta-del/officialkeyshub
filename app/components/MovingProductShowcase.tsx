"use client";

export default function MovingProductShowcase() {
  const products = [
    { name: "Windows 11 Pro", icon: "fab fa-windows", color: "from-blue-500 to-blue-600" },
    { name: "Office 2021", icon: "fas fa-file-word", color: "from-orange-500 to-red-600" },
    { name: "Windows Server", icon: "fas fa-server", color: "from-gray-600 to-gray-700" },
    { name: "Office 365", icon: "fas fa-cloud", color: "from-purple-500 to-purple-600" },
    { name: "Visio Pro", icon: "fas fa-project-diagram", color: "from-teal-500 to-teal-600" },
    { name: "Project Pro", icon: "fas fa-tasks", color: "from-green-500 to-green-600" },
    { name: "SQL Server", icon: "fas fa-database", color: "from-red-500 to-red-600" },
    { name: "Visual Studio", icon: "fas fa-code", color: "from-indigo-500 to-indigo-600" },
  ];

  // Duplicate products for seamless loop
  const duplicatedProducts = [...products, ...products];

  return (
    <div className="relative overflow-hidden bg-white py-8 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          All you need in one place
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Complete Microsoft software solutions for your business and personal needs
        </p>
      </div>
      
      {/* Moving Container */}
      <div className="relative">
        <div className="flex animate-scroll">
          {duplicatedProducts.map((product, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-3"
              style={{ width: '200px' }}
            >
              <div className={`bg-gradient-to-br ${product.color} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer`}>
                <div className="flex flex-col items-center text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm">
                    <i className={`${product.icon} text-3xl`}></i>
                  </div>
                  <h3 className="text-sm font-bold text-center">{product.name}</h3>
                  <p className="text-xs opacity-90 mt-1">Available Now</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
          display: flex;
          width: fit-content;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
