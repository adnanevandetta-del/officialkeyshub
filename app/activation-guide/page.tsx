import { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";

export const metadata: Metadata = {
  title: "Activation Guide - Official Keys Hub",
  description: "Step-by-step activation guides for Windows, Office, and other Microsoft products. Learn how to activate your software licenses quickly and easily.",
  keywords: "windows activation, office activation, product key activation, microsoft activation guide, windows 11 activation, office 2021 activation",
};

export default function ActivationGuidePage() {
  const guides = [
    {
      id: "windows-11",
      icon: "fab fa-windows",
      title: "Windows 11 Activation",
      color: "sky",
      steps: [
        {
          title: "Open Settings",
          description: "Press Windows + I or click Start > Settings",
          icon: "fas fa-cog"
        },
        {
          title: "Go to Activation",
          description: "Navigate to System > Activation",
          icon: "fas fa-arrow-right"
        },
        {
          title: "Enter Product Key",
          description: "Click 'Change product key' and enter your 25-character key",
          icon: "fas fa-key"
        },
        {
          title: "Complete Activation",
          description: "Click Next and follow the prompts. Your Windows will activate automatically.",
          icon: "fas fa-check-circle"
        }
      ],
      alternativeMethod: {
        title: "Command Line Activation",
        steps: [
          "Open Command Prompt as Administrator",
          "Type: slmgr /ipk YOUR-PRODUCT-KEY",
          "Press Enter and wait for confirmation",
          "Type: slmgr /ato to activate online"
        ]
      }
    },
    {
      id: "windows-10",
      icon: "fab fa-windows",
      title: "Windows 10 Activation",
      color: "blue",
      steps: [
        {
          title: "Open Settings",
          description: "Press Windows + I or right-click Start > Settings",
          icon: "fas fa-cog"
        },
        {
          title: "Update & Security",
          description: "Click 'Update & Security' > 'Activation'",
          icon: "fas fa-shield-alt"
        },
        {
          title: "Change Product Key",
          description: "Click 'Change product key' and enter your key",
          icon: "fas fa-key"
        },
        {
          title: "Activate Windows",
          description: "Click Next to activate. Windows will verify and activate automatically.",
          icon: "fas fa-check-circle"
        }
      ],
      alternativeMethod: {
        title: "Phone Activation (Offline)",
        steps: [
          "Open Command Prompt as Administrator",
          "Type: slui 4 and press Enter",
          "Select your country and click Next",
          "Call the toll-free number displayed",
          "Provide the Installation ID to the automated system",
          "Enter the Confirmation ID you receive"
        ]
      }
    },
    {
      id: "office-2021",
      icon: "fas fa-file-word",
      title: "Office 2021 Activation",
      color: "orange",
      steps: [
        {
          title: "Open Any Office App",
          description: "Launch Word, Excel, or any Office application",
          icon: "fas fa-folder-open"
        },
        {
          title: "Sign In or Activate",
          description: "If prompted, click 'Activate Office' or 'Sign in'",
          icon: "fas fa-user-circle"
        },
        {
          title: "Enter Product Key",
          description: "Enter your 25-character product key when prompted",
          icon: "fas fa-key"
        },
        {
          title: "Complete Setup",
          description: "Follow the activation wizard to complete the process",
          icon: "fas fa-check-circle"
        }
      ],
      alternativeMethod: {
        title: "Manual Activation via Account",
        steps: [
          "Go to File > Account in any Office app",
          "Click 'Change Product Key'",
          "Enter your product key",
          "Click 'Install' or 'Activate' and follow prompts",
          "Office will activate and update automatically"
        ]
      }
    },
    {
      id: "office-365",
      icon: "fas fa-cloud",
      title: "Office 365 Activation",
      color: "purple",
      steps: [
        {
          title: "Sign in to Microsoft Account",
          description: "Go to office.com and sign in with your Microsoft account",
          icon: "fas fa-sign-in-alt"
        },
        {
          title: "Install Office",
          description: "Click 'Install Office' > 'Office 365 apps'",
          icon: "fas fa-download"
        },
        {
          title: "Run Installer",
          description: "Run the downloaded file and wait for installation to complete",
          icon: "fas fa-cog"
        },
        {
          title: "Auto Activation",
          description: "Office will activate automatically when you open any app",
          icon: "fas fa-check-circle"
        }
      ],
      alternativeMethod: {
        title: "Redeem Product Key",
        steps: [
          "Go to office.com/setup",
          "Sign in with your Microsoft account",
          "Enter your 25-character product key",
          "Click Next and follow the setup instructions",
          "Download and install Office"
        ]
      }
    },
    {
      id: "windows-server",
      icon: "fas fa-server",
      title: "Windows Server Activation",
      color: "gray",
      steps: [
        {
          title: "Open Server Manager",
          description: "Launch Server Manager from the Start menu",
          icon: "fas fa-server"
        },
        {
          title: "Local Server",
          description: "Click 'Local Server' in the left panel",
          icon: "fas fa-desktop"
        },
        {
          title: "Product Activation",
          description: "Click the 'Not activated' link next to Product ID",
          icon: "fas fa-exclamation-triangle"
        },
        {
          title: "Enter Key",
          description: "Enter your product key and click Activate",
          icon: "fas fa-key"
        }
      ],
      alternativeMethod: {
        title: "Command Line Method",
        steps: [
          "Open PowerShell or CMD as Administrator",
          "Type: slmgr.vbs /ipk YOUR-PRODUCT-KEY",
          "Press Enter and wait for confirmation",
          "Type: slmgr.vbs /ato",
          "Server will activate online"
        ]
      }
    },
    {
      id: "troubleshooting",
      icon: "fas fa-tools",
      title: "Troubleshooting Tips",
      color: "red",
      steps: [
        {
          title: "Check Internet Connection",
          description: "Ensure you have a stable internet connection for online activation",
          icon: "fas fa-wifi"
        },
        {
          title: "Verify Product Key",
          description: "Double-check that you entered the correct 25-character key without spaces",
          icon: "fas fa-search"
        },
        {
          title: "Run as Administrator",
          description: "Always run activation commands or tools with administrator privileges",
          icon: "fas fa-user-shield"
        },
        {
          title: "Contact Support",
          description: "If issues persist, contact our 24/7 support via WhatsApp",
          icon: "fas fa-headset"
        }
      ],
      alternativeMethod: {
        title: "Common Error Solutions",
        steps: [
          "Error 0xC004C003: Check internet connection and try again",
          "Error 0xC004F074: Verify product key is correct",
          "Error 0x8007007B: Key format is invalid, check for typos",
          "Error 0xC004C020: Already activated, use slmgr /rearm",
          "For persistent errors, use phone activation method"
        ]
      }
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
      sky: {
        bg: "from-sky-50 to-sky-100",
        border: "border-sky-300",
        text: "text-sky-700",
        badge: "bg-sky-500"
      },
      blue: {
        bg: "from-blue-50 to-blue-100",
        border: "border-blue-300",
        text: "text-blue-700",
        badge: "bg-blue-500"
      },
      orange: {
        bg: "from-orange-50 to-orange-100",
        border: "border-orange-300",
        text: "text-orange-700",
        badge: "bg-orange-500"
      },
      purple: {
        bg: "from-purple-50 to-purple-100",
        border: "border-purple-300",
        text: "text-purple-700",
        badge: "bg-purple-500"
      },
      gray: {
        bg: "from-gray-50 to-gray-100",
        border: "border-gray-300",
        text: "text-gray-700",
        badge: "bg-gray-500"
      },
      red: {
        bg: "from-red-50 to-red-100",
        border: "border-red-300",
        text: "text-red-700",
        badge: "bg-red-500"
      }
    };
    return colors[color] || colors.sky;
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-6">
          <Breadcrumb 
            items={[
              { label: "Home", href: "/" },
              { label: "Activation Guide", href: "/activation-guide" }
            ]}
          />

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-sky-100 text-sky-700 border border-sky-300 px-6 py-3 rounded-full mb-6">
              <i className="fas fa-book-open text-xl"></i>
              <span className="font-bold uppercase tracking-wider">Activation Guides</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">
              How to Activate Your Software
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Follow our step-by-step guides to activate Windows, Office, and other Microsoft products. 
              Simple instructions for both online and offline activation methods.
            </p>
          </div>

          {/* Quick Links */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <i className="fas fa-link text-sky-500"></i>
                Quick Navigation
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {guides.map((guide) => (
                  <a
                    key={guide.id}
                    href={`#${guide.id}`}
                    className="flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-sky-50 rounded-lg transition-all border border-gray-200 hover:border-sky-300"
                  >
                    <i className={`${guide.icon} text-lg ${getColorClasses(guide.color).text}`}></i>
                    <span className="font-semibold text-gray-900 text-sm">{guide.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Activation Guides */}
          <div className="max-w-5xl mx-auto space-y-12">
            {guides.map((guide, index) => {
              const colors = getColorClasses(guide.color);
              return (
                <div
                  key={guide.id}
                  id={guide.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200 scroll-mt-24"
                >
                  {/* Guide Header */}
                  <div className={`bg-gradient-to-r ${colors.bg} p-8 border-b-2 ${colors.border}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 ${colors.badge} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                        <i className={`${guide.icon} text-3xl`}></i>
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-gray-900">{guide.title}</h2>
                        <p className="text-gray-600 mt-1">Step-by-step activation instructions</p>
                      </div>
                    </div>
                  </div>

                  {/* Main Steps */}
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <i className="fas fa-list-ol text-sky-500"></i>
                      Standard Activation Method
                    </h3>
                    <div className="space-y-6">
                      {guide.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className={`w-12 h-12 ${colors.badge} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                              {stepIndex + 1}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <i className={`${step.icon} ${colors.text}`}></i>
                              <h4 className="font-bold text-gray-900 text-lg">{step.title}</h4>
                            </div>
                            <p className="text-gray-600 leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Alternative Method */}
                    {guide.alternativeMethod && (
                      <div className="mt-10 pt-8 border-t-2 border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                          <i className="fas fa-alternate-arrows text-blue-500"></i>
                          {guide.alternativeMethod.title}
                        </h3>
                        <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                          <ol className="space-y-3">
                            {guide.alternativeMethod.steps.map((step, stepIndex) => (
                              <li key={stepIndex} className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                  {stepIndex + 1}
                                </span>
                                <span className="text-gray-700 pt-0.5">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Help Section */}
          <div className="max-w-5xl mx-auto mt-16">
            <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl shadow-2xl p-10 text-white text-center">
              <i className="fas fa-life-ring text-6xl mb-6 opacity-90"></i>
              <h2 className="text-3xl font-black mb-4">Need Help with Activation?</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Our support team is available 24/7 to help you with any activation issues. 
                Contact us via WhatsApp for instant assistance.
              </p>
              <a
                href="https://wa.me/16019756129"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-sky-600 font-bold rounded-xl text-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                <i className="fab fa-whatsapp text-2xl"></i>
                Contact Support Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
