'use client'

import dynamic from 'next/dynamic'

const LoginNetDark = dynamic(
  () => import('@/components/pages/auth/VantaLoginPages').then(m => ({ default: m.LoginNetDark })),
  { ssr: false }
)

export default function LoginNetClient() {
  return <LoginNetDark />
}
