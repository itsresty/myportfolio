
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";

function getImagePath(image?: string) {
  if (!image) return null;

  const value = image.trim();

  if (!value) return null;

  // Already a public URL/path
  if (
    value.startsWith("/") ||
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }

  // If someone accidentally saved "public/..."
  if (value.startsWith("public/")) {
    return `/${value.slice(7)}`;
  }

  // Otherwise assume it belongs in /images/blog/
  return `/images/blog/${value}`;
}

export default async function BlogIndex() {
  const posts = await getAllPosts();
  const articles = posts.slice(0, 5);

  const featuredPost = posts[0];
  const secondaryPosts = posts.slice(1, 4);

  return (
    <main className="mainpage">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-[100px] md:py-24">

        {/* =====================================================
            BLOG HEADER
        ====================================================== */}

        <header className="mb-16">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Blog Post
          </p>

          <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
            Ideas, insights & inspiration.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-500">
            Thoughts, stories, and useful ideas to help you learn,
            create, and grow.
          </p>
        </header>


        {/* =====================================================
            FEATURED POST
        ====================================================== */}

        {featuredPost && (
          <section className="mb-24">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block"
            >
              <article className="grid overflow-hidden rounded-3xl bg-neutral-100 md:grid-cols-2">

                {/* Image */}

                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200 md:aspect-auto">
                  {getImagePath(featuredPost.image) ? (
                    <Image
                      src={getImagePath(featuredPost.image)!}
                      alt={featuredPost.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full min-h-[300px] w-full items-center justify-center bg-neutral-200">
                      <span className="text-sm text-neutral-400">
                        No image
                      </span>
                    </div>
                  )}
                </div>


                {/* Content */}

                <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">

                  <p className="mb-4 text-sm font-medium uppercase tracking-wider text-neutral-500">
                    Featured Article
                  </p>

                  <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                    {featuredPost.title}
                  </h2>

                  {featuredPost.subheading && (
                    <p className="mt-5 text-lg leading-8 text-neutral-500">
                      {featuredPost.subheading}
                    </p>
                  )}

                  <p className="mt-8 text-sm text-neutral-500">
                    {featuredPost.date}
                  </p>

                  <span className="mt-8 inline-flex items-center text-sm font-semibold">
                    Read article

                    <span className="ml-2 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>

                </div>

              </article>
            </Link>
          </section>
        )}


        {/* =====================================================
            MORE TO EXPLORE
        ====================================================== */}

        {secondaryPosts.length > 0 && (
          <section className="mb-24">

            <div className="mb-10">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                Featured
              </p>

              <h2 className="text-3xl font-bold md:text-4xl">
                More to explore
              </h2>
            </div>


            <div className="grid gap-8 md:grid-cols-3">

              {secondaryPosts.map((post) => {
                const imagePath = getImagePath(post.image);

                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group"
                  >
                    <article>

                      {/* Image */}

                      <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">

                        {imagePath ? (
                          <Image
                            src={imagePath}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-neutral-200">
                            <span className="text-sm text-neutral-400">
                              No image
                            </span>
                          </div>
                        )}

                      </div>


                      {/* Date */}

                      <p className="mb-3 text-sm text-neutral-500">
                        {post.date}
                      </p>


                      {/* Title */}

                      <h3 className="text-2xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-neutral-500">
                        {post.title}
                      </h3>


                      {/* Excerpt */}

                      {post.subheading && (
                        <p className="mt-3 line-clamp-3 leading-7 text-neutral-500">
                          {post.subheading}
                        </p>
                      )}


                      {/* Read */}

                      <div className="mt-5 text-sm font-semibold">
                        Read article →
                      </div>

                    </article>
                  </Link>
                );
              })}

            </div>

          </section>
        )}


        {/* =====================================================
            ALL ARTICLES
            SHOW EVERY ARTICLE
        ====================================================== */}

        <section>

          <div className="mb-10 border-b border-neutral-200 pb-8">

            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
              The Library
            </p>

            <h2 className="text-3xl font-bold md:text-4xl">
              All articles
            </h2>

            <p className="mt-3 text-neutral-500">
              Browse all of my latest articles, ideas, and insights.
            </p>

          </div>


          {/* =================================================
              ALL POSTS
          ================================================== */}

          {posts.length > 0 ? (

            <div className="divide-y divide-neutral-200">

              {articles.map((post) => {
                const imagePath = getImagePath(post.image);

                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >

                    <article className="grid gap-6 py-8 md:grid-cols-[180px_1fr_auto] md:items-center">

                      {/* Thumbnail */}

                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100">

                        {imagePath ? (
                          <Image
                            src={imagePath}
                            alt={post.title}
                            fill
                            sizes="180px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-neutral-200">
                            <span className="text-xs text-neutral-400">
                              No image
                            </span>
                          </div>
                        )}

                      </div>


                      {/* Content */}

                      <div>

                        <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-neutral-500 md:text-2xl">
                          {post.title}
                        </h3>

                        {post.subheading && (
                          <p className="mt-2 max-w-2xl leading-7 text-neutral-500">
                            {post.subheading}
                          </p>
                        )}

                      </div>


                      {/* Date */}

                      <div className="text-left md:text-right">

                        <p className="text-sm text-neutral-500">
                          {post.date}
                        </p>

                        <p className="mt-2 text-sm font-semibold opacity-0 transition-opacity group-hover:opacity-100">
                          Read →
                        </p>

                      </div>

                    </article>

                  </Link>
                );
              })}

            </div>

          ) : (

            <div className="rounded-2xl border border-neutral-200 py-16 text-center">

              <p className="text-sm text-neutral-500">
                No articles yet.
              </p>

            </div>

          )}

          {posts.length > 0 && (
            <div className="mt-10 flex flex-col gap-5 border-t border-neutral-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  Want to keep reading?
                </p>
                <p className="mt-1 text-sm text-neutral-500">
                  Explore all {posts.length} articles, stories, and insights.
                </p>
              </div>
              <Link
                href="/blog/all-articles"
                className="group inline-flex w-fit items-center gap-3 rounded-full border border-neutral-900 bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-neutral-900"
              >
                View all articles
                <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          )}

        </section>

      </div>
    </main>
  );
}
