import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Claims', href: '/admin/claims' }];

export default function AdminClaimsPage({ claims }: { claims: { data: Array<{ id: number; status: string; message?: string | null; company: { name: string }; user: { name: string } }> } }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Claims" />
            <div className="p-4">
                <Card className="rounded-[8px] border-slate-200 shadow-none">
                    <CardHeader>
                        <CardTitle>Claim requests</CardTitle>
                    </CardHeader>
                    <CardContent>
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
                                        <TableCell>{claim.company.name}</TableCell>
                                        <TableCell>{claim.user.name}</TableCell>
                                        <TableCell>{claim.message}</TableCell>
                                        <TableCell>{claim.status}</TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm" onClick={() => router.patch(route('admin.claims.update', claim.id), { status: 'approved' })}>
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
