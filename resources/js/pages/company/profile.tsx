import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type BreadcrumbItem, type Company } from '@/types';
import { Head, Link } from '@inertiajs/react';

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
                <Card className="border-slate-200 shadow-none">
                    <CardHeader>
                        <CardTitle>{company.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-600">{company.summary}</CardContent>
                </Card>

                <div className="flex flex-wrap gap-2">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.key}
                            href={tab.href}
                            className={`rounded-full px-4 py-2 text-sm transition ${
                                activeTab === tab.key
                                    ? 'bg-[var(--idxi-admin-accent)] text-white'
                                    : 'bg-white text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            {tab.key.charAt(0).toUpperCase() + tab.key.slice(1)}
                        </Link>
                    ))}
                </div>

                {activeTab === 'profile' && (
                        <Card className="border-slate-200 shadow-none">
                            <CardContent className="space-y-3 p-6 text-sm text-slate-600">
                                <div>Status: {company.status}</div>
                                <div>Location: {company.location}</div>
                                <div>Contact: {company.contact_email}</div>
                            </CardContent>
                        </Card>
                )}
                {activeTab === 'products' && (
                        <Card className="border-slate-200 shadow-none">
                            <CardContent className="grid gap-3 p-6 md:grid-cols-2">
                                {company.products?.map((product) => (
                                    <div key={product.id} className="rounded-[18px] border border-slate-200 p-4 text-sm">
                                        <div className="font-semibold text-slate-900">{product.name}</div>
                                        <div className="mt-2 text-slate-500">{product.summary}</div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                )}
                {activeTab === 'campaigns' && (
                        <Card className="border-slate-200 shadow-none">
                            <CardContent className="space-y-3 p-6 text-sm">
                                {company.campaigns?.map((campaign) => (
                                    <div key={campaign.id} className="rounded-[18px] border border-slate-200 p-4">
                                        <div className="font-semibold text-slate-900">{campaign.title}</div>
                                        <div className="mt-2 text-slate-500">{campaign.summary}</div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                )}
                {activeTab === 'news' && (
                        <Card className="border-slate-200 shadow-none">
                            <CardContent className="space-y-3 p-6 text-sm">
                                {company.news_events?.map((newsItem) => (
                                    <div key={newsItem.id} className="rounded-[18px] border border-slate-200 p-4">
                                        <div className="font-semibold text-slate-900">{newsItem.title}</div>
                                        <div className="mt-2 text-slate-500">{newsItem.summary}</div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                )}
            </div>
        </AppLayout>
    );
}
