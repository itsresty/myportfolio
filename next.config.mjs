// next.config.mjs
import createMDX from '@next/mdx'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL

const supabaseStoragePattern = (() => {
  if (!supabaseUrl) return []

  try {
    const url = new URL(supabaseUrl)

    return [
      {
        protocol: url.protocol.replace(':', ''),
        hostname: url.hostname,
        port: url.port,
        pathname: '/storage/v1/object/public/portfolio/**',
      },
    ]
  } catch {
    return []
  }
})()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
  images: {
    // Storage URLs are generated from the Supabase project configured for
    // this deployment, so previews work on Vercel and every environment.
    remotePatterns: supabaseStoragePattern,
  },
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
})

export default withMDX(nextConfig)
