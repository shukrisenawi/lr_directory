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
                <div className="overflow-hidden rounded-[1rem] border border-slate-200/80 bg-[linear-gradient(135deg,#07182f_0%,#0a3155_48%,#0f766e_100%)] p-2.5 text-left text-sm text-white shadow-[0_14px_34px_rgba(7,24,47,0.16)]">
                    <div className="flex items-center gap-2.5">
                        <Avatar className="size-9 rounded-xl ring-1 ring-white/20">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="bg-amber-400 text-xs font-bold text-slate-950">{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                                <span className="truncate text-[13px] font-semibold text-white">{user.name}</span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-white/12 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-100">
                                    <Sparkles className="size-2.5" />
                                    Admin
                                </span>
                            </div>
                            <p className="mt-0.5 truncate text-[11px] text-cyan-50/78">{user.email}</p>
                        </div>
                    </div>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="mx-0 my-1.5 bg-slate-200" />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 font-medium text-slate-700 transition hover:bg-cyan-50 hover:text-cyan-700"
                        href={route('profile.edit')}
                        as="button"
                        prefetch
                        onClick={cleanup}
                    >
                        <span className="flex size-7 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                            <Settings className="size-3.5" />
                        </span>
                        <span className="flex-1 text-left text-[13px] font-semibold">Settings</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="mx-0 my-1.5 bg-slate-200" />
            <DropdownMenuItem asChild>
                <Link
                    className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 font-medium text-rose-600 transition hover:bg-rose-50 hover:text-rose-700"
                    method="post"
                    href={route('logout')}
                    as="button"
                    onClick={cleanup}
                >
                    <span className="flex size-7 items-center justify-center rounded-lg bg-rose-50 text-rose-500">
                        <LogOut className="size-3.5" />
                    </span>
                    <span className="flex-1 text-left text-[13px] font-semibold">Log out</span>
                </Link>
            </DropdownMenuItem>
        </>
    );
}
