import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { type Category, type Company, type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowRight, MapPin, Search, ShieldCheck, Users, Building2 } from 'lucide-react';
import { FormEvent, useState } from 'react';

interface WelcomeProps {
    featuredCategories: Category[];
    newListings: Company[];
    featuredCompanies: Company[];
    steps: Array<{ title: string; copy: string }>;
    testimonial: { quote: string; author: string };
}

export default function Welcome({ featuredCategories, newListings, featuredCompanies, steps, testimonial }: WelcomeProps) {
    const { auth } = usePage<SharedData>().props;
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('');
    const [openCategory, setOpenCategory] = useState<number | null>(null);

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.get(route('directory.index'), { q: query, location }, { preserveState: true });
    };

    return (
        <>
            <Head title="IDXI Directory" />

            <div className="min-h-screen bg-[var(--idxi-foam)] text-[var(--idxi-abyss)]">
                <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#0A2647] to-[#1E3A5F]">
                    <div className="pointer-events-none absolute inset-0 bg-[url('/assets/hero.png')] bg-cover bg-center opacity-20" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.12),transparent_60%)]" />

                    <div className="relative mx-auto flex min-h-[36rem] max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
                        <header className="flex items-center justify-between">
                            <Link href={route('home')} className="flex items-center gap-3">
                                <img src="/logo_white.png" alt="IDXI" className="size-11" />
                                <div>
                                    <div className="text-2xl font-semibold tracking-wider text-white">IDXI</div>
                                    <div className="text-[10px] tracking-[0.3em] text-blue-200">INFOFISH DIRECTORY</div>
                                </div>
                            </Link>

                            <div className="flex items-center gap-3">
                                {auth.user ? (
                                    <Button asChild className="bg-amber-500 text-white shadow-lg shadow-amber-500/25 hover:bg-amber-600">
                                        <Link href={route('dashboard')}>Dashboard</Link>
                                    </Button>
                                ) : (
                                    <>
                                        <Button asChild variant="ghost" className="text-white/80 hover:bg-white/10 hover:text-white">
                                            <Link href={route('login')}>Login</Link>
                                        </Button>
                                        <Button asChild className="bg-amber-500 text-white shadow-lg shadow-amber-500/25 hover:bg-amber-600">
                                            <Link href={route('register')}>Add Listing</Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </header>

                        <div className="mx-auto flex flex-1 flex-col items-center justify-center pb-16 text-center">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wider text-blue-200 backdrop-blur-sm">
                                <ShieldCheck className="size-3.5 text-amber-400" />
                                TRUSTED FISHERY DIRECTORY
                            </div>
                            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Find trusted fishery suppliers,{' '}
                                <span className="text-amber-400">processors,</span>
                                <br />
                                and service partners.
                            </h1>
                            <p className="mt-5 max-w-2xl text-base leading-relaxed text-blue-200">
                                Public search for buyers. Claim, manage, and grow your listing once your team signs in.
                            </p>

                            <form onSubmit={submit} className="mt-10 flex w-full max-w-4xl flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 shadow-2xl shadow-black/20 backdrop-blur-md md:flex-row">
                                <div className="flex-1">
                                    <label className="mb-1.5 block px-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-blue-300">What</label>
                                    <div className="relative">
                                        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-blue-400" />
                                        <Input
                                            value={query}
                                            onChange={(event) => setQuery(event.target.value)}
                                            placeholder="Seafood, Processor, Freezer or Service"
                                            className="h-11 border-0 bg-white/10 pl-9 text-sm text-white placeholder:text-blue-300/60 focus-visible:ring-2 focus-visible:ring-amber-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <label className="mb-1.5 block px-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-blue-300">Where</label>
                                    <div className="relative">
                                        <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-blue-400" />
                                        <Input
                                            value={location}
                                            onChange={(event) => setLocation(event.target.value)}
                                            placeholder="Port City or Region"
                                            className="h-11 border-0 bg-white/10 pl-9 text-sm text-white placeholder:text-blue-300/60 focus-visible:ring-2 focus-visible:ring-amber-500"
                                        />
                                    </div>
                                </div>
                                <Button type="submit" className="mt-0 h-11 rounded-xl bg-amber-500 px-8 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 hover:bg-amber-600 md:mt-5">
                                    <Search className="size-4" />
                                    Search
                                </Button>
                            </form>

                            <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-blue-300">
                                <span>Popular:</span>
                                {featuredCategories.slice(0, 4).map((category) => (
                                    <Link
                                        key={category.id}
                                        href={route('categories.show', category.slug)}
                                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-blue-200 transition hover:border-amber-400/30 hover:text-amber-400"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-b border-[var(--idxi-shallows)] bg-white py-10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--idxi-tide)]">Categories</span>
                            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--idxi-abyss)]">Browse by category</h2>
                            <p className="mt-1 text-sm text-[var(--idxi-tide)]">Find exactly what you need across our fishery network</p>
                        </div>
                        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {featuredCategories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setOpenCategory(openCategory === category.id ? null : category.id)}
                                    className={`w-full rounded-lg border p-3 text-left transition duration-200 ${
                                        openCategory === category.id
                                            ? 'border-[var(--idxi-current)] bg-blue-50 shadow'
                                            : 'border-blue-200 bg-white hover:border-[var(--idxi-current)] hover:shadow'
                                    }`}
                                >
                                    <div className={`flex items-center justify-between text-sm font-medium ${openCategory === category.id ? 'text-[var(--idxi-current)]' : 'text-[var(--idxi-abyss)]'}`}>
                                        <span>{category.name}</span>
                                        <span className="rounded-full bg-[var(--idxi-coral)]/10 px-2 py-0.5 text-[11px] font-medium text-[var(--idxi-coral)]">
                                            {((category.companies_count ?? 0) + category.children.reduce((sum, c) => sum + (c.companies_count ?? 0), 0))}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {openCategory && (() => {
                            const cat = featuredCategories.find(c => c.id === openCategory);
                            const children = cat?.children?.filter(c => (c.companies_count ?? 0) > 0) ?? [];
                            if (!cat || children.length === 0) return null;
                            return (
                                <div className="mt-4 rounded-xl border border-[var(--idxi-shallows)] bg-white p-4 shadow">
                                    <div className="flex items-center justify-between gap-4">
                                        <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--idxi-tide)]">
                                            {cat.name} &mdash; {children.length} subcategories
                                        </h3>
                                        <Link
                                            href={route('categories.show', cat.slug)}
                                            className="flex shrink-0 items-center gap-1 rounded-lg bg-[var(--idxi-deep-ocean)] px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-[var(--idxi-current)]"
                                        >
                                            Browse all
                                            <ArrowRight className="size-3" />
                                        </Link>
                                    </div>
                                    <div className="mt-3 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                                        {children.map((child) => (
                                            <Link
                                                key={child.slug}
                                                href={route('categories.show', child.slug)}
                                                className="rounded-lg border border-[var(--idxi-shallows)] bg-[var(--idxi-foam)] px-3 py-2 text-xs font-medium text-[var(--idxi-abyss)] transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
                                            >
                                                {child.name} - {child.companies_count}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </section>

                <section className="bg-white py-20">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--idxi-tide)]">How it works</span>
                            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--idxi-abyss)]">Claim &amp; Get Started Today</h2>
                            <p className="mt-2 text-sm text-[var(--idxi-tide)]">Verify your listing, publish your profile, and start replying to real buyer conversations.</p>
                        </div>
                        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-center">
                            <div className="overflow-hidden rounded-2xl border border-[var(--idxi-shallows)] bg-gradient-to-br from-[var(--idxi-foam)] to-white shadow-lg shadow-[var(--idxi-deep-ocean)]/5">
                                <img src="/assets/hero-reference.jpeg" alt="IDXI listing preview" className="h-full w-full object-cover" />
                            </div>
                            <div className="space-y-5">
                                {steps.map((step, index) => (
                                    <div key={step.title} className="rounded-xl border border-[var(--idxi-shallows)] bg-white p-5 transition duration-200 hover:shadow-md hover:shadow-[var(--idxi-deep-ocean)]/5">
                                        <div className="flex gap-4">
                                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--idxi-deep-ocean)] to-[var(--idxi-current)] text-sm font-semibold text-white shadow-sm">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-[var(--idxi-abyss)]">{step.title}</h3>
                                                <p className="mt-1 text-sm leading-6 text-[var(--idxi-tide)]">{step.copy}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-[var(--idxi-foam)] py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap items-end justify-between gap-6">
                            <div>
                                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--idxi-tide)]">Latest</span>
                                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--idxi-abyss)]">New Listings</h2>
                                <p className="mt-2 text-sm text-[var(--idxi-tide)]">Latest additions to our directory</p>
                            </div>
                            <Button asChild variant="outline" className="rounded-xl border-[var(--idxi-shallows)]">
                                <Link href={route('directory.index')}>
                                    View all listings
                                    <ArrowRight className="ml-1.5 size-3.5" />
                                </Link>
                            </Button>
                        </div>

                        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {newListings.length > 0 ? (
                                newListings.map((company) => (
                                    <Link key={company.id} href={route('directory.show', company.slug)} className="group">
                                        <Card className="overflow-hidden border-[var(--idxi-shallows)] bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--idxi-deep-ocean)]/8">
                                            <div className="aspect-[16/10] overflow-hidden bg-[var(--idxi-foam)]">
                                                <img src={company.hero_image || '/assets/hero-market.jpg'} alt={company.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                            </div>
                                            <CardContent className="space-y-3 p-5">
                                                <div className="flex items-center justify-between gap-3">
                                                    <h3 className="font-semibold text-[var(--idxi-abyss)]">{company.name}</h3>
                                                    <span className="rounded-lg bg-[var(--idxi-coral)]/10 px-2.5 py-0.5 text-[11px] font-medium text-[var(--idxi-coral)]">{company.company_type}</span>
                                                </div>
                                                <p className="flex items-center gap-1.5 text-sm text-[var(--idxi-tide)]">
                                                    <MapPin className="size-3.5 shrink-0" />
                                                    {company.location}
                                                </p>
                                                <p className="line-clamp-2 text-sm leading-6 text-[var(--idxi-tide)]">{company.summary}</p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))
                            ) : (
                                <div className="col-span-full rounded-2xl border border-dashed border-[var(--idxi-shallows)] bg-white p-12 text-center text-sm text-[var(--idxi-tide)]">
                                    <Building2 className="mx-auto mb-3 size-8 text-[var(--idxi-shallows)]" />
                                    No listings found
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section className="bg-white py-20">
                    <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
                        <div className="overflow-hidden rounded-2xl border border-[var(--idxi-shallows)] bg-gradient-to-br from-[var(--idxi-foam)] to-white shadow-lg shadow-[var(--idxi-deep-ocean)]/5">
                            <img src="/assets/hero-reference.jpeg" alt="IDXI media reference" className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--idxi-tide)]">Testimonials</span>
                            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--idxi-abyss)]">People talking about us</h2>
                            <div className="mt-6 rounded-2xl border border-[var(--idxi-shallows)] bg-gradient-to-br from-[var(--idxi-foam)] to-white p-8 shadow-sm">
                                <svg className="mb-4 size-8 text-amber-400/40" fill="currentColor" viewBox="0 0 32 32">
                                    <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
                                </svg>
                                <p className="text-base leading-8 text-[var(--idxi-tide)]">"{testimonial.quote}"</p>
                            </div>
                            <div className="mt-6 flex items-center gap-4">
                                <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--idxi-deep-ocean)] to-[var(--idxi-current)] text-lg font-bold text-white shadow-sm">
                                    {testimonial.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-semibold text-[var(--idxi-abyss)]">{testimonial.author}</div>
                                    <div className="text-sm text-[var(--idxi-tide)]">Directory partner</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-gradient-to-b from-[var(--idxi-deep-ocean)] to-[#0D1F3C] py-20">
                    <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-semibold tracking-tight text-white">Ready to grow your reach?</h2>
                        <p className="mt-4 text-base text-blue-200">Join the leading fishery directory and connect with buyers across the region.</p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Button asChild className="rounded-xl bg-amber-500 px-8 py-6 text-base font-semibold text-white shadow-lg shadow-amber-500/25 hover:bg-amber-600">
                                <Link href={route('register')}>
                                    <Users className="mr-2 size-4" />
                                    Claim Your Listing
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="rounded-xl border-white/20 bg-white/5 px-8 py-6 text-base text-white hover:bg-white/10">
                                <Link href={route('directory.index')}>
                                    Browse Directory
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                <footer className="bg-[#060D18] py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-between gap-6 text-sm text-blue-300/60 sm:flex-row">
                            <p>&copy; {new Date().getFullYear()} Infofish Mail &bull; Wisma Unit, Jalan Pantai Baharu, Petaling Jaya</p>
                            <div className="flex items-center gap-4">
                                {featuredCompanies.slice(0, 3).map((company) => (
                                    <span key={company.id} className="text-blue-300/40">{company.name}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
