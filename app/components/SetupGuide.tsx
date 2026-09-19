'use client';
import { useState } from 'react';

interface Step {
  title: string;
  intro: string;
  bullets?: { label: string; text: string }[];
  steps?: string[];
  note?: string;
}

interface Product {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  app: string;
  steps: Step[];
}

const products: Product[] = [
  {
    id: 'windows',
    name: 'Windows 11 / 10',
    subtitle: 'Windows 11 Pro/Home, Windows 10 Pro/Home',
    icon: 'fa-windows',
    app: 'Windows Activation Settings',
    steps: [
      {
        title: 'Open Activation Settings',
        intro:
          'Your product key was sent to the email address you used at checkout. Before you start, make sure your PC is connected to the internet.',
        steps: [
          'Click the Start menu and open Settings (or press Windows + I)',
          "Go to 'System' and then select 'Activation'",
          "Click 'Change product key' next to the Upgrade or Activation section",
          "If you don't see 'Change product key', select 'Activation state' to expand it first",
        ],
        note:
          "On Windows 10, the path is Settings → Update & Security → Activation → Change product key.",
      },
      {
        title: 'Enter Your 25-Character Key',
        intro:
          'Type the product key from your order email exactly as shown. It is made up of 25 characters in five groups of five (XXXXX-XXXXX-XXXXX-XXXXX-XXXXX).',
        steps: [
          'Enter the 25-character product key in the field provided',
          "Click 'Next' and then 'Activate'",
          'Wait a few seconds while Windows verifies the key with Microsoft',
          "You'll see a confirmation: 'Windows is activated with a digital license'",
        ],
        note:
          'Copy and paste the key directly from your email to avoid typos. The dashes are added automatically.',
      },
      {
        title: 'Use the Phone Activation Option (if needed)',
        intro:
          'If you purchased a Phone activation key, or online activation returns error 0xC004C008 / 0xC004C020, use the built-in phone activation wizard.',
        steps: [
          'Press Windows + R, type slui.exe 4 and press Enter',
          'Select your country or region from the list',
          'Call the automated Microsoft activation line shown on screen',
          'Enter the installation ID when prompted and type in the confirmation ID you receive',
        ],
        note:
          'Phone activation is fully automated and free. Our support team can walk you through it on WhatsApp if you get stuck.',
      },
    ],
  },
  {
    id: 'office',
    name: 'Office 2021 / 2019',
    subtitle: 'Office Professional Plus, Home & Business',
    icon: 'fa-file-word',
    app: 'Office Setup (office.com/setup)',
    steps: [
      {
        title: 'Download Office from the Official Source',
        intro:
          'Uninstall any pre-installed or trial version of Office first (Settings → Apps) to avoid activation conflicts, then download a fresh copy.',
        steps: [
          'Go to www.office.com/setup in your browser',
          'Sign in with your Microsoft account, or create a free one',
          "Enter the 25-character product key from your order email and click 'Next'",
          'Download the installer and run it, then follow the on-screen steps',
        ],
        note:
          'Binding the key to your Microsoft account means you can re-download and reinstall Office any time from account.microsoft.com.',
      },
      {
        title: 'Activate Inside Any Office App',
        intro:
          'Once Office is installed you can confirm activation from Word, Excel, or any Office application.',
        steps: [
          'Open Word or Excel and create a blank document',
          "Go to 'File' → 'Account'",
          "Under Product Information you should see 'Product Activated'",
          "If prompted, click 'Activate' and enter your product key",
        ],
        note:
          'A one-time internet connection is required to activate. After that, Office works offline.',
      },
    ],
  },
  {
    id: 'server',
    name: 'Windows Server',
    subtitle: 'Server 2022 / 2019 Standard & Datacenter',
    icon: 'fa-server',
    app: 'Command Prompt / Server Manager',
    steps: [
      {
        title: 'Activate via Command Prompt',
        intro:
          'Windows Server keys are activated using the built-in slmgr tool. Open Command Prompt as an administrator (right-click → Run as administrator).',
        steps: [
          'Install the product key: slmgr /ipk XXXXX-XXXXX-XXXXX-XXXXX-XXXXX',
          'Point to the activation server: slmgr /skms kms.server (only for KMS keys)',
          'Activate Windows: slmgr /ato',
          'Check status any time with: slmgr /xpr',
        ],
        note:
          'For retail keys, you only need the /ipk and /ato commands. Reboot after activation completes.',
      },
    ],
  },
];

export default function SetupGuide() {
  const [selected, setSelected] = useState('windows');
  const product = products.find((p) => p.id === selected)!;

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
            Activation <span className="gradient-text">Setup Guide</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Activate your genuine Microsoft product in under 5 minutes. Select your product below for
            step-by-step instructions.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2">
              <i className="fas fa-clock text-[#4ade80]"></i>
              <span className="text-sm font-semibold text-gray-700">5-minute activation</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-check-circle text-[#4ade80]"></i>
              <span className="text-sm font-semibold text-gray-700">Genuine lifetime license</span>
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

        {/* Product Selection */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Select your product</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selected === p.id
                    ? 'border-[#4ade80] bg-[#4ade80]/10'
                    : 'border-gray-200 hover:border-[#4ade80]/50'
                }`}
              >
                <i
                  className={`fab ${p.icon} text-3xl mb-3 ${
                    selected === p.id ? 'text-[#4ade80]' : 'text-gray-400'
                  }`}
                ></i>
                <h3 className="font-bold text-sm text-gray-900 mb-1">{p.name}</h3>
                <p className="text-xs text-gray-600">{p.subtitle}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {/* Recommended tool */}
          <div className="bg-[#4ade80]/10 border-2 border-[#4ade80] rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Where you&apos;ll activate</h3>
            <p className="text-2xl font-extrabold gradient-text">{product.app}</p>
          </div>

          {product.steps.map((step, i) => (
            <div key={i} className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ade80] text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {i + 1}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
              </div>
              <p className="text-gray-700 mb-6">{step.intro}</p>

              {step.steps && (
                <div className="space-y-4 mb-6">
                  {step.steps.map((s, j) => (
                    <div key={j} className="flex gap-3">
                      <span className="font-bold text-[#4ade80] whitespace-nowrap">Step {j + 1}</span>
                      <span className="text-gray-700">{s}</span>
                    </div>
                  ))}
                </div>
              )}

              {step.bullets && (
                <div className="space-y-4 mb-6">
                  {step.bullets.map((b, j) => (
                    <div key={j} className="bg-gray-50 p-4 rounded-lg">
                      <strong className="text-gray-900">{b.label}</strong>
                      <p className="text-gray-700 text-sm mt-1">{b.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {step.note && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <div className="flex gap-2">
                    <i className="fas fa-lightbulb text-blue-500 mt-1"></i>
                    <p className="text-sm text-blue-900">
                      <strong>Note:</strong> {step.note}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Support callout */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
            <div className="flex items-center gap-4 mb-4">
              <i className="fab fa-whatsapp text-[#4ade80] text-3xl"></i>
              <h3 className="text-2xl font-bold text-gray-900">Need a hand?</h3>
            </div>
            <p className="text-gray-700">
              If you run into any activation error or need help finding your key, our support team is
              available 24/7. Reach us via the WhatsApp button on this page or email{' '}
              <a href="mailto:officialkeyshub@gmail.com" className="text-[#4ade80] hover:underline">
                officialkeyshub@gmail.com
              </a>{' '}
              and we&apos;ll get you activated fast.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
