"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { Post } from "@/lib/posts";

const PAGE_SIZE = 10;

function imagePath(image?: string) {
  if (!image) return null;
  if (image.startsWith("/") || image.startsWith("http://") || image.startsWith("https://")) return image;
  return image.startsWith("public/") ? `/${image.slice(7)}` : `/images/blog/${image}`;
}

export default function AllArticlesList({ posts }: { posts: Post[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <>
      <div className="divide-y divide-neutral-200">
        {visiblePosts.map((post) => {
          const image = imagePath(post.image);
          return (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group grid gap-6 py-8 md:grid-cols-[180px_1fr_auto] md:items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100">
                {image && <Image src={image} alt={post.title} fill sizes="180px" className="object-cover transition-transform duration-500 group-hover:scale-105" />}
              </div>
              <div>
                <h2 className="text-xl font-semibold transition-colors group-hover:text-neutral-500 md:text-2xl">{post.title}</h2>
                {post.subheading && <p className="mt-2 max-w-2xl leading-7 text-neutral-500">{post.subheading}</p>}
              </div>
              <p className="text-sm text-neutral-500">{post.date}</p>
            </Link>
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="group inline-flex items-center gap-3 rounded-full border border-neutral-900 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
          >
            See more articles
            <span className="transition-transform group-hover:translate-y-0.5">↓</span>
          </button>
        </div>
      )}
    </>
  );
}
