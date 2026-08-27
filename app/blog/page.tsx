
import Link from "next/link"
import { getAllPosts } from "@/lib/posts"

export default async function BlogIndex() {
  const posts = await getAllPosts()

  const featuredPost = posts[0]
  const secondaryPosts = posts.slice(1, 4)
  const remainingPosts = posts.slice(4)

  return (
    <main className="mainpage">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-[100px] md:py-24">

        {/* Header */}
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


        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-24">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block"
            >
              <article className="grid overflow-hidden rounded-3xl bg-neutral-100 md:grid-cols-2">

                {/* Image */}
                <div className="aspect-[4/3] bg-neutral-200 transition-transform duration-500 group-hover:scale-[1.02] md:aspect-auto">
                  {/* Add your post image here */}
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


        {/* Featured Articles */}
        {secondaryPosts.length > 0 && (
          <section className="mb-24">

            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                  Featured
                </p>

                <h2 className="text-3xl font-bold md:text-4xl">
                  More to explore
                </h2>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {secondaryPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <article>

                    {/* Image */}
                    <div className="mb-6 aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
                      <div className="h-full w-full bg-neutral-200 transition-transform duration-500 group-hover:scale-105" />
                    </div>

                    <p className="mb-3 text-sm text-neutral-500">
                      {post.date}
                    </p>

                    <h3 className="text-2xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-neutral-500">
                      {post.title}
                    </h3>

                    {post.subheading && (
                      <p className="mt-3 line-clamp-3 leading-7 text-neutral-500">
                        {post.subheading}
                      </p>
                    )}

                    <div className="mt-5 text-sm font-semibold">
                      Read article →
                    </div>

                  </article>
                </Link>
              ))}
            </div>

          </section>
        )}


        {/* All Articles */}
        <section>

          <div className="mb-10 border-b border-neutral-200 pb-8">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
              The Library
            </p>

            <h2 className="text-3xl font-bold md:text-4xl">
              All articles
            </h2>
          </div>

          <div className="divide-y divide-neutral-200">
            {remainingPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="grid gap-4 py-8 md:grid-cols-[1fr_160px]">

                  <div>
                    <h3 className="text-xl font-semibold transition-colors group-hover:text-neutral-500 md:text-2xl">
                      {post.title}
                    </h3>

                    {post.subheading && (
                      <p className="mt-2 max-w-2xl leading-7 text-neutral-500">
                        {post.subheading}
                      </p>
                    )}
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-sm text-neutral-500">
                      {post.date}
                    </p>
                  </div>

                </article>
              </Link>
            ))}
          </div>

        </section>

      </div>
    </main>
  )
}

