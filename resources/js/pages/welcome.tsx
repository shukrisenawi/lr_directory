import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type Category, type Company, type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Anchor,
    ArrowRight,
    BadgeCheck,
    BarChart3,
    Building2,
    ChevronDown,
    Fish,
    Grid2X2,
    type LucideIcon,
    MapPin,
    MessageCircle,
    PackageCheck,
    Search,
    ShieldCheck,
    ShipWheel,
    Snowflake,
    Store,
    Truck,
    Users,
} from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';

interface WelcomeProps {
    featuredCategories: Category[];
    newListings: Company[];
    featuredCompanies: Company[];
    steps: Array<{ title: string; copy: string }>;
    testimonial: { quote: string; author: string };
}

const categoryIcons = [Fish, Anchor, ShipWheel, Snowflake, PackageCheck, Store, Anchor, Truck];

const popularSearches = ['Mackerel', 'Shrimp', 'Squid', 'Wholesaler', 'Frozen Seafood'];

const marketplaceBenefits = [
    { title: 'Verified Suppliers', copy: 'Screened and trusted suppliers', icon: ShieldCheck },
    { title: 'Many Categories', copy: 'Fishery products and services', icon: Grid2X2 },
    { title: 'Direct Connection', copy: 'Connect directly with suppliers', icon: Users },
    { title: 'Grow Business', copy: 'More opportunities for your business', icon: BarChart3 },
];

const buyerSteps = [
    { title: 'Find Suppliers', copy: 'Search for the products or suppliers you need', icon: Search },
    { title: 'View Profiles', copy: 'Review supplier details, products, and locations', icon: PackageCheck },
    { title: 'Connect & Request Quotes', copy: 'Chat or send enquiries directly to suppliers', icon: MessageCircle },
];

const supplierSteps = [
    { title: 'Create Account', copy: 'Register as a supplier and claim your listing', icon: Users },
    { title: 'Complete Profile', copy: 'Add products, photos, and company details', icon: Store },
    { title: 'Receive Leads', copy: 'Receive enquiries and grow your business', icon: BarChart3 },
];

const stats = [
    { value: '5,000+', label: 'Active Buyers', icon: Users },
    { value: '600+', label: 'Registered Suppliers', icon: Store },
    { value: '30+', label: 'Product Categories', icon: Grid2X2 },
    { value: '15,000+', label: 'Leads & Enquiries', icon: BarChart3 },
];

function categoryIcon(index: number) {
    return categoryIcons[index % categoryIcons.length];
}

function categoryCount(category: Category) {
    return (category.companies_count ?? 0) + (category.children ?? []).reduce((sum, child) => sum + (child.companies_count ?? 0), 0);
}

function companyImage(company: Company, index: number) {
    if (company.hero_image) {
        return company.hero_image;
    }

    return index % 2 === 0 ? '/assets/hero-reference.jpeg' : '/assets/hero-market.jpg';
}

export default function Welcome({ featuredCategories, newListings, featuredCompanies }: WelcomeProps) {
    const { auth } = usePage<SharedData>().props;
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('');

    const displayCategories = useMemo(() => {
        if (featuredCategories.length > 0) {
            return featuredCategories.slice(0, 8);
        }

        return [
            { id: 1, name: 'Fresh Fish', slug: 'ikan-segar' },
            { id: 2, name: 'Shrimp', slug: 'udang' },
            { id: 3, name: 'Squid & Cuttlefish', slug: 'sotong-cumi' },
            { id: 4, name: 'Frozen Seafood', slug: 'frozen-seafood' },
            { id: 5, name: 'Wholesalers', slug: 'pemborong' },
            { id: 6, name: 'Fish Farms & Aquaculture', slug: 'akuakultur' },
            { id: 7, name: 'Fishing Equipment', slug: 'peralatan-perikanan' },
            { id: 8, name: 'Logistics Services', slug: 'logistik' },
        ] satisfies Category[];
    }, [featuredCategories]);

    const displayCompanies = (featuredCompanies.length > 0 ? featuredCompanies : newListings).slice(0, 4);

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.get(route('directory.index'), { q: query, location }, { preserveState: true });
    };

    return (
        <>
            <Head title="IDXI Fisheries Directory" />

            <div className="min-h-screen bg-white text-[#071a3d]">
                <section className="relative isolate overflow-hidden bg-[#eef7ff]">
                    <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(238,247,255,0.98)_0%,rgba(238,247,255,0.84)_42%,rgba(238,247,255,0.08)_72%),url('/assets/hero.png')] bg-cover bg-[58%_center]" />
                    <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#e9f5ff] to-transparent" />

                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <header className="flex h-20 items-center justify-between gap-5">
                            <Link href={route('home')} className="flex items-center gap-3">
                                <img src="/assets/logo.png" alt="IDXI Fisheries Directory" className="h-16 w-auto" />
                            </Link>

                            <nav className="hidden items-center gap-10 text-sm font-semibold text-[#071a3d] lg:flex">
                                <Link href={route('categories.index')} className="transition hover:text-[#0b63ce]">
                                    Categories
                                </Link>
                                <Link href={route('directory.index')} className="transition hover:text-[#0b63ce]">
                                    Directory
                                </Link>
                                <Link href={route('register')} className="transition hover:text-[#0b63ce]">
                                    Register
                                </Link>
                            </nav>

                            <div className="flex items-center gap-3">
                                {auth.user ? (
                                    <Button asChild className="h-11 rounded-md bg-[#073d91] px-5 text-white hover:bg-[#082f6f]">
                                        <Link href={route('dashboard')}>Dashboard</Link>
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="hidden h-11 rounded-md border-[#071a3d]/40 bg-white/40 px-5 text-[#071a3d] sm:inline-flex"
                                        >
                                            <Link href={route('login')}>Sign In</Link>
                                        </Button>
                                        <Button
                                            asChild
                                            className="h-11 rounded-md bg-[#073d91] px-5 text-white shadow-lg shadow-blue-900/20 hover:bg-[#082f6f]"
                                        >
                                            <Link href={route('register')}>Get Started</Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </header>

                        <div className="flex min-h-[31rem] items-center py-10 sm:py-16">
                            <div className="w-full max-w-3xl">
                                <div className="mb-6 inline-flex rounded-full border border-[#1d6fe0]/30 bg-white/55 px-4 py-1.5 text-xs font-bold text-[#075ccc] shadow-sm backdrop-blur">
                                    THE FISHERIES MARKETPLACE
                                </div>
                                <h1 className="max-w-2xl text-5xl leading-[1.05] font-extrabold tracking-tight text-[#071a3d] sm:text-6xl lg:text-7xl">
                                    Find Fishery Suppliers With Ease
                                </h1>
                                <p className="mt-6 max-w-2xl text-xl leading-8 font-medium text-[#12294f]">
                                    Discover trusted fishermen, wholesalers, and seafood suppliers across Malaysia.
                                </p>

                                <form onSubmit={submit} className="mt-7 max-w-4xl rounded-lg bg-white p-3 shadow-[0_22px_60px_rgba(7,26,61,0.16)]">
                                    <div className="grid gap-2 md:grid-cols-[1.05fr_0.72fr_0.55fr_auto]">
                                        <label className="relative flex h-14 items-center rounded-md bg-white px-4">
                                            <Search className="size-5 shrink-0 text-[#071a3d]" />
                                            <Input
                                                value={query}
                                                onChange={(event) => setQuery(event.target.value)}
                                                placeholder="Search fish, suppliers, products..."
                                                className="h-full border-0 bg-transparent pl-4 text-base shadow-none placeholder:text-slate-500 focus-visible:ring-0"
                                            />
                                        </label>
                                        <label className="relative flex h-14 items-center rounded-md border-l border-slate-200 bg-white px-4">
                                            <MapPin className="size-5 shrink-0 text-[#071a3d]" />
                                            <Input
                                                value={location}
                                                onChange={(event) => setLocation(event.target.value)}
                                                placeholder="Location / State"
                                                className="h-full border-0 bg-transparent pl-4 text-sm shadow-none placeholder:text-slate-600 focus-visible:ring-0"
                                            />
                                        </label>
                                        <div className="hidden h-14 items-center justify-center gap-2 border-l border-slate-200 text-sm font-semibold text-[#071a3d] md:flex">
                                            <span>Category</span>
                                            <ChevronDown className="size-4" />
                                        </div>
                                        <Button
                                            type="submit"
                                            className="h-14 rounded-md bg-[#073d91] px-7 text-base font-bold text-white hover:bg-[#082f6f]"
                                        >
                                            <Search className="size-4" />
                                            Search
                                        </Button>
                                    </div>
                                </form>

                                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
                                    <span className="font-semibold text-[#071a3d]">Popular searches:</span>
                                    {popularSearches.map((search) => (
                                        <button
                                            key={search}
                                            type="button"
                                            onClick={() => setQuery(search)}
                                            className="rounded-md border border-[#b8cbe6] bg-white/80 px-4 py-1.5 text-xs font-semibold text-[#14315c] shadow-sm transition hover:border-[#073d91] hover:text-[#073d91]"
                                        >
                                            {search}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-y border-[#dce8f6] bg-[#f7fbff]">
                    <div className="mx-auto grid max-w-7xl gap-5 px-4 py-7 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
                        {marketplaceBenefits.map((benefit, index) => {
                            const Icon = benefit.icon;

                            return (
                                <div key={benefit.title} className="flex items-center gap-5 lg:border-r lg:border-[#d5e3f4] lg:last:border-r-0">
                                    <Icon className="size-10 shrink-0 text-[#083f99]" strokeWidth={1.8} />
                                    <div>
                                        <h2 className="text-base font-extrabold text-[#071a3d]">{benefit.title}</h2>
                                        <p className="mt-1 max-w-44 text-sm leading-5 text-[#405675]">{benefit.copy}</p>
                                    </div>
                                    {index < marketplaceBenefits.length - 1 && <span className="hidden" />}
                                </div>
                            );
                        })}
                    </div>
                </section>

                <main>
                    <section id="categories" className="bg-white py-8 sm:py-12">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between gap-4">
                                <h2 className="text-2xl font-extrabold tracking-tight text-[#071a3d]">Browse Popular Categories</h2>
                                <Link
                                    href={route('categories.index')}
                                    className="inline-flex items-center gap-2 text-sm font-bold text-[#075ccc] hover:text-[#073d91]"
                                >
                                    View all categories <ArrowRight className="size-4" />
                                </Link>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-8">
                                {displayCategories.map((category, index) => {
                                    const Icon = categoryIcon(index);

                                    return (
                                        <Link
                                            key={category.slug}
                                            href={route('directory.index', { q: category.name })}
                                            className="group flex min-h-32 flex-col items-center justify-center rounded-lg border border-[#d6e3f2] bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-[#075ccc] hover:shadow-lg"
                                        >
                                            <Icon className="size-11 text-[#083f99] transition group-hover:scale-110" strokeWidth={1.8} />
                                            <span className="mt-4 text-sm leading-tight font-extrabold text-[#071a3d]">{category.name}</span>
                                            {categoryCount(category) > 0 && (
                                                <span className="mt-1 text-xs font-semibold text-slate-500">{categoryCount(category)} supplier</span>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    <section className="bg-white pb-5">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between gap-4">
                                <h2 className="text-2xl font-extrabold tracking-tight text-[#071a3d]">Featured Suppliers</h2>
                                <Link
                                    href={route('directory.index')}
                                    className="inline-flex items-center gap-2 text-sm font-bold text-[#075ccc] hover:text-[#073d91]"
                                >
                                    View all suppliers <ArrowRight className="size-4" />
                                </Link>
                            </div>

                            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                                {displayCompanies.length > 0 ? (
                                    displayCompanies.map((company, index) => (
                                        <Link
                                            key={company.id}
                                            href={route('directory.show', company.slug)}
                                            className="group overflow-hidden rounded-lg border border-[#d6e3f2] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                                        >
                                            <div className="relative h-28 overflow-hidden">
                                                <img
                                                    src={companyImage(company, index)}
                                                    alt={company.name}
                                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                />
                                                <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-xs font-bold text-[#075ccc] shadow">
                                                    <BadgeCheck className="size-3.5 fill-[#e8f2ff]" />
                                                    Verified
                                                </span>
                                            </div>
                                            <div className="p-4">
                                                <div className="-mt-10 mb-3 flex size-16 items-center justify-center rounded-full border-4 border-white bg-white shadow">
                                                    {company.logo ? (
                                                        <img
                                                            src={company.logo}
                                                            alt={`${company.name} logo`}
                                                            className="size-full rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <Fish className="size-8 text-[#083f99]" />
                                                    )}
                                                </div>
                                                <h3 className="text-base font-extrabold text-[#071a3d]">{company.name}</h3>
                                                <p className="mt-1 line-clamp-1 text-sm text-[#405675]">
                                                    {company.summary ?? company.company_type ?? 'Seafood and fishery supplier'}
                                                </p>
                                                <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#5f708a]">
                                                    <MapPin className="size-3.5" />
                                                    {company.location ?? 'Malaysia'}
                                                </p>
                                                <div className="mt-4 flex flex-wrap gap-1.5">
                                                    {(company.categories ?? []).slice(0, 3).map((category) => (
                                                        <span
                                                            key={category.slug}
                                                            className="rounded bg-[#eef4fb] px-2 py-1 text-[11px] font-semibold text-[#405675]"
                                                        >
                                                            {category.name}
                                                        </span>
                                                    ))}
                                                    {(company.categories?.length ?? 0) === 0 && (
                                                        <span className="rounded bg-[#eef4fb] px-2 py-1 text-[11px] font-semibold text-[#405675]">
                                                            {company.company_type ?? 'Supplier'}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="mt-4 flex h-9 items-center justify-center rounded-md border border-[#b8cbe6] text-sm font-bold text-[#071a3d] transition group-hover:border-[#073d91] group-hover:bg-[#073d91] group-hover:text-white">
                                                    View Profile
                                                </span>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="col-span-full rounded-lg border border-dashed border-[#b8cbe6] bg-[#f7fbff] p-10 text-center text-sm font-semibold text-[#405675]">
                                        <Building2 className="mx-auto mb-3 size-9 text-[#083f99]" />
                                        Suppliers will appear once listings are approved.
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="bg-[#073d91] py-6 text-white">
                        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
                            {stats.map((stat) => {
                                const Icon = stat.icon;

                                return (
                                    <div key={stat.label} className="flex items-center gap-5 lg:border-r lg:border-white/20 lg:last:border-r-0">
                                        <div className="flex size-16 items-center justify-center rounded-full border border-white/35 bg-white/5">
                                            <Icon className="size-8 text-[#68b7ff]" strokeWidth={1.7} />
                                        </div>
                                        <div>
                                            <div className="text-3xl font-extrabold text-[#38a4ff]">{stat.value}</div>
                                            <div className="mt-1 text-sm font-bold">{stat.label}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section id="how-it-works" className="bg-white py-10 sm:py-14">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h2 className="text-center text-2xl font-extrabold tracking-tight text-[#071a3d]">How Does IDXI Work?</h2>
                            <div className="mt-7 grid gap-5 lg:grid-cols-2">
                                <ProcessPanel title="For Buyers" accent="blue" steps={buyerSteps} />
                                <ProcessPanel title="For Suppliers" accent="green" steps={supplierSteps} />
                            </div>
                        </div>
                    </section>

                    <section className="relative isolate overflow-hidden bg-[#073d91]">
                        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,32,77,0.96),rgba(4,32,77,0.7),rgba(4,32,77,0.2)),url('/assets/picture2.png')] bg-cover bg-center" />
                        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-9 text-white sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                            <div>
                                <h2 className="text-2xl font-extrabold">Own a fishery business?</h2>
                                <p className="mt-2 max-w-xl text-base leading-7 text-white/90">
                                    Register your supplier profile and start unlocking more business opportunities today.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Button
                                    asChild
                                    variant="outline"
                                    className="h-12 rounded-md border-white/50 bg-white/5 px-8 font-bold text-white hover:bg-white/15"
                                >
                                    <Link href={route('directory.index')}>Learn More</Link>
                                </Button>
                                <Button asChild className="h-12 rounded-md bg-[#0b78ff] px-10 font-bold text-white hover:bg-[#0667dd]">
                                    <Link href={route('register')}>Register as Supplier</Link>
                                </Button>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="bg-[#051936] text-white">
                    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-9 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr] lg:px-8">
                        <div>
                            <img src="/assets/logo_full_white.png" alt="IDXI Fisheries Directory" className="h-16 w-auto" />
                            <p className="mt-4 max-w-xs text-sm leading-6 text-white/75">
                                Malaysia's leading fishery directory platform connecting buyers with trusted suppliers.
                            </p>
                        </div>
                        <FooterLinks title="Quick Links" links={['Directory', 'Categories', 'For Buyers', 'For Suppliers', 'Resources']} />
                        <FooterLinks title="For Buyers" links={['How to Search', 'Buying Tips', 'FAQ']} />
                        <FooterLinks title="For Suppliers" links={['Register Supplier', 'Supplier Guide', 'Help Center']} />
                        <div>
                            <h3 className="text-sm font-extrabold">Contact Us</h3>
                            <div className="mt-4 space-y-2 text-sm text-white/75">
                                <p>+60 12-345 6789</p>
                                <p>support@idxi.com.my</p>
                                <p>Kuala Lumpur, Malaysia</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/10">
                        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                            <p>© {new Date().getFullYear()} IDXI Fisheries Directory. All Rights Reserved.</p>
                            <div className="flex gap-8">
                                <Link href={route('home')}>Terms & Conditions</Link>
                                <Link href={route('home')}>Privacy Policy</Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

function ProcessPanel({
    title,
    steps,
    accent,
}: {
    title: string;
    steps: Array<{ title: string; copy: string; icon: LucideIcon }>;
    accent: 'blue' | 'green';
}) {
    const color = accent === 'blue' ? 'text-[#075ccc]' : 'text-[#069456]';
    const bg = accent === 'blue' ? 'bg-[#075ccc]' : 'bg-[#06a461]';

    return (
        <div className="rounded-lg border border-[#d6e3f2] bg-white p-6 shadow-sm">
            <h3 className={`text-center text-sm font-extrabold ${color}`}>{title}</h3>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
                {steps.map((step, index) => {
                    const Icon = step.icon;

                    return (
                        <div key={step.title} className="relative text-center">
                            <span
                                className={`absolute top-0 left-1/2 z-10 flex size-6 -translate-x-9 -translate-y-2 items-center justify-center rounded-full ${bg} text-xs font-extrabold text-white`}
                            >
                                {index + 1}
                            </span>
                            <div className="mx-auto flex size-16 items-center justify-center rounded-xl border border-[#e0ebf7] bg-white shadow-[0_12px_30px_rgba(7,26,61,0.08)]">
                                <Icon className={`size-8 ${color}`} strokeWidth={1.8} />
                            </div>
                            <h4 className="mt-4 text-base font-extrabold text-[#071a3d]">{step.title}</h4>
                            <p className="mt-2 text-xs leading-5 text-[#405675]">{step.copy}</p>
                            {index < steps.length - 1 && <ArrowRight className={`absolute top-8 -right-3 hidden size-4 md:block ${color}`} />}
                        </div>
                    );
                })}
            </div>
        </div>
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
