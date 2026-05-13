import { AdminHero, AdminPage, AdminPanel, StatusPill } from '@/components/admin/admin-design';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { BellRing, CheckCircle, XCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Claims', href: '/admin/claims' }];

export default function AdminClaimsPage({
    claims,
}: {
    claims: { data: Array<{ id: number; status: string; message?: string | null; company: { name: string }; user: { name: string } }> };
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Claims" />
            <AdminPage>
                <AdminHero
                    title="Claim Requests"
                    description="Approve legitimate ownership requests, reject suspicious claims, and keep supplier data accountable."
                    icon={BellRing}
                    tone="amber"
                />

                <AdminPanel title="Review Queue" icon={BellRing}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Company</TableHead>
                                <TableHead>Requester</TableHead>
                                <TableHead>Message</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {claims.data.map((claim) => (
                                <TableRow key={claim.id}>
                                    <TableCell className="font-medium text-[var(--idxi-abyss)]">{claim.company.name}</TableCell>
                                    <TableCell className="text-[var(--idxi-tide)]">{claim.user.name}</TableCell>
                                    <TableCell className="max-w-xs truncate text-[var(--idxi-tide)]">{claim.message}</TableCell>
                                    <TableCell>
                                        <StatusPill status={claim.status} />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                onClick={() => router.patch(route('admin.claims.update', claim.id), { status: 'rejected' })}
                                                className="rounded-lg border border-[var(--idxi-shallows)] bg-white text-[var(--idxi-tide)] shadow-sm hover:bg-red-50 hover:text-red-600"
                                            >
                                                <XCircle className="size-3.5" />
                                                Reject
                                            </Button>
                                            <Button
                                                size="sm"
                                                onClick={() => router.patch(route('admin.claims.update', claim.id), { status: 'approved' })}
                                                className="rounded-lg bg-emerald-500 text-white shadow-sm hover:bg-emerald-600"
                                            >
                                                <CheckCircle className="size-3.5" />
                                                Approve
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </AdminPanel>
            </AdminPage>
        </AppLayout>
    );
}
