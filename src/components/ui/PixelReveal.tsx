import React, { useEffect, useState } from "react"
import { cn } from "../../lib/utils"

interface PixelRevealProps {
    text: string | number
    className?: string
    duration?: number
    delay?: number
    as?: React.ElementType
}

const PIXEL_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"

export function PixelReveal({
    text,
    className,
    duration = 3000, // Slower for visibility
    delay = 0,
    as: Component = "span",
}: PixelRevealProps) {
    const [displayText, setDisplayText] = useState("")
    const [isComplete, setIsComplete] = useState(false)
    const [trigger, setTrigger] = useState(0) // Used to re-trigger animation

    const replay = () => setTrigger(prev => prev + 1)

    // Keep track of the target text, handling both strings and numbers
    const targetText = text.toString()

    useEffect(() => {
        let startTime: number | null = null
        let animationFrameId: number

        // Reset state when text changes
        setIsComplete(false)

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const elapsed = timestamp - startTime

            // Handle delay
            if (elapsed < delay) {
                animationFrameId = requestAnimationFrame(animate)
                return
            }

            const progress = Math.min((elapsed - delay) / duration, 1)

            // Calculate how many characters should be "revealed" (settled)
            const revealIndex = Math.floor(progress * targetText.length)

            let nextText = ""

            for (let i = 0; i < targetText.length; i++) {
                if (i < revealIndex) {
                    // Character is settled
                    nextText += targetText[i]
                } else {
                    // Character is animating/scrambled
                    // Use pixel grid chars for a "decoding" look, or random alphanumeric
                    const randomChar = PIXEL_CHARS[Math.floor(Math.random() * PIXEL_CHARS.length)]
                    nextText += randomChar
                }
            }

            setDisplayText(nextText)

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate)
            } else {
                setIsComplete(true)
            }
        }

        animationFrameId = requestAnimationFrame(animate)

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId)
        }
    }, [text, duration, delay, targetText, trigger])

    return (
        <Component
            className={cn(
                // While animating, strictly use the pixel font
                !isComplete ? "font-pixel text-primary/70" : "",
                className
            )}
            onMouseEnter={replay}
        >
            {displayText}
        </Component>
    )
}
