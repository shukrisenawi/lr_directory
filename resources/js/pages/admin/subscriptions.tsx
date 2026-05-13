import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard } from 'lucide-react';

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
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-[var(--idxi-abyss)]">Subscriptions</h1>
                        <p className="mt-1 text-sm text-[var(--idxi-tide)]">All platform subscriptions</p>
                    </div>
                    <Link
                        href={route('admin.subscription-plans.index')}
                        className="rounded-lg bg-[var(--idxi-deep-ocean)] px-4 py-2 text-xs font-medium text-white transition hover:bg-[var(--idxi-current)]"
                    >
                        Manage Plans
                    </Link>
                </div>

                <Card className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg text-[var(--idxi-abyss)]">
                            <CreditCard className="size-4 text-amber-500" />
                            All Subscriptions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {subscriptions.data.map((sub) => (
                                <div key={sub.id} className="flex items-center justify-between rounded-lg border border-[var(--idxi-shallows)] bg-[var(--idxi-foam)] p-4">
                                    <div>
                                        <div className="font-medium text-[var(--idxi-abyss)]">{sub.plan.name}</div>
                                        <div className="mt-1 text-sm text-[var(--idxi-tide)]">
                                            RM{sub.plan.price} &middot; {sub.subscribable_type}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge className="rounded-lg capitalize">{sub.status}</Badge>
                                        <Badge className="rounded-lg capitalize">{sub.payment_status}</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {subscriptions.data.length === 0 && (
                            <div className="py-8 text-center text-sm text-[var(--idxi-tide)]">No subscriptions yet.</div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
