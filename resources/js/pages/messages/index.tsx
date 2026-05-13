import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { MessageCircleMore } from 'lucide-react';

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
            <div className="p-4">
                <div className="mb-6">
                    <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-[var(--idxi-abyss)]">
                        <MessageCircleMore className="size-5 text-amber-500" />
                        Messages
                    </h1>
                </div>
                <div className="grid gap-4">
                    {conversations.map((conversation) => (
                        <Link key={conversation.id} href={route('messages.show', conversation.id)}>
                            <Card className="border-[var(--idxi-shallows)] bg-white shadow-sm transition duration-200 hover:shadow-md">
                                <CardContent className="flex items-center justify-between gap-4 p-5">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={conversation.company.logo || '/assets/idxi-fish-logo.png'}
                                            alt={conversation.company.name}
                                            className="size-12 rounded-xl border border-[var(--idxi-shallows)] bg-[var(--idxi-foam)] p-1"
                                        />
                                        <div>
                                            <div className="font-semibold text-[var(--idxi-abyss)]">{conversation.company.name}</div>
                                            <div className="mt-0.5 text-sm text-[var(--idxi-tide)]">
                                                {conversation.messages[0]?.body ?? 'No messages yet.'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-[var(--idxi-tide)]">{conversation.last_message_at ?? 'New'}</div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
