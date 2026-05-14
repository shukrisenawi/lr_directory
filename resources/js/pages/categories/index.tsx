import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type Category } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
    Anchor,
    ArrowRight,
    BadgeCheck,
    CalendarDays,
    ChevronDown,
    Fish,
    Grid2X2,
    HandCoins,
    House,
    PackageCheck,
    RadioTower,
    Search,
    ShieldCheck,
    Ship,
    ShoppingCart,
    Snowflake,
    Truck,
    Waves,
    type LucideIcon,
} from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';

interface CategoriesIndexProps {
    categories: Category[];
}

const fallbackCategories = [
    'Fresh Fish',
    'Frozen Seafood',
    'Shrimp',
    'Squid & Cuttlefish',
    'Wholesalers',
    'Aquaculture / Fish Farms',
    'Fishing Equipment',
    'Logistics / Transport',
    'Cold Storage',
    'Feed & Nutrition',
    'Processing',
    'Electronics & Communication',
    'Events / Publications',
    'Insurance / Finance',
    'Marine Services',
    'Export / Import',
];

export default function CategoriesIndex({ categories }: CategoriesIndexProps) {
    const [query, setQuery] = useState('');
    const categoryCards = useMemo(() => {
        const source =
            categories.length > 0
                ? categories
                : fallbackCategories.map((name, index) => ({
                      id: index + 1,
                      name,
                      slug: name.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-'),
                      children: [],
                      companies_count: 0,
                  }));

        return source
            .filter((category) => category.name.toLowerCase().includes(query.trim().toLowerCase()))
            .slice(0, 16)
            .map((category, index) => ({
                ...category,
                count: categorySupplierCount(category),
                icon: categoryIcon(category.name),
                children: category.children?.slice(0, 5) ?? [],
                fallbackItems: fallbackItems(category.name),
                index: index + 1,
            }));
    }, [categories, query]);

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const viewSuppliers = (category: string) => {
        router.get(route('directory.index'), { q: category }, { preserveState: true });
    };

    return (
        <div className="min-h-screen bg-[#f8fbff] text-[#071a3d]">
            <Head title="Directory Categories" />

            <header className="bg-[#062a55] text-white shadow-[0_4px_20px_rgba(4,27,61,0.2)]">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
                    <Link href={route('home')} className="flex items-center gap-3">
                        <img src="/logo_white.png" alt="IDXI Fisheries Directory" className="h-12 w-auto" />
                    </Link>

                    <nav className="hidden items-center gap-9 text-sm font-bold lg:flex">
                        <Link href={route('directory.index')} className="inline-flex items-center gap-1 text-white/90 transition hover:text-white">
                            Directory <ChevronDown className="size-3.5" />
                        </Link>
                        <Link href={route('categories.index')} className="text-white">
                            Categories
                        </Link>
                        <Link href={route('directory.index')} className="inline-flex items-center gap-1 text-white/90 transition hover:text-white">
                            For Buyers <ChevronDown className="size-3.5" />
                        </Link>
                        <Link href={route('register')} className="inline-flex items-center gap-1 text-white/90 transition hover:text-white">
                            For Suppliers <ChevronDown className="size-3.5" />
                        </Link>
                        <button type="button" className="inline-flex items-center gap-1 text-white/90 transition hover:text-white">
                            Resources <ChevronDown className="size-3.5" />
                        </button>
                    </nav>

                    <div className="flex items-center gap-3">
                        <Button
                            asChild
                            variant="outline"
                            className="hidden h-11 rounded-md border-white/55 bg-white/5 px-5 font-bold text-white hover:bg-white/12 sm:inline-flex"
                        >
                            <Link href={route('login')}>Sign In</Link>
                        </Button>
                        <Button
                            asChild
                            className="h-11 rounded-md bg-[#0d6bff] px-5 font-bold text-white shadow-lg shadow-blue-950/20 hover:bg-[#075ccc]"
                        >
                            <Link href={route('register')}>
                                Get Started <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            <main>
                <section className="bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2 text-xs font-semibold text-[#62738f]">
                            <Link href={route('home')} className="text-[#075ccc]">
                                Home
                            </Link>
                            <span>/</span>
                            <Link href={route('directory.index')} className="text-[#075ccc]">
                                Directory
                            </Link>
                            <span>/</span>
                            <span>Categories</span>
                        </div>

                        <div className="mt-7">
                            <h1 className="text-4xl font-extrabold tracking-tight text-[#071a3d] sm:text-5xl">Directory Categories</h1>
                            <p className="mt-4 max-w-3xl text-base leading-7 font-medium text-[#233f68]">
                                Explore supplier categories and subcategories covering products and services across the fisheries and seafood
                                industry.
                            </p>
                        </div>

                        <form onSubmit={submit} className="mt-7 max-w-3xl">
                            <label className="relative flex h-14 items-center rounded-lg border border-[#cfdced] bg-white px-5 shadow-sm">
                                <Search className="size-5 shrink-0 text-[#60789d]" />
                                <Input
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder="Search category or subcategory..."
                                    className="h-full border-0 bg-transparent pl-4 text-sm shadow-none placeholder:text-[#7888a3] focus-visible:ring-0"
                                />
                            </label>
                        </form>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <FilterTab active icon={Grid2X2} label="All" />
                            <FilterTab icon={Waves} label="Popular" />
                            <FilterTab icon={ArrowRight} label="A-Z" />
                            <FilterTab icon={ShoppingCart} label="For Buyers" />
                            <FilterTab icon={House} label="For Suppliers" />
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
                    {categoryCards.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            {categoryCards.map((category) => {
                                const Icon = category.icon;
                                const items = category.children.length > 0 ? category.children.map((child) => child.name) : category.fallbackItems;

                                return (
                                    <article
                                        key={category.slug}
                                        className="relative overflow-hidden rounded-xl border border-[#d6e3f2] bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#9fc7f4] hover:shadow-xl"
                                    >
                                        <span className="absolute top-3 left-3 flex size-7 items-center justify-center rounded-full bg-[#dcebff] text-sm font-extrabold text-[#075ccc]">
                                            {category.index}
                                        </span>
                                        <div className="grid min-h-64 grid-cols-[4.5rem_1fr] gap-4 p-6 pt-10">
                                            <div className="mt-4 flex size-16 items-center justify-center rounded-full bg-[#eaf4ff]">
                                                <Icon className="size-10 text-[#0b74db]" strokeWidth={1.7} />
                                            </div>
                                            <div>
                                                <h2 className="text-xl leading-6 font-extrabold text-[#07306b]">{category.name}</h2>
                                                <p className="mt-2 min-h-16 text-sm leading-6 font-medium text-[#233f68]">
                                                    {category.description || categoryDescription(category.name)}
                                                </p>
                                            </div>
                                            <ul className="col-span-2 mt-1 space-y-2 text-sm font-medium text-[#233f68]">
                                                {items.slice(0, 5).map((item) => (
                                                    <li key={item} className="flex items-start gap-2">
                                                        <span className="mt-2 size-1.5 rounded-full bg-[#075ccc]" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-[#e3edf8] bg-[#fbfdff] px-5 py-4">
                                            <span className="text-sm font-bold text-[#233f68]">{category.count} Suppliers</span>
                                            <button
                                                type="button"
                                                onClick={() => viewSuppliers(category.name)}
                                                className="inline-flex items-center gap-2 text-sm font-extrabold text-[#075ccc] hover:text-[#073d91]"
                                            >
                                                View Suppliers <ArrowRight className="size-4" />
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="rounded-xl border border-dashed border-[#b8cbe6] bg-white p-12 text-center">
                            <Grid2X2 className="mx-auto size-10 text-[#075ccc]" />
                            <h2 className="mt-4 text-lg font-extrabold text-[#071a3d]">No categories found</h2>
                            <p className="mt-2 text-sm font-medium text-[#405675]">Try another search keyword.</p>
                        </div>
                    )}
                </section>

                <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
                    <div className="relative isolate overflow-hidden rounded-xl bg-[#073d91] p-8 text-white shadow-lg">
                        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,61,145,0.98),rgba(7,61,145,0.78),rgba(7,61,145,0.28)),url('/assets/picture2.png')] bg-cover bg-center" />
                        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr_auto] lg:items-center">
                            <div>
                                <h2 className="text-3xl font-extrabold">Register Your Company Today</h2>
                                <p className="mt-3 max-w-xl text-sm leading-6 text-white/90">
                                    Join Malaysia&apos;s fisheries directory and reach more buyers across the region.
                                </p>
                            </div>
                            <div className="grid gap-3 text-sm font-semibold text-white/95">
                                <span className="inline-flex items-center gap-2">
                                    <BadgeCheck className="size-4" /> Increase business visibility
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <BadgeCheck className="size-4" /> Receive buyer enquiries
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <BadgeCheck className="size-4" /> Grow your supplier network
                                </span>
                            </div>
                            <Button asChild className="h-14 rounded-md bg-white px-8 font-extrabold text-[#073d91] hover:bg-[#eaf4ff]">
                                <Link href={route('register')}>
                                    Register as Supplier <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function FilterTab({ icon: Icon, label, active = false }: { icon: LucideIcon; label: string; active?: boolean }) {
    return (
        <button
            type="button"
            className={`inline-flex h-11 items-center gap-2 rounded-full border px-5 text-sm font-extrabold transition ${
                active ? 'border-[#075ccc] bg-[#075ccc] text-white' : 'border-[#d6e3f2] bg-white text-[#233f68] hover:border-[#075ccc]'
            }`}
        >
            <Icon className="size-4" />
            {label}
        </button>
    );
}

function Footer() {
    return (
        <footer className="bg-white text-[#071a3d]">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-9 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr] lg:px-8">
                <div>
                    <img src="/logo.svg" alt="IDXI Fisheries Directory" className="h-12 w-auto" />
                    <p className="mt-4 max-w-xs text-sm leading-6 text-[#405675]">
                        Malaysia&apos;s leading fisheries directory connecting buyers with trusted seafood suppliers.
                    </p>
                </div>
                <FooterLinks title="Directory" links={['All Categories', 'Find Suppliers', 'For Buyers', 'For Suppliers']} />
                <FooterLinks title="Resources" links={['Articles & News', 'Events', 'Industry Guides', 'FAQ']} />
                <FooterLinks title="Company" links={['About Us', 'Contact Us', 'Terms & Conditions', 'Privacy Policy']} />
                <div>
                    <h3 className="text-sm font-extrabold text-[#07306b] uppercase">Contact Us</h3>
                    <div className="mt-4 space-y-2 text-sm text-[#405675]">
                        <p>+60 3-1234 5678</p>
                        <p>info@idxi.com.my</p>
                        <p>Kuala Lumpur, Malaysia</p>
                    </div>
                </div>
            </div>
            <div className="bg-[#062a55] py-4 text-center text-xs text-white/75">
                © {new Date().getFullYear()} IDXI Fisheries Directory. All Rights Reserved.
            </div>
        </footer>
    );
}

function FooterLinks({ title, links }: { title: string; links: string[] }) {
    return (
        <div>
            <h3 className="text-sm font-extrabold text-[#07306b] uppercase">{title}</h3>
            <div className="mt-4 flex flex-col gap-2 text-sm text-[#405675]">
                {links.map((link) => (
                    <Link
                        key={link}
                        href={link === 'All Categories' ? route('categories.index') : route('directory.index')}
                        className="transition hover:text-[#075ccc]"
                    >
                        {link}
                    </Link>
                ))}
            </div>
        </div>
    );
}

function categorySupplierCount(category: Category): number {
    return (category.companies_count ?? 0) + (category.children?.reduce((total, child) => total + (child.companies_count ?? 0), 0) ?? 0);
}

function categoryIcon(name: string): LucideIcon {
    const normalized = name.toLowerCase();

    if (normalized.includes('frozen') || normalized.includes('cold')) return Snowflake;
    if (normalized.includes('shrimp') || normalized.includes('udang')) return Waves;
    if (normalized.includes('squid') || normalized.includes('cuttlefish')) return Anchor;
    if (normalized.includes('wholesale') || normalized.includes('pemborong')) return House;
    if (normalized.includes('aquaculture') || normalized.includes('farm')) return Ship;
    if (normalized.includes('equipment') || normalized.includes('peralatan')) return PackageCheck;
    if (normalized.includes('logistic') || normalized.includes('transport')) return Truck;
    if (normalized.includes('feed') || normalized.includes('nutrition')) return HandCoins;
    if (normalized.includes('processing')) return PackageCheck;
    if (normalized.includes('electronic') || normalized.includes('communication')) return RadioTower;
    if (normalized.includes('event') || normalized.includes('publication')) return CalendarDays;
    if (normalized.includes('insurance') || normalized.includes('finance')) return ShieldCheck;
    if (normalized.includes('export') || normalized.includes('import')) return Grid2X2;

    return Fish;
}

function fallbackItems(name: string): string[] {
    const normalized = name.toLowerCase();

    if (normalized.includes('frozen')) return ['Frozen Fish', 'Frozen Shrimp', 'Frozen Squid', 'Frozen Seafood Products', 'Frozen Seafood'];
    if (normalized.includes('shrimp')) return ['Vannamei Shrimp', 'Tiger Prawn', 'Fresh Shrimp', 'Dried Shrimp', 'Shrimp Products'];
    if (normalized.includes('squid')) return ['Squid', 'Cuttlefish', 'Squid Products', 'Frozen Squid', 'Dried Squid'];
    if (normalized.includes('logistic')) return ['Land Transport', 'Sea Transport', 'Air Freight', 'Cold Chain', '3PL'];
    if (normalized.includes('cold')) return ['Cold Storage', 'Cold Rooms', 'Blast Freezer', 'Cold Chain Management', 'Storage Rental'];
    if (normalized.includes('feed')) return ['Fish Feed', 'Supplements', 'Probiotics & Enzymes', 'Raw Materials', 'Aquaculture Nutrition'];
    if (normalized.includes('insurance')) return ['Marine Insurance', 'Aquaculture Insurance', 'Trade Financing', 'Loans', 'Financial Protection'];
    if (normalized.includes('export'))
        return ['Seafood Export', 'Seafood Import', 'Customs Documentation', 'Trade Consulting', 'International Markets'];

    return ['Marine Fish', 'Demersal Fish', 'Freshwater Fish', 'Local Fish', 'Imported Fish'];
}

function categoryDescription(name: string): string {
    const normalized = name.toLowerCase();

    if (normalized.includes('frozen')) return 'Frozen seafood products for domestic and export markets.';
    if (normalized.includes('shrimp')) return 'Fresh, frozen, and processed shrimp products.';
    if (normalized.includes('squid')) return 'Squid, cuttlefish, and related seafood products.';
    if (normalized.includes('wholesale')) return 'Wholesale suppliers and distributors for fishery products.';
    if (normalized.includes('aquaculture')) return 'Aquaculture and fish farming solutions.';
    if (normalized.includes('equipment')) return 'Fishing and processing equipment for operators.';
    if (normalized.includes('logistic')) return 'Logistics and delivery services for supply chains.';
    if (normalized.includes('cold')) return 'Cold storage and cold chain management services.';

    return 'Category covering fisheries products and related supplier services.';
}
