"use client";

export default function WhatsAppButton() {
  // Replace this with your actual WhatsApp number (international format without + or spaces)
  // Example: 16019756129 for US (+1 601-975-6129)
  const whatsappNumber = "16019756129"; // Your actual number
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Start Live Chat Label with WhatsApp Logo */}
      <div className="bg-[#25D366] text-white px-4 py-2.5 rounded-lg font-bold text-sm shadow-lg animate-pulse flex items-center gap-2">
        <i className="fab fa-whatsapp text-xl"></i>
        Start Live Chat!
        <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-[7px] border-b-[7px] border-l-[9px] border-transparent border-l-[#25D366]"></div>
      </div>
      
      {/* WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        aria-label="Contact us on WhatsApp"
      >
        <i className="fab fa-whatsapp text-3xl"></i>
        
        {/* Tooltip on hover */}
        <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat with us on WhatsApp
        </span>
      </a>
    </div>
  );
}
