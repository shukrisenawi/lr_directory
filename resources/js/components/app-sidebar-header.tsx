import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-[var(--idxi-shallows)] bg-white px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1 text-[var(--idxi-tide)] hover:text-[var(--idxi-abyss)]" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className="ml-auto flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-lg border border-[var(--idxi-shallows)] bg-[var(--idxi-foam)] px-3 py-1.5 text-xs text-[var(--idxi-tide)]">
                    <span className="flex size-2 rounded-full bg-emerald-400" />
                    Online
                </div>
            </div>
        </header>
    );
}
