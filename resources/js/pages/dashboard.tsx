import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutGrid, TrendingUp, Users, Building2, Activity } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

interface DashboardProps {
    role: 'normal' | 'company' | 'admin';
    stats: Record<string, number>;
    companyProfile?: { id: number; name: string; status: string; summary?: string | null } | null;
}

const statIcons: Record<string, typeof LayoutGrid> = {
    total_views: TrendingUp,
    total_companies: Building2,
    total_users: Users,
    total_claims: Activity,
    companies: Building2,
    views: TrendingUp,
    messages: Activity,
    favorites: Users,
};

export default function Dashboard({ role, stats, companyProfile }: DashboardProps) {
    const cards = Object.entries(stats);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-6 p-4">
                <div className="rounded-2xl border border-[var(--idxi-shallows)] bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--idxi-tide)]">{role} dashboard</span>
                            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--idxi-abyss)]">IDXI control center</h1>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--idxi-tide)]">
                                Monitor listing health, engagement, and workflows from one place.
                            </p>
                        </div>
                        {role === 'company' && companyProfile ? (
                            <Badge variant="secondary" className="rounded-lg px-3 py-1 text-xs">
                                {companyProfile.status}
                            </Badge>
                        ) : null}
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {cards.map(([label, value]) => {
                        const Icon = statIcons[label] || LayoutGrid;
                        return (
                            <Card key={label} className="border-[var(--idxi-shallows)] bg-white shadow-sm transition hover:shadow-md">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium capitalize text-[var(--idxi-tide)]">
                                        {label.replace(/([A-Z])/g, ' $1')}
                                    </CardTitle>
                                    <Icon className="size-4 text-[var(--idxi-current)]" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-semibold text-[var(--idxi-abyss)]">{value}</div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <Card className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg text-[var(--idxi-abyss)]">Next action</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap items-center justify-between gap-4 text-sm text-[var(--idxi-tide)]">
                        <div>
                            {role === 'admin' && 'Review pending claim requests and clean up company records.'}
                            {role === 'company' && 'Finish your profile details, then update products and campaigns.'}
                            {role === 'normal' && 'Browse categories, save favorites, and start conversations with suppliers.'}
                        </div>
                        <Button asChild className="rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/25 hover:bg-amber-600">
                            <Link
                                href={
                                    role === 'admin'
                                        ? route('admin.claims.index')
                                        : role === 'company'
                                          ? route('company.profile')
                                          : route('directory.index')
                                }
                            >
                                Open workspace
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
