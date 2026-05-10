import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { type Company } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

interface DirectoryIndexProps {
    filters: { q: string; location: string };
    companies: {
        data: Company[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
}

export default function DirectoryIndex({ filters, companies }: DirectoryIndexProps) {
    const [query, setQuery] = useState(filters.q ?? '');
    const [location, setLocation] = useState(filters.location ?? '');

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.get(route('directory.index'), { q: query, location }, { preserveState: true });
    };

    return (
        <div className="min-h-screen bg-[var(--idxi-cream)]">
            <Head title="Directory" />

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
                    <h1 className="text-4xl font-semibold text-slate-900">Directory Search</h1>
                    <p className="mt-3 max-w-2xl text-slate-500">Browse companies by keywords, location, and fishery service type.</p>
                    <form onSubmit={submit} className="mt-8 grid gap-4 md:grid-cols-[1fr_1fr_auto]">
                        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search company or service" className="h-12" />
                        <Input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Location" className="h-12" />
                        <Button type="submit" className="h-12 px-6">Search</Button>
                    </form>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {companies.data.map((company) => (
                        <Link key={company.id} href={route('directory.show', company.slug)} className="group">
                            <Card className="overflow-hidden border-slate-200 bg-white shadow-none transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/70">
                                <div className="aspect-[16/10] overflow-hidden">
                                    <img src={company.hero_image || '/assets/hero-market.jpg'} alt={company.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                </div>
                                <CardContent className="space-y-3 p-5">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h2 className="text-lg font-semibold text-slate-900">{company.name}</h2>
                                            <p className="text-sm text-slate-500">{company.location}</p>
                                        </div>
                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{company.company_type}</span>
                                    </div>
                                    <p className="line-clamp-3 text-sm leading-6 text-slate-600">{company.summary}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
