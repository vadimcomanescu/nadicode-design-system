'use client'

import dynamic from 'next/dynamic'

const ChangelogPage = dynamic(
  () => import('@/components/pages/ChangelogPage').then(m => ({ default: m.ChangelogPage })),
  { ssr: false }
)

export default function ChangelogClient() {
  return <ChangelogPage />
}
