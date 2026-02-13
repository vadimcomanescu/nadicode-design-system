'use client'

import dynamic from 'next/dynamic'

const VantaLoginPage = dynamic(
  () => import('@/components/pages/auth/VantaLoginPages').then(m => ({ default: m.VantaLoginPage })),
  { ssr: false }
)

export default function LoginNetClient() {
  return <VantaLoginPage effect="net" />
}
