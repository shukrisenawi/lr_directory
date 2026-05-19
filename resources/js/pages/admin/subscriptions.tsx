import { AdminActionLink, AdminHero, AdminPage, AdminPanel, EmptyState, StatusPill } from '@/components/admin/admin-design';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CreditCard, Layers3 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin' },
    { title: 'Subscriptions', href: '/admin/subscriptions' },
];

interface AdminSubscriptionsProps {
    subscriptions: {
        data: Array<{
            id: number;
            status: string;
            payment_status: string;
            start_date: string;
            end_date: string | null;
            plan: { name: string; price: string };
            subscribable_type: string;
        }>;
    };
}

export default function AdminSubscriptions({ subscriptions }: AdminSubscriptionsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subscriptions" />
            <AdminPage>
                <AdminHero
                    title="Subscriptions"
                    description="Monitor active packages, payment states, and plan movement across the directory."
                    icon={CreditCard}
                    tone="emerald"
                    action={<AdminActionLink href={route('admin.subscription-plans.index')}>Manage Plans</AdminActionLink>}
                />

                <AdminPanel title="All Subscriptions" icon={Layers3}>
                    <div className="p-4">
                        <div className="grid gap-3">
                            {subscriptions.data.map((sub) => (
                                <div
                                    key={sub.id}
                                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/75 p-3 transition hover:bg-emerald-50/35"
                                >
                                    <div>
                                        <div className="font-semibold text-slate-950">{sub.plan.name}</div>
                                        <div className="mt-1 text-xs text-slate-500">
                                            ${sub.plan.price} &middot; {sub.subscribable_type}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <StatusPill status={sub.status} />
                                        <StatusPill status={sub.payment_status} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        {subscriptions.data.length === 0 && <EmptyState>No subscriptions yet.</EmptyState>}
                    </div>
                </AdminPanel>
            </AdminPage>
        </AppLayout>
    );
}
