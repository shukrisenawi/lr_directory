import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { BellRing } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Claims', href: '/admin/claims' }];

export default function AdminClaimsPage({ claims }: { claims: { data: Array<{ id: number; status: string; message?: string | null; company: { name: string }; user: { name: string } }> } }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Claims" />
            <div className="p-4">
                <div className="mb-6">
                    <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-[var(--idxi-abyss)]">
                        <BellRing className="size-5 text-amber-500" />
                        Claim requests
                    </h1>
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
                                            <span className="rounded-lg bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium text-amber-600">{claim.status}</span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                size="sm"
                                                onClick={() => router.patch(route('admin.claims.update', claim.id), { status: 'approved' })}
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
