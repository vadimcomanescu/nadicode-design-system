'use client'

import dynamic from 'next/dynamic'

const LoginGlobeDark = dynamic(
  () => import('@/components/pages/auth/VantaLoginPages').then(m => ({ default: m.LoginGlobeDark })),
  { ssr: false }
)

export default function LoginGlobeClient() {
  return <LoginGlobeDark />
}
