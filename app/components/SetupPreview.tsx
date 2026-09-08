'use client';
import Link from 'next/link';

export default function SetupPreview() {
  const devices = [
    { id: 'firestick', name: 'Amazon Firestick', subtitle: 'Fire TV Stick, Fire TV Cube, Fire TV', icon: 'fa-fire' },
    { id: 'androidtv', name: 'Android TV / Box', subtitle: 'Android TV, Nvidia Shield, Mi Box', icon: 'fa-tv' },
    { id: 'samsung', name: 'Samsung Smart TV', subtitle: 'Samsung Tizen Smart TVs (2016+)', icon: 'fa-television' },
    { id: 'lg', name: 'LG Smart TV', subtitle: 'LG WebOS Smart TVs', icon: 'fa-tv' },
    { id: 'ios', name: 'iPhone / iPad', subtitle: 'iOS devices and Apple TV', icon: 'fa-apple' },
    { id: 'android', name: 'Android Phone', subtitle: 'Samsung, Google Pixel, OnePlus', icon: 'fa-mobile-alt' },
    { id: 'windows', name: 'Windows PC', subtitle: 'Windows 10/11 Desktop & Laptop', icon: 'fa-windows' },
    { id: 'mac', name: 'MacBook / Mac', subtitle: 'macOS devices - MacBook, iMac, Mac Mini', icon: 'fa-apple' },
  ];

  return (
    <section className="py-24 bg-white" id="setup-preview">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Device Selection */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Select your device</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {devices.map((device) => (
              <Link
                key={device.id}
                href="/setup-guide"
                className="p-6 rounded-xl border-2 border-[#fbbf24] bg-[#006AA7] hover:opacity-90 transition-all cursor-pointer"
                style={{
                  boxShadow: '0 0 30px rgba(0, 106, 167, 0.6), 0 0 60px rgba(0, 106, 167, 0.4)',
                }}
              >
                <i 
                  className={`fas ${device.icon} text-3xl mb-3 text-[#fbbf24]`}
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))',
                  }}
                ></i>
                <h4 className="font-bold text-sm text-white mb-1">{device.name}</h4>
                <p className="text-xs text-gray-200">{device.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
