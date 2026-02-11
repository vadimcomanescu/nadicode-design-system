import { Button } from '@/components/ui/Button'
import { StaggerChildren } from '../ui/StaggerChildren'
import { ShimmeringText } from '../ui/text-effects'

export function CallToAction() {
    return (
        <section className="py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-6">
                <StaggerChildren staggerMs={100} className="text-center">
                    <h2 className="text-balance text-4xl font-semibold leading-tight lg:text-5xl">
                        <ShimmeringText
                            text="Start Building"
                            color="var(--color-text-primary)"
                            shimmeringColor="var(--color-accent)"
                            duration={2}
                        />
                    </h2>
                    <p className="mt-4 text-lg text-text-secondary">Libero sapiente aliquam quibusdam aspernatur.</p>

                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <Button
                            asChild
                            size="lg">
                            <a href="/">
                                <span>Get Started</span>
                            </a>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline">
                            <a href="/">
                                <span>Book Demo</span>
                            </a>
                        </Button>
                    </div>
                </StaggerChildren>
            </div>
        </section>
    )
}
