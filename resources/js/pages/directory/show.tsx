import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { type Company, type SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Building2, Globe, Mail, MapPin, Phone, Tag } from 'lucide-react';

interface CompanyShowProps {
    company: Company;
}

export default function CompanyShow({ company }: CompanyShowProps) {
    const { auth } = usePage<SharedData>().props;
    const { data, setData, post, processing } = useForm({ message: '' });

    return (
        <div className="min-h-screen bg-[var(--idxi-foam)]">
            <Head title={company.name} />

            <div className="relative h-[24rem] overflow-hidden">
                <img src={company.hero_image || '/assets/hero-market.jpg'} alt={company.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--idxi-deep-ocean)]/90 via-[var(--idxi-deep-ocean)]/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
                    <Link href={route('directory.index')} className="mb-3 inline-flex items-center gap-1.5 text-sm text-blue-200 transition hover:text-amber-400">
                        <ArrowLeft className="size-3.5" />
                        Back to directory
                    </Link>
                    <h1 className="text-4xl font-semibold tracking-tight text-white">{company.name}</h1>
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-blue-200">
                        <MapPin className="size-3.5" />
                        {company.location}
                    </p>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80">{company.summary}</p>
                </div>
            </div>

            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
                <div className="space-y-8">
                    <Card className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg text-[var(--idxi-abyss)]">Company profile</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 text-sm leading-7 text-[var(--idxi-tide)]">
                            <p>{company.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {company.categories?.map((category) => (
                                    <span key={category.slug} className="rounded-lg bg-[var(--idxi-foam)] px-3 py-1.5 text-xs font-medium text-[var(--idxi-current)]">
                                        {category.name}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg text-[var(--idxi-abyss)]">Products</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2">
                            {company.products?.map((product) => (
                                <div key={product.id} className="rounded-xl border border-[var(--idxi-shallows)] bg-[var(--idxi-foam)] p-4 shadow-sm transition hover:border-amber-200">
                                    <div className="text-sm font-semibold text-[var(--idxi-abyss)]">{product.name}</div>
                                    <p className="mt-2 text-sm text-[var(--idxi-tide)]">{product.summary}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg text-[var(--idxi-abyss)]">Directory status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-[var(--idxi-tide)]">
                            <div className="flex items-center gap-3">
                                <Building2 className="size-4 shrink-0 text-[var(--idxi-current)]" />
                                <div>
                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--idxi-tide)]">Type</span>
                                    <p className="font-medium text-[var(--idxi-abyss)]">{company.company_type}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="size-4 shrink-0 text-[var(--idxi-current)]" />
                                <div>
                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--idxi-tide)]">Location</span>
                                    <p className="font-medium text-[var(--idxi-abyss)]">{company.location}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Globe className="size-4 shrink-0 text-[var(--idxi-current)]" />
                                <div>
                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--idxi-tide)]">Website</span>
                                    <p className="font-medium text-[var(--idxi-abyss)]">{company.website || 'Available after login'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="size-4 shrink-0 text-[var(--idxi-current)]" />
                                <div>
                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--idxi-tide)]">Email</span>
                                    <p className="font-medium text-[var(--idxi-abyss)]">{company.contact_email || 'Login required'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="size-4 shrink-0 text-[var(--idxi-current)]" />
                                <div>
                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--idxi-tide)]">Phone</span>
                                    <p className="font-medium text-[var(--idxi-abyss)]">{company.contact_phone || 'Login required'}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {auth.user ? (
                        <Card className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg text-[var(--idxi-abyss)]">Claim this listing</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Textarea
                                    value={data.message}
                                    onChange={(event) => setData('message', event.target.value)}
                                    placeholder="Tell the admin how this listing belongs to your company."
                                    className="border-[var(--idxi-shallows)] focus-visible:ring-2 focus-visible:ring-amber-500"
                                />
                                <Button
                                    onClick={() => post(route('claims.store', company.id))}
                                    disabled={processing}
                                    className="rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/25 hover:bg-amber-600"
                                >
                                    Submit claim request
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="border-[var(--idxi-shallows)] bg-white shadow-sm">
                            <CardContent className="space-y-4 p-6">
                                <div className="flex items-center gap-3">
                                    <Tag className="size-5 text-amber-500" />
                                    <p className="text-sm text-[var(--idxi-tide)]">Login to view contact details, add favorites, and claim this listing.</p>
                                </div>
                                <Button asChild className="w-full rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/25 hover:bg-amber-600">
                                    <Link href={route('login')}>Login to continue</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
