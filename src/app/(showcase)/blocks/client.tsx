'use client'

import dynamic from 'next/dynamic'

const BlocksShowcase = dynamic(
  () => import('@/components/pages/showcase/BlocksShowcase').then(m => ({ default: m.BlocksShowcase })),
  { ssr: false }
)

export default function BlocksClient() {
  return <BlocksShowcase />
}
