import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { type Category } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ChevronDown, Fish, MapPin } from 'lucide-react';

interface CategoryPageProps {
    category: Category & { companies: Array<{ id: number; name: string; slug: string; summary?: string | null; location?: string | null }> };
}

export default function CategoryShow({ category }: CategoryPageProps) {
    return (
        <div className="min-h-screen bg-white text-[#071a3d]">
            <Head title={category.name} />

            <header className="border-b border-[#dce8f6] bg-white/95">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
                    <Link href={route('home')} className="flex items-center gap-3">
                        <img src="/assets/logo.png" alt="IDXI Fisheries Directory" className="h-16 w-auto" />
                    </Link>

                    <nav className="hidden items-center gap-10 text-sm font-semibold text-[#071a3d] lg:flex">
                        <Link href={route('categories.index')} className="transition hover:text-[#075ccc]">
                            Categories
                        </Link>
                        <Link href={route('directory.index')} className="transition hover:text-[#075ccc]">
                            Database
                        </Link>
                        <Link href={route('register')} className="transition hover:text-[#075ccc]">
                            Register
                        </Link>
                    </nav>

                    <div className="flex items-center gap-3">
                        <Button
                            asChild
                            variant="outline"
                            className="hidden h-11 rounded-md border-[#071a3d]/40 bg-white px-5 text-[#071a3d] sm:inline-flex"
                        >
                            <Link href={route('login')}>Sign In</Link>
                        </Button>
                        <Button asChild className="h-11 rounded-md bg-[#073d91] px-5 text-white shadow-lg shadow-blue-900/20 hover:bg-[#082f6f]">
                            <Link href={route('register')}>Get Started</Link>
                        </Button>
                    </div>
                </div>
            </header>

            <section className="relative isolate overflow-hidden bg-[#eef7ff]">
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(238,247,255,0.18),rgba(238,247,255,0.16)),url('/assets/hero.png')] bg-cover bg-center" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/35 via-white/0 to-white/60" />
                <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
                    <div className="mb-14 flex items-center gap-2 text-xs font-semibold text-[#36557e]">
                        <Link href={route('home')} className="text-[#075ccc]">
                            Home
                        </Link>
                        <span>&gt;</span>
                        <Link href={route('categories.index')} className="text-[#075ccc]">
                            Categories
                        </Link>
                        <span>&gt;</span>
                        <span>{category.name}</span>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-[12rem_1fr] lg:items-end">
                        <div className="flex h-40 w-40 items-center justify-center rounded-xl bg-white p-5 shadow-[0_24px_60px_rgba(7,26,61,0.16)] lg:h-48 lg:w-48">
                            <Fish className="size-20 text-[#075ccc]" strokeWidth={1.6} />
                        </div>
                        <div className="pb-2">
                            <h1 className="text-[32px] leading-[1.18] font-extrabold tracking-tight text-[#071a3d] lg:text-[40px]">
                                {category.name}
                            </h1>
                            <p className="mt-3 max-w-2xl text-base leading-7 font-medium text-[#31517f]">
                                {category.description || `${category.name} suppliers and service providers in Malaysia.`}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-3 text-sm font-bold text-[#405675]">
                                <span>{category.companies?.length ?? 0} companies listed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                {category.companies?.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {category.companies.map((company) => (
                            <Link key={company.id} href={route('directory.show', company.slug)} className="group">
                                <Card className="overflow-hidden border-[#d6e3f2] bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#071a3d]/8">
                                    <CardContent className="space-y-3 p-5">
                                        <h2 className="font-semibold text-[#071a3d] group-hover:text-amber-600">{company.name}</h2>
                                        <p className="flex items-center gap-1.5 text-sm text-[#405675]">
                                            <MapPin className="size-3.5 shrink-0" />
                                            {company.location}
                                        </p>
                                        <p className="line-clamp-2 text-sm leading-6 text-[#405675]">{company.summary}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-[#b8cbe6] bg-white p-12 text-center text-sm text-[#405675]">
                        No companies found in this category
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
}

function Footer() {
    return (
        <footer className="bg-[#051936] text-white">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-9 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr] lg:px-8">
                <div>
                    <img src="/assets/logo_full_white.png" alt="IDXI Fisheries Directory" className="h-16 w-auto" />
                    <p className="mt-4 max-w-xs text-sm leading-6 text-white/75">
                        Malaysia&apos;s largest fishery directory platform connecting buyers and suppliers digitally.
                    </p>
                </div>
                <FooterLinks title="Platform" links={['Directory', 'Categories', 'For Buyers', 'For Suppliers']} />
                <FooterLinks title="Resources" links={['Articles & News', 'Events', 'Guides', 'FAQ']} />
                <FooterLinks title="About IDXI" links={['About Us', 'Contact Us', 'Terms & Conditions', 'Privacy Policy']} />
                <div>
                    <h3 className="text-sm font-extrabold">Contact Us</h3>
                    <div className="mt-4 space-y-2 text-sm text-white/75">
                        <p>+603 1234 5678</p>
                        <p>support@idxi.com.my</p>
                        <p>Kuala Lumpur, Malaysia</p>
                    </div>
                </div>
            </div>
            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <p>&copy; {new Date().getFullYear()} IDXI Fisheries Directory. All Rights Reserved.</p>
                    <p>Built in Malaysia</p>
                </div>
            </div>
        </footer>
    );
}

function FooterLinks({ title, links }: { title: string; links: string[] }) {
    return (
        <div>
            <h3 className="text-sm font-extrabold">{title}</h3>
            <div className="mt-4 flex flex-col gap-2 text-sm text-white/75">
                {links.map((link) => (
                    <Link key={link} href={route('directory.index')} className="transition hover:text-white">
                        {link}
                    </Link>
                ))}
            </div>
        </div>
    );
}
