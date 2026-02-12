'use client'

import dynamic from 'next/dynamic'

const LoginDotsLight = dynamic(
  () => import('@/components/pages/auth/VantaLoginPages').then(m => ({ default: m.LoginDotsLight })),
  { ssr: false }
)

export default function LoginDotsClient() {
  return <LoginDotsLight />
}
