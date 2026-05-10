import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { type Company, type SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

interface CompanyShowProps {
    company: Company;
}

export default function CompanyShow({ company }: CompanyShowProps) {
    const { auth } = usePage<SharedData>().props;
    const { data, setData, post, processing } = useForm({ message: '' });

    return (
        <div className="min-h-screen bg-[var(--idxi-cream)]">
            <Head title={company.name} />

            <div className="relative h-[22rem] overflow-hidden">
                <img src={company.hero_image || '/assets/hero-market.jpg'} alt={company.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.18),rgba(15,23,42,0.82))]" />
                <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 text-white sm:px-6 lg:px-8">
                    <Link href={route('directory.index')} className="text-sm text-white/80">Back to directory</Link>
                    <h1 className="mt-3 text-4xl font-semibold">{company.name}</h1>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-white/78">{company.summary}</p>
                </div>
            </div>

            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
                <div className="space-y-8">
                    <Card className="border-slate-200">
                        <CardHeader>
                            <CardTitle>Company profile</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 text-sm leading-7 text-slate-600">
                            <p>{company.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {company.categories?.map((category) => (
                                    <span key={category.slug} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                                        {category.name}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                        <CardHeader>
                            <CardTitle>Products</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2">
                            {company.products?.map((product) => (
                                <div key={product.id} className="rounded-[20px] border border-slate-200 p-4">
                                    <div className="text-sm font-semibold text-slate-900">{product.name}</div>
                                    <p className="mt-2 text-sm text-slate-500">{product.summary}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="border-slate-200">
                        <CardHeader>
                            <CardTitle>Directory status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-slate-600">
                            <div><span className="font-medium text-slate-900">Type:</span> {company.company_type}</div>
                            <div><span className="font-medium text-slate-900">Location:</span> {company.location}</div>
                            <div><span className="font-medium text-slate-900">Website:</span> {company.website || 'Available after login'}</div>
                            <div><span className="font-medium text-slate-900">Email:</span> {company.contact_email || 'Login required'}</div>
                            <div><span className="font-medium text-slate-900">Phone:</span> {company.contact_phone || 'Login required'}</div>
                        </CardContent>
                    </Card>

                    {auth.user ? (
                        <Card className="border-slate-200">
                            <CardHeader>
                                <CardTitle>Claim this listing</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Textarea
                                    value={data.message}
                                    onChange={(event) => setData('message', event.target.value)}
                                    placeholder="Tell the admin how this listing belongs to your company."
                                />
                                <Button onClick={() => post(route('claims.store', company.id))} disabled={processing}>
                                    Submit claim request
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="border-slate-200">
                            <CardContent className="space-y-4 p-6">
                                <div className="text-sm text-slate-600">Login to view direct contact details, add favorites, and claim this listing.</div>
                                <Button asChild>
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
