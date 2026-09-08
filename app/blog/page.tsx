"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar";
import Footer from "../components/Footer";
import Link from "next/link";

const blogPosts = [
  // Latest Microsoft Software Articles - September 2026
  {
    slug: "how-to-activate-windows-11",
    title: "How to Activate Windows 11 Pro: Complete Step-by-Step Guide 2026",
    excerpt: "Learn how to activate Windows 11 Pro with product key. Complete guide with troubleshooting and phone activation method. Works 100%.",
    category: "Activation",
    readTime: "8 min",
    date: "Sep 2, 2026",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
  },
  {
    slug: "windows-11-home-vs-pro",
    title: "Windows 11 Home vs Pro: Which Should You Buy in 2026?",
    excerpt: "Complete comparison of Windows 11 Home vs Pro. Features, pricing, performance, and security differences explained. Make the right choice.",
    category: "Comparison",
    readTime: "12 min",
    date: "Sep 2, 2026",
    image: "https://images.unsplash.com/photo-1629654291663-b91ad427698f?w=800&q=80",
  },
  {
    slug: "windows-11-vs-windows-10-comparison",
    title: "Windows 11 vs Windows 10: Complete Comparison 2026",
    excerpt: "Windows 11 vs Windows 10 comparison - performance, features, gaming, and security. Should you upgrade? Complete guide with benchmarks.",
    category: "Comparison",
    readTime: "15 min",
    date: "Sep 1, 2026",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
  },
  {
    slug: "oem-vs-retail-windows-keys",
    title: "OEM vs Retail Windows Keys: What's the Difference?",
    excerpt: "Complete comparison of OEM and Retail Windows keys. Pricing, transferability, support, and legality explained. Which should you buy?",
    category: "Guide",
    readTime: "12 min",
    date: "Aug 30, 2026",
    image: "https://images.unsplash.com/photo-1629654291663-b91ad427698f?w=800&q=80",
  },
  {
    slug: "is-buying-windows-keys-legal",
    title: "Is Buying Cheap Windows Keys Legal? The Complete Truth",
    excerpt: "Are cheap Windows keys legal? Complete legal analysis of buying discounted Windows licenses, EU court ruling, and how to avoid scams.",
    category: "Legal",
    readTime: "14 min",
    date: "Aug 28, 2026",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
  },
  {
    slug: "cheap-windows-keys-safe",
    title: "Are Cheap Windows Keys Safe? Complete Security Guide 2026",
    excerpt: "Are cheap Windows keys safe? Security analysis, scam detection, and how to buy Windows keys safely. Complete buyer protection guide.",
    category: "Security",
    readTime: "12 min",
    date: "Aug 25, 2026",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
  },
  {
    slug: "office-2021-vs-office-365",
    title: "Office 2021 vs Office 365: Which Should You Buy in 2026?",
    excerpt: "Office 2021 vs Office 365 comparison - pricing, features, updates, and value. One-time purchase vs subscription explained.",
    category: "Comparison",
    readTime: "13 min",
    date: "Aug 22, 2026",
    image: "https://images.unsplash.com/photo-1631624208977-82b02f4f2f3d?w=800&q=80",
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const categories = ["All", "Activation", "Comparison", "Guide", "Legal", "Security"];
  
  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);
  
  return (
    <>
      <Navbar />
      <CategoryBar />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-10">
            <nav className="text-sm text-gray-600 mb-4">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-semibold">Blog & Guides</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Microsoft Guide: Windows, Office & Software
            </h1>
            <p className="text-gray-600 text-base max-w-3xl">
              Expert guides, activation tutorials, and everything you need to know about Microsoft software licensing.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600 hover:text-blue-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <Link 
                key={index} 
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-600 hover:shadow-xl transition-all duration-300"
              >
                {/* Thumbnail Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-bold uppercase shadow-md">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <i className="far fa-calendar"></i>
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="far fa-clock"></i>
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                    Read article
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <i className="fas fa-search text-gray-300 text-5xl mb-4"></i>
              <p className="text-gray-600 text-lg">No articles found in this category.</p>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Help with Activation?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Our support team is available 24/7 to help you with Windows and Office activation, installation, and any technical questions.
            </p>
            <a
              href="https://wa.me/16019756129"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all"
            >
              <i className="fab fa-whatsapp text-xl"></i>
              Contact Support
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
