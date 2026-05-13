import { AdminHero, AdminPage, AdminPanel, EmptyState, StatusPill } from '@/components/admin/admin-design';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ShieldCheck, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin' },
    { title: 'Users', href: '/admin/users' },
];

interface AdminUsersProps {
    users: { data: User[] };
}

const statuses = ['active', 'suspended', 'pending', 'inactive'];

export default function AdminUsers({ users }: AdminUsersProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <AdminPage>
                <AdminHero
                    title="Users"
                    description="Manage access, suspend noisy accounts, and keep operator roles visible at a glance."
                    icon={Users}
                    tone="blue"
                />

                <AdminPanel title="All Users" icon={ShieldCheck}>
                    {users.data.length === 0 ? (
                        <EmptyState>No users yet.</EmptyState>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.data.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-2.5">
                                            <div className="flex size-7 items-center justify-center rounded-lg bg-slate-950 text-[10px] font-bold text-white">
                                                {user.name.charAt(0)}
                                            </div>
                                            <span className="font-medium text-slate-900">{user.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-500">{user.email}</TableCell>
                                    <TableCell>
                                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold capitalize text-slate-600">
                                            {user.role}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <StatusPill status={user.status} />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-1.5">
                                            {statuses.map((status) => (
                                                <button
                                                    key={status}
                                                    onClick={() =>
                                                        router.patch(route('admin.users.update', user.id), { status }, { preserveScroll: true })
                                                    }
                                                    className="cursor-pointer rounded-md bg-white px-3 py-1.5 text-xs font-semibold capitalize text-slate-500 ring-1 ring-slate-200 transition hover:bg-cyan-50 hover:text-cyan-700 hover:ring-cyan-200"
                                                >
                                                    {status}
                                                </button>
                                            ))}
                                        </div>
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
