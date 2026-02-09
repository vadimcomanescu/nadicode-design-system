import { cn } from '@/lib/utils'


interface ProgressiveBlurProps {
    className?: string
    direction?: 'left' | 'right' | 'top' | 'bottom'
    blurIntensity?: number
}

export const ProgressiveBlur = ({
    className,
    direction = 'left',
    blurIntensity = 1,
}: ProgressiveBlurProps) => {
    return (
        <div
            className={cn(
                'pointer-events-none absolute z-10',
                className
            )}
            style={{
                background: `linear-gradient(to ${direction}, transparent, hsl(var(--background)))`,
                backdropFilter: `blur(${blurIntensity * 4}px)`,
            }}
        />
    )
}
