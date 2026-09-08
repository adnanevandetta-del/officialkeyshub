"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type CategoryId = "all" | "windows" | "office" | "server" | "visio" | "project" | "sql" | "visualstudio" | "antivirus";

interface Product {
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  features: string[];
  popular: boolean;
  image: string;
  badge?: string;
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("windows");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Check if URL has #products-all to show all products
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for URL hash
      if (window.location.hash === '#products-all') {
        setActiveCategory("all");
      }
      
      // Check for selected category from navbar dropdown or CategoryBar
      const savedCategory = sessionStorage.getItem('selectedCategory');
      if (savedCategory) {
        setActiveCategory(savedCategory as CategoryId);
      }

      // Listen for category changes from CategoryBar
      const handleCategoryChange = (event: CustomEvent) => {
        const category = event.detail.category;
        setActiveCategory(category as CategoryId);
      };

      window.addEventListener('categoryChanged', handleCategoryChange as EventListener);
      
      return () => {
        window.removeEventListener('categoryChanged', handleCategoryChange as EventListener);
      };
    }
  }, []);

  const categories: { id: CategoryId; name: string; icon: string }[] = [
    { id: "windows", name: "Windows", icon: "fab fa-windows" },
    { id: "office", name: "Office", icon: "fas fa-file-word" },
    { id: "server", name: "Server", icon: "fas fa-server" },
    { id: "visio", name: "Visio", icon: "fas fa-project-diagram" },
    { id: "project", name: "Project", icon: "fas fa-tasks" },
    { id: "sql", name: "SQL Server", icon: "fas fa-database" },
    { id: "visualstudio", name: "Visual Studio", icon: "fas fa-code" },
    { id: "antivirus", name: "Security", icon: "fas fa-shield-alt" },
  ];

  const products: Record<Exclude<CategoryId, "all">, {
    name: string;
    description: string;
    price: string;
    originalPrice: string;
    features: string[];
    popular: boolean;
    image: string;
    badge?: string;
  }[]> = {
    windows: [
      {
        name: "Windows 11 Pro",
        description: "Latest Windows OS with professional features",
        price: "$19.99",
        originalPrice: "$199.99",
        features: ["Lifetime License", "1 PC", "Instant Delivery", "Remote Desktop", "BitLocker Encryption"],
        popular: true,
        image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Windows 11 Pro - Online Key",
        description: "Digital activation via Microsoft servers",
        price: "$17.99",
        originalPrice: "$199.99",
        features: ["Online Activation", "1 PC", "Instant Delivery", "Digital License", "Microsoft Account Bind"],
        popular: false,
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop&q=80",
        badge: "Online",
      },
      {
        name: "Windows 11 Pro - Phone Key",
        description: "Telephone activation for offline PCs",
        price: "$21.99",
        originalPrice: "$199.99",
        features: ["Phone Activation", "1 PC", "Instant Delivery", "Offline Activation", "No Internet Required"],
        popular: false,
        image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=600&fit=crop&q=80",
        badge: "Phone",
      },
      {
        name: "Windows 11 Home",
        description: "Perfect for home users and students",
        price: "$14.99",
        originalPrice: "$139.99",
        features: ["Lifetime License", "1 PC", "Instant Delivery", "Gaming Optimized", "Security Updates"],
        popular: false,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Windows 10 Pro",
        description: "Stable and reliable professional OS",
        price: "$16.99",
        originalPrice: "$199.99",
        features: ["Lifetime License", "1 PC", "Instant Delivery", "Tested & Trusted", "Long-term Support"],
        popular: false,
        image: "https://images.unsplash.com/photo-1593642532400-2682810df593?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Windows 10 Pro - Online Key",
        description: "Digital activation with Microsoft account",
        price: "$15.99",
        originalPrice: "$199.99",
        features: ["Online Activation", "1 PC", "Instant Delivery", "Cloud Linked", "Easy Reinstall"],
        popular: false,
        image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&h=600&fit=crop&q=80",
        badge: "Online",
      },
      {
        name: "Windows 10 Pro - Phone Key",
        description: "Reliable phone activation method",
        price: "$18.99",
        originalPrice: "$199.99",
        features: ["Phone Activation", "1 PC", "Instant Delivery", "Works Offline", "100% Genuine"],
        popular: false,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&q=80",
        badge: "Phone",
      },
      {
        name: "Windows 10 Home",
        description: "Classic Windows experience",
        price: "$12.99",
        originalPrice: "$139.99",
        features: ["Lifetime License", "1 PC", "Instant Delivery", "Stable Performance", "Regular Updates"],
        popular: false,
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Windows 8.1 Pro",
        description: "Efficient OS for older hardware",
        price: "$11.99",
        originalPrice: "$199.99",
        features: ["Lifetime License", "1 PC", "Instant Delivery", "Lightweight", "Legacy Support"],
        popular: false,
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Windows 7 Professional",
        description: "Classic Windows 7 for legacy systems",
        price: "$9.99",
        originalPrice: "$199.99",
        features: ["Lifetime License", "1 PC", "Instant Delivery", "Legacy Software Support", "Stable & Tested"],
        popular: false,
        image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Windows 365 Business (1 Month)",
        description: "Cloud PC streaming service from Microsoft",
        price: "$31.99",
        originalPrice: "$44.00",
        features: ["Cloud PC", "Windows 11", "Access from Any Device", "2 vCPU, 4GB RAM, 128GB Storage", "1 Month Subscription"],
        popular: false,
        image: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Windows 11 Enterprise",
        description: "Advanced security and management features",
        price: "$24.99",
        originalPrice: "$309.00",
        features: ["Lifetime License", "1 PC", "Advanced Security", "Device Guard", "Credential Guard"],
        popular: false,
        image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Windows 10 Enterprise",
        description: "Enterprise-grade Windows for businesses",
        price: "$21.99",
        originalPrice: "$309.00",
        features: ["Lifetime License", "1 PC", "Advanced Security", "DirectAccess", "AppLocker"],
        popular: false,
        image: "https://images.unsplash.com/photo-1593642532400-2682810df593?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Windows 11 Pro for Workstations",
        description: "High-performance OS for advanced workloads",
        price: "$26.99",
        originalPrice: "$309.00",
        features: ["Lifetime License", "1 PC", "ReFS File System", "Up to 6TB RAM", "Server-grade Performance"],
        popular: false,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop&q=80",
      },
    ],
    office: [
      {
        name: "Office 2021 Professional Plus",
        description: "Complete Office suite with all applications",
        price: "$29.99",
        originalPrice: "$439.99",
        features: ["Word, Excel, PowerPoint", "Outlook, Access, Publisher", "Lifetime License", "1 PC", "Instant Delivery"],
        popular: true,
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Office 2021 Pro Plus - Online Key",
        description: "Digital activation via Microsoft account",
        price: "$27.99",
        originalPrice: "$439.99",
        features: ["All Office Apps", "Online Activation", "Lifetime License", "1 PC", "Cloud Integration"],
        popular: false,
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80",
        badge: "Online",
      },
      {
        name: "Office 2021 Pro Plus - Bind Key",
        description: "Bound to Microsoft account permanently",
        price: "$32.99",
        originalPrice: "$439.99",
        features: ["All Office Apps", "Account Bind", "Lifetime License", "1 PC", "Easy Transfer"],
        popular: false,
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80",
        badge: "Bind",
      },
      {
        name: "Office 2021 Pro Plus - Phone Key",
        description: "Phone activation for offline use",
        price: "$31.99",
        originalPrice: "$439.99",
        features: ["All Office Apps", "Phone Activation", "Lifetime License", "1 PC", "Offline Ready"],
        popular: false,
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80",
        badge: "Phone",
      },
      {
        name: "Office 2021 Home & Business",
        description: "Essential Office apps for home and business",
        price: "$24.99",
        originalPrice: "$249.99",
        features: ["Word, Excel, PowerPoint", "Outlook", "Lifetime License", "1 PC/Mac", "Instant Delivery"],
        popular: false,
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Office 2019 Professional Plus",
        description: "Reliable Office 2019 suite",
        price: "$25.99",
        originalPrice: "$439.99",
        features: ["Word, Excel, PowerPoint", "Outlook, Access, Publisher", "Lifetime License", "1 PC", "Proven Stability"],
        popular: false,
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Office 2019 Pro Plus - Online Key",
        description: "Digital version of Office 2019",
        price: "$23.99",
        originalPrice: "$439.99",
        features: ["All Office Apps", "Online Activation", "Lifetime License", "1 PC", "Quick Setup"],
        popular: false,
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80",
        badge: "Online",
      },
      {
        name: "Office 2019 Pro Plus - Bind Key",
        description: "Account-bound Office 2019",
        price: "$28.99",
        originalPrice: "$439.99",
        features: ["All Office Apps", "Account Bind", "Lifetime License", "1 PC", "Secure"],
        popular: false,
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80",
        badge: "Bind",
      },
      {
        name: "Office 2019 Pro Plus - Phone Key",
        description: "Traditional activation method",
        price: "$27.99",
        originalPrice: "$439.99",
        features: ["All Office Apps", "Phone Activation", "Lifetime License", "1 PC", "100% Working"],
        popular: false,
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80",
        badge: "Phone",
      },
      {
        name: "Office 2016 Professional Plus",
        description: "Proven Office suite for professionals",
        price: "$22.99",
        originalPrice: "$439.99",
        features: ["Word, Excel, PowerPoint", "Outlook, Access, Publisher", "Lifetime License", "1 PC", "Trusted Version"],
        popular: false,
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Office 2013 Professional Plus",
        description: "Classic Office suite for legacy systems",
        price: "$19.99",
        originalPrice: "$399.99",
        features: ["Word, Excel, PowerPoint", "Outlook, Access, Publisher", "Lifetime License", "1 PC", "Legacy Support"],
        popular: false,
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Office 365 (1 Year)",
        description: "Cloud-based Office with 1TB OneDrive",
        price: "$39.99",
        originalPrice: "$99.99",
        features: ["All Office Apps", "1TB OneDrive", "5 Devices", "1 Year Subscription", "Always Updated"],
        popular: false,
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Microsoft 365 Business Standard (1 Year)",
        description: "Complete business productivity suite",
        price: "$59.99",
        originalPrice: "$144.00",
        features: ["All Office Apps", "1TB OneDrive", "Microsoft Teams", "Business Email", "1 Year Subscription"],
        popular: false,
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Office 2010 Professional Plus",
        description: "Legacy Office suite for older systems",
        price: "$16.99",
        originalPrice: "$499.99",
        features: ["Word, Excel, PowerPoint", "Outlook, Access, Publisher", "Lifetime License", "1 PC", "Legacy Support"],
        popular: false,
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Office Home & Student 2021",
        description: "Perfect for students and home use",
        price: "$21.99",
        originalPrice: "$149.99",
        features: ["Word, Excel, PowerPoint", "OneNote", "Lifetime License", "1 PC/Mac", "No Outlook"],
        popular: false,
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop&q=80",
      },
    ],
    server: [
      {
        name: "Windows Server 2022 Standard",
        description: "Enterprise-grade server operating system",
        price: "$49.99",
        originalPrice: "$1,069.00",
        features: ["2 VMs", "Hyper-V", "Storage Replica", "Lifetime License", "Instant Delivery"],
        popular: true,
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Windows Server 2022 Standard - Online Key",
        description: "Digital activation for Server 2022",
        price: "$47.99",
        originalPrice: "$1,069.00",
        features: ["2 VMs", "Online Activation", "Hyper-V", "Lifetime License", "Quick Setup"],
        popular: false,
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop&q=80",
        badge: "Online",
      },
      {
        name: "Windows Server 2019 Standard",
        description: "Reliable server platform",
        price: "$44.99",
        originalPrice: "$972.00",
        features: ["2 VMs", "Hyper-V", "Containers", "Lifetime License", "Tested & Trusted"],
        popular: false,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Windows Server 2019 Standard - Online Key",
        description: "Online activation Server 2019",
        price: "$42.99",
        originalPrice: "$972.00",
        features: ["2 VMs", "Online Activation", "Hyper-V", "Lifetime License", "Instant Setup"],
        popular: false,
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80",
        badge: "Online",
      },
      {
        name: "Windows Server 2022 Datacenter",
        description: "Unlimited virtualization rights",
        price: "$79.99",
        originalPrice: "$6,155.00",
        features: ["Unlimited VMs", "Shielded VMs", "Storage Spaces Direct", "Lifetime License", "Enterprise Features"],
        popular: false,
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Windows Server 2016 Standard",
        description: "Proven server solution",
        price: "$39.99",
        originalPrice: "$882.00",
        features: ["2 VMs", "Hyper-V", "Nano Server", "Lifetime License", "Stable Release"],
        popular: false,
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Windows Server 2019 Datacenter",
        description: "Unlimited virtualization for data centers",
        price: "$74.99",
        originalPrice: "$6,155.00",
        features: ["Unlimited VMs", "Hyper-V", "Storage Spaces Direct", "Lifetime License", "Enterprise Scale"],
        popular: false,
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Windows Server 2016 Datacenter",
        description: "Legacy datacenter edition",
        price: "$69.99",
        originalPrice: "$6,155.00",
        features: ["Unlimited VMs", "Hyper-V", "Software Defined Datacenter", "Lifetime License", "Proven Stable"],
        popular: false,
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Windows Server 2012 R2 Standard",
        description: "Reliable legacy server platform",
        price: "$34.99",
        originalPrice: "$882.00",
        features: ["2 VMs", "Hyper-V", "Storage Spaces", "Lifetime License", "Legacy Support"],
        popular: false,
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Windows Server CAL 2022 (5 Device)",
        description: "Client Access Licenses for Server 2022",
        price: "$29.99",
        originalPrice: "$191.00",
        features: ["5 Device CALs", "Server 2022 Compatible", "Network Access Rights", "Lifetime License", "Instant Delivery"],
        popular: false,
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Windows Server RDS CAL 2022 (5 User)",
        description: "Remote Desktop Services CALs",
        price: "$34.99",
        originalPrice: "$215.00",
        features: ["5 User RDS CALs", "Remote Access", "Terminal Services", "Lifetime License", "Quick Activation"],
        popular: false,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
      },
    ],
    visio: [
      {
        name: "Visio Professional 2021",
        description: "Advanced diagramming and vector graphics",
        price: "$34.99",
        originalPrice: "$579.99",
        features: ["All Visio Features", "Data Visualization", "Lifetime License", "1 PC", "Instant Delivery"],
        popular: true,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Visio Professional 2021 - Online Key",
        description: "Digital activation for Visio 2021",
        price: "$32.99",
        originalPrice: "$579.99",
        features: ["All Visio Features", "Online Activation", "Lifetime License", "1 PC", "Cloud Ready"],
        popular: false,
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80",
        badge: "Online",
      },
      {
        name: "Visio Professional 2021 - Phone Key",
        description: "Phone activation for offline use",
        price: "$36.99",
        originalPrice: "$579.99",
        features: ["All Visio Features", "Phone Activation", "Lifetime License", "1 PC", "Offline Ready"],
        popular: false,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
        badge: "Phone",
      },
      {
        name: "Visio Standard 2021",
        description: "Essential diagramming tool",
        price: "$28.99",
        originalPrice: "$309.99",
        features: ["Standard Templates", "Basic Shapes", "Lifetime License", "1 PC", "Instant Delivery"],
        popular: false,
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Visio Professional 2019",
        description: "Reliable diagramming solution",
        price: "$31.99",
        originalPrice: "$579.99",
        features: ["All Visio Features", "Professional Templates", "Lifetime License", "1 PC", "Proven Version"],
        popular: false,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Visio Professional 2019 - Online Key",
        description: "Online activation Visio 2019",
        price: "$29.99",
        originalPrice: "$579.99",
        features: ["All Visio Features", "Online Activation", "Lifetime License", "1 PC", "Quick Setup"],
        popular: false,
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80",
        badge: "Online",
      },
      {
        name: "Visio Standard 2019",
        description: "Essential diagramming for 2019",
        price: "$26.99",
        originalPrice: "$309.99",
        features: ["Standard Templates", "Basic Shapes", "Lifetime License", "1 PC", "Reliable Version"],
        popular: false,
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Visio Professional 2016",
        description: "Proven diagramming tool",
        price: "$28.99",
        originalPrice: "$579.99",
        features: ["All Visio Features", "Professional Templates", "Lifetime License", "1 PC", "Tested & Stable"],
        popular: false,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
      },
    ],
    project: [
      {
        name: "Project Professional 2021",
        description: "Complete project management solution",
        price: "$34.99",
        originalPrice: "$1,029.99",
        features: ["Resource Management", "Team Collaboration", "Lifetime License", "1 PC", "Instant Delivery"],
        popular: true,
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Project Professional 2021 - Online Key",
        description: "Digital activation for Project 2021",
        price: "$32.99",
        originalPrice: "$1,029.99",
        features: ["All Project Features", "Online Activation", "Lifetime License", "1 PC", "Cloud Integration"],
        popular: false,
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop&q=80",
        badge: "Online",
      },
      {
        name: "Project Professional 2021 - Phone Key",
        description: "Phone activation for offline use",
        price: "$36.99",
        originalPrice: "$1,029.99",
        features: ["All Project Features", "Phone Activation", "Lifetime License", "1 PC", "Works Offline"],
        popular: false,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
        badge: "Phone",
      },
      {
        name: "Project Standard 2021",
        description: "Essential project management",
        price: "$28.99",
        originalPrice: "$679.99",
        features: ["Task Management", "Gantt Charts", "Lifetime License", "1 PC", "Instant Delivery"],
        popular: false,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Project Professional 2019",
        description: "Reliable project management tool",
        price: "$31.99",
        originalPrice: "$1,029.99",
        features: ["Resource Management", "Portfolio Analysis", "Lifetime License", "1 PC", "Proven Stable"],
        popular: false,
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Project Professional 2019 - Online Key",
        description: "Online activation Project 2019",
        price: "$29.99",
        originalPrice: "$1,029.99",
        features: ["All Project Features", "Online Activation", "Lifetime License", "1 PC", "Quick Setup"],
        popular: false,
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop&q=80",
        badge: "Online",
      },
      {
        name: "Project Standard 2019",
        description: "Essential project management for 2019",
        price: "$26.99",
        originalPrice: "$679.99",
        features: ["Task Management", "Gantt Charts", "Lifetime License", "1 PC", "Reliable"],
        popular: false,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Project Professional 2016",
        description: "Proven project management software",
        price: "$28.99",
        originalPrice: "$1,029.99",
        features: ["Resource Management", "Portfolio Analysis", "Lifetime License", "1 PC", "Stable & Tested"],
        popular: false,
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80",
      },
    ],
    sql: [
      {
        name: "SQL Server 2022 Standard",
        description: "Enterprise database management system",
        price: "$89.99",
        originalPrice: "$3,717.00",
        features: ["Core-based Licensing", "Advanced Security", "High Availability", "Lifetime License", "Instant Delivery"],
        popular: true,
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "SQL Server 2022 Standard - Online Key",
        description: "Digital activation for SQL 2022",
        price: "$87.99",
        originalPrice: "$3,717.00",
        features: ["Online Activation", "Advanced Security", "High Availability", "Lifetime License", "Cloud Ready"],
        popular: false,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
        badge: "Online",
      },
      {
        name: "SQL Server 2019 Standard",
        description: "Proven database platform",
        price: "$84.99",
        originalPrice: "$3,717.00",
        features: ["Core-based Licensing", "Big Data Clusters", "Security Features", "Lifetime License", "Reliable"],
        popular: false,
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "SQL Server 2019 Standard - Online Key",
        description: "Online activation SQL 2019",
        price: "$82.99",
        originalPrice: "$3,717.00",
        features: ["Online Activation", "Big Data Support", "Security Features", "Lifetime License", "Quick Setup"],
        popular: false,
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop&q=80",
        badge: "Online",
      },
      {
        name: "SQL Server 2017 Standard",
        description: "Stable database solution",
        price: "$79.99",
        originalPrice: "$3,717.00",
        features: ["Core-based Licensing", "Graph Data", "Machine Learning", "Lifetime License", "Proven Stable"],
        popular: false,
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "SQL Server 2022 Enterprise",
        description: "Ultimate database platform for mission-critical workloads",
        price: "$149.99",
        originalPrice: "$14,256.00",
        features: ["Unlimited Cores", "In-Memory OLTP", "Advanced Analytics", "Lifetime License", "Enterprise Grade"],
        popular: false,
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "SQL Server 2019 Enterprise",
        description: "High-performance enterprise database",
        price: "$139.99",
        originalPrice: "$14,256.00",
        features: ["Unlimited Cores", "Big Data Clusters", "Advanced Security", "Lifetime License", "Mission Critical"],
        popular: false,
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "SQL Server 2016 Standard",
        description: "Reliable database for business applications",
        price: "$76.99",
        originalPrice: "$3,717.00",
        features: ["Core-based Licensing", "In-Memory Tables", "Always Encrypted", "Lifetime License", "Proven Platform"],
        popular: false,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
      },
    ],
    visualstudio: [
      {
        name: "Visual Studio 2022 Professional",
        description: "Professional IDE for developers",
        price: "$39.99",
        originalPrice: "$499.00",
        features: ["Lifetime License", "1 PC", "Advanced Debugging", "Code Refactoring", "Azure DevOps"],
        popular: true,
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Visual Studio 2022 Enterprise",
        description: "Complete toolset for enterprise teams",
        price: "$79.99",
        originalPrice: "$5,999.00",
        features: ["Lifetime License", "1 PC", "IntelliTrace", "Code Map", "Live Unit Testing"],
        popular: false,
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Visual Studio 2019 Professional",
        description: "Reliable IDE with proven stability",
        price: "$34.99",
        originalPrice: "$499.00",
        features: ["Lifetime License", "1 PC", "Multi-language Support", "Git Integration", "Team Collaboration"],
        popular: false,
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Visual Studio Code Extensions Pack",
        description: "Premium extensions bundle for VS Code",
        price: "$12.99",
        originalPrice: "$49.99",
        features: ["Premium Themes", "Advanced Debugging", "AI Assistance", "Cloud Sync", "Priority Support"],
        popular: false,
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Visual Studio 2019 Enterprise",
        description: "Full-featured enterprise IDE",
        price: "$74.99",
        originalPrice: "$5,999.00",
        features: ["Lifetime License", "1 PC", "IntelliTrace", "Code Map", "Architecture Tools"],
        popular: false,
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Visual Studio 2017 Professional",
        description: "Stable IDE for professional developers",
        price: "$32.99",
        originalPrice: "$499.00",
        features: ["Lifetime License", "1 PC", "Code Analysis", "Testing Tools", "Cross-platform Development"],
        popular: false,
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop&q=80",
      },
    ],
    antivirus: [
      {
        name: "Kaspersky Total Security",
        description: "Complete protection for all your devices",
        price: "$19.99",
        originalPrice: "$79.99",
        features: ["3 Devices", "1 Year", "Anti-virus & Anti-malware", "VPN Included", "Parental Controls"],
        popular: true,
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Norton 360 Deluxe",
        description: "Advanced security with privacy features",
        price: "$24.99",
        originalPrice: "$104.99",
        features: ["5 Devices", "1 Year", "50GB Cloud Backup", "VPN Unlimited", "Dark Web Monitoring"],
        popular: false,
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Bitdefender Total Security",
        description: "Award-winning antivirus protection",
        price: "$22.99",
        originalPrice: "$89.99",
        features: ["5 Devices", "1 Year", "Multi-layer Ransomware Protection", "VPN Included", "PC Optimization"],
        popular: false,
        image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "McAfee Total Protection",
        description: "Comprehensive security suite",
        price: "$21.99",
        originalPrice: "$84.99",
        features: ["Unlimited Devices", "1 Year", "Web Protection", "Password Manager", "Identity Theft Protection"],
        popular: false,
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "ESET Internet Security",
        description: "Fast and light antivirus protection",
        price: "$18.99",
        originalPrice: "$69.99",
        features: ["3 Devices", "1 Year", "Anti-Phishing", "Banking Protection", "Anti-Theft"],
        popular: false,
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Avast Premium Security",
        description: "Advanced threat detection and protection",
        price: "$17.99",
        originalPrice: "$69.99",
        features: ["10 Devices", "1 Year", "Ransomware Shield", "Firewall", "Sandbox Protection"],
        popular: false,
        image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=600&fit=crop&q=80",
      },
      {
        name: "Trend Micro Maximum Security",
        description: "Multi-device protection suite",
        price: "$23.99",
        originalPrice: "$89.95",
        features: ["5 Devices", "1 Year", "Pay Guard", "Folder Shield", "Social Media Privacy"],
        popular: false,
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop&q=80",
      },
    ],
  };

  return (
    <section className="pt-8 pb-16 bg-white" id="products">
      <div className="container mx-auto px-6">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-500"
              }`}
              style={activeCategory === category.id ? {
                boxShadow: '0 0 20px rgba(249, 115, 22, 0.6), 0 0 40px rgba(249, 115, 22, 0.4), 0 10px 30px rgba(0, 0, 0, 0.3)'
              } : {}}
            >
              <i className={`${category.icon} mr-2`}></i>
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {(activeCategory === "all" 
            ? Object.values(products).flat()
            : products[activeCategory]
          ).map((product, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 flex flex-col ${
                product.popular
                  ? "border-emerald-500 relative transform hover:scale-105"
                  : "border-gray-200 hover:border-emerald-300"
              }`}
            >
              {product.popular && (
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                  MOST POPULAR
                </div>
              )}

              {product.badge && (
                <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-bold shadow-md ${
                  product.badge === "Online" ? "bg-blue-500 text-white" :
                  product.badge === "Bind" ? "bg-purple-500 text-white" :
                  product.badge === "Phone" ? "bg-orange-500 text-white" :
                  "bg-gray-500 text-white"
                }`}>
                  {product.badge.toUpperCase()}
                </div>
              )}

              {/* Product Image */}
              <div className="relative h-56 w-full bg-gradient-to-br from-emerald-50 to-blue-50 overflow-hidden flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4 flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 h-14 line-clamp-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm h-10 line-clamp-2">{product.description}</p>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-emerald-600">{product.price}</span>
                    <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                  </div>
                  <div className="text-sm text-emerald-600 font-semibold mt-1">
                    Save {Math.round((1 - parseFloat(product.price.replace("$", "")) / parseFloat(product.originalPrice.replace(/[$,]/g, ""))) * 100)}%
                  </div>
                </div>

                <ul className="space-y-2 mb-6 h-32 overflow-hidden">
                  {product.features.slice(0, 5).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <i className="fas fa-check text-emerald-500 mt-1 flex-shrink-0"></i>
                      <span className="line-clamp-1">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedProduct(product);
                    setShowModal(true);
                  }}
                  className="w-full py-3 rounded-lg font-bold transition-all inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-md mt-auto"
                >
                  <i className="fas fa-shopping-cart mr-2"></i>
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-2xl font-black text-white mb-2">{selectedProduct.name}</h2>
                  <p className="text-emerald-50">{selectedProduct.description}</p>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="ml-4 text-white hover:text-emerald-100 transition-colors"
                >
                  <i className="fas fa-times text-2xl"></i>
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-6">
              {/* Product Image */}
              <div className="mb-6 relative h-48 w-full bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl overflow-hidden">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Price */}
              <div className="mb-6 bg-emerald-50 rounded-xl p-4 border-2 border-emerald-200">
                <div className="flex items-baseline gap-3 justify-center">
                  <span className="text-4xl font-black text-emerald-600">{selectedProduct.price}</span>
                  <span className="text-xl text-gray-400 line-through">{selectedProduct.originalPrice}</span>
                </div>
                <div className="text-center text-emerald-600 font-semibold mt-2">
                  Save {Math.round((1 - parseFloat(selectedProduct.price.replace("$", "")) / parseFloat(selectedProduct.originalPrice.replace(/[$,]/g, ""))) * 100)}%
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What's Included:</h3>
                <ul className="space-y-2">
                  {selectedProduct.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <i className="fas fa-check-circle text-emerald-500 mt-1 flex-shrink-0"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Choose Payment Method</h3>
                <div className="grid grid-cols-1 gap-3">
                  {/* PayPal Button */}
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-500 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <i className="fab fa-paypal text-white text-2xl"></i>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Pay with PayPal</p>
                        <p className="text-sm text-gray-600">Secure checkout • Buyer protection</p>
                      </div>
                    </div>
                    <a
                      href={`https://www.paypal.com/paypalme/yourusername/${selectedProduct.price.replace("$", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-bold hover:bg-blue-700 transition-all"
                    >
                      Pay ${selectedProduct.price} with PayPal
                    </a>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      After payment, email your PayPal transaction ID to get your key
                    </p>
                  </div>

                  {/* USDT */}
                  <a
                    href={`mailto:digitalkeyhubllc@gmail.com?subject=USDT Payment for ${selectedProduct.name}&body=Hi, I want to purchase ${selectedProduct.name} for ${selectedProduct.price} via USDT.`}
                    className="flex items-center justify-between p-4 bg-white border-2 border-green-500 rounded-xl hover:bg-green-50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <i className="fab fa-bitcoin text-green-600 text-2xl"></i>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Pay with USDT</p>
                        <p className="text-sm text-gray-600">Cryptocurrency payment</p>
                      </div>
                    </div>
                    <i className="fas fa-arrow-right text-green-500 group-hover:translate-x-1 transition-transform"></i>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/16019756129?text=Hi! I want to buy ${selectedProduct.name} for ${selectedProduct.price}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all group shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <i className="fab fa-whatsapp text-white text-2xl"></i>
                      </div>
                      <div>
                        <p className="font-bold text-white">Chat on WhatsApp</p>
                        <p className="text-sm text-emerald-100">Get instant support</p>
                      </div>
                    </div>
                    <i className="fas fa-arrow-right text-white group-hover:translate-x-1 transition-transform"></i>
                  </a>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <i className="fas fa-shield-check text-emerald-500"></i>
                  <span>100% Genuine</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <i className="fas fa-shipping-fast text-emerald-500"></i>
                  <span>Instant Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <i className="fas fa-headset text-emerald-500"></i>
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <i className="fas fa-undo text-emerald-500"></i>
                  <span>Money Back</span>
                </div>
              </div>

              {/* Product Description & Positivity */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <i className="fas fa-info-circle text-emerald-500"></i>
                    About This Product
                  </h4>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {selectedProduct.description}. This is a genuine Microsoft product that comes with full support and lifetime validity. 
                    Perfect for professionals, students, and businesses looking for reliable software solutions.
                  </p>
                  <div className="flex items-start gap-3 bg-white/70 rounded-lg p-4 border-l-4 border-emerald-500">
                    <i className="fas fa-check-circle text-emerald-500 text-xl mt-1"></i>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Why Choose Us?</p>
                      <p className="text-sm text-gray-600">
                        Join thousands of satisfied customers who trust us for authentic Microsoft licenses. 
                        We provide instant delivery, genuine product keys, and dedicated 24/7 support to ensure your complete satisfaction. 
                        Every purchase is backed by our money-back guarantee!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
