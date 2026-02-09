import { cn } from '@/lib/utils'
import React from 'react'

interface InfiniteSliderProps {
    children: React.ReactNode
    gap?: number
    speed?: number
    className?: string
    reverse?: boolean
}

export const InfiniteSlider = ({
    children,
    gap = 20,
    speed = 40,
    className,
    reverse = false,
}: InfiniteSliderProps) => {
    return (
        <div className={cn('flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]', className)}>
            <div
                className={cn('flex min-w-full shrink-0 items-center justify-around gap-[var(--gap)] py-4 animate-scroll', reverse && 'animate-scroll-reverse')}
                style={{ '--gap': `${gap}px`, '--duration': `${speed}s` } as React.CSSProperties}
            >
                {children}
                {children}
            </div>
        </div>
    )
}
