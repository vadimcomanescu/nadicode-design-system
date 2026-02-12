'use client'

import dynamic from 'next/dynamic'

const PricingPage = dynamic(
  () => import('@/components/pages/PricingPage').then(m => ({ default: m.PricingPage })),
  { ssr: false }
)

export default function PricingClient() {
  return <PricingPage />
}
