import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { type SubscriptionPlan } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Check, Sparkles } from 'lucide-react';

interface PlansIndexProps {
    plans: SubscriptionPlan[];
}

export default function PlansIndex({ plans }: PlansIndexProps) {
    return (
        <div className="min-h-screen bg-[var(--idxi-foam)]">
            <Head title="Subscription Plans" />

            <header className="border-b border-[var(--idxi-shallows)] bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link href={route('home')} className="text-lg font-semibold tracking-tight text-[var(--idxi-abyss)]">
                        IDXI
                    </Link>
                    <div className="flex items-center gap-3">
                        <Button asChild variant="ghost" size="sm">
                            <Link href={route('login')}>Login</Link>
                        </Button>
                        <Button asChild size="sm" className="rounded-xl bg-amber-500 text-white hover:bg-amber-600">
                            <Link href={route('register')}>Register</Link>
                        </Button>
                    </div>
                </div>
            </header>

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center">
                    <Badge className="mb-4 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold tracking-[0.15em] text-amber-700 uppercase">
                        <Sparkles className="mr-1 size-3" />
                        Pricing
                    </Badge>
                    <h1 className="text-4xl font-semibold tracking-tight text-[var(--idxi-abyss)]">Choose your plan</h1>
                    <p className="mt-3 text-sm text-[var(--idxi-tide)]">Pick the right subscription for your needs</p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan) => (
                        <Card
                            key={plan.id}
                            className="relative flex flex-col border-[var(--idxi-shallows)] bg-white shadow-sm transition hover:shadow-lg"
                        >
                            <CardHeader>
                                <CardTitle className="text-xl text-[var(--idxi-abyss)]">{plan.name}</CardTitle>
                                <CardDescription className="text-sm text-[var(--idxi-tide)]">
                                    {plan.role_type === 'company' ? 'For suppliers & companies' : 'For buyers & normal users'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-semibold text-[var(--idxi-abyss)]">RM{plan.price}</span>
                                    <span className="text-sm text-[var(--idxi-tide)]">/{plan.duration_days} days</span>
                                </div>
                                {plan.features && plan.features.length > 0 && (
                                    <ul className="space-y-2">
                                        {plan.features.map((feature: string, i: number) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-[var(--idxi-tide)]">
                                                <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full rounded-xl bg-amber-500 text-white hover:bg-amber-600">
                                    <Link href={route('register')}>Get Started</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {plans.length === 0 && (
                    <div className="mt-12 rounded-xl border border-dashed border-[var(--idxi-shallows)] bg-white p-12 text-center text-sm text-[var(--idxi-tide)]">
                        No plans available yet.
                    </div>
                )}
            </section>
        </div>
    );
}
