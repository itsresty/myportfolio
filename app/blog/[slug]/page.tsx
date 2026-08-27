import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getAllSlugs } from "@/lib/posts";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({
    slug,
  }));
}

async function loadPost(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf8");
  const { data } = matter(source);

  try {
    const mod = await import(`@/content/blog/${slug}.mdx`);

    return {
      Content: mod.default,
      metadata: data,
    };
  } catch (error) {
    console.error("Error loading MDX:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await loadPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.metadata.title,
    description: post.metadata.subheading,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await loadPost(slug);

  if (!post) {
    notFound();
  }

  const { Content, metadata } = post;

  return (
    <main className="mainpage w-full">
      <article>

        {/* =====================================================
            BACK TO BLOG
        ====================================================== */}

        <div className="mx-auto w-full max-w-5xl px-6 pt-10 md:pt-14">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-black"
          >
            <ArrowLeft
              size={15}
              strokeWidth={1.7}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to blog
          </Link>
        </div>


        {/* =====================================================
            HERO IMAGE
        ====================================================== */}

        {metadata?.image && (
          <div className="mx-auto mt-10 w-full max-w-4xl px-6 md:mt-14">
            <div className="relative aspect-[16/7] w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 md:rounded-2xl">
              <Image
                src={metadata.image}
                alt={metadata.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          </div>
        )}


        {/* =====================================================
            ARTICLE HEADER
        ====================================================== */}

        <header className="mx-auto w-full max-w-3xl px-6 pt-10 md:pt-14">

          {/* Title */}

          <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.045em] md:text-6xl">
            {metadata.title}
          </h1>


          {/* Subheading */}

          {metadata.subheading && (
            <p className="mt-6 text-lg leading-8 text-neutral-500 md:text-xl">
              {metadata.subheading}
            </p>
          )}


          {/* Author + Date */}

          <div className="mt-8 flex items-center gap-4 border-y border-neutral-200 py-5">

            {/* Avatar */}

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
              RM
            </div>


            <div className="flex flex-col gap-1">

              <p className="text-sm font-medium text-neutral-900">
                {metadata.author || "Resty Montero"}
              </p>

              {metadata.date && (
                <p className="text-xs text-neutral-400">
                  {metadata.date}
                </p>
              )}

            </div>

          </div>

        </header>


        {/* =====================================================
            ARTICLE CONTENT
        ====================================================== */}

        <div className="mx-auto w-full max-w-3xl px-6 pb-24 pt-12 md:pb-32 md:pt-16">

          <div
            className="
              prose
              prose-neutral
              max-w-none

              /* Headings */

              prose-headings:font-semibold
              prose-headings:tracking-[-0.035em]
              prose-headings:text-neutral-900

              prose-h1:mb-8
              prose-h1:text-4xl
              prose-h1:leading-tight

              prose-h2:mb-5
              prose-h2:mt-16
              prose-h2:text-3xl
              prose-h2:leading-tight

              prose-h3:mb-4
              prose-h3:mt-12
              prose-h3:text-xl
              prose-h3:leading-tight

              /* Paragraphs */

              prose-p:my-6
              prose-p:text-[16px]
              prose-p:leading-[1.9]
              prose-p:text-neutral-600

              /* Links */

              prose-a:font-medium
              prose-a:text-black
              prose-a:underline
              prose-a:underline-offset-4

              /* Bold */

              prose-strong:font-semibold
              prose-strong:text-neutral-900

              /* Lists */

              prose-ul:my-7
              prose-ol:my-7

              prose-li:my-2
              prose-li:leading-8
              prose-li:text-neutral-600

              /* Blockquote */

              prose-blockquote:my-10
              prose-blockquote:border-l-2
              prose-blockquote:border-neutral-300
              prose-blockquote:pl-6
              prose-blockquote:font-normal
              prose-blockquote:italic
              prose-blockquote:text-neutral-500

              /* Inline Code */

              prose-code:rounded
              prose-code:bg-neutral-100
              prose-code:px-1.5
              prose-code:py-0.5
              prose-code:text-sm
              prose-code:text-neutral-800

              /* Code Block */

              prose-pre:my-10
              prose-pre:overflow-x-auto
              prose-pre:rounded-xl
              prose-pre:border
              prose-pre:border-neutral-200
              prose-pre:bg-neutral-950
              prose-pre:p-5

              /* Images inside article */

              prose-img:my-10
              prose-img:rounded-xl
              prose-img:border
              prose-img:border-neutral-200
            "
          >
            <Content />
          </div>

        </div>

      </article>
    </main>
  );
}