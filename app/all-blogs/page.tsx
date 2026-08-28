import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import AllArticlesList from "@/components/all-articles-list";

export default async function AllBlogsPage() {
  const posts = await getAllPosts();
  return (
    <main className="mainpage">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-[100px] md:py-24">
        <Link href="/blog" className="text-sm font-medium text-neutral-500 hover:text-black">← Back to blog</Link>
        <header className="mb-12 mt-8 border-b border-neutral-200 pb-8"><p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">The library</p><h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">All articles</h1></header>
        <AllArticlesList posts={posts} />
      </div>
    </main>
  );
}
