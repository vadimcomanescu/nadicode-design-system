'use client'

import dynamic from 'next/dynamic'

const LoginCellsLight = dynamic(
  () => import('@/components/pages/auth/VantaLoginPages').then(m => ({ default: m.LoginCellsLight })),
  { ssr: false }
)

export default function LoginCellsClient() {
  return <LoginCellsLight />
}
