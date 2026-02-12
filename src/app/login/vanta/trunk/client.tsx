'use client'

import dynamic from 'next/dynamic'

const LoginTrunkLight = dynamic(
  () => import('@/components/pages/auth/VantaLoginPages').then(m => ({ default: m.LoginTrunkLight })),
  { ssr: false }
)

export default function LoginTrunkClient() {
  return <LoginTrunkLight />
}
