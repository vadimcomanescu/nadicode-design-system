import { HeroHeader } from "../blocks/HeaderBlock"
import { HeroCentered } from "../blocks/HeroBlock"
import { LogoCloud, Testimonials } from "../blocks/SocialProofBlock"
import { FeatureGrid } from "../blocks/FeatureBlock"
import Stats from "../blocks/StatsMarketingBlock"
import { PricingTable } from "../blocks/PricingBlock"
import CallToAction from "../blocks/CallToActionBlock"
import { Footer } from "../blocks/FooterBlock"
import { FAQBlock } from "../blocks/FAQBlock"
import { NewsletterBlock } from "../blocks/NewsletterBlock"
import { ScrollFadeIn } from "../ui/ScrollFadeIn"
import { AuroraEffect } from "../ui/AuroraEffect"

export function LandingPage() {
  return (
    <div className="min-h-dvh bg-background text-text-primary">
      <HeroHeader />

      {/* Hero with aurora background */}
      <div className="relative overflow-hidden">
        <AuroraEffect className="absolute inset-0 opacity-30 pointer-events-none" />
        <div className="relative z-10">
          <HeroCentered />
        </div>
      </div>

      <ScrollFadeIn>
        <LogoCloud />
      </ScrollFadeIn>

      <ScrollFadeIn>
        <FeatureGrid />
      </ScrollFadeIn>

      <ScrollFadeIn>
        <Stats />
      </ScrollFadeIn>

      <ScrollFadeIn>
        <PricingTable />
      </ScrollFadeIn>

      <ScrollFadeIn>
        <Testimonials />
      </ScrollFadeIn>

      <ScrollFadeIn>
        <CallToAction />
      </ScrollFadeIn>

      <FAQBlock />

      <NewsletterBlock />

      <Footer />
    </div>
  )
}
