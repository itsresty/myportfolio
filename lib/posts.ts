import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export type Post = {
  slug: string
  title: string
  subheading?: string
  author?: string
  date: string
  image?: string
  codePreview?: string
  codeLang?: string
}

export function getAllPosts(): Post[] {
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => /\.(md|mdx)$/.test(file))

  const posts = files.map((file) => {
    const filePath = path.join(BLOG_DIR, file)
    const source = fs.readFileSync(filePath, 'utf8')

    const { data } = matter(source)

    const slug = file.replace(/\.(md|mdx)$/, '')

    return {
      slug,
      ...data,
    } as Post
  })

  return posts.sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  )
}

export function getRecentPosts(count = 3): Post[] {
  return getAllPosts().slice(0, count)
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => /\.(md|mdx)$/.test(file))
    .map((file) => file.replace(/\.(md|mdx)$/, ''))
}