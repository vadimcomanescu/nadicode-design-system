'use client'

import dynamic from 'next/dynamic'

const IconsPage = dynamic(
  () => import('@/components/pages/IconsPage').then(m => ({ default: m.IconsPage })),
  { ssr: false }
)

export default function IconsClient() {
  return <IconsPage />
}
