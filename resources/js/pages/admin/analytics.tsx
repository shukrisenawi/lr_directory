import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Eye, Mail, MessageCircleMore } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin' },
    { title: 'Analytics', href: '/admin/analytics' },
];

interface AdminAnalyticsProps {
    summary: Record<string, number | Record<string, number>>;
}

export default function AdminAnalytics({ summary }: AdminAnalyticsProps) {
    const cards = [
        { label: 'Total Views', value: summary.total_views ?? 0, icon: Eye },
        { label: 'Total Events', value: summary.total_events ?? 0, icon: BarChart3 },
        { label: 'Total Leads', value: summary.total_leads ?? 0, icon: Mail },
        { label: 'Total Messages', value: summary.total_messages ?? 0, icon: MessageCircleMore },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics" />
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-[var(--idxi-abyss)]">Analytics</h1>
                    <p className="mt-1 text-sm text-[var(--idxi-tide)]">Platform-wide analytics overview</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {cards.map((card) => (
                        <Card key={card.label} className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                            <CardContent className="flex items-center justify-between p-5">
                                <div>
                                    <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--idxi-tide)]">{card.label}</div>
                                    <div className="mt-2 text-3xl font-semibold text-[var(--idxi-abyss)]">{String(card.value)}</div>
                                </div>
                                <div className="rounded-lg bg-amber-100 p-2.5">
                                    <card.icon className="size-4 text-amber-600" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
