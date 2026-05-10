import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Admin', href: '/admin' }];

export default function AdminIndex({
    stats,
    recentClaims,
}: {
    stats: Record<string, number>;
    recentClaims: Array<{ id: number; status: string; company: { name: string }; user: { name: string } }>;
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Console" />
            <div className="flex flex-col gap-6 p-4">
                <div className="rounded-[8px] border border-slate-200 bg-white p-6">
                    <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Clinical admin design</div>
                    <h1 className="mt-3 text-3xl font-semibold text-[var(--idxi-admin-primary)]">IDXI master dashboard</h1>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">Approve listings, track activity, and keep the directory clean.</p>
                </div>
                <div className="grid gap-4 md:grid-cols-4">
                    {Object.entries(stats).map(([key, value]) => (
                        <Card key={key} className="rounded-[8px] border-slate-200 shadow-none">
                            <CardHeader>
                                <CardTitle className="text-sm font-medium capitalize text-slate-500">{key.replace(/([A-Z])/g, ' $1')}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-4xl font-semibold text-[var(--idxi-admin-primary)]">{value}</CardContent>
                        </Card>
                    ))}
                </div>
                <Card className="rounded-[8px] border-slate-200 shadow-none">
                    <CardHeader>
                        <CardTitle>Recent claims</CardTitle>
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
                                        <TableCell><Link href={route('admin.claims.index')}>{claim.company.name}</Link></TableCell>
                                        <TableCell>{claim.user.name}</TableCell>
                                        <TableCell>{claim.status}</TableCell>
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
