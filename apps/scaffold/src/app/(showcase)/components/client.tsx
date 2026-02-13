'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useToast } from '@/hooks/use-toast'

const ComponentsShowcase = dynamic(
  () => import('@/components/pages/showcase/ComponentsShowcase').then(m => ({ default: m.ComponentsShowcase })),
  { ssr: false }
)

export default function ComponentsClient() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [progress] = useState(13)
  return <ComponentsShowcase toast={toast} date={date} setDate={setDate} progress={progress} />
}
