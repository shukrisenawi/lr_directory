import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { type Category, type Company, type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { MapPin, Search } from 'lucide-react';
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

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get(route('directory.index'), { q: query, location }, { preserveState: true });
    };

    return (
        <>
            <Head title="IDXI Directory" />

            <div className="min-h-screen bg-[var(--idxi-cream)] text-slate-900">
                <section className="relative isolate overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,18,30,0.35),rgba(12,18,30,0.75)),url('/assets/hero-market.jpg')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,171,62,0.42),transparent_35%)]" />

                    <div className="relative mx-auto flex min-h-[38rem] max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
                        <header className="flex items-center justify-between text-white">
                            <Link href={route('home')} className="flex items-center gap-3">
                                <img src="/assets/idxi-fish-logo.png" alt="IDXI" className="size-11 rounded-full bg-white/10 p-1.5 backdrop-blur-sm" />
                                <div>
                                    <div className="text-2xl font-semibold tracking-[0.22em]">IDXI</div>
                                    <div className="text-xs tracking-[0.28em] text-white/70">INFOFISH DIRECTORY</div>
                                </div>
                            </Link>

                            <div className="flex items-center gap-3">
                                {auth.user ? (
                                    <Button asChild className="bg-white text-slate-900 hover:bg-white/90">
                                        <Link href={route('dashboard')}>Dashboard</Link>
                                    </Button>
                                ) : (
                                    <>
                                        <Button asChild variant="secondary" className="bg-white/10 text-white backdrop-blur hover:bg-white/20">
                                            <Link href={route('login')}>Login</Link>
                                        </Button>
                                        <Button asChild className="bg-white text-slate-900 hover:bg-white/90">
                                            <Link href={route('register')}>Add Listing</Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </header>

                        <div className="mx-auto mt-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center pb-12 text-center text-white">
                            <img src="/assets/idxi-fish-logo.png" alt="IDXI fish icon" className="mb-5 size-28 rounded-full border border-white/30 bg-white/10 p-5 shadow-2xl shadow-black/25 backdrop-blur-sm" />
                            <p className="text-sm tracking-[0.4em] text-white/70">INFOFISH DIRECTORY</p>
                            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[0.06em] sm:text-5xl">
                                Find trusted fishery suppliers, processors, and service partners.
                            </h1>
                            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/76 sm:text-base">
                                Public search for buyers. Claim, manage, and grow your listing once your team signs in.
                            </p>

                            <form onSubmit={submit} className="mt-8 flex w-full max-w-5xl flex-col gap-3 rounded-[22px] bg-white p-3 text-left shadow-2xl shadow-black/20 md:flex-row">
                                <div className="flex-1">
                                    <label className="mb-2 block px-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">What</label>
                                    <Input
                                        value={query}
                                        onChange={(event) => setQuery(event.target.value)}
                                        placeholder="What: Seafood, Processor, Freezer or Service"
                                        className="h-12 border-0 bg-slate-50 text-sm shadow-none focus-visible:ring-1 focus-visible:ring-[var(--idxi-accent)]"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="mb-2 block px-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Where</label>
                                    <div className="relative">
                                        <MapPin className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-slate-400" />
                                        <Input
                                            value={location}
                                            onChange={(event) => setLocation(event.target.value)}
                                            placeholder="Where: Port City"
                                            className="h-12 border-0 bg-slate-50 pl-10 text-sm shadow-none focus-visible:ring-1 focus-visible:ring-[var(--idxi-accent)]"
                                        />
                                    </div>
                                </div>
                                <Button type="submit" className="h-12 rounded-[18px] px-6 md:mt-7">
                                    <Search data-icon="inline-start" />
                                    Search
                                </Button>
                            </form>
                        </div>
                    </div>
                </section>

                <section className="border-y border-slate-200 bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-semibold text-slate-900">Browse categories...</h2>
                        <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-700">
                            {featuredCategories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={route('categories.show', category.slug)}
                                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 transition hover:border-[var(--idxi-accent)] hover:text-[var(--idxi-accent)]"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                        <div className="mt-6 grid gap-3 border-t border-slate-200 pt-4 text-sm text-slate-600 md:grid-cols-4">
                            {featuredCategories.slice(0, 4).map((category) => (
                                <div key={category.id}>
                                    <div className="font-medium text-slate-900">{category.name}</div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {category.children?.slice(0, 3).map((child) => (
                                            <span key={child.slug} className="rounded-full bg-slate-100 px-3 py-1 text-xs">
                                                {child.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-4xl font-semibold text-slate-900">Claim &amp; Get Started Today!</h2>
                        <p className="mt-4 text-slate-500">Verify your listing, publish your profile, and start replying to real buyer conversations.</p>
                    </div>
                    <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                        <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
                            <img src="/assets/hero-reference.jpeg" alt="IDXI listing preview" className="h-full w-full object-cover" />
                        </div>
                        <div className="space-y-5">
                            {steps.map((step, index) => (
                                <Card key={step.title} className="border-slate-200 shadow-none">
                                    <CardContent className="flex gap-4 p-5">
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--idxi-accent)]/10 text-sm font-semibold text-[var(--idxi-accent)]">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                                            <p className="mt-1 text-sm leading-6 text-slate-500">{step.copy}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-white py-18">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-end justify-between gap-6">
                            <div>
                                <h2 className="text-4xl font-semibold text-slate-900">New Listing</h2>
                                <p className="mt-3 text-slate-500">Latest listing in our directory</p>
                            </div>
                            <Button asChild variant="secondary" className="hidden md:inline-flex">
                                <Link href={route('directory.index')}>View all listings</Link>
                            </Button>
                        </div>

                        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {newListings.length > 0 ? (
                                newListings.map((company) => (
                                    <Link key={company.id} href={route('directory.show', company.slug)} className="group">
                                        <Card className="overflow-hidden border-slate-200 bg-white shadow-none transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
                                            <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                                                <img src={company.hero_image || '/assets/hero-market.jpg'} alt={company.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                            </div>
                                            <CardContent className="space-y-3 p-5">
                                                <div className="flex items-center justify-between gap-3">
                                                    <h3 className="text-lg font-semibold text-slate-900">{company.name}</h3>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{company.company_type}</span>
                                                </div>
                                                <p className="text-sm text-slate-500">{company.location}</p>
                                                <p className="line-clamp-2 text-sm leading-6 text-slate-600">{company.summary}</p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))
                            ) : (
                                <div className="rounded-[22px] border border-dashed border-slate-300 bg-slate-50 p-8 text-sm text-slate-500">No Listing Found</div>
                            )}
                        </div>
                    </div>
                </section>

                <section className="bg-[var(--idxi-surface-band)] py-18">
                    <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
                        <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                            <img src="/assets/hero-reference.jpeg" alt="IDXI media reference" className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h2 className="text-3xl font-semibold text-slate-900">People talking about us</h2>
                            <blockquote className="mt-6 rounded-[24px] border border-slate-200 bg-white p-8 text-base leading-8 text-slate-600 shadow-sm">
                                “{testimonial.quote}”
                            </blockquote>
                            <div className="mt-6 flex items-center gap-4">
                                <img src="/assets/idxi-fish-logo.png" alt="IDXI" className="size-12 rounded-full bg-white p-1 shadow-sm" />
                                <div>
                                    <div className="font-semibold text-slate-900">{testimonial.author}</div>
                                    <div className="text-sm text-slate-500">Directory launch and engagement note</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="bg-slate-950 py-8 text-slate-300">
                    <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                        <p>Copyright © Infofish Mail • Wisma Unit, Jalan Pantai Baharu, Petaling Jaya</p>
                        <div className="flex items-center gap-4 text-slate-400">
                            {featuredCompanies.slice(0, 3).map((company) => (
                                <span key={company.id}>{company.name}</span>
                            ))}
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
