'use client'

import dynamic from 'next/dynamic'

const PatternsPage = dynamic(
  () => import('@/components/pages/PatternsPage').then(m => ({ default: m.PatternsPage })),
  { ssr: false }
)

export default function PatternsClient() {
  return <PatternsPage />
}
