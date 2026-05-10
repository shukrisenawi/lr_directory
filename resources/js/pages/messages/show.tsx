import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

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
    const [messages, setMessages] = useState(conversation.messages);

    useEffect(() => {
        const channel = window.Echo.private(`conversation.${conversation.id}`).listen('.message.sent', (event: { message: { id: number; body: string; created_at: string; user_id: number } }) => {
            setMessages((current) => {
                if (current.some((message) => message.id === event.message.id)) {
                    return current;
                }

                return [
                    ...current,
                    {
                        id: event.message.id,
                        body: event.message.body,
                        created_at: event.message.created_at,
                        user: { name: 'New message', role: 'company' },
                    },
                ];
            });
        });

        return () => {
            channel.stopListening('.message.sent');
            window.Echo.leave(`private-conversation.${conversation.id}`);
        };
    }, [conversation.id]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={conversation.company.name} />
            <div className="grid gap-6 p-4 lg:grid-cols-[1fr_340px]">
                <Card className="border-slate-200 shadow-none">
                    <CardHeader>
                        <CardTitle>{conversation.company.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className="rounded-[18px] border border-slate-200 bg-slate-50 p-4">
                                <div className="text-sm font-semibold text-slate-900">{message.user.name}</div>
                                <div className="mt-2 text-sm leading-6 text-slate-600">{message.body}</div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-none">
                    <CardHeader>
                        <CardTitle>Reply</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea value={data.body} onChange={(event) => setData('body', event.target.value)} placeholder="Type your reply..." />
                        <Button
                            onClick={() =>
                                post(route('messages.store', conversation.id), {
                                    onSuccess: () => setData('body', ''),
                                })
                            }
                            disabled={processing}
                        >
                            Send message
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
