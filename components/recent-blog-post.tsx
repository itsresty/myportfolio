
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getRecentPosts } from "@/lib/posts";
import PostCard from "@/components/blogs-post-card";

export default function RecentBlog() {
  // Fetch the 3 newest published articles
  const recentPosts = getRecentPosts(3);

  return (
    <section className="w-full border-t border-neutral-200 py-20 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
              Blog
            </p>

            <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
              Recent articles
            </h2>
          </div>


          {/* =================================================
              DESKTOP VIEW ALL
          ================================================== */}

          <Link
            href="/blog"
            className="group hidden items-center gap-2 text-sm font-medium md:flex"
          >
            <span>View all articles</span>

            <ArrowUpRight
              size={15}
              strokeWidth={1.7}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>


        {/* =====================================================
            RECENT POSTS
        ====================================================== */}

        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {recentPosts.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
              />
            ))}
          </div>
        ) : (
          <div className="border-t border-neutral-200 py-8">
            <p className="text-sm text-neutral-500">
              New articles coming soon.
            </p>
          </div>
        )}


        {/* =====================================================
            MOBILE VIEW ALL
        ====================================================== */}

        <Link
          href="/blog"
          className="group mt-8 inline-flex items-center gap-2 text-sm font-medium md:hidden"
        >
          <span>View all articles</span>

          <ArrowUpRight
            size={15}
            strokeWidth={1.7}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>

      </div>
    </section>
  );
}

