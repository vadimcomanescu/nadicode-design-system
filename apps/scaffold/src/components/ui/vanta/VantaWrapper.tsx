'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface VantaWrapperProps {
    children: React.ReactNode
    effectImporter: () => Promise<Record<string, unknown>>
    config?: Record<string, unknown>
    className?: string
}

export function VantaWrapper({ children, effectImporter, config, className }: VantaWrapperProps) {
    const vantaRef = useRef<HTMLDivElement>(null)
    const effectRef = useRef<{ destroy: () => void } | null>(null)

    useEffect(() => {
        let instance: { destroy: () => void } | null = null;
        let isMounted = true;

        const initVanta = async () => {
            if (!vantaRef.current) return;

            try {
                // Vanta requires THREE to be on window
                if (typeof window !== 'undefined' && !(window as unknown as Record<string, unknown>).THREE) {
                    (window as unknown as Record<string, unknown>).THREE = THREE;
                }

                // Dynamically import the effect
                const vantaModule = await effectImporter();
                const effectRequest = (vantaModule.default || vantaModule) as (opts: Record<string, unknown>) => { destroy: () => void };

                if (!isMounted) return;

                instance = effectRequest({
                    el: vantaRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    ...config
                })
                effectRef.current = instance
            } catch (error) {
                console.error("Failed to initialize Vanta effect:", error)
            }
        };

        // Cleanup previous effect first
        if (effectRef.current) {
            effectRef.current.destroy();
            effectRef.current = null;
        }

        // Small delay to ensure DOM/Canvas is ready and previous instance is fully gone
        const timeoutId = setTimeout(initVanta, 10);

        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
            if (instance) {
                instance.destroy()
            }
        }
    }, [effectImporter, config])

    return (
        <div ref={vantaRef} className={`relative w-full h-dvh overflow-hidden ${className}`}>
            <div className="relative z-10 w-full h-full pointer-events-none">
                {/* Content container - pointer events re-enabled for interactive children */}
                <div className="w-full h-full pointer-events-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}
