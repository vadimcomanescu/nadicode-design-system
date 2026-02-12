'use client'

import dynamic from 'next/dynamic'

const LoginTopologyDark = dynamic(
  () => import('@/components/pages/auth/VantaLoginPages').then(m => ({ default: m.LoginTopologyDark })),
  { ssr: false }
)

export default function LoginTopologyClient() {
  return <LoginTopologyDark />
}
