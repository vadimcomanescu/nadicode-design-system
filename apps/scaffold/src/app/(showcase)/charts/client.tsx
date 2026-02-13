'use client'

import dynamic from 'next/dynamic'

const ChartsShowcase = dynamic(
  () => import('@/components/pages/showcase/ChartsShowcase').then(m => ({ default: m.ChartsShowcase })),
  { ssr: false }
)

export default function ChartsClient() {
  return <ChartsShowcase />
}
