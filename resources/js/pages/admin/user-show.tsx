import { AdminHero, AdminPage, AdminPanel, EmptyState, StatusPill } from '@/components/admin/admin-design';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Company, type User } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Building2, LogIn, ShieldCheck, Users } from 'lucide-react';

interface UserShowProps {
    userData: User;
    companies: Company[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin' },
    { title: 'Users', href: '/admin/users' },
];

export default function AdminUserShow({ userData: user, companies }: UserShowProps) {
    const crumbs: BreadcrumbItem[] = [
        ...breadcrumbs,
        { title: user.name, href: `/admin/users/${user.id}` },
    ];

    return (
        <AppLayout breadcrumbs={crumbs}>
            <Head title={user.name} />
            <AdminPage>
                <AdminHero
                    title={user.name}
                    description={`Member since ${new Date(user.created_at).toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric' })}`}
                    icon={Users}
                    tone="blue"
                    action={
                        <div className="flex flex-wrap items-center justify-end gap-2">
                            {user.role !== 'admin' ? (
                                <Link
                                    href={route('admin.users.impersonate', user.id)}
                                    method="post"
                                    as="button"
                                    className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 shadow-sm transition hover:bg-amber-300"
                                >
                                    <LogIn className="size-3.5" />
                                    Login as member
                                </Link>
                            ) : null}
                            <Link
                                href={route('admin.users.index')}
                                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-bold text-white shadow-sm ring-1 ring-white/20 transition hover:bg-white/25"
                            >
                                <ArrowLeft className="size-3.5" />
                                Back
                            </Link>
                        </div>
                    }
                />

                <div className="grid gap-4 md:grid-cols-3">
                    <AdminPanel title="Account Info" icon={ShieldCheck}>
                        <div className="grid gap-4 p-4 text-sm">
                            <div>
                                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Name</div>
                                <div className="mt-0.5 font-semibold text-slate-900">{user.name}</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email</div>
                                <div className="mt-0.5 text-slate-600">{user.email}</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Role</div>
                                <div className="mt-0.5">
                                    <StatusPill status={user.role} />
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</div>
                                <div className="mt-0.5">
                                    <StatusPill status={user.status} />
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Registered</div>
                                <div className="mt-0.5 text-slate-600">
                                    {new Date(user.created_at).toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                            </div>
                        </div>
                    </AdminPanel>

                    <div className="md:col-span-2">
                        <AdminPanel title={`Companies (${companies.length})`} icon={Building2}>
                            {companies.length === 0 ? (
                                <EmptyState>No companies yet.</EmptyState>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {companies.map((company) => (
                                            <TableRow key={company.id}>
                                                <TableCell className="font-medium text-slate-900">{company.name}</TableCell>
                                                <TableCell>
                                                    <StatusPill status={company.status} />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </AdminPanel>
                    </div>
                </div>
            </AdminPage>
        </AppLayout>
    );
}
