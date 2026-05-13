import { AdminHero, AdminPage, AdminPanel, EmptyState, MetricCard, StatusPill } from '@/components/admin/admin-design';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BellRing, Building2, Mail, ShieldCheck, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Admin', href: '/admin' }];

export default function AdminIndex({
    stats,
    recentClaims,
}: {
    stats: Record<string, number>;
    recentClaims: Array<{ id: number; status: string; company: { name: string }; user: { name: string } }>;
}) {
    const statCards = [
        { label: 'Companies', icon: Building2, value: stats.companies ?? 0, tone: 'blue' as const },
        { label: 'Total Users', icon: Users, value: stats.users ?? 0, tone: 'cyan' as const },
        { label: 'Pending Claims', icon: BellRing, value: stats.pendingClaims ?? 0, tone: 'amber' as const },
        { label: 'Leads', icon: Mail, value: stats.leads ?? 0, tone: 'emerald' as const },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Console" />
            <AdminPage>
                <AdminHero
                    title="Master Dashboard"
                    description="Approve listings, track activity, and keep the directory clean from one compact command centre."
                    icon={ShieldCheck}
                />

                <div className="grid gap-4 md:grid-cols-4">
                    {statCards.map((stat) => (
                        <MetricCard key={stat.label} {...stat} />
                    ))}
                </div>

                <AdminPanel title="Recent Claims" icon={BellRing}>
                    {recentClaims.length === 0 ? (
                        <EmptyState>No recent claims.</EmptyState>
                    ) : (
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
                                            <Link
                                                href={route('admin.claims.index')}
                                                className="font-medium text-[var(--idxi-current)] hover:text-amber-600"
                                            >
                                                {claim.company.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="text-[var(--idxi-tide)]">{claim.user.name}</TableCell>
                                        <TableCell>
                                            <StatusPill status={claim.status} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </AdminPanel>
            </AdminPage>
        </AppLayout>
    );
}
