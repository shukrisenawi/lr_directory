import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, ArrowRight, BriefcaseBusiness, Building2, Heart, LayoutGrid, MessageCircleMore, TrendingUp, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

interface DashboardProps {
    role: 'normal' | 'company' | 'admin';
    stats: Record<string, number>;
    companyProfile?: { id: number; name: string; status: string; summary?: string | null } | null;
}

const iconMap: Record<string, typeof LayoutGrid> = {
    total_views: TrendingUp,
    total_companies: Building2,
    total_users: Users,
    total_claims: Activity,
    companies: Building2,
    views: TrendingUp,
    messages: MessageCircleMore,
    favorites: Heart,
};

const gradients: Record<string, string> = {
    companies: 'from-blue-600 to-blue-800',
    views: 'from-amber-500 to-orange-600',
    users: 'from-cyan-500 to-blue-600',
    claims: 'from-purple-500 to-purple-700',
    messages: 'from-emerald-500 to-emerald-700',
    favorites: 'from-pink-500 to-rose-600',
};

const roles = {
    admin: {
        title: 'Admin Console',
        desc: 'Approve listings, track activity, and keep the directory clean.',
        action: 'Open Admin',
        link: 'admin.claims.index',
        icon: BriefcaseBusiness,
    },
    company: {
        title: 'Company Workspace',
        desc: 'Finish your profile details, then update products and campaigns.',
        action: 'Manage Profile',
        link: 'company.profile',
        icon: Building2,
    },
    normal: {
        title: 'Browse Directory',
        desc: 'Browse categories, save favorites, and start conversations with suppliers.',
        action: 'Start Browsing',
        link: 'directory.index',
        icon: LayoutGrid,
    },
};

export default function Dashboard({ role, stats, companyProfile }: DashboardProps) {
    const cards = Object.entries(stats);
    const roleInfo = roles[role];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-6 p-6">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--idxi-deep-ocean)] to-[#0D1F3C] p-8 shadow-xl">
                    <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-amber-500/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-10 -left-10 size-48 rounded-full bg-blue-500/10 blur-3xl" />
                    <div className="relative flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-amber-400 ring-1 ring-white/10">
                                <roleInfo.icon className="size-3" />
                                {role} dashboard
                            </div>
                            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">Welcome back</h1>
                            <p className="mt-2 max-w-xl text-sm leading-relaxed text-blue-200">
                                {roleInfo.desc}
                            </p>
                        </div>
                        {role === 'company' && companyProfile ? (
                            <Badge className="rounded-lg border-amber-500/30 bg-amber-500/20 px-3 py-1.5 text-xs font-medium text-amber-400">
                                {companyProfile.status}
                            </Badge>
                        ) : null}
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {cards.map(([label, value]) => {
                        const Icon = iconMap[label] || LayoutGrid;
                        const gradient = gradients[label] || 'from-[var(--idxi-current)] to-[var(--idxi-deep-ocean)]';
                        return (
                            <div key={label} className="group relative overflow-hidden rounded-xl border border-[var(--idxi-shallows)] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                                <div className={`absolute right-0 top-0 size-20 translate-x-6 -translate-y-6 rounded-full bg-gradient-to-br ${gradient} opacity-5 blur-xl`} />
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--idxi-tide)]">
                                            {label.replace(/([A-Z])/g, ' $1')}
                                        </div>
                                        <div className="mt-2 text-3xl font-semibold tracking-tight text-[var(--idxi-abyss)]">{value}</div>
                                    </div>
                                    <div className={`rounded-lg bg-gradient-to-br ${gradient} p-2.5 shadow-sm`}>
                                        <Icon className="size-4 text-white" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="rounded-xl border border-[var(--idxi-shallows)] bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="rounded-lg bg-amber-100 p-2.5">
                                <Activity className="size-5 text-amber-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[var(--idxi-abyss)]">{roleInfo.title}</h3>
                                <p className="mt-0.5 text-sm text-[var(--idxi-tide)]">{roleInfo.desc}</p>
                            </div>
                        </div>
                        <Button asChild className="rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/25 hover:bg-amber-600">
                            <Link href={route(roleInfo.link)}>
                                {roleInfo.action}
                                <ArrowRight className="ml-1.5 size-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
