'use client'

import dynamic from 'next/dynamic'

const OnboardingPage = dynamic(
  () => import('@/components/pages/OnboardingPage').then(m => ({ default: m.OnboardingPage })),
  { ssr: false }
)

export default function OnboardingClient() {
  return <OnboardingPage />
}
