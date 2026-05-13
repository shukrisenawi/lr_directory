import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Subscription, type SubscriptionPlan } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, CreditCard } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Subscription', href: '/subscription' },
];

interface SubscriptionPageProps {
    activeSubscription: (Subscription & { plan: SubscriptionPlan }) | null;
    subscriptionHistory: (Subscription & { plan: SubscriptionPlan })[];
    plans: SubscriptionPlan[];
}

export default function SubscriptionPage({ activeSubscription, subscriptionHistory, plans }: SubscriptionPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subscription" />
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-[var(--idxi-abyss)]">Subscription</h1>
                    <p className="mt-1 text-sm text-[var(--idxi-tide)]">Your buyer subscription status</p>
                </div>

                <Card className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg text-[var(--idxi-abyss)]">
                            {activeSubscription ? <CheckCircle2 className="size-4 text-emerald-500" /> : <CreditCard className="size-4 text-amber-500" />}
                            Current Plan
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-[var(--idxi-tide)]">
                        {activeSubscription ? (
                            <div className="space-y-2">
                                <Badge className="rounded-lg bg-emerald-100 text-emerald-700">{activeSubscription.plan.name}</Badge>
                                <p>Expires: {activeSubscription.end_date ?? 'Never'}</p>
                                <p>Payment: {activeSubscription.payment_status}</p>
                            </div>
                        ) : (
                            <p>No active subscription.</p>
                        )}
                    </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan) => (
                        <Card key={plan.id} className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg text-[var(--idxi-abyss)]">{plan.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm text-[var(--idxi-tide)]">
                                <p>RM{plan.price} / {plan.duration_days} days</p>
                                <p>{plan.features?.join(', ')}</p>
                                <button
                                    onClick={() => router.post(route('subscription.store', plan.id), {}, { preserveScroll: true })}
                                    className="mt-3 rounded-lg bg-amber-500 px-4 py-2 text-xs font-medium text-white transition hover:bg-amber-600"
                                >
                                    Activate Plan
                                </button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {subscriptionHistory.length > 0 ? (
                    <Card className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg text-[var(--idxi-abyss)]">History</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {subscriptionHistory.map((sub) => (
                                <div key={sub.id} className="flex items-center justify-between rounded-lg border border-[var(--idxi-shallows)] bg-[var(--idxi-foam)] p-4 text-sm">
                                    <span className="font-medium text-[var(--idxi-abyss)]">{sub.plan.name}</span>
                                    <Badge className="rounded-lg capitalize">{sub.status}</Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ) : null}
            </div>
        </AppLayout>
    );
}
