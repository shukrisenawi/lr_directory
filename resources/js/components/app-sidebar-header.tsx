import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const { auth } = usePage<SharedData>().props;
    const impersonation = auth.impersonation;

    return (
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-2 border-b border-white/70 bg-white/75 px-6 shadow-[0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1 text-[var(--idxi-tide)] hover:text-[var(--idxi-abyss)]" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className="ml-auto flex items-center gap-3">
                {impersonation?.active ? (
                    <Link
                        href={route('impersonation.stop')}
                        method="post"
                        as="button"
                        className="inline-flex cursor-pointer items-center rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-800 ring-1 ring-amber-200 transition hover:bg-amber-200"
                    >
                        Kembali sebagai {impersonation.admin?.name ?? 'admin'}
                    </Link>
                ) : null}
                <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm">
                    <span className="flex size-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.16)]" />
                    Sistem aktif
                </div>
            </div>
        </header>
    );
}
