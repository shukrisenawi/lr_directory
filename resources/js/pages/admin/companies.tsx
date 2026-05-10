import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Companies', href: '/admin/companies' }];

export default function AdminCompaniesPage({ companies }: { companies: { data: Array<{ id: number; name: string; status: string; location?: string | null; owner?: { name: string } | null }> } }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Companies" />
            <div className="p-4">
                <Card className="rounded-[8px] border-slate-200 shadow-none">
                    <CardHeader>
                        <CardTitle>Company approvals</CardTitle>
                    </CardHeader>
                    <CardContent>
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
                                        <TableCell>{company.name}</TableCell>
                                        <TableCell>{company.owner?.name ?? 'Unclaimed'}</TableCell>
                                        <TableCell>{company.status}</TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm" onClick={() => router.patch(route('admin.companies.update', company.id), { status: 'approved' })}>
                                                Approve
                                            </Button>
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
