import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

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
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-[var(--idxi-abyss)]">Users</h1>
                    <p className="mt-1 text-sm text-[var(--idxi-tide)]">Manage user access and status</p>
                </div>

                <Card className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg text-[var(--idxi-abyss)]">
                            <Users className="size-4 text-amber-500" />
                            All Users
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {users.data.map((user) => (
                            <div key={user.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[var(--idxi-shallows)] bg-[var(--idxi-foam)] p-4">
                                <div>
                                    <div className="font-medium text-[var(--idxi-abyss)]">{user.name}</div>
                                    <div className="mt-1 text-sm text-[var(--idxi-tide)]">{user.email} &middot; {user.role}</div>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge className="rounded-lg capitalize">{user.status}</Badge>
                                    {statuses.map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => router.patch(route('admin.users.update', user.id), { status }, { preserveScroll: true })}
                                            className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium capitalize text-[var(--idxi-tide)] transition hover:bg-blue-50"
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
