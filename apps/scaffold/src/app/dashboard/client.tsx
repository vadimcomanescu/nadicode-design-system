'use client'

import dynamic from 'next/dynamic'

const DashboardPage = dynamic(
  () => import('@/components/pages/DashboardPage').then(m => ({ default: m.DashboardPage })),
  { ssr: false }
)

export default function DashboardClient() {
  return <DashboardPage />
}
