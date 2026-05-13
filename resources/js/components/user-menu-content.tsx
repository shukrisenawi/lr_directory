import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useInitials } from '@/hooks/use-initials';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type User } from '@/types';
import { Link } from '@inertiajs/react';
import { LogOut, Settings, Sparkles } from 'lucide-react';

interface UserMenuContentProps {
    user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();
    const getInitials = useInitials();

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="overflow-hidden rounded-[1.4rem] border border-slate-200/80 bg-[linear-gradient(135deg,#07182f_0%,#0a3155_48%,#0f766e_100%)] p-4 text-left text-sm text-white shadow-[0_18px_40px_rgba(7,24,47,0.2)]">
                    <div className="flex items-start gap-3">
                        <Avatar className="size-11 rounded-2xl ring-1 ring-white/20">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="bg-amber-400 text-sm font-bold text-slate-950">{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                <span className="truncate text-sm font-semibold text-white">{user.name}</span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-white/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-100">
                                    <Sparkles className="size-3" />
                                    Admin
                                </span>
                            </div>
                            <p className="mt-1 truncate text-xs text-cyan-50/78">{user.email}</p>
                            <p className="mt-3 text-xs leading-5 text-cyan-50/70">Akses pantas untuk profil, tetapan akaun, dan keluar dari sesi semasa.</p>
                        </div>
                    </div>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="mx-0 my-2 bg-slate-200" />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 font-medium text-slate-700 transition hover:bg-cyan-50 hover:text-cyan-700"
                        href={route('profile.edit')}
                        as="button"
                        prefetch
                        onClick={cleanup}
                    >
                        <span className="flex size-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
                            <Settings className="size-4" />
                        </span>
                        <span className="flex flex-1 flex-col text-left">
                            <span className="text-sm font-semibold">Settings</span>
                            <span className="text-xs font-normal text-slate-500">Urus profil, kata laluan, dan tetapan akaun.</span>
                        </span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="mx-0 my-2 bg-slate-200" />
            <DropdownMenuItem asChild>
                <Link
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 font-medium text-rose-600 transition hover:bg-rose-50 hover:text-rose-700"
                    method="post"
                    href={route('logout')}
                    as="button"
                    onClick={cleanup}
                >
                    <span className="flex size-9 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
                        <LogOut className="size-4" />
                    </span>
                    <span className="flex flex-1 flex-col text-left">
                        <span className="text-sm font-semibold">Log out</span>
                        <span className="text-xs font-normal text-rose-400">Tamatkan sesi semasa dengan selamat.</span>
                    </span>
                </Link>
            </DropdownMenuItem>
        </>
    );
}
