import { AdminHero, AdminPage, MetricCard } from '@/components/admin/admin-design';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
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
        { label: 'Total Views', value: summary.total_views ?? 0, icon: Eye, tone: 'blue' as const },
        { label: 'Total Events', value: summary.total_events ?? 0, icon: BarChart3, tone: 'cyan' as const },
        { label: 'Total Leads', value: summary.total_leads ?? 0, icon: Mail, tone: 'emerald' as const },
        { label: 'Total Messages', value: summary.total_messages ?? 0, icon: MessageCircleMore, tone: 'amber' as const },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics" />
            <AdminPage>
                <AdminHero
                    title="Analytics"
                    description="A quick platform pulse for views, events, leads, and conversations."
                    icon={BarChart3}
                    tone="cyan"
                />
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {cards.map((card) => (
                        <MetricCard key={card.label} {...card} value={String(card.value)} />
                    ))}
                </div>
            </AdminPage>
        </AppLayout>
    );
}
