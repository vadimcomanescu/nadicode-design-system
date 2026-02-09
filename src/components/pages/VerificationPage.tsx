
import { SettingsLayout } from "../blocks/SettingsLayout";
import { AuthLayout } from "../blocks/AuthLayout";
import { StatsGeneric } from "../blocks/StatsBlock";
import { DataGridBlock } from "../blocks/DataGridBlock";
import { BarChart } from "../blocks/BarChartBlock";
import { UsageDonut } from "../blocks/UsageDonutBlock";
import { Typography } from "../ui/Typography";

export function VerificationPage() {
    return (
        <div className="space-y-16 p-6 pb-20">
            <div className="space-y-2">
                <Typography variant="h2" className="text-3xl font-bold text-text-primary">Verification Station</Typography>
                <Typography variant="body" className="text-text-secondary">
                    Visual confirmation of all new "Synthetic AI" components.
                </Typography>
            </div>

            <section className="space-y-8">
                <div className="border-b border-border pb-4">
                    <Typography variant="h3" className="text-xl font-semibold mb-2">1. KPI Stats Block</Typography>
                    <Typography variant="body" className="text-sm text-text-secondary">Glass cards with trend indicators.</Typography>
                </div>
                <StatsGeneric />
            </section>

            <section className="space-y-8">
                <div className="border-b border-border pb-4">
                    <Typography variant="h3" className="text-xl font-semibold mb-2">2. Data Grid (Advanced)</Typography>
                    <Typography variant="body" className="text-sm text-text-secondary">Tanstack table with sorting, filtering, and badge logic.</Typography>
                </div>
                <DataGridBlock />
            </section>

            <section className="space-y-8">
                <div className="border-b border-border pb-4">
                    <Typography variant="h3" className="text-xl font-semibold mb-2">3. Analytics Charts</Typography>
                    <Typography variant="body" className="text-sm text-text-secondary">Recharts implementations with custom tooltips and gradients.</Typography>
                </div>
                <div className="flex flex-wrap gap-8">
                    <BarChart />
                    <UsageDonut />
                </div>
            </section>

            <section className="space-y-8">
                <div className="border-b border-border pb-4">
                    <Typography variant="h3" className="text-xl font-semibold mb-2">4. Auth Layout</Typography>
                    <Typography variant="body" className="text-sm text-text-secondary">Split screen with glass form and ambient background.</Typography>
                </div>
                <div className="border border-border rounded-xl overflow-hidden h-[600px] relative">
                    <div className="absolute inset-0 overflow-y-auto bg-background">
                        <AuthLayout />
                    </div>
                </div>
            </section>

            <section className="space-y-8">
                <div className="border-b border-border pb-4">
                    <Typography variant="h3" className="text-xl font-semibold mb-2">5. Settings Layout</Typography>
                    <Typography variant="body" className="text-sm text-text-secondary">Sidebar navigation with nested glass panels.</Typography>
                </div>
                <div className="border border-border rounded-xl overflow-hidden h-[600px] relative">
                    <div className="absolute inset-0 overflow-y-auto bg-background">
                        <SettingsLayout />
                    </div>
                </div>
            </section>
        </div>
    );
}
