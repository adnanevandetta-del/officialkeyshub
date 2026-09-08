'use client';
import { useState } from 'react';

export default function Features() {
  const [selectedDevice, setSelectedDevice] = useState('firestick');

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
    <section className="py-24 bg-white" id="setup-guide">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-8">
          Home / <span className="text-[#4ade80] font-semibold">Setup Guide</span>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            IPTV <span className="gradient-text">Setup Guide</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Set up your IPTV service in under 5 minutes. Select your device for step-by-step instructions.
          </p>
          
          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2">
              <i className="fas fa-clock text-[#4ade80]"></i>
              <span className="text-sm font-semibold text-gray-700">5-minute setup</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-check-circle text-[#4ade80]"></i>
              <span className="text-sm font-semibold text-gray-700">Works on all devices</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-user-check text-[#4ade80]"></i>
              <span className="text-sm font-semibold text-gray-700">No tech skills needed</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fab fa-whatsapp text-[#4ade80]"></i>
              <span className="text-sm font-semibold text-gray-700">24/7 WhatsApp help</span>
            </div>
          </div>
        </div>

        {/* Device Selection */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Select your device</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {devices.map((device) => (
              <button
                key={device.id}
                onClick={() => setSelectedDevice(device.id)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedDevice === device.id
                    ? 'border-[#4ade80] bg-[#4ade80]/10'
                    : 'border-gray-200 hover:border-[#4ade80]/50'
                }`}
              >
                <i className={`fas ${device.icon} text-3xl mb-3 ${
                  selectedDevice === device.id ? 'text-[#4ade80]' : 'text-gray-400'
                }`}></i>
                <h3 className="font-bold text-sm text-gray-900 mb-1">{device.name}</h3>
                <p className="text-xs text-gray-600">{device.subtitle}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Amazon Firestick Setup Instructions */}
        {selectedDevice === 'firestick' && (
          <div className="space-y-8">
            {/* Recommended App */}
            <div className="bg-[#4ade80]/10 border-2 border-[#4ade80] rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Recommended App</h3>
                  <p className="text-2xl font-extrabold gradient-text">IPTV Smarters Pro</p>
                </div>
                <button className="px-6 py-3 bg-[#4ade80] text-black font-bold rounded-lg hover:opacity-90 transition-all">
                  Download
                </button>
              </div>
            </div>

            {/* Step 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">1</div>
                <h3 className="text-2xl font-bold text-gray-900">Enable Developer Mode</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Before installing third-party applications on your Amazon Fire TV Stick, you need to enable developer mode. This allows you to install apps from sources other than the Amazon App Store.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 1</span>
                  <span className="text-gray-700">Go to your Fire TV Stick settings</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 2</span>
                  <span className="text-gray-700">Scroll down and select 'My Fire TV' or 'Device'</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 3</span>
                  <span className="text-gray-700">Select 'Developer Options'</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 4</span>
                  <span className="text-gray-700">Enable 'Apps from Unknown Sources' and 'ADB Debugging'</span>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Enabling developer mode is safe and necessary to install IPTV Smarters Pro on your Fire TV Stick.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">2</div>
                <h3 className="text-2xl font-bold text-gray-900">Install Downloader App</h3>
              </div>
              <p className="text-gray-700 mb-6">
                You now need to install the Downloader app which is available directly in the Amazon App Store on your Fire TV. To do this, go to the App Store and search for 'Downloader'. Once you find the app, download it.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 1</span>
                  <span className="text-gray-700">From the Fire TV home screen, select the search icon</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 2</span>
                  <span className="text-gray-700">Type 'Downloader' in the search bar</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 3</span>
                  <span className="text-gray-700">Select the Downloader app from the results</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 4</span>
                  <span className="text-gray-700">Click 'Download' or 'Get' to install the app</span>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Downloader is a free app that allows you to easily download files to your Fire TV Stick.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">3</div>
                <h3 className="text-2xl font-bold text-gray-900">Install IPTV Smarters Pro</h3>
              </div>
              <p className="text-gray-700 mb-6">
                You must now install IPTV Smarters Pro. Enter the following link in the Downloader app: <strong>250931</strong>. Then scroll down to IPTV SMARTERS and click DOWNLOAD. The IPTV SMARTERS download will start, then you need to open the application and click 'Install'.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 1</span>
                  <span className="text-gray-700">Open the Downloader app you just installed</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 2</span>
                  <span className="text-gray-700">In the URL field, enter: <strong>250931</strong></span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 3</span>
                  <span className="text-gray-700">Scroll down and select 'IPTV SMARTERS'</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 4</span>
                  <span className="text-gray-700">Click 'DOWNLOAD' and wait for the file to download</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 5</span>
                  <span className="text-gray-700">Once downloaded, click 'Install' to install the app</span>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> The installation may take a few moments. Make sure not to interrupt the process.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">4</div>
                <h3 className="text-2xl font-bold text-gray-900">Launch IPTV Smarters Pro</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Once you have downloaded IPTV Smarters Pro, you must follow the installation instructions. When the IPTV Smarters Pro app is launched, please follow these steps:
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 1</span>
                  <span className="text-gray-700">Choose 'TV' in 'DEVICE OPTION'</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 2</span>
                  <span className="text-gray-700">Accept the Terms of Use of the IPTV Smarters Pro app</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 3</span>
                  <span className="text-gray-700">Choose 'XTREME CODES' as the login method</span>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Make sure to select the correct device option for the best viewing experience on your Fire TV.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">5</div>
                <h3 className="text-2xl font-bold text-gray-900">Enter Your Login Credentials</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Fill in the fields with your information received when you paid for your IPTV subscription.
              </p>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Playlist Name</strong>
                  <p className="text-gray-700 text-sm mt-1">For the first field, you can enter any name you want to identify your playlist</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Username</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter your Username in the Username field</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Password</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter your Password in the Password field</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">URL</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter the server URL in the URL field</p>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Check your information carefully and press 'ADD PLAYLIST'. You're now ready to enjoy your IPTV service on your Amazon Fire TV Stick.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Windows PC Setup Instructions */}
        {selectedDevice === 'windows' && (
          <div className="space-y-8">
            {/* Recommended App */}
            <div className="bg-[#4ade80]/10 border-2 border-[#4ade80] rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Recommended App</h3>
                  <p className="text-2xl font-extrabold gradient-text">IPTV Smarters Pro</p>
                </div>
                <button className="px-6 py-3 bg-[#4ade80] text-black font-bold rounded-lg hover:opacity-90 transition-all">
                  Download
                </button>
              </div>
            </div>

            {/* Step 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">1</div>
                <h3 className="text-2xl font-bold text-gray-900">Download and Install IPTV Smarters Pro on your Windows PC</h3>
              </div>
              <p className="text-gray-700 mb-6">
                To begin, the first step is to download and install the IPTV Smarters Pro application, which is one of the most popular software for managing your IPTV subscription on Windows. Click on the link to access the official download page. Make sure to download the version compatible with your Windows operating system for a hassle-free installation. IPTV Smarters Pro is a free application that allows you to enjoy your IPTV content on Windows with ease. The installation is quick and easy, and once completed, you will be able to access an intuitive user interface specially designed to enhance your IPTV experience on a Windows PC.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 1</span>
                  <span className="text-gray-700">Visit the official IPTV Smarters Pro website</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 2</span>
                  <span className="text-gray-700">Download the Windows version of the application</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 3</span>
                  <span className="text-gray-700">Run the installer file once downloaded</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 4</span>
                  <span className="text-gray-700">Follow the on-screen installation instructions</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 5</span>
                  <span className="text-gray-700">Wait for the installation to complete</span>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Make sure to download from the official source to ensure you get the authentic and safe version of the app.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">2</div>
                <h3 className="text-2xl font-bold text-gray-900">Launch IPTV Smarters Pro on Windows</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Once the installation is complete, launch the IPTV Smarters Pro application on your Windows PC. On first launch, you will be asked to accept the terms and conditions. Make sure to read them carefully before proceeding. If you encounter difficulties launching the application, try the following solutions:
              </p>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Run as Administrator</strong>
                  <p className="text-gray-700 text-sm mt-1">Right-click the app icon and select 'Run as administrator' - this can resolve some permission issues on Windows</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Temporarily Disable Antivirus</strong>
                  <p className="text-gray-700 text-sm mt-1">Sometimes antivirus software can block third-party applications like IPTV Smarters Pro on Windows. Make sure to re-enable it after installation</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Check Windows Updates</strong>
                  <p className="text-gray-700 text-sm mt-1">Ensure your Windows is up to date for best compatibility</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Firewall Settings</strong>
                  <p className="text-gray-700 text-sm mt-1">Make sure Windows Firewall isn't blocking the application</p>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> These steps will help you bypass common issues that Windows users may encounter when installing IPTV software.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">3</div>
                <h3 className="text-2xl font-bold text-gray-900">Enter Your IPTV Login Credentials on Windows</h3>
              </div>
              <p className="text-gray-700 mb-6">
                After launching IPTV Smarters Pro, you will need to enter the login information for your IPTV subscription. This information was provided to you when you purchased your subscription. Follow the instructions below carefully to configure your IPTV service on Windows:
              </p>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Profile Name</strong>
                  <p className="text-gray-700 text-sm mt-1">In the first field, enter a name to identify your profile. This can be any name of your choice</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Username</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter the username provided when you subscribed</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Password</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter the password associated with your IPTV account</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Server URL</strong>
                  <p className="text-gray-700 text-sm mt-1">In the URL field, enter your IPTV provider's server address</p>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Once this information is entered, check it carefully to avoid any errors, then click 'ADD USER' to add your profile. You are now ready to start using your IPTV service on your Windows device.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">4</div>
                <h3 className="text-2xl font-bold text-gray-900">Modify the Stream Format in IPTV Smarters Pro on Windows</h3>
              </div>
              <p className="text-gray-700 mb-6">
                To optimize playback quality on IPTV Smarters Pro, we recommend changing the stream format. This modification is particularly useful for Windows users who want a smoother viewing experience. Follow these steps to adjust your IPTV stream settings:
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 1</span>
                  <span className="text-gray-700">Click on the settings icon located in the top right of the application's main screen</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 2</span>
                  <span className="text-gray-700">In the settings menu, select 'Stream Format'</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 3</span>
                  <span className="text-gray-700">Choose the 'MPEGTS (.ts)' format which is generally more compatible with Windows systems and offers better stability</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 4</span>
                  <span className="text-gray-700">Finally, click 'SAVE CHANGES' to save your modifications</span>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> These settings will ensure better compatibility with your Windows system and allow you to fully enjoy your IPTV subscription with smooth, high-quality playback.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 - Support and Troubleshooting */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">5</div>
                <h3 className="text-2xl font-bold text-gray-900">Support and Troubleshooting for Windows IPTV</h3>
              </div>
              <p className="text-gray-700 mb-6">
                If you encounter problems during installation or use of your IPTV service on Windows, don't worry. Here are some tips to help you resolve the most common issues:
              </p>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Connection Issues</strong>
                  <p className="text-gray-700 text-sm mt-1">Make sure you have entered the correct login information and that your subscription is still active</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Streaming Quality</strong>
                  <p className="text-gray-700 text-sm mt-1">If you notice poor streaming quality, check your internet connection and make sure it is stable. You can also try changing the stream format as indicated in the previous step</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Windows Compatibility</strong>
                  <p className="text-gray-700 text-sm mt-1">Make sure your version of Windows is up to date. Some older versions of Windows may experience compatibility issues with IPTV Smarters Pro</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Firewall/Antivirus</strong>
                  <p className="text-gray-700 text-sm mt-1">Check that your firewall or antivirus isn't blocking the application's internet access</p>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> If these tips don't resolve your issue, contact our support team. We're here to ensure you have a hassle-free IPTV experience on Windows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MacBook / Mac Setup Instructions */}
        {selectedDevice === 'mac' && (
          <div className="space-y-8">
            {/* Recommended App */}
            <div className="bg-[#4ade80]/10 border-2 border-[#4ade80] rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Recommended App</h3>
                  <p className="text-2xl font-extrabold gradient-text">Smarters Player Lite</p>
                </div>
                <button className="px-6 py-3 bg-[#4ade80] text-black font-bold rounded-lg hover:opacity-90 transition-all">
                  Download
                </button>
              </div>
            </div>

            {/* Step 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">1</div>
                <h3 className="text-2xl font-bold text-gray-900">Download Smarters Player Lite on your MacBook or Mac</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Go to the App Store from your MacBook or Mac and search for 'Smarters Player Lite'. This application is specially designed to allow IPTV content playback on macOS, offering a user-friendly interface adapted for Mac users. Or click here to download the application directly to your Apple device.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 1</span>
                  <span className="text-gray-700">Open the App Store on your Mac</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 2</span>
                  <span className="text-gray-700">Search for 'Smarters Player Lite' in the search bar</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 3</span>
                  <span className="text-gray-700">Click 'Get' or 'Download' to install the app</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 4</span>
                  <span className="text-gray-700">Wait for the installation to complete</span>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Smarters Player Lite is optimized for macOS, ensuring perfect compatibility with your MacBook or Mac, whether recent or older.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">2</div>
                <h3 className="text-2xl font-bold text-gray-900">Launch Smarters Player Lite on your MacBook or Mac</h3>
              </div>
              <p className="text-gray-700 mb-6">
                After downloading and installing the application, launch Smarters Player Lite on your MacBook or Mac. Accept the terms and conditions to begin the setup. This application is optimized for macOS, ensuring perfect compatibility with your MacBook or Mac. Then, press 'Add Your Playlist via XC API' to add your favorite IPTV channels.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 1</span>
                  <span className="text-gray-700">Open Smarters Player Lite from your Applications folder</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 2</span>
                  <span className="text-gray-700">Accept the terms and conditions when prompted</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 3</span>
                  <span className="text-gray-700">Click on 'Add Your Playlist via XC API'</span>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> This step is crucial to activate your IPTV service on your MacBook or Mac and fully enjoy all the features offered by the Smarters Player Lite app.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">3</div>
                <h3 className="text-2xl font-bold text-gray-900">Enter Your IPTV Login Credentials on your MacBook or Mac</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Fill in the required fields with the login information you received when purchasing your IPTV subscription. This step is crucial to activate your IPTV service on your MacBook or Mac and fully enjoy all the features offered by the Smarters Player Lite application.
              </p>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Profile Name</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter a profile name that will allow you to easily identify your IPTV connection on your MacBook or Mac</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Username</strong>
                  <p className="text-gray-700 text-sm mt-1">In the 'Username' field, enter the username provided by your IPTV service</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Password</strong>
                  <p className="text-gray-700 text-sm mt-1">Then enter your password in the 'Password' field</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Server URL</strong>
                  <p className="text-gray-700 text-sm mt-1">In the 'URL' field, enter the server address provided by your IPTV provider</p>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Check all the information entered, then press 'ADD USERS' to validate the configuration. In a few simple steps, you will have configured your IPTV service on your MacBook or Mac, ready to stream content continuously.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">4</div>
                <h3 className="text-2xl font-bold text-gray-900">Change the Stream Format on Smarters Player Lite for Mac</h3>
              </div>
              <p className="text-gray-700 mb-6">
                To optimize the quality of your IPTV streaming on MacBook or Mac, we recommend changing the stream format in the Smarters Player Lite app settings. This configuration ensures smoother playback, specially adapted for macOS systems.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 1</span>
                  <span className="text-gray-700">Click on the settings icon in the top right of the Smarters Player Lite main screen</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 2</span>
                  <span className="text-gray-700">Select 'Stream Format' from the settings menu</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 3</span>
                  <span className="text-gray-700">Choose 'MPEGTS (.ts)', a format generally more compatible with macOS and offering better stability when playing your IPTV channels</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 4</span>
                  <span className="text-gray-700">Don't forget to click 'SAVE CHANGES' to save the modifications</span>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> By following these steps, you will ensure an optimal IPTV experience on your MacBook or Mac, with continuous streaming and exceptional video quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Android Phone Setup Instructions */}
        {selectedDevice === 'android' && (
          <div className="space-y-8">
            {/* Recommended App */}
            <div className="bg-[#4ade80]/10 border-2 border-[#4ade80] rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Recommended App</h3>
                  <p className="text-2xl font-extrabold gradient-text">IPTV Smarters Pro</p>
                </div>
                <button className="px-6 py-3 bg-[#4ade80] text-black font-bold rounded-lg hover:opacity-90 transition-all">
                  Download
                </button>
              </div>
            </div>

            {/* Step 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">1</div>
                <h3 className="text-2xl font-bold text-gray-900">Download and Install IPTV Smarters Pro</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Go to your internet browser and search for 'IPTV Smarters Pro' or visit the official website. Download the APK file and install it. If prompted, authorize the installation of the app from unknown sources.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 1</span>
                  <span className="text-gray-700">Open your web browser (Chrome, Firefox, etc.)</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 2</span>
                  <span className="text-gray-700">Search for 'IPTV Smarters Pro APK' or visit iptvsmarters.com</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 3</span>
                  <span className="text-gray-700">Download the latest version of the app</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 4</span>
                  <span className="text-gray-700">Once downloaded, tap on the APK file to install</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 5</span>
                  <span className="text-gray-700">Follow the on-screen instructions to complete installation</span>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Make sure to download from the official source to ensure you get the authentic app. If prompted, allow installation from unknown sources.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">2</div>
                <h3 className="text-2xl font-bold text-gray-900">Launch IPTV Smarters Pro</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Once installed, open IPTV Smarters Pro. Choose 'Mobile' as your device type and accept the terms and conditions. Then select 'Login With Xtream API' to proceed with the setup.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 1</span>
                  <span className="text-gray-700">Open the IPTV Smarters Pro app from your app drawer</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 2</span>
                  <span className="text-gray-700">Select 'Mobile' in the device option</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 3</span>
                  <span className="text-gray-700">Accept the terms and conditions</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 4</span>
                  <span className="text-gray-700">Choose 'Login With Xtream API' as your login method</span>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Selecting 'Mobile' optimizes the app interface for your phone screen.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">3</div>
                <h3 className="text-2xl font-bold text-gray-900">Enter Your Login Credentials</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Fill in the fields with your information received when you paid for your IPTV subscription. For the first field, you can enter any name you want. Enter your Username in the Username field, your Password in the Password field, and the URL in the URL field. Check your information carefully and press ADD USER.
              </p>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Playlist Name</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter any name you want to identify your IPTV service</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Username</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter your Username provided in your subscription email</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Password</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter your Password provided in your subscription email</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Server URL</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter the server URL provided in your subscription email</p>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Double-check all your credentials before pressing ADD USER to avoid connection errors.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">4</div>
                <h3 className="text-2xl font-bold text-gray-900">Change the Stream Format in IPTV Smarters Pro</h3>
              </div>
              <p className="text-gray-700 mb-6">
                For optimal streaming quality on your Android device, it's recommended to change the stream format. Go to the settings of your IPTV Smarters Pro app by clicking on the top right.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 1</span>
                  <span className="text-gray-700">Click on the settings icon in the top right corner</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 2</span>
                  <span className="text-gray-700">Go to 'Settings'</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 3</span>
                  <span className="text-gray-700">Select 'Stream Format'</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 4</span>
                  <span className="text-gray-700">Choose 'MPEGTS (.ts)' for best compatibility</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 5</span>
                  <span className="text-gray-700">Press 'SAVE CHANGES' to apply the settings</span>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> The MPEGTS format provides better stability and quality for most Android devices.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 - Successfully Connected */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">5</div>
                <h3 className="text-2xl font-bold text-gray-900">Successfully Connected</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Congratulations! You have successfully connected and can now enjoy your IPTV subscription. You can now browse through thousands of channels and start streaming your favorite content.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <i className="fas fa-tv text-[#4ade80] text-xl"></i>
                    <strong className="text-gray-900">Live TV</strong>
                  </div>
                  <p className="text-gray-700 text-sm">Access thousands of live TV channels from around the world</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <i className="fas fa-film text-[#4ade80] text-xl"></i>
                    <strong className="text-gray-900">Movies & Series</strong>
                  </div>
                  <p className="text-gray-700 text-sm">Browse through an extensive library of on-demand content</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <i className="fas fa-clock text-[#4ade80] text-xl"></i>
                    <strong className="text-gray-900">Catch Up TV</strong>
                  </div>
                  <p className="text-gray-700 text-sm">Watch programs you missed with the catch-up feature</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <i className="fas fa-list text-[#4ade80] text-xl"></i>
                    <strong className="text-gray-900">EPG Guide</strong>
                  </div>
                  <p className="text-gray-700 text-sm">Use the electronic program guide to see what's playing</p>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> If you encounter any issues, please contact our support team via WhatsApp or email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* iPhone / iPad Setup Instructions */}
        {selectedDevice === 'ios' && (
          <div className="space-y-8">
            {/* Recommended App */}
            <div className="bg-[#4ade80]/10 border-2 border-[#4ade80] rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Recommended App</h3>
                  <p className="text-2xl font-extrabold gradient-text">Smarters Player Lite</p>
                </div>
                <button className="px-6 py-3 bg-[#4ade80] text-black font-bold rounded-lg hover:opacity-90 transition-all">
                  Download
                </button>
              </div>
            </div>

            {/* Step 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">1</div>
                <h3 className="text-2xl font-bold text-gray-900">Download Smarters Player Lite on your iPhone or iPad</h3>
              </div>
              <p className="text-gray-700 mb-6">
                The first step to configure your IPTV service on iPhone or iPad is to download the Smarters Player Lite app from the App Store. Search for 'Smarters Player Lite' directly in the App Store, or click the download button above to access the download page directly. Smarters Player Lite is a free app that allows you to stream your IPTV content on iPhone and iPad smoothly and intuitively. The app is specially designed for iOS devices, ensuring an optimal user experience on your iPhone or iPad.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Make sure you're connected to Wi-Fi for a faster download from the App Store.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">2</div>
                <h3 className="text-2xl font-bold text-gray-900">Launch Smarters Player Lite on your iPhone or iPad</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Once the app is installed, open Smarters Player Lite on your iPhone or iPad. On first launch, you'll need to accept the terms and conditions. Then, tap 'Add Your Playlist via XC API' to begin configuring your IPTV service on your Apple device. This step is crucial to ensure your iPhone IPTV or iPad IPTV is properly configured to receive and play your IPTV streams seamlessly.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> If prompted for permissions, make sure to allow network access for the app to work properly.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">3</div>
                <h3 className="text-2xl font-bold text-gray-900">Enter your login credentials for your IPTV service on iPhone</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Now that the app is ready, you'll need to enter your login credentials to activate your IPTV service on iPhone or iPad. This information was provided to you when you purchased your subscription.
              </p>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Profile Name</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter a name of your choice to easily identify your IPTV profile on iPhone or iPad.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Username</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter the username provided to you when you subscribed.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Password</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter the password associated with your IPTV account.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Server URL</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter the IPTV server URL in the URL field.</p>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Once all information is entered, check it carefully to avoid any errors, then tap 'ADD USERS'. You're now ready to use your IPTV service on your iPhone or iPad.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">4</div>
                <h3 className="text-2xl font-bold text-gray-900">Modify the stream format in Smarters Player Lite on iPhone</h3>
              </div>
              <p className="text-gray-700 mb-6">
                For better streaming quality on your iPhone or iPad, it's recommended to modify the stream format in Smarters Player Lite settings. Here's how:
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 1</span>
                  <span className="text-gray-700">Click the settings icon located in the top right of the app.</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 2</span>
                  <span className="text-gray-700">Select 'Stream Format' from the settings menu.</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 3</span>
                  <span className="text-gray-700">Choose the 'MPEGTS (.ts)' format for optimal compatibility with iOS devices.</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 4</span>
                  <span className="text-gray-700">Tap 'SAVE CHANGES' to save your modifications.</span>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> These settings will improve the smoothness and quality of your IPTV experience on iPhone and iPad, allowing you to fully enjoy your subscription.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 - Support and Troubleshooting */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">5</div>
                <h3 className="text-2xl font-bold text-gray-900">Support and troubleshooting for iPhone IPTV</h3>
              </div>
              <p className="text-gray-700 mb-6">
                If you encounter any issues during installation or use of your IPTV service on iPhone or iPad, we have some tips for you:
              </p>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Connection issues</strong>
                  <p className="text-gray-700 text-sm mt-1">Make sure you've entered your login credentials correctly and that your subscription is active.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Streaming quality</strong>
                  <p className="text-gray-700 text-sm mt-1">If you notice poor streaming quality, check your internet connection. A stable connection is essential for a good IPTV experience on iPhone.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">iOS compatibility</strong>
                  <p className="text-gray-700 text-sm mt-1">Make sure your iOS device is up to date. Regular updates ensure better compatibility with IPTV apps like Smarters Player Lite.</p>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> For more assistance, don't hesitate to contact our support team via WhatsApp or email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LG Smart TV Setup Instructions */}
        {selectedDevice === 'lg' && (
          <div className="space-y-8">
            {/* Recommended App */}
            <div className="bg-[#4ade80]/10 border-2 border-[#4ade80] rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Recommended App</h3>
                  <p className="text-2xl font-extrabold gradient-text">IPTV Smarters Pro</p>
                </div>
              </div>
            </div>

            {/* Step 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">1</div>
                <h3 className="text-2xl font-bold text-gray-900">Download and Install IPTV Smarters Pro</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Go to the Apps section of your LG TV. Once in Apps, press the magnifying glass icon in the top right corner and search for 'IPTV Smarters Pro'. Once found, click on it and install IPTV Smarters Pro on your LG TV.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 1</span>
                  <span className="text-gray-700">Press the Home button on your LG TV remote</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 2</span>
                  <span className="text-gray-700">Navigate to the 'Apps' or 'LG Content Store' section</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 3</span>
                  <span className="text-gray-700">Click on the search icon (magnifying glass) in the top right</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 4</span>
                  <span className="text-gray-700">Type 'IPTV Smarters Pro' in the search bar</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 5</span>
                  <span className="text-gray-700">Select the app from the results and click 'Install'</span>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Make sure your LG TV is connected to the internet before attempting to download the app.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">2</div>
                <h3 className="text-2xl font-bold text-gray-900">Launch IPTV Smarters Pro</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Launch the application and accept all permissions when prompted. If you encounter difficulties launching the app, try restarting your LG TV. If you still can't launch IPTV Smarters Pro on your LG TV, check if there are any updates available for your LG TV system.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 1</span>
                  <span className="text-gray-700">Open IPTV Smarters Pro from your Apps menu</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 2</span>
                  <span className="text-gray-700">Accept all terms and conditions when prompted</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 3</span>
                  <span className="text-gray-700">If the app doesn't launch, restart your TV and try again</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 4</span>
                  <span className="text-gray-700">Check for system updates: Settings → All Settings → General → About This TV → Check for Updates</span>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Keeping your LG TV software up to date ensures the best compatibility with IPTV Smarters Pro.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">3</div>
                <h3 className="text-2xl font-bold text-gray-900">Enter Your Login Credentials</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Fill in the fields with your information received when you paid for your IPTV subscription. For the first field, you can enter any name you want. Enter your Username in the Username field, your Password in the Password field, and the URL in the URL field. Check your information carefully and press 'ADD USER'.
              </p>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Playlist Name</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter any name you want to identify your IPTV service</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Username</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter your Username from your subscription email</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Password</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter your Password from your subscription email</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Server URL</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter the server URL from your subscription email</p>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Double-check all your credentials before pressing ADD USER to ensure a successful connection.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">4</div>
                <h3 className="text-2xl font-bold text-gray-900">Change the Stream Format</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Go to the settings by clicking on the top right. Then go to Stream Format, and set the stream format to MPEGTS.ts. Press 'SAVE CHANGES' and you can now watch TV channels, movies and series.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 1</span>
                  <span className="text-gray-700">Click on the settings icon in the top right corner</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 2</span>
                  <span className="text-gray-700">Navigate to 'Stream Format' in the settings menu</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 3</span>
                  <span className="text-gray-700">Select 'MPEGTS (.ts)' from the available formats</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 4</span>
                  <span className="text-gray-700">Press 'SAVE CHANGES' to apply the settings</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 5</span>
                  <span className="text-gray-700">You're now ready to enjoy your IPTV content!</span>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> The MPEGTS format provides the best streaming quality and stability for LG WebOS TVs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Samsung Smart TV Setup Instructions */}
        {selectedDevice === 'samsung' && (
          <div className="space-y-8">
            {/* Recommended App */}
            <div className="bg-[#4ade80]/10 border-2 border-[#4ade80] rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Recommended App</h3>
                  <p className="text-2xl font-extrabold gradient-text">IPTV Smarters Pro</p>
                </div>
              </div>
            </div>

            {/* Step 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">1</div>
                <h3 className="text-2xl font-bold text-gray-900">Download and Install IPTV Smarters Pro</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Go to the Apps section of your Samsung TV. Once in Apps, press the magnifying glass icon in the top right corner and search for 'IPTV Smarters Pro'. Once found, click on it and install IPTV Smarters Pro on your Samsung TV.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 1</span>
                  <span className="text-gray-700">Press the Smart Hub button on your Samsung TV remote</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 2</span>
                  <span className="text-gray-700">Navigate to the 'Apps' or 'Samsung App Store' section</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 3</span>
                  <span className="text-gray-700">Click on the search icon (magnifying glass) in the top right</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 4</span>
                  <span className="text-gray-700">Type 'IPTV Smarters Pro' in the search bar</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 5</span>
                  <span className="text-gray-700">Select the app from the results and click 'Install'</span>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Make sure your Samsung TV is connected to the internet before attempting to download the app.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">2</div>
                <h3 className="text-2xl font-bold text-gray-900">Launch IPTV Smarters Pro</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Launch the application and accept all permissions when prompted. If you encounter difficulties launching the app, try restarting your Samsung TV. If you still can't launch IPTV Smarters Pro on your Samsung TV, check if there are any updates available for your Samsung TV system.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 1</span>
                  <span className="text-gray-700">Open IPTV Smarters Pro from your Apps menu</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 2</span>
                  <span className="text-gray-700">Accept all terms and conditions when prompted</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 3</span>
                  <span className="text-gray-700">If the app doesn't launch, restart your TV and try again</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 4</span>
                  <span className="text-gray-700">Check for system updates: Settings → Support → Software Update → Update Now</span>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Keeping your Samsung TV software up to date ensures the best compatibility with IPTV Smarters Pro.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">3</div>
                <h3 className="text-2xl font-bold text-gray-900">Enter Your Login Credentials</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Fill in the fields with your information received when you paid for your IPTV subscription. For the first field, you can enter any name you want. Enter your Username in the Username field, your Password in the Password field, and the URL in the URL field. Check your information carefully and press 'ADD USER'.
              </p>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Playlist Name</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter any name you want to identify your IPTV service</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Username</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter your Username from your subscription email</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Password</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter your Password from your subscription email</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Server URL</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter the server URL from your subscription email</p>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Double-check all your credentials before pressing ADD USER to ensure a successful connection.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">4</div>
                <h3 className="text-2xl font-bold text-gray-900">Change the Stream Format</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Go to the settings by clicking on the top right. Then go to Stream Format, and set the stream format to MPEGTS.ts. Press 'SAVE CHANGES' and you can now watch TV channels, movies and series.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 1</span>
                  <span className="text-gray-700">Click on the settings icon in the top right corner</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 2</span>
                  <span className="text-gray-700">Navigate to 'Stream Format' in the settings menu</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 3</span>
                  <span className="text-gray-700">Select 'MPEGTS (.ts)' from the available formats</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 4</span>
                  <span className="text-gray-700">Press 'SAVE CHANGES' to apply the settings</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 5</span>
                  <span className="text-gray-700">You're now ready to enjoy your IPTV content!</span>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> The MPEGTS format provides the best streaming quality and stability for Samsung Tizen TVs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Android TV Setup Instructions */}
        {selectedDevice === 'androidtv' && (
          <div className="space-y-8">
            {/* Recommended App */}
            <div className="bg-[#4ade80]/10 border-2 border-[#4ade80] rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Recommended App</h3>
                  <p className="text-2xl font-extrabold gradient-text">IPTV Smarters Pro</p>
                </div>
                <button className="px-6 py-3 bg-[#4ade80] text-black font-bold rounded-lg hover:opacity-90 transition-all">
                  Download
                </button>
              </div>
            </div>

            {/* Step 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">1</div>
                <h3 className="text-2xl font-bold text-gray-900">Enable Developer Mode</h3>
              </div>
              <p className="text-gray-700 mb-6">
                To install an application outside of the Play Store on your Android Smart TV, you must enable developer mode. This is a simple process that unlocks the ability to install third-party apps.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 1</span>
                  <span className="text-gray-700">Go to the settings of your Android Smart TV</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 2</span>
                  <span className="text-gray-700">Navigate to 'System' or 'Device Preferences'</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 3</span>
                  <span className="text-gray-700">Select 'About'</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 4</span>
                  <span className="text-gray-700">Press 5 times on 'Build Android TV' or 'Build Number'</span>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> You've now activated developer mode! This allows you to install apps from sources other than the Play Store.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">2</div>
                <h3 className="text-2xl font-bold text-gray-900">Install Downloader App</h3>
              </div>
              <p className="text-gray-700 mb-6">
                You must now install the Downloader app which is available directly in the Play Store on your Android Smart TV. To do this, go to the Play Store and search for 'Downloader'. Once you find the app, download it.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 1</span>
                  <span className="text-gray-700">Open the Google Play Store on your Android TV</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 2</span>
                  <span className="text-gray-700">Use the search function to find 'Downloader'</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 3</span>
                  <span className="text-gray-700">Select the Downloader app from the results</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 4</span>
                  <span className="text-gray-700">Click 'Install' to download and install the app</span>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Downloader is a free app that makes it easy to download and install APK files on your Android TV.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">3</div>
                <h3 className="text-2xl font-bold text-gray-900">Install IPTV Smarters Pro</h3>
              </div>
              <p className="text-gray-700 mb-6">
                You must now install IPTV Smarters Pro. Enter the following code in the Downloader app: <strong>250931</strong>. Then scroll down to IPTV SMARTERS and click DOWNLOAD. The IPTV SMARTERS download will start, then you need to open the application and click 'Install'.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 1</span>
                  <span className="text-gray-700">Open the Downloader app you just installed</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 2</span>
                  <span className="text-gray-700">In the URL field, enter the code: <strong>250931</strong></span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 3</span>
                  <span className="text-gray-700">Scroll down and select 'IPTV SMARTERS'</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 4</span>
                  <span className="text-gray-700">Click 'DOWNLOAD' and wait for the file to download</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 5</span>
                  <span className="text-gray-700">Once downloaded, click 'Install' to install the app</span>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> The installation process may take a few moments. Do not interrupt it.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">4</div>
                <h3 className="text-2xl font-bold text-gray-900">Launch IPTV Smarters Pro</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Once you have downloaded IPTV Smarters Pro, you must follow the installation instructions. When the IPTV Smarters Pro app is launched, please follow these steps:
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 1</span>
                  <span className="text-gray-700">Choose 'TV' in 'DEVICE OPTION' for the best TV interface</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 2</span>
                  <span className="text-gray-700">Accept the Terms of Use of the IPTV Smarters Pro app</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 3</span>
                  <span className="text-gray-700">Choose 'XTREME CODES' as your login method</span>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Selecting 'TV' optimizes the interface for your big screen viewing experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">5</div>
                <h3 className="text-2xl font-bold text-gray-900">Enter Your Login Credentials</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Fill in the fields with your information received when you paid for your IPTV subscription. For the first field, you can enter any name you want. Enter your Username, Password, and URL, then verify your information and press ADD PLAYLIST.
              </p>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Playlist Name</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter any name you want to identify your IPTV service</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Username</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter your Username from your subscription email</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Password</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter your Password from your subscription email</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Server URL</strong>
                  <p className="text-gray-700 text-sm mt-1">Enter the server URL from your subscription email</p>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Double-check all your information before pressing ADD PLAYLIST to ensure a successful connection.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">6</div>
                <h3 className="text-2xl font-bold text-gray-900">Change the Stream Format in IPTV Smarters Pro</h3>
              </div>
              <p className="text-gray-700 mb-6">
                For optimal streaming quality on your Android TV, it's recommended to change the stream format. Go to the settings of your IPTV Smarters Pro by clicking on the top right.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 1</span>
                  <span className="text-gray-700">Click on the settings icon in the top right corner</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 2</span>
                  <span className="text-gray-700">Navigate to 'Settings'</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 3</span>
                  <span className="text-gray-700">Select 'Stream Format'</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 4</span>
                  <span className="text-gray-700">Choose 'MPEGTS (.ts)' for best compatibility</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-[#4ade80]">Step 5</span>
                  <span className="text-gray-700">Press 'SAVE CHANGES' to apply the settings</span>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex gap-2">
                  <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> The MPEGTS format provides the best stability and quality for Android TV devices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


