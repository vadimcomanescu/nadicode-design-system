'use client'

import { NotFoundBlock } from "../blocks/NotFoundBlock"
import { MeteorShower } from "../ui/MeteorShower"

export function NotFoundPage() {
  return (
    <div className="relative min-h-dvh bg-background">
      <MeteorShower className="fixed inset-0 pointer-events-none" />
      <div className="relative z-10 flex min-h-dvh items-center justify-center">
        <NotFoundBlock />
      </div>
    </div>
  )
}
