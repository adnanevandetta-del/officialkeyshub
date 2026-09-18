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
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-4">
            <i className="fas fa-graduation-cap text-sky-500"></i>
            <span className="text-sky-400 font-bold text-xs uppercase tracking-widest">Step-by-Step Guide</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            How to <span className="gradient-text">Activate Your Software</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Complete activation guides for Windows, Office, and Server products. Follow these simple steps to activate your genuine Microsoft license key instantly.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all ${
                activeTab === tab.id
                  ? 'btn-primary scale-105'
                  : 'glass text-slate-300 hover:text-white glow-hover'
              }`}
            >
              <i className={`${tab.icon} text-2xl`}></i>
              <div className="text-left">
                <div className="text-sm font-semibold">{tab.label}</div>
                <div className="text-xs opacity-80">{tab.sub}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Guide Content */}
        <div className="glass-strong rounded-2xl p-8 md:p-12">
          {/* Guide Title */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-600/15 border border-sky-500/30 rounded-full mb-4">
              <i className={`${currentGuide.icon} text-3xl text-sky-500`}></i>
            </div>
            <h3 className="text-3xl font-black text-white mb-2">{currentGuide.title}</h3>
            <p className="text-lg text-slate-400">{currentGuide.subtitle}</p>
          </div>

          {/* Steps */}
          <div className="space-y-5 mb-12">
            {currentGuide.steps.map((step, idx) => (
              <div
                key={idx}
                className="flex gap-6 items-start bg-white/[0.03] p-6 rounded-xl border border-white/10 hover:border-sky-500/40 transition-all"
              >
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 btn-primary rounded-full flex items-center justify-center font-black text-xl">
                    {step.number}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <i className={`${step.icon} text-sky-500 text-xl`}></i>
                    <h4 className="text-xl font-bold text-white">{step.title}</h4>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Alternative Method */}
          <div className="bg-amber-500/[0.07] rounded-xl p-8 border border-amber-400/30">
            <div className="flex items-center gap-3 mb-4">
              <i className="fas fa-lightbulb text-amber-400 text-2xl"></i>
              <h4 className="text-xl font-bold text-white">{currentGuide.alternativeMethod.title}</h4>
            </div>
            <ol className="space-y-3">
              {currentGuide.alternativeMethod.steps.map((step, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-black rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-slate-200 font-mono text-sm bg-black/30 px-3 py-2 rounded-lg flex-1 border border-white/10">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Help Section */}
          <div className="mt-10 text-center">
            <div className="relative overflow-hidden bg-gradient-to-r from-sky-700 to-cyan-600 text-white rounded-xl p-8">
              <i className="fas fa-headset text-4xl mb-4"></i>
              <h4 className="text-2xl font-bold mb-2">Need Help with Activation?</h4>
              <p className="text-sky-50/90 mb-6">
                Our expert support team is available 24/7 to help you activate your Microsoft product key.
                Get instant assistance via WhatsApp, email, or phone.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://wa.me/16019756129?text=Hi! I need help with activation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-sky-800 px-6 py-3 rounded-lg font-bold hover:bg-sky-50 transition-all shadow-lg"
                >
                  <i className="fab fa-whatsapp text-xl"></i>
                  WhatsApp Support
                </a>
                <a
                  href="mailto:digitalkeyhubllc@gmail.com"
                  className="inline-flex items-center gap-2 bg-black/25 border border-white/20 text-white px-6 py-3 rounded-lg font-bold hover:bg-black/40 transition-all"
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
