import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Eye, Heart, Mail, MessageCircleMore } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Analytics', href: '/company/analytics' },
];

interface AnalyticsProps {
    summary: Record<string, number | Record<string, number>>;
}

export default function CompanyAnalytics({ summary }: AnalyticsProps) {
    const cards = [
        { label: 'Today Views', value: summary.daily_views ?? 0, icon: Eye },
        { label: 'Total Views', value: summary.total_views ?? 0, icon: BarChart3 },
        { label: 'Favorites', value: summary.favorites ?? 0, icon: Heart },
        { label: 'Leads', value: summary.leads ?? 0, icon: Mail },
        { label: 'Messages', value: summary.messages ?? 0, icon: MessageCircleMore },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics" />
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-[var(--idxi-abyss)]">Analytics</h1>
                    <p className="mt-1 text-sm text-[var(--idxi-tide)]">Supplier performance overview</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
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
