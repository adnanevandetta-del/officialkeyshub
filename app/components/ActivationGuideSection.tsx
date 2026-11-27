"use client";

import { useState } from "react";

export default function ActivationGuideSection() {
  const [activeTab, setActiveTab] = useState<'windows' | 'office' | 'server'>('windows');

  const guides = {
    windows: {
      title: "Windows 10/11 Activation Guide",
      subtitle: "Activate Windows 10 Pro, Windows 11 Pro, or Windows Home in minutes",
      icon: "fab fa-windows",
      color: "blue",
      steps: [
        {
          number: "1",
          title: "Open Windows Settings",
          description: "Press Windows Key + I to open Settings, or click Start → Settings",
          keywords: "windows settings activation, open windows settings",
          icon: "fas fa-cog"
        },
        {
          number: "2",
          title: "Navigate to Activation",
          description: "Go to Update & Security → Activation (Windows 10) or System → Activation (Windows 11)",
          keywords: "windows activation menu, find activation settings",
          icon: "fas fa-key"
        },
        {
          number: "3",
          title: "Enter Product Key",
          description: "Click 'Change product key' and enter your 25-character Windows license key",
          keywords: "enter windows product key, windows license key input",
          icon: "fas fa-keyboard"
        },
        {
          number: "4",
          title: "Activate Windows",
          description: "Click 'Next' and Windows will verify and activate your license instantly",
          keywords: "activate windows online, windows activation successful",
          icon: "fas fa-check-circle"
        }
      ],
      alternativeMethod: {
        title: "Alternative: Command Prompt Activation",
        steps: [
          "Open Command Prompt as Administrator (Right-click Start → Command Prompt Admin)",
          "Type: slmgr /ipk YOUR-PRODUCT-KEY-HERE",
          "Press Enter and wait for confirmation",
          "Type: slmgr /ato to activate Windows online",
          "Restart your computer to complete activation"
        ],
        keywords: "slmgr command, cmd activation, windows command line activate"
      }
    },
    office: {
      title: "Microsoft Office Activation Guide",
      subtitle: "Activate Office 2021, Office 2019, Office 365, or Office Professional Plus",
      icon: "fas fa-file-word",
      color: "orange",
      steps: [
        {
          number: "1",
          title: "Open Any Office App",
          description: "Launch Word, Excel, PowerPoint, or any Office application",
          keywords: "open microsoft office, start office app",
          icon: "fas fa-folder-open"
        },
        {
          number: "2",
          title: "Go to Account Settings",
          description: "Click File → Account (or Office Account) in the top menu",
          keywords: "office account settings, microsoft office file menu",
          icon: "fas fa-user-circle"
        },
        {
          number: "3",
          title: "Change Product Key",
          description: "Click 'Change Product Key' or 'Update Options' → 'Change Product Key'",
          keywords: "change office product key, update office license",
          icon: "fas fa-key"
        },
        {
          number: "4",
          title: "Enter Office Key",
          description: "Input your 25-character Office product key and click 'Install' or 'Activate'",
          keywords: "enter office activation key, office license activation",
          icon: "fas fa-check-circle"
        }
      ],
      alternativeMethod: {
        title: "Alternative: Office Deployment Tool Method",
        steps: [
          "Download Office Deployment Tool from Microsoft",
          "Extract files and open Command Prompt as Administrator",
          "Navigate to extracted folder: cd C:\\ODT",
          "Type: setup.exe /configure configuration.xml",
          "After installation, activate: cscript ospp.vbs /inpkey:YOUR-KEY"
        ],
        keywords: "office deployment tool, ospp.vbs activation, office volume license"
      }
    },
    server: {
      title: "Windows Server Activation Guide",
      subtitle: "Activate Windows Server 2022, 2019, 2016 Standard or Datacenter Edition",
      icon: "fas fa-server",
      color: "green",
      steps: [
        {
          number: "1",
          title: "Open Server Manager",
          description: "Click Start and open Server Manager (it usually opens automatically)",
          keywords: "windows server manager, open server dashboard",
          icon: "fas fa-server"
        },
        {
          number: "2",
          title: "Access Activation Settings",
          description: "Click 'Local Server' → Find 'Product ID' section → Click 'Not Activated'",
          keywords: "server activation settings, windows server license",
          icon: "fas fa-cog"
        },
        {
          number: "3",
          title: "Enter Server License Key",
          description: "Click 'Change product key' and enter your Windows Server product key",
          keywords: "windows server product key, server license key input",
          icon: "fas fa-key"
        },
        {
          number: "4",
          title: "Activate Server",
          description: "Click 'Next' to activate online, or use phone activation if offline",
          keywords: "activate windows server, server online activation",
          icon: "fas fa-check-circle"
        }
      ],
      alternativeMethod: {
        title: "Alternative: PowerShell Activation",
        steps: [
          "Open PowerShell as Administrator",
          "Type: slmgr.vbs /ipk YOUR-SERVER-KEY-HERE",
          "Press Enter and wait for success message",
          "Type: slmgr.vbs /ato to activate online",
          "Type: slmgr.vbs /dlv to verify activation status"
        ],
        keywords: "powershell server activation, slmgr server commands, verify server license"
      }
    }
  };

  const currentGuide = guides[activeTab];

  const tabs = [
    { id: 'windows' as const, icon: 'fab fa-windows', label: 'Windows', sub: '10 / 11 / Home / Pro' },
    { id: 'office' as const, icon: 'fas fa-file-word', label: 'Office', sub: '2021 / 2019 / 365' },
    { id: 'server' as const, icon: 'fas fa-server', label: 'Server', sub: '2022 / 2019 / 2016' },
  ];

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full mb-4">
            <i className="fas fa-graduation-cap text-emerald-700"></i>
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest">Step-by-Step Guide</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-[-0.025em] text-gray-900 mb-3 md:mb-4">
            How to Activate Your Software
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
            Pick your product and follow four short steps. It takes about two minutes.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-3 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3 mb-6 md:mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 px-2 sm:px-6 py-3 sm:py-4 rounded-xl font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-md sm:scale-105'
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              <i className={`${tab.icon} text-xl sm:text-2xl`}></i>
              <div className="text-center sm:text-left">
                <div className="text-xs sm:text-sm font-semibold">{tab.label}</div>
                <div className="hidden sm:block text-xs opacity-80">{tab.sub}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Guide Content */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-8 md:p-12">
          {/* Guide Title */}
          <div className="text-center mb-6 md:mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-emerald-100 border border-emerald-200 rounded-full mb-3 md:mb-4">
              <i className={`${currentGuide.icon} text-2xl md:text-3xl text-emerald-700`}></i>
            </div>
            <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">{currentGuide.title}</h3>
            <p className="text-sm md:text-lg text-gray-600">{currentGuide.subtitle}</p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-2 gap-3 md:gap-5 mb-6 md:mb-10">
            {currentGuide.steps.map((step, idx) => (
              <div
                key={idx}
                className="flex gap-4 md:gap-5 items-start bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm hover:border-emerald-400 transition-all"
              >
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-black text-base md:text-lg">
                    {step.number}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <i className={`${step.icon} text-emerald-700 text-sm md:text-base`}></i>
                    <h4 className="text-base md:text-lg font-bold text-gray-900">{step.title}</h4>
                  </div>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Alternative Method */}
          <details className="group bg-amber-50 rounded-xl border border-amber-200 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-3 p-4 md:p-6">
              <i className="fas fa-lightbulb text-amber-500 text-xl"></i>
              <h4 className="flex-1 text-base md:text-lg font-bold text-gray-900">{currentGuide.alternativeMethod.title}</h4>
              <i className="fas fa-chevron-down text-amber-600 text-sm transition-transform group-open:rotate-180" aria-hidden="true"></i>
            </summary>
            <ol className="space-y-3 px-4 pb-4 md:px-6 md:pb-6">
              {currentGuide.alternativeMethod.steps.map((step, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-gray-100 font-mono text-xs md:text-sm bg-gray-900 px-3 py-2 rounded-lg flex-1 min-w-0 break-words border border-gray-800">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </details>

          {/* Help Section */}
          <div className="mt-6 md:mt-10 text-center">
            <div className="relative overflow-hidden bg-emerald-700 text-white rounded-xl p-6 md:p-8">
              <i className="fas fa-headset text-3xl md:text-4xl mb-3"></i>
              <h4 className="text-xl md:text-2xl font-bold mb-2">Need Help with Activation?</h4>
              <p className="text-white/90 text-sm md:text-base mb-5 md:mb-6 max-w-xl mx-auto">
                Our support team is available 24/7 on WhatsApp and email.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                <a
                  href="https://wa.me/16019756129?text=Hi! I need help with activation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-emerald-800 px-6 py-3 rounded-lg font-bold hover:bg-emerald-50 transition-all shadow-lg"
                >
                  <i className="fab fa-whatsapp text-xl"></i>
                  WhatsApp Support
                </a>
                <a
                  href="mailto:officialkeyshub@gmail.com"
                  className="inline-flex items-center gap-2 bg-emerald-800 border border-white/20 text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-900 transition-all"
                >
                  <i className="fas fa-envelope text-xl"></i>
                  Email Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
