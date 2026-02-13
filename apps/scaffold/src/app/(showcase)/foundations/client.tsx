'use client'

import dynamic from 'next/dynamic'

const FoundationsShowcase = dynamic(
  () => import('@/components/pages/showcase/FoundationsShowcase').then(m => ({ default: m.FoundationsShowcase })),
  { ssr: false }
)

export default function FoundationsClient({ progress }: { progress: number }) {
  return <FoundationsShowcase progress={progress} />
}
