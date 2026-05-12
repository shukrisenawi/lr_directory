import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';

export function UserInfo({ user, showEmail = false }: { user: User; showEmail?: boolean }) {
    const getInitials = useInitials();
    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-lg ring-1 ring-sidebar-border">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-br from-[var(--idxi-deep-ocean)] to-[var(--idxi-current)] text-white text-xs font-semibold">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium text-[var(--idxi-abyss)]">{user.name}</span>
                {showEmail && <span className="truncate text-xs text-[var(--idxi-tide)]">{user.email}</span>}
            </div>
        </>
    );
}
