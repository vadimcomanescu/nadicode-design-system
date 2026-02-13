'use client'

import dynamic from 'next/dynamic'

const PagesShowcase = dynamic(
  () => import('@/components/pages/showcase/PagesShowcase').then(m => ({ default: m.PagesShowcase })),
  { ssr: false }
)

export default function PagesClient() {
  return <PagesShowcase />
}
