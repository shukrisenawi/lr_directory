import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { type Company } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { MapPin, Search, SlidersHorizontal } from 'lucide-react';
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
        <div className="min-h-screen bg-[var(--idxi-foam)]">
            <Head title="Directory" />

            <div className="bg-gradient-to-b from-[var(--idxi-deep-ocean)] to-[var(--idxi-current)]">
                <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/10 backdrop-blur-sm">
                        <h1 className="text-3xl font-semibold tracking-tight text-white">Directory Search</h1>
                        <p className="mt-2 text-sm text-blue-200">Browse companies by keywords, location, and fishery service type.</p>
                        <form onSubmit={submit} className="mt-6 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                            <div className="relative">
                                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-blue-400" />
                                <Input
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder="Search company or service"
                                    className="h-11 border-0 bg-white/10 pl-9 text-sm text-white placeholder:text-blue-300/60 focus-visible:ring-2 focus-visible:ring-amber-500"
                                />
                            </div>
                            <div className="relative">
                                <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-blue-400" />
                                <Input
                                    value={location}
                                    onChange={(event) => setLocation(event.target.value)}
                                    placeholder="Location"
                                    className="h-11 border-0 bg-white/10 pl-9 text-sm text-white placeholder:text-blue-300/60 focus-visible:ring-2 focus-visible:ring-amber-500"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="h-11 rounded-xl bg-amber-500 px-6 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 hover:bg-amber-600"
                            >
                                <Search className="size-4" />
                                Search
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center gap-2 text-sm text-[var(--idxi-tide)]">
                    <SlidersHorizontal className="size-3.5" />
                    <span>{companies.data.length} companies found</span>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {companies.data.map((company) => (
                        <Link key={company.id} href={route('directory.show', company.slug)} className="group">
                            <Card className="overflow-hidden border-[var(--idxi-shallows)] bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[var(--idxi-deep-ocean)]/8 hover:shadow-xl">
                                <div className="aspect-[16/10] overflow-hidden bg-[var(--idxi-foam)]">
                                    <img
                                        src={company.hero_image || '/assets/hero-market.jpg'}
                                        alt={company.name}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <CardContent className="space-y-3 p-5">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h2 className="font-semibold text-[var(--idxi-abyss)]">{company.name}</h2>
                                            <p className="flex items-center gap-1.5 text-sm text-[var(--idxi-tide)]">
                                                <MapPin className="size-3.5 shrink-0" />
                                                {company.location}
                                            </p>
                                        </div>
                                        <span className="rounded-lg bg-[var(--idxi-coral)]/10 px-2.5 py-0.5 text-[11px] font-medium text-[var(--idxi-coral)]">
                                            {company.company_type}
                                        </span>
                                    </div>
                                    <p className="line-clamp-3 text-sm leading-6 text-[var(--idxi-tide)]">{company.summary}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
