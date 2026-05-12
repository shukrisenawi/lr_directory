import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BellRing, Building2, ShieldCheck, TrendingUp, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Admin', href: '/admin' }];

export default function AdminIndex({
    stats,
    recentClaims,
}: {
    stats: Record<string, number>;
    recentClaims: Array<{ id: number; status: string; company: { name: string }; user: { name: string } }>;
}) {
    const statCards = [
        { label: 'Companies', icon: Building2, value: stats.companies ?? 0, gradient: 'from-blue-600 to-blue-800' },
        { label: 'Total Views', icon: TrendingUp, value: stats.total_views ?? 0, gradient: 'from-amber-500 to-orange-600' },
        { label: 'Total Users', icon: Users, value: stats.total_users ?? 0, gradient: 'from-cyan-500 to-blue-600' },
        { label: 'Pending Claims', icon: BellRing, value: stats.total_claims ?? 0, gradient: 'from-purple-500 to-purple-700' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Console" />
            <div className="flex flex-col gap-6 p-6">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--idxi-deep-ocean)] to-[#0D1F3C] p-6 shadow-xl">
                    <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-amber-500/10 blur-3xl" />
                    <div className="flex items-center gap-4">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-amber-500/20 ring-1 ring-amber-500/30">
                            <ShieldCheck className="size-6 text-amber-400" />
                        </div>
                        <div>
                            <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-amber-400">Admin</div>
                            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">Master Dashboard</h1>
                            <p className="mt-1 text-sm text-blue-200">Approve listings, track activity, and keep the directory clean.</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                    {statCards.map((stat) => (
                        <div key={stat.label} className="group relative overflow-hidden rounded-xl border border-[var(--idxi-shallows)] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                            <div className={`absolute right-0 top-0 size-20 translate-x-6 -translate-y-6 rounded-full bg-gradient-to-br ${stat.gradient} opacity-5 blur-xl`} />
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--idxi-tide)]">{stat.label}</div>
                                    <div className="mt-2 text-3xl font-semibold tracking-tight text-[var(--idxi-abyss)]">{stat.value}</div>
                                </div>
                                <div className={`rounded-lg bg-gradient-to-br ${stat.gradient} p-2.5 shadow-sm`}>
                                    <stat.icon className="size-4 text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Card className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg text-[var(--idxi-abyss)]">
                            <BellRing className="size-4 text-amber-500" />
                            Recent claims
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Company</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentClaims.map((claim) => (
                                    <TableRow key={claim.id}>
                                        <TableCell>
                                            <Link href={route('admin.claims.index')} className="font-medium text-[var(--idxi-current)] hover:text-amber-600">
                                                {claim.company.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="text-[var(--idxi-tide)]">{claim.user.name}</TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-600">
                                                <span className="size-1.5 rounded-full bg-amber-500" />
                                                {claim.status}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
