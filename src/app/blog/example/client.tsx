'use client'

import dynamic from 'next/dynamic'

const BlogPostPage = dynamic(
  () => import('@/components/pages/BlogPostPage').then(m => ({ default: m.BlogPostPage })),
  { ssr: false }
)

export default function BlogPostClient() {
  return <BlogPostPage />
}
