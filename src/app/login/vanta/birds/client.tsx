'use client'

import dynamic from 'next/dynamic'

const LoginBirdsDark = dynamic(
  () => import('@/components/pages/auth/VantaLoginPages').then(m => ({ default: m.LoginBirdsDark })),
  { ssr: false }
)

export default function LoginBirdsClient() {
  return <LoginBirdsDark />
}
