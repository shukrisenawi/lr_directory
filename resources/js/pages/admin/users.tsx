import { AdminHero, AdminPage, AdminPanel, StatusPill } from '@/components/admin/admin-design';
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
                    <div className="grid gap-3 p-4">
                        {users.data.map((user) => (
                            <div
                                key={user.id}
                                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/75 p-3 transition hover:border-cyan-100 hover:bg-cyan-50/35"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-950">{user.name}</div>
                                        <div className="mt-0.5 text-xs text-slate-500">
                                            {user.email} &middot; {user.role}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <StatusPill status={user.status} />
                                    {statuses.map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => router.patch(route('admin.users.update', user.id), { status }, { preserveScroll: true })}
                                            className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 capitalize ring-1 ring-slate-200 transition hover:bg-cyan-50 hover:text-cyan-700 hover:ring-cyan-200"
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </AdminPanel>
            </AdminPage>
        </AppLayout>
    );
}
