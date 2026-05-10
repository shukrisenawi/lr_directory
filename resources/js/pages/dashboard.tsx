import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

interface DashboardProps {
    role: 'normal' | 'company' | 'admin';
    stats: Record<string, number>;
    companyProfile?: { id: number; name: string; status: string; summary?: string | null } | null;
}

export default function Dashboard({ role, stats, companyProfile }: DashboardProps) {
    const cards = Object.entries(stats);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-6 p-4">
                <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <div className="text-sm uppercase tracking-[0.28em] text-slate-500">{role} dashboard</div>
                            <h1 className="mt-2 text-3xl font-semibold text-slate-900">IDXI control center</h1>
                            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                                Monitor listing health, engagement, and workflows from one place.
                            </p>
                        </div>
                        {role === 'company' && companyProfile ? (
                            <Badge variant="secondary" className="rounded-full px-4 py-1.5 text-sm">
                                {companyProfile.status}
                            </Badge>
                        ) : null}
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {cards.map(([label, value]) => (
                        <Card key={label} className="border-slate-200 shadow-none">
                            <CardHeader>
                                <CardTitle className="text-sm font-medium capitalize text-slate-500">{label.replace(/([A-Z])/g, ' $1')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-semibold text-slate-900">{value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card className="border-slate-200 shadow-none">
                    <CardHeader>
                        <CardTitle>Next action</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-600">
                        <div>
                            {role === 'admin' && 'Review pending claim requests and clean up company records.'}
                            {role === 'company' && 'Finish your profile details, then update products and campaigns.'}
                            {role === 'normal' && 'Browse categories, save favorites, and start conversations with suppliers.'}
                        </div>
                        <Button asChild>
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
