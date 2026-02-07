import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface VantaWrapperProps {
    children: React.ReactNode
    effect: (props: any) => any // The specific Vanta effect function
    config?: any // Configuration object for the effect
    className?: string
}

export function VantaWrapper({ children, effect, config, className }: VantaWrapperProps) {
    const vantaRef = useRef<HTMLDivElement>(null)
    const [vantaEffect, setVantaEffect] = useState<any>(null)

    useEffect(() => {
        if (!vantaEffect && vantaRef.current && effect) {
            try {
                // Vanta requires THREE to be on window
                if (typeof window !== 'undefined' && !(window as any).THREE) {
                    (window as any).THREE = THREE;
                }

                const instance = effect({
                    el: vantaRef.current,
                    THREE: THREE, // Pass THREE instance explicitly
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    ...config
                })
                setVantaEffect(instance)
            } catch (error) {
                console.error("Failed to initialize Vanta effect:", error)
            }
        }

        return () => {
            if (vantaEffect) {
                vantaEffect.destroy()
                setVantaEffect(null)
            }
        }
    }, [effect, config])

    return (
        <div ref={vantaRef} className={`relative w-full h-screen overflow-hidden ${className}`}>
            <div className="relative z-10 w-full h-full pointer-events-none">
                {/* Content container - pointer events re-enabled for interactive children */}
                <div className="w-full h-full pointer-events-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}
