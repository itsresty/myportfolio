import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Post = {
  slug: string;
  title: string;
  date: string;
};

export default function BlogPostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block"
    >
      <article className="border-t border-neutral-200 pt-5">

        {/* Top */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
            Article
          </span>

          <ArrowUpRight
            size={16}
            strokeWidth={1.7}
            className="text-neutral-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black"
          />
        </div>

        {/* Title */}
        <h3 className="mt-7 text-xl font-semibold leading-snug tracking-[-0.025em] transition-colors duration-300 group-hover:text-neutral-500 md:text-2xl">
          {post.title}
        </h3>

        {/* Date */}
        <p className="mt-5 text-xs uppercase tracking-[0.12em] text-neutral-400">
          {post.date}
        </p>

        {/* Hover line */}
        <div className="mt-8 h-px w-0 bg-black transition-all duration-500 group-hover:w-full" />

      </article>
    </Link>
  );
}