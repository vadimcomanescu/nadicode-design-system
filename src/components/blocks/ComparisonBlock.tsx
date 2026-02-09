import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table"
import { Badge } from "../ui/Badge"
import { Typography } from "../ui/Typography"
import { ScrollFadeIn } from "../ui/ScrollFadeIn"
import { Check, X } from "lucide-react"
import { cn } from "../../lib/utils"

interface ComparisonPlan {
  name: string
  featured?: boolean
  features: Record<string, boolean | string>
}

interface ComparisonBlockProps {
  plans?: ComparisonPlan[]
  title?: string
  description?: string
  className?: string
}

const defaultPlans: ComparisonPlan[] = [
  {
    name: "Starter",
    features: {
      "Components": "50+",
      "Design Tokens": true,
      "Dark Mode": true,
      "TypeScript": true,
      "Priority Support": false,
      "Custom Branding": false,
      "SSO / SAML": false,
      "SLA Guarantee": false,
    },
  },
  {
    name: "Pro",
    featured: true,
    features: {
      "Components": "100+",
      "Design Tokens": true,
      "Dark Mode": true,
      "TypeScript": true,
      "Priority Support": true,
      "Custom Branding": true,
      "SSO / SAML": false,
      "SLA Guarantee": false,
    },
  },
  {
    name: "Enterprise",
    features: {
      "Components": "100+",
      "Design Tokens": true,
      "Dark Mode": true,
      "TypeScript": true,
      "Priority Support": true,
      "Custom Branding": true,
      "SSO / SAML": true,
      "SLA Guarantee": true,
    },
  },
]

export function ComparisonBlock({
  plans = defaultPlans,
  title = "Compare plans",
  description = "See which plan is right for your team.",
  className,
}: ComparisonBlockProps) {
  const featureNames = plans.length > 0
    ? Object.keys(plans[0].features)
    : []

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-5xl px-6">
        <ScrollFadeIn>
          <div className="mb-12 text-center">
            <Typography variant="h2" className="text-text-primary">
              {title}
            </Typography>
            {description && (
              <Typography variant="body" className="mt-4 text-text-secondary">
                {description}
              </Typography>
            )}
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.1}>
          <div className="overflow-x-auto rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] text-text-primary font-semibold">
                    Feature
                  </TableHead>
                  {plans.map((plan) => (
                    <TableHead
                      key={plan.name}
                      className={cn(
                        "text-center font-semibold",
                        plan.featured && "text-accent"
                      )}
                    >
                      <div className="flex flex-col items-center gap-1">
                        {plan.name}
                        {plan.featured && (
                          <Badge variant="accent" className="text-[10px]">
                            Popular
                          </Badge>
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {featureNames.map((feature) => (
                  <TableRow key={feature} className="transition-colors hover:bg-surface-active/50">
                    <TableCell className="font-medium text-text-primary">
                      {feature}
                    </TableCell>
                    {plans.map((plan) => {
                      const value = plan.features[feature]
                      return (
                        <TableCell key={plan.name} className="text-center">
                          {typeof value === "boolean" ? (
                            value ? (
                              <Check className="mx-auto h-4 w-4 text-success" />
                            ) : (
                              <X className="mx-auto h-4 w-4 text-text-tertiary" />
                            )
                          ) : (
                            <span className="text-sm text-text-primary">{value}</span>
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  )
}
