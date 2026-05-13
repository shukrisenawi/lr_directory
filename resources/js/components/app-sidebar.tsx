import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BellRing, BriefcaseBusiness, CreditCard, Heart, LayoutGrid, MessageCircleMore, ShieldCheck, Store, Tags } from 'lucide-react';
import AppLogo from './app-logo';

const footerNavItems: NavItem[] = [
    {
        title: 'Browse Directory',
        url: '/directory',
        icon: BriefcaseBusiness,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const role = auth.user?.role ?? 'normal';

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: LayoutGrid,
        },
        ...(role === 'normal'
            ? [
                  { title: 'Favorites', url: '/favorites', icon: Heart },
                  { title: 'Messages', url: '/messages', icon: MessageCircleMore },
                  { title: 'Subscription', url: '/subscription', icon: CreditCard },
              ]
            : []),
        ...(role === 'company'
            ? [
                  { title: 'Company Profile', url: '/company/profile', icon: Store },
                  { title: 'Products', url: '/company/products', icon: Tags },
                  { title: 'Messages', url: '/messages', icon: MessageCircleMore },
                  { title: 'Leads', url: '/company/leads', icon: Heart },
                  { title: 'Analytics', url: '/company/analytics', icon: LayoutGrid },
                  { title: 'Subscription', url: '/company/subscription', icon: CreditCard },
              ]
            : []),
        ...(role === 'admin'
            ? [
                  { title: 'Admin Console', url: '/admin', icon: ShieldCheck },
                  { title: 'Users', url: '/admin/users', icon: Store },
                  { title: 'Companies', url: '/admin/companies', icon: BriefcaseBusiness },
                  { title: 'Claims', url: '/admin/claims', icon: BellRing },
                  { title: 'Subscriptions', url: '/admin/subscriptions', icon: CreditCard },
                  { title: 'Analytics', url: '/admin/analytics', icon: LayoutGrid },
              ]
            : []),
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader className="border-b border-white/10 pb-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="px-1 py-3">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="pb-3">
                <SidebarSeparator />
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
