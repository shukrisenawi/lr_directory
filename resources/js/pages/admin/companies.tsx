import { AdminHero, AdminPage, AdminPanel, EmptyState, StatusPill } from '@/components/admin/admin-design';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { BriefcaseBusiness, CheckCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Companies', href: '/admin/companies' }];

export default function AdminCompaniesPage({
    companies,
}: {
    companies: { data: Array<{ id: number; name: string; status: string; location?: string | null; owner?: { name: string } | null }> };
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Companies" />
            <AdminPage>
                <AdminHero
                    title="Company Approvals"
                    description="Review supplier listings quickly, keep trusted vendors moving, and clean up pending profiles."
                    icon={BriefcaseBusiness}
                    tone="cyan"
                />

                <AdminPanel title="Company Queue" icon={BriefcaseBusiness}>
                    {companies.data.length === 0 ? (
                        <EmptyState>No companies yet.</EmptyState>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Owner</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {companies.data.map((company) => (
                                <TableRow key={company.id}>
                                    <TableCell className="font-medium text-[var(--idxi-abyss)]">{company.name}</TableCell>
                                    <TableCell className="text-[var(--idxi-tide)]">{company.owner?.name ?? 'Unclaimed'}</TableCell>
                                    <TableCell>
                                        <StatusPill status={company.status} />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            size="sm"
                                            onClick={() => router.patch(route('admin.companies.update', company.id), { status: 'approved' })}
                                            className="h-7 rounded-md bg-emerald-500 px-2.5 text-[11px] text-white shadow-sm hover:bg-emerald-600"
                                        >
                                            <CheckCircle className="size-3" />
                                            Approve
                                        </Button>
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
