import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { BriefcaseBusiness, CheckCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Companies', href: '/admin/companies' }];

export default function AdminCompaniesPage({ companies }: { companies: { data: Array<{ id: number; name: string; status: string; location?: string | null; owner?: { name: string } | null }> } }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Companies" />
            <div className="flex flex-col gap-6 p-6">
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[var(--idxi-deep-ocean)] to-[#0D1F3C] p-6 shadow-xl">
                    <div className="flex items-center gap-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/20 ring-1 ring-amber-500/30">
                            <BriefcaseBusiness className="size-5 text-amber-400" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold tracking-tight text-white">Company approvals</h1>
                            <p className="mt-0.5 text-sm text-blue-200">Manage and approve company listings</p>
                        </div>
                    </div>
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
                                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-600">
                                                <span className="size-1.5 rounded-full bg-amber-500" />
                                                {company.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                size="sm"
                                                onClick={() => router.patch(route('admin.companies.update', company.id), { status: 'approved' })}
                                                className="rounded-lg bg-emerald-500 text-white shadow-sm hover:bg-emerald-600"
                                            >
                                                <CheckCircle className="size-3.5" />
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
