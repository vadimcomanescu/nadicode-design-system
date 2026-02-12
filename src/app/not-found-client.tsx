'use client'

import { useEffect, useState } from 'react'

export default function NotFoundClient() {
  const [Component, setComponent] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    import('@/components/pages/NotFoundPage').then(m => {
      setComponent(() => m.NotFoundPage)
    })
  }, [])

  if (!Component) return null
  return <Component />
}
