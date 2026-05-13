import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SubscriptionPlan, type Subscription } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Subscription', href: '/company/subscription' },
];

interface SupplierSubscriptionProps {
    activeSubscription: (Subscription & { plan: SubscriptionPlan }) | null;
    subscriptionHistory: (Subscription & { plan: SubscriptionPlan })[];
    plans: SubscriptionPlan[];
}

const statusIcon: Record<string, typeof CheckCircle2> = {
    active: CheckCircle2,
    expired: XCircle,
    cancelled: XCircle,
    pending: Clock,
};

const statusColor: Record<string, string> = {
    active: 'text-emerald-600 bg-emerald-50',
    expired: 'text-red-600 bg-red-50',
    cancelled: 'text-gray-600 bg-gray-50',
    pending: 'text-amber-600 bg-amber-50',
};

export default function SupplierSubscription({ activeSubscription, subscriptionHistory, plans }: SupplierSubscriptionProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subscription" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-[var(--idxi-abyss)]">Subscription</h1>
                        <p className="mt-1 text-sm text-[var(--idxi-tide)]">Manage your subscription plan</p>
                    </div>
                </div>

                {activeSubscription ? (
                    <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-white shadow-sm">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-lg text-[var(--idxi-abyss)]">
                                    <CheckCircle2 className="size-5 text-emerald-500" />
                                    Active Plan
                                </CardTitle>
                                <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                                    {activeSubscription.plan.name}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-[var(--idxi-tide)]">
                            <p>Started: {activeSubscription.start_date}</p>
                            <p>Expires: {activeSubscription.end_date ?? 'Never'}</p>
                            <p>Status: {activeSubscription.status}</p>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                        <CardContent className="p-6 text-center text-sm text-[var(--idxi-tide)]">
                            No active subscription.
                        </CardContent>
                    </Card>
                )}

                {plans.length > 0 && (
                    <Card className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg text-[var(--idxi-abyss)]">Available Plans</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {plans.map((plan) => (
                                <div key={plan.id} className="flex items-center justify-between rounded-lg border border-[var(--idxi-shallows)] bg-[var(--idxi-foam)] p-4">
                                    <div>
                                        <div className="font-medium text-[var(--idxi-abyss)]">{plan.name}</div>
                                        <div className="mt-1 text-sm text-[var(--idxi-tide)]">RM{plan.price} / {plan.duration_days} days</div>
                                    </div>
                                    <Badge className="rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-700">
                                        {plan.is_active ? 'Available' : 'Inactive'}
                                    </Badge>
                                    {plan.is_active ? (
                                        <button
                                            onClick={() => router.post(route('company.subscription.store', plan.id), {}, { preserveScroll: true })}
                                            className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-amber-600"
                                        >
                                            Activate
                                        </button>
                                    ) : null}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {subscriptionHistory.length > 0 && (
                    <Card className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg text-[var(--idxi-abyss)]">History</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {subscriptionHistory.map((sub) => {
                                const Icon = statusIcon[sub.status] || Clock;
                                const color = statusColor[sub.status] || 'text-gray-600 bg-gray-50';
                                return (
                                    <div key={sub.id} className="flex items-center justify-between rounded-lg border border-[var(--idxi-shallows)] bg-[var(--idxi-foam)] p-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`rounded-full p-1.5 ${color}`}>
                                                <Icon className="size-4" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-[var(--idxi-abyss)]">{sub.plan.name}</div>
                                                <div className="text-sm text-[var(--idxi-tide)]">{sub.start_date} &ndash; {sub.end_date ?? 'Present'}</div>
                                            </div>
                                        </div>
                                        <Badge className="rounded-lg capitalize">{sub.status}</Badge>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
