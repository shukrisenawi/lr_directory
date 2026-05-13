import { AdminActionLink, AdminHero, AdminPage, EmptyState, StatusPill } from '@/components/admin/admin-design';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SubscriptionPlan } from '@/types';
import { Head } from '@inertiajs/react';
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
            <AdminPage>
                <AdminHero
                    title="Subscription Plans"
                    description="A tidy overview of available packages, pricing, durations, and eligibility."
                    icon={Package}
                    tone="amber"
                    action={
                        <AdminActionLink href={route('admin.subscriptions.index')} tone="slate">
                            <ArrowLeft className="size-3.5" />
                            Back
                        </AdminActionLink>
                    }
                />

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan) => (
                        <Card
                            key={plan.id}
                            className="overflow-hidden rounded-2xl border-white/80 bg-white/90 shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(15,23,42,0.1)]"
                        >
                            <div className="border-b border-slate-100 p-4">
                                <div className="flex items-center justify-between">
                                    <div className="rounded-2xl bg-amber-100 p-2.5">
                                        <Package className="size-4 text-amber-600" />
                                    </div>
                                    <StatusPill status={plan.is_active ? 'active' : 'inactive'} />
                                </div>
                                <h2 className="mt-3 text-lg font-semibold text-slate-950">{plan.name}</h2>
                            </div>
                            <CardContent className="grid gap-2 p-4 text-sm text-slate-500">
                                <p>
                                    <span className="font-semibold text-slate-800">Price:</span> RM{plan.price}
                                </p>
                                <p>
                                    <span className="font-semibold text-slate-800">Duration:</span> {plan.duration_days} days
                                </p>
                                <p>
                                    <span className="font-semibold text-slate-800">Role:</span> {plan.role_type}
                                </p>
                                <p className="text-xs text-slate-400">Sort: {plan.sort_order}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {plans.length === 0 && <EmptyState>No plans created yet.</EmptyState>}
            </AdminPage>
        </AppLayout>
    );
}
