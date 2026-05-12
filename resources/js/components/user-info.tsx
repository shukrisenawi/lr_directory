import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';

export function UserInfo({ user, showEmail = false }: { user: User; showEmail?: boolean }) {
    const getInitials = useInitials();
    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-lg ring-1 ring-white/20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-amber-500 text-white text-xs font-semibold">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium text-white">{user.name}</span>
                {showEmail && <span className="truncate text-xs text-blue-300">{user.email}</span>}
            </div>
        </>
    );
}
