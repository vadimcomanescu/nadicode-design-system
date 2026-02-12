'use client'

import dynamic from 'next/dynamic'

const LandingPage = dynamic(
  () => import('@/components/pages/LandingPage').then(m => ({ default: m.LandingPage })),
  { ssr: false }
)

export default function LandingClient() {
  return <LandingPage />
}
