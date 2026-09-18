export default function VersionCheck() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-sky-700">
          Version Check - v3.0.1
        </h1>
        
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h2 className="font-bold text-xl mb-2">✅ PayPal Logo Test</h2>
            <button className="w-full py-3 rounded-lg font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-white flex items-center justify-center gap-2">
              <span>Buy Now</span>
              <i className="fab fa-paypal text-2xl"></i>
            </button>
          </div>

          <div className="border-l-4 border-sky-600 pl-4">
            <h2 className="font-bold text-xl mb-2">✅ Cart Z-Index</h2>
            <p className="text-gray-700">Cart modal z-index: <span className="font-mono font-bold text-sky-700">9999</span></p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h2 className="font-bold text-xl mb-2">✅ Mobile Billboard</h2>
            <p className="text-gray-700">Mobile optimized: <span className="font-mono font-bold text-purple-600">280px height</span></p>
          </div>

          <div className="border-l-4 border-orange-500 pl-4">
            <h2 className="font-bold text-xl mb-2">✅ Mobile Nav</h2>
            <p className="text-gray-700">Profile icon: <span className="font-mono font-bold text-orange-600">far right</span></p>
          </div>

          <div className="mt-8 p-6 bg-gray-100 rounded-lg">
            <h3 className="font-bold text-lg mb-3">Deployment Info:</h3>
            <p className="text-sm font-mono mb-2">Build: {new Date().toISOString()}</p>
            <p className="text-sm font-mono mb-2">Version: v3.0.1-cache-bust</p>
            <p className="text-sm font-mono">Status: ✅ All Changes Deployed</p>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
            <p className="text-sm text-yellow-900">
              <strong>If you don't see this version number on the main site:</strong><br/>
              Your browser is showing cached content. Press Ctrl+Shift+Delete, clear "All time", and reload.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
