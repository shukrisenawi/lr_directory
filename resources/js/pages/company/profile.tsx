import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Company } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Building2, Megaphone, Newspaper, Package, Store } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Company Workspace', href: '/company/profile' }];

const tabs = [
    { key: 'profile', href: 'company.profile', icon: Store },
    { key: 'products', href: 'company.products', icon: Package },
    { key: 'campaigns', href: 'company.campaigns', icon: Megaphone },
    { key: 'news', href: 'company.news', icon: Newspaper },
];

export default function CompanyProfilePage({ activeTab, company }: { activeTab: string; company: Company }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Company Workspace" />
            <div className="flex flex-col gap-6 p-6">
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[var(--idxi-deep-ocean)] to-[#0D1F3C] p-6 shadow-xl">
                    <div className="flex items-center gap-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/20 ring-1 ring-amber-500/30">
                            <Store className="size-5 text-amber-400" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold tracking-tight text-white">{company.name}</h1>
                            <p className="mt-0.5 text-sm text-blue-200">{company.summary}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.key;
                        const Icon = tab.icon;
                        return (
                            <Link
                                key={tab.key}
                                href={route(tab.href)}
                                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                                    isActive
                                        ? 'bg-amber-500 text-white shadow-sm'
                                        : 'border border-[var(--idxi-shallows)] bg-white text-[var(--idxi-tide)] hover:border-amber-200 hover:text-amber-600'
                                }`}
                            >
                                <Icon className="size-4" />
                                {tab.key.charAt(0).toUpperCase() + tab.key.slice(1)}
                            </Link>
                        );
                    })}
                </div>

                {activeTab === 'profile' && (
                    <Card className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                        <CardContent className="space-y-4 p-6 text-sm text-[var(--idxi-tide)]">
                            <div className="flex items-center gap-3">
                                <div className="flex size-8 items-center justify-center rounded-lg bg-blue-50">
                                    <Building2 className="size-4 text-[var(--idxi-current)]" />
                                </div>
                                <div>
                                    <span className="font-medium text-[var(--idxi-abyss)]">Status:</span> {company.status}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex size-8 items-center justify-center rounded-lg bg-blue-50">
                                    <Building2 className="size-4 text-[var(--idxi-current)]" />
                                </div>
                                <div>
                                    <span className="font-medium text-[var(--idxi-abyss)]">Location:</span> {company.location}
                                </div>
                            </div>
                            <div className="grid gap-3 md:grid-cols-2">
                                <div>
                                    <span className="font-medium text-[var(--idxi-abyss)]">Supplier Type:</span> {company.supplier_type || '-'}
                                </div>
                                <div>
                                    <span className="font-medium text-[var(--idxi-abyss)]">Company Type:</span> {company.company_type || '-'}
                                </div>
                                <div>
                                    <span className="font-medium text-[var(--idxi-abyss)]">WhatsApp:</span> {company.whatsapp || '-'}
                                </div>
                                <div>
                                    <span className="font-medium text-[var(--idxi-abyss)]">Delivery Coverage:</span>{' '}
                                    {company.delivery_coverage || '-'}
                                </div>
                                <div>
                                    <span className="font-medium text-[var(--idxi-abyss)]">Operating Hours:</span> {company.operating_hours || '-'}
                                </div>
                                <div>
                                    <span className="font-medium text-[var(--idxi-abyss)]">Address:</span> {company.address || '-'}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex size-8 items-center justify-center rounded-lg bg-blue-50">
                                    <Building2 className="size-4 text-[var(--idxi-current)]" />
                                </div>
                                <div>
                                    <span className="font-medium text-[var(--idxi-abyss)]">Contact:</span> {company.contact_email}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {activeTab === 'products' && company.products && (
                    <div className="grid gap-4 md:grid-cols-2">
                        {company.products.map((product) => (
                            <div
                                key={product.id}
                                className="rounded-xl border border-[var(--idxi-shallows)] bg-white p-5 shadow-sm transition hover:shadow-md"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex size-8 items-center justify-center rounded-lg bg-amber-100">
                                        <Package className="size-4 text-amber-600" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-[var(--idxi-abyss)]">{product.name}</div>
                                        <div className="mt-1 text-sm text-[var(--idxi-tide)]">{product.summary}</div>
                                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-[var(--idxi-tide)]">
                                            {product.fish_type ? <span>{product.fish_type}</span> : null}
                                            {product.price ? (
                                                <span>
                                                    ${product.price}/{product.price_unit || 'unit'}
                                                </span>
                                            ) : null}
                                            {product.minimum_order ? <span>MOQ: {product.minimum_order}</span> : null}
                                            {product.availability_status ? (
                                                <span className="capitalize">{product.availability_status.replaceAll('_', ' ')}</span>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'campaigns' && company.campaigns && (
                    <div className="grid gap-4 md:grid-cols-2">
                        {company.campaigns.map((campaign) => (
                            <div
                                key={campaign.id}
                                className="rounded-xl border border-[var(--idxi-shallows)] bg-white p-5 shadow-sm transition hover:shadow-md"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex size-8 items-center justify-center rounded-lg bg-purple-100">
                                        <Megaphone className="size-4 text-purple-600" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-[var(--idxi-abyss)]">{campaign.title}</div>
                                        <div className="mt-1 text-sm text-[var(--idxi-tide)]">{campaign.summary}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'news' && company.news_events && (
                    <div className="grid gap-4 md:grid-cols-2">
                        {company.news_events.map((newsItem) => (
                            <div
                                key={newsItem.id}
                                className="rounded-xl border border-[var(--idxi-shallows)] bg-white p-5 shadow-sm transition hover:shadow-md"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-100">
                                        <Newspaper className="size-4 text-emerald-600" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-[var(--idxi-abyss)]">{newsItem.title}</div>
                                        <div className="mt-1 text-sm text-[var(--idxi-tide)]">{newsItem.summary}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
