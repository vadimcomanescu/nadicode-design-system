'use client'

import { FoundationsShowcase } from '@/components/pages/showcase/FoundationsShowcase'

export default function FoundationsClient({ progress }: { progress: number }) {
  return <FoundationsShowcase progress={progress} />
}
