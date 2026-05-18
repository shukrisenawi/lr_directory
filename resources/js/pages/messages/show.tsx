import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Send } from 'lucide-react';
import { useState } from 'react';

interface MessageShowProps {
    conversation: {
        id: number;
        company: { name: string };
        messages: Array<{ id: number; body: string; created_at: string; user: { name: string; role: string } }>;
    };
}

export default function MessageShowPage({ conversation }: MessageShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Messages', href: '/messages' },
        { title: conversation.company.name, href: `/messages/${conversation.id}` },
    ];

    const { data, setData, post, processing } = useForm({ body: '' });
    const [messages] = useState(conversation.messages);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={conversation.company.name} />
            <div className="grid gap-6 p-4 lg:grid-cols-[1fr_340px]">
                <Card className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg text-[var(--idxi-abyss)]">{conversation.company.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className="rounded-xl border border-[var(--idxi-shallows)] bg-[var(--idxi-foam)] p-4">
                                <div className="text-sm font-semibold text-[var(--idxi-abyss)]">{message.user.name}</div>
                                <div className="mt-2 text-sm leading-6 text-[var(--idxi-tide)]">{message.body}</div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg text-[var(--idxi-abyss)]">Reply</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea
                            value={data.body}
                            onChange={(event) => setData('body', event.target.value)}
                            placeholder="Type your reply..."
                            className="border-[var(--idxi-shallows)] focus-visible:ring-2 focus-visible:ring-amber-500"
                        />
                        <Button
                            onClick={() =>
                                post(route('messages.store', conversation.id), {
                                    onSuccess: () => setData('body', ''),
                                })
                            }
                            disabled={processing}
                            className="rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/25 hover:bg-amber-600"
                        >
                            <Send className="size-4" />
                            Send message
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
