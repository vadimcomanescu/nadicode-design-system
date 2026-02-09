import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { Alert, AlertDescription, AlertTitle } from "../ui/Alert"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/Breadcrumb"
import { TerminalIcon } from "../ui/icons/terminal"
import { CheckoutFormDemo } from "../ui/CheckoutFormDemo"

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx")

export default function CheckoutPage() {
    return (
        <div className="min-h-dvh bg-background text-text-primary flex flex-col">
            {/* Header / Breadcrumb Section */}
            <div className="border-b border-border bg-surface/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-6 py-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">Billing</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Subscription</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>

            <main className="flex-1 py-12 px-6">
                <div className="max-w-5xl mx-auto space-y-8">

                    {/* Contextual Alert - Example of usage */}
                    <Alert>
                        <TerminalIcon size={16} />
                        <AlertTitle>Upgrade to Pro</AlertTitle>
                        <AlertDescription>
                            You are currently on the Free plan. Upgrade now to unlock unlimited AI generations.
                        </AlertDescription>
                    </Alert>

                    {/* The Main Event: Checkout Component */}
                    <Elements stripe={stripePromise} options={{ appearance: { theme: 'night' } }}>
                        <CheckoutFormDemo />
                    </Elements>

                </div>
            </main>
        </div>
    )
}
