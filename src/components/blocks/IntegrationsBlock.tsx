import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ChevronRightIcon } from '@/components/ui/icons'
import { Link } from 'react-router-dom'
import * as React from 'react'
import { Gemini, Replit, MagicUI, VSCodium, MediaWiki, GooglePaLM } from '@/components/logos'
import { ScrollFadeIn } from '@/components/ui/ScrollFadeIn'
import { StaggerChildren } from '@/components/ui/StaggerChildren'

export function IntegrationsSection() {
    return (
        <ScrollFadeIn>
        <section>
            <div className="py-32">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="text-center">
                        <h2 className="text-balance text-3xl font-semibold md:text-4xl">Integrate with your favorite tools</h2>
                        <p className="text-text-tertiary mt-6">Connect seamlessly with popular platforms and services to enhance your workflow.</p>
                    </div>

                    <StaggerChildren staggerMs={80} className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <IntegrationCard
                            title="Google Gemini"
                            description="Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente.">
                            <Gemini />
                        </IntegrationCard>

                        <IntegrationCard
                            title="Replit"
                            description="Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente.">
                            <Replit />
                        </IntegrationCard>

                        <IntegrationCard
                            title="Magic UI"
                            description="Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente.">
                            <MagicUI />
                        </IntegrationCard>

                        <IntegrationCard
                            title="VSCodium"
                            description="Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente.">
                            <VSCodium />
                        </IntegrationCard>

                        <IntegrationCard
                            title="MediaWiki"
                            description="Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente.">
                            <MediaWiki />
                        </IntegrationCard>

                        <IntegrationCard
                            title="Google PaLM"
                            description="Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente.">
                            <GooglePaLM />
                        </IntegrationCard>
                    </StaggerChildren>
                </div>
            </div>
        </section>
        </ScrollFadeIn>
    )
}

const IntegrationCard = ({ title, description, children, link = 'https://github.com/meschacirung/cnblocks' }: { title: string; description: string; children: React.ReactNode; link?: string }) => {
    return (
        <Card className="p-6" interactive>
            <div className="relative">
                <div className="*:size-10">{children}</div>

                <div className="space-y-2 py-6">
                    <h3 className="text-base font-medium">{title}</h3>
                    <p className="text-text-tertiary line-clamp-2 text-sm">{description}</p>
                </div>

                <div className="flex gap-3 border-t border-dashed pt-6">
                    <Button
                        asChild
                        variant="secondary"
                        size="sm"
                        className="gap-1 pr-2 shadow-none">
                        <Link to={link}>
                            Learn More
                            <ChevronRightIcon size={14} className="ml-0 opacity-50" />
                        </Link>
                    </Button>
                </div>
            </div>
        </Card>
    )
}
