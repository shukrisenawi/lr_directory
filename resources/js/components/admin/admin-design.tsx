import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

type Tone = 'amber' | 'cyan' | 'emerald' | 'rose' | 'blue' | 'slate';

const toneClasses: Record<Tone, { icon: string; pill: string; glow: string; button: string }> = {
    amber: {
        icon: 'bg-amber-400/15 text-amber-300 ring-amber-300/25',
        pill: 'bg-amber-50 text-amber-700 ring-amber-200',
        glow: 'from-amber-300/35 to-orange-500/10',
        button: 'bg-amber-400 text-slate-950 hover:bg-amber-300',
    },
    cyan: {
        icon: 'bg-cyan-400/15 text-cyan-200 ring-cyan-300/25',
        pill: 'bg-cyan-50 text-cyan-700 ring-cyan-200',
        glow: 'from-cyan-300/35 to-blue-500/10',
        button: 'bg-cyan-500 text-white hover:bg-cyan-400',
    },
    emerald: {
        icon: 'bg-emerald-400/15 text-emerald-200 ring-emerald-300/25',
        pill: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
        glow: 'from-emerald-300/35 to-teal-500/10',
        button: 'bg-emerald-500 text-white hover:bg-emerald-400',
    },
    rose: {
        icon: 'bg-rose-400/15 text-rose-200 ring-rose-300/25',
        pill: 'bg-rose-50 text-rose-700 ring-rose-200',
        glow: 'from-rose-300/35 to-pink-500/10',
        button: 'bg-rose-500 text-white hover:bg-rose-400',
    },
    blue: {
        icon: 'bg-blue-400/15 text-blue-200 ring-blue-300/25',
        pill: 'bg-blue-50 text-blue-700 ring-blue-200',
        glow: 'from-blue-300/35 to-sky-500/10',
        button: 'bg-blue-600 text-white hover:bg-blue-500',
    },
    slate: {
        icon: 'bg-slate-400/15 text-slate-100 ring-slate-300/25',
        pill: 'bg-slate-100 text-slate-700 ring-slate-200',
        glow: 'from-slate-300/25 to-slate-600/10',
        button: 'bg-slate-900 text-white hover:bg-slate-800',
    },
};

export function AdminPage({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cn('admin-surface flex flex-col gap-4 px-4 py-4 sm:px-5 lg:px-6', className)}>{children}</div>;
}

export function AdminHero({
    title,
    eyebrow = 'Admin Console',
    description,
    icon: Icon,
    tone = 'amber',
    action,
}: {
    title: string;
    eyebrow?: string;
    description: string;
    icon: LucideIcon;
    tone?: Tone;
    action?: ReactNode;
}) {
    return (
        <section className="relative isolate overflow-hidden rounded-[1.5rem] border border-white/15 bg-[linear-gradient(135deg,#07182f_0%,#0a3155_44%,#0f766e_100%)] px-5 py-5 text-white shadow-[0_20px_60px_rgba(7,24,47,0.2)] sm:px-6">
            <div className={cn('absolute -top-16 -right-10 size-48 rounded-full bg-gradient-to-br blur-3xl', toneClasses[tone].glow)} />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <div className={cn('flex size-12 shrink-0 items-center justify-center rounded-2xl ring-1 backdrop-blur', toneClasses[tone].icon)}>
                        <Icon className="size-5" />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold tracking-[0.24em] text-white/55 uppercase">{eyebrow}</div>
                        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-cyan-50/75">{description}</p>
                    </div>
                </div>
                {action ? <div className="shrink-0">{action}</div> : null}
            </div>
        </section>
    );
}

export function MetricCard({ label, value, icon: Icon, tone = 'cyan' }: { label: string; value: ReactNode; icon: LucideIcon; tone?: Tone }) {
    return (
        <Card className="group overflow-hidden rounded-2xl border-white/80 bg-white/85 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(15,23,42,0.1)]">
            <CardContent className="relative flex items-center justify-between p-4">
                <div
                    className={cn(
                        'absolute top-0 right-0 size-24 translate-x-8 -translate-y-10 rounded-full bg-gradient-to-br opacity-80 blur-2xl',
                        toneClasses[tone].glow,
                    )}
                />
                <div className="relative">
                    <div className="text-[10px] font-bold tracking-[0.18em] text-slate-400 uppercase">{label}</div>
                    <div className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">{value}</div>
                </div>
                <div className={cn('relative rounded-2xl p-2.5 ring-1', toneClasses[tone].icon, 'bg-slate-950/90')}>
                    <Icon className="size-4" />
                </div>
            </CardContent>
        </Card>
    );
}

export function AdminPanel({ title, icon: Icon, children, action }: { title: string; icon: LucideIcon; children: ReactNode; action?: ReactNode }) {
    return (
        <Card className="overflow-hidden rounded-2xl border-white/80 bg-white/90 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
                <div className="flex items-center gap-2">
                    <div className="rounded-xl bg-amber-100 p-2 text-amber-700">
                        <Icon className="size-4" />
                    </div>
                    <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
                </div>
                {action ? <div>{action}</div> : null}
            </div>
            <CardContent className="p-0">{children}</CardContent>
        </Card>
    );
}

export function StatusPill({ status, tone }: { status: string; tone?: Tone }) {
    const normalized = status.toLowerCase();
    const resolvedTone =
        tone ??
        (['approved', 'active', 'paid'].includes(normalized)
            ? 'emerald'
            : ['rejected', 'suspended', 'inactive', 'expired', 'cancelled', 'unpaid'].includes(normalized)
              ? 'rose'
              : 'amber');

    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ring-1',
                toneClasses[resolvedTone].pill,
            )}
        >
            <span className="size-1.5 rounded-full bg-current" />
            {status}
        </span>
    );
}

export function AdminActionLink({ href, children, tone = 'amber' }: { href: string; children: ReactNode; tone?: Tone }) {
    return (
        <Link
            href={href}
            className={cn('inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold shadow-sm transition', toneClasses[tone].button)}
        >
            {children}
        </Link>
    );
}

export function EmptyState({ children }: { children: ReactNode }) {
    return <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-10 text-center text-sm text-slate-500">{children}</div>;
}
