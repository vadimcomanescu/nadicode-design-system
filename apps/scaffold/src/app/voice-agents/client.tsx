'use client'

import dynamic from 'next/dynamic'

const VoiceAgentsPage = dynamic(
  () => import('@/components/pages/VoiceAgentsPage').then(m => ({ default: m.VoiceAgentsPage })),
  { ssr: false }
)

export default function VoiceAgentsClient() {
  return <VoiceAgentsPage />
}
