import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SubscriptionPlan } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Package } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin' },
    { title: 'Plans', href: '/admin/subscription-plans' },
];

interface AdminPlansProps {
    plans: SubscriptionPlan[];
}

export default function AdminPlans({ plans }: AdminPlansProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subscription Plans" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-[var(--idxi-abyss)]">Subscription Plans</h1>
                        <p className="mt-1 text-sm text-[var(--idxi-tide)]">Manage available plans</p>
                    </div>
                    <Link
                        href={route('admin.subscriptions.index')}
                        className="flex items-center gap-1 rounded-lg border border-[var(--idxi-shallows)] px-4 py-2 text-xs font-medium text-[var(--idxi-tide)] transition hover:bg-[var(--idxi-foam)]"
                    >
                        <ArrowLeft className="size-3" />
                        Back
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan) => (
                        <Card key={plan.id} className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="rounded-lg bg-amber-100 p-2">
                                        <Package className="size-4 text-amber-600" />
                                    </div>
                                    <Badge className={plan.is_active ? 'rounded-lg bg-emerald-100 text-emerald-700' : 'rounded-lg bg-gray-100 text-gray-500'}>
                                        {plan.is_active ? 'Active' : 'Inactive'}
                                    </Badge>
                                </div>
                                <CardTitle className="mt-3 text-lg text-[var(--idxi-abyss)]">{plan.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm text-[var(--idxi-tide)]">
                                <p>Price: RM{plan.price}</p>
                                <p>Duration: {plan.duration_days} days</p>
                                <p>Role: {plan.role_type}</p>
                                <p className="text-xs">Sort: {plan.sort_order}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {plans.length === 0 && (
                    <div className="rounded-xl border border-dashed border-[var(--idxi-shallows)] bg-white p-12 text-center text-sm text-[var(--idxi-tide)]">
                        No plans created yet.
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
