import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Lead } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, UserRound } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Leads', href: '/company/leads' },
];

interface CompanyLeadsProps {
    leads: { data: Lead[] };
}

const statuses: Lead['status'][] = ['new', 'contacted', 'converted', 'closed'];

export default function CompanyLeads({ leads }: CompanyLeadsProps) {
    const updateStatus = (lead: Lead, status: Lead['status']) => {
        router.patch(route('company.leads.update', lead.id), { status }, { preserveScroll: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Leads" />
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-[var(--idxi-abyss)]">Leads</h1>
                    <p className="mt-1 text-sm text-[var(--idxi-tide)]">Enquiries from buyers and directory visitors</p>
                </div>

                <div className="space-y-4">
                    {leads.data.map((lead) => (
                        <Card key={lead.id} className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                            <CardHeader>
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <CardTitle className="flex items-center gap-2 text-lg text-[var(--idxi-abyss)]">
                                            <UserRound className="size-4 text-amber-500" />
                                            {lead.name}
                                        </CardTitle>
                                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-[var(--idxi-tide)]">
                                            {lead.email ? <span className="flex items-center gap-1"><Mail className="size-3" />{lead.email}</span> : null}
                                            {lead.phone ? <span className="flex items-center gap-1"><Phone className="size-3" />{lead.phone}</span> : null}
                                        </div>
                                    </div>
                                    <Badge className="rounded-lg capitalize">{lead.status}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm text-[var(--idxi-tide)]">
                                {lead.product_interest ? <p><span className="font-medium text-[var(--idxi-abyss)]">Interest:</span> {lead.product_interest}</p> : null}
                                <p className="leading-6">{lead.message}</p>
                                <div className="flex flex-wrap gap-2">
                                    {statuses.map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => updateStatus(lead, status)}
                                            className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition ${
                                                lead.status === status ? 'bg-[var(--idxi-deep-ocean)] text-white' : 'bg-[var(--idxi-foam)] text-[var(--idxi-tide)] hover:bg-blue-50'
                                            }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {leads.data.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-[var(--idxi-shallows)] bg-white p-12 text-center text-sm text-[var(--idxi-tide)]">
                        No leads yet.
                    </div>
                ) : null}
            </div>
        </AppLayout>
    );
}
