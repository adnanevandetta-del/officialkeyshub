"use client";

import { useState } from "react";
import Link from "next/link";
import type { BlogListItem } from "../lib/blog-static";

export default function BlogList({ posts }: { posts: BlogListItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts =
    selectedCategory === "All" ? posts : posts.filter((post) => post.category === selectedCategory);

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-300 hover:border-blue-600 hover:text-blue-600"
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
              <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>

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
    </>
  );
}
