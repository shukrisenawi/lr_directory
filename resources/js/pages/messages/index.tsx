import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Messages', href: '/messages' }];

interface ConversationListProps {
    conversations: Array<{
        id: number;
        company: { name: string; logo?: string | null };
        messages: Array<{ body: string; created_at: string }>;
        last_message_at?: string | null;
    }>;
}

export default function MessageListPage({ conversations }: ConversationListProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Messages" />
            <div className="grid gap-4 p-4">
                {conversations.map((conversation) => (
                    <Link key={conversation.id} href={route('messages.show', conversation.id)}>
                        <Card className="border-slate-200 shadow-none">
                            <CardContent className="flex items-center justify-between gap-4 p-5">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={conversation.company.logo || '/assets/idxi-fish-logo.png'}
                                        alt={conversation.company.name}
                                        className="size-12 rounded-full border border-slate-200 bg-slate-50 p-1"
                                    />
                                    <div>
                                        <div className="font-semibold text-slate-900">{conversation.company.name}</div>
                                        <div className="text-sm text-slate-500">{conversation.messages[0]?.body ?? 'No messages yet.'}</div>
                                    </div>
                                </div>
                                <div className="text-xs text-slate-400">{conversation.last_message_at ?? 'New'}</div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </AppLayout>
    );
}
