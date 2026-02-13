'use client'

import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { ComponentsShowcase } from '@/components/pages/showcase/ComponentsShowcase'

export default function ComponentsClient() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [progress] = useState(13)
  return <ComponentsShowcase toast={toast} date={date} setDate={setDate} progress={progress} />
}
