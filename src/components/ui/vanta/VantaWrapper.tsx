import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface VantaWrapperProps {
    children: React.ReactNode
    effectImporter: () => Promise<any> // Function that imports the Vanta effect
    config?: any // Configuration object for the effect
    className?: string
}

export function VantaWrapper({ children, effectImporter, config, className }: VantaWrapperProps) {
    const vantaRef = useRef<HTMLDivElement>(null)
    const [vantaEffect, setVantaEffect] = useState<any>(null)

    useEffect(() => {
        let instance: any = null;
        let timeoutId: any;
        let isMounted = true;

        const initVanta = async () => {
            if (!vantaRef.current) return;

            try {
                // Vanta requires THREE to be on window
                if (typeof window !== 'undefined' && !(window as any).THREE) {
                    (window as any).THREE = THREE;
                }

                // Dynamically import the effect
                const vantaModule = await effectImporter();
                const effectRequest = vantaModule.default || vantaModule;

                if (!isMounted) return;

                instance = effectRequest({
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
        };

        // Cleanup previous effect first
        if (vantaEffect) {
            vantaEffect.destroy();
            setVantaEffect(null);
        }

        // Small delay to ensure DOM/Canvas is ready and previous instance is fully gone
        timeoutId = setTimeout(initVanta, 10);

        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
            if (instance) {
                instance.destroy()
            }
        }
    }, [effectImporter, config]) // Depend on importer instead of effect object

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
