'use client'

import { cn } from '@/lib/utils'
import React from 'react'

interface InfiniteSliderProps {
    children: React.ReactNode
    gap?: number
    speed?: number
    className?: string
    reverse?: boolean
    direction?: "horizontal" | "vertical"
}

export const InfiniteSlider = ({
    children,
    gap = 20,
    speed = 40,
    className,
    reverse = false,
    direction = "horizontal",
}: InfiniteSliderProps) => {
    const isVertical = direction === "vertical"

    const containerMask = isVertical
        ? '[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]'
        : '[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]'

    const scrollClass = isVertical
        ? 'animate-scroll-vertical'
        : 'animate-scroll'

    const reverseScrollClass = isVertical
        ? 'animate-scroll-vertical [animation-direction:reverse]'
        : 'animate-scroll-reverse'

    return (
        <div className={cn(
            'overflow-hidden',
            isVertical ? 'flex flex-col h-full' : 'flex w-full',
            containerMask,
            className,
        )}>
            <div
                className={cn(
                    'shrink-0 gap-[var(--gap)] py-4',
                    isVertical
                        ? 'flex flex-col min-h-full items-center justify-around'
                        : 'flex min-w-full items-center justify-around',
                    reverse ? reverseScrollClass : scrollClass,
                )}
                style={{ '--gap': `${gap}px`, '--duration': `${speed}s` } as React.CSSProperties}
            >
                {children}
                {children}
            </div>
        </div>
    )
}
