import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar";
import Footer from "../components/Footer";
import Link from "next/link";
import BlogList from "./BlogList";
import { getAllBlogListItems } from "../lib/blog-mdx";

export default function BlogPage() {
  // Hand-written .tsx articles + published auto-generated MDX articles, newest first.
  const posts = getAllBlogListItems();

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

          <BlogList posts={posts} />

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
