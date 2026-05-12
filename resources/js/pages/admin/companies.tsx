import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { BriefcaseBusiness } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Companies', href: '/admin/companies' }];

export default function AdminCompaniesPage({ companies }: { companies: { data: Array<{ id: number; name: string; status: string; location?: string | null; owner?: { name: string } | null }> } }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Companies" />
            <div className="p-4">
                <div className="mb-6">
                    <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-[var(--idxi-abyss)]">
                        <BriefcaseBusiness className="size-5 text-amber-500" />
                        Company approvals
                    </h1>
                </div>
                <Card className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                    <CardContent className="p-0">
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
                                            <span className="rounded-lg bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium text-amber-600">{company.status}</span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                size="sm"
                                                onClick={() => router.patch(route('admin.companies.update', company.id), { status: 'approved' })}
                                                className="rounded-lg bg-amber-500 text-white shadow-sm hover:bg-amber-600"
                                            >
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
