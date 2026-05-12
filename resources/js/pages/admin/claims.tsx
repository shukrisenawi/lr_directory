import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { BellRing, CheckCircle, XCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Claims', href: '/admin/claims' }];

export default function AdminClaimsPage({ claims }: { claims: { data: Array<{ id: number; status: string; message?: string | null; company: { name: string }; user: { name: string } }> } }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Claims" />
            <div className="flex flex-col gap-6 p-6">
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[var(--idxi-deep-ocean)] to-[#0D1F3C] p-6 shadow-xl">
                    <div className="flex items-center gap-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/20 ring-1 ring-amber-500/30">
                            <BellRing className="size-5 text-amber-400" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold tracking-tight text-white">Claim requests</h1>
                            <p className="mt-0.5 text-sm text-blue-200">Review and approve listing claims</p>
                        </div>
                    </div>
                </div>

                <Card className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                    <CardContent className="p-0">
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
                                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-600">
                                                <span className="size-1.5 rounded-full bg-amber-500" />
                                                {claim.status}
                                            </span>
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
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
