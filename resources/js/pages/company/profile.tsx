import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type BreadcrumbItem, type Company } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Store } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Company Workspace', href: '/company/profile' }];

export default function CompanyProfilePage({ activeTab, company }: { activeTab: string; company: Company }) {
    const tabs = [
        { key: 'profile', href: route('company.profile') },
        { key: 'products', href: route('company.products') },
        { key: 'campaigns', href: route('company.campaigns') },
        { key: 'news', href: route('company.news') },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Company Workspace" />
            <div className="flex flex-col gap-6 p-4">
                <div className="rounded-xl border border-[var(--idxi-shallows)] bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-amber-100">
                            <Store className="size-5 text-amber-600" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold tracking-tight text-[var(--idxi-abyss)]">{company.name}</h1>
                            <p className="mt-1 text-sm text-[var(--idxi-tide)]">{company.summary}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.key}
                            href={tab.href}
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                                activeTab === tab.key
                                    ? 'bg-amber-500 text-white shadow-sm'
                                    : 'border border-[var(--idxi-shallows)] bg-white text-[var(--idxi-tide)] hover:border-amber-200 hover:text-amber-600'
                            }`}
                        >
                            {tab.key.charAt(0).toUpperCase() + tab.key.slice(1)}
                        </Link>
                    ))}
                </div>

                {activeTab === 'profile' && (
                    <Card className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                        <CardContent className="space-y-4 p-6 text-sm text-[var(--idxi-tide)]">
                            <div className="flex gap-2"><span className="font-medium text-[var(--idxi-abyss)]">Status:</span> {company.status}</div>
                            <div className="flex gap-2"><span className="font-medium text-[var(--idxi-abyss)]">Location:</span> {company.location}</div>
                            <div className="flex gap-2"><span className="font-medium text-[var(--idxi-abyss)]">Contact:</span> {company.contact_email}</div>
                        </CardContent>
                    </Card>
                )}
                {activeTab === 'products' && (
                    <Card className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                        <CardContent className="grid gap-3 p-6 md:grid-cols-2">
                            {company.products?.map((product) => (
                                <div key={product.id} className="rounded-xl border border-[var(--idxi-shallows)] bg-[var(--idxi-foam)] p-4 text-sm">
                                    <div className="font-semibold text-[var(--idxi-abyss)]">{product.name}</div>
                                    <div className="mt-2 text-[var(--idxi-tide)]">{product.summary}</div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}
                {activeTab === 'campaigns' && (
                    <Card className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                        <CardContent className="space-y-3 p-6 text-sm">
                            {company.campaigns?.map((campaign) => (
                                <div key={campaign.id} className="rounded-xl border border-[var(--idxi-shallows)] bg-[var(--idxi-foam)] p-4">
                                    <div className="font-semibold text-[var(--idxi-abyss)]">{campaign.title}</div>
                                    <div className="mt-2 text-[var(--idxi-tide)]">{campaign.summary}</div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}
                {activeTab === 'news' && (
                    <Card className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                        <CardContent className="space-y-3 p-6 text-sm">
                            {company.news_events?.map((newsItem) => (
                                <div key={newsItem.id} className="rounded-xl border border-[var(--idxi-shallows)] bg-[var(--idxi-foam)] p-4">
                                    <div className="font-semibold text-[var(--idxi-abyss)]">{newsItem.title}</div>
                                    <div className="mt-2 text-[var(--idxi-tide)]">{newsItem.summary}</div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
