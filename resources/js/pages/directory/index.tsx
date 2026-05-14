import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type Company } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
    Anchor,
    ArrowRight,
    BadgeCheck,
    CalendarDays,
    ChevronDown,
    CircleUserRound,
    Fish,
    Globe2,
    Grid2X2,
    House,
    MapPin,
    Radio,
    Search,
    ShieldCheck,
    ShipWheel,
    SlidersHorizontal,
    Snowflake,
    Star,
    Truck,
    Waves,
} from 'lucide-react';
import { FormEvent, useState, type ReactNode } from 'react';

interface DirectoryIndexProps {
    filters: { q: string; location: string };
    companies: {
        data: Company[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
}

const categoryCards = [
    {
        name: 'Fresh Fish',
        description: 'A wide selection of fresh sea and freshwater fish.',
        count: 128,
        icon: Fish,
        items: ['Pelagic Fish', 'Demersal Fish', 'Freshwater Fish', 'Other Fish'],
    },
    {
        name: 'Frozen Seafood',
        description: 'High-quality frozen marine products.',
        count: 96,
        icon: Snowflake,
        items: ['Frozen Fish', 'Frozen Shrimp', 'Squid & Cuttlefish', 'Frozen Other'],
    },
    {
        name: 'Shrimp',
        description: 'Sea and freshwater shrimp products.',
        count: 74,
        icon: Waves,
        items: ['Vannamei Shrimp', 'Tiger Prawn', 'Fresh Shrimp', 'Frozen Shrimp'],
    },
    {
        name: 'Squid & Cuttlefish',
        description: 'Squid, cuttlefish, and related products.',
        count: 59,
        icon: Anchor,
        items: ['Squid', 'Cuttlefish', 'Squid Products', 'Cuttlefish Products'],
    },
    {
        name: 'Wholesalers',
        description: 'Seafood wholesalers and distributors.',
        count: 112,
        icon: House,
        items: ['Fish Wholesalers', 'Shrimp Wholesalers', 'Seafood Wholesalers', 'Food Agents'],
    },
    {
        name: 'Aquaculture / Fish Farms',
        description: 'Aquaculture and fish farming production.',
        count: 86,
        icon: Waves,
        items: ['Freshwater Fish', 'Brackish Fish', 'Aquaculture Systems', 'Aquaculture Equipment'],
    },
    {
        name: 'Fishing Equipment',
        description: 'Catching and processing equipment.',
        count: 132,
        icon: Anchor,
        items: ['Nets & Lines', 'Boat Equipment', 'Fishing Gear', 'Processing Tools'],
    },
    {
        name: 'Logistics / Transport',
        description: 'Seafood logistics and delivery services.',
        count: 78,
        icon: Truck,
        items: ['Land Transport', 'Sea Transport', 'Air Freight', '3PL Services'],
    },
    {
        name: 'Cold Storage',
        description: 'Cold storage and frozen supply chain.',
        count: 41,
        icon: Snowflake,
        items: ['Cold Rooms', 'Blast Freezers', 'Cold Chain Management', 'Dry Ice'],
    },
    {
        name: 'Feed & Nutrition',
        description: 'Aquaculture feed and nutrition products.',
        count: 38,
        icon: Grid2X2,
        items: ['Fish Feed', 'Supplements', 'Probiotics & Enzymes', 'Raw Materials'],
    },
    {
        name: 'Processing',
        description: 'Seafood processing and value-added products.',
        count: 64,
        icon: SlidersHorizontal,
        items: ['Cleaning & Processing', 'Packaging', 'Freezing', 'Value-Added Products'],
    },
    {
        name: 'Electronics & Communication',
        description: 'Marine electronics and communication devices.',
        count: 36,
        icon: Radio,
        items: ['Navigation & GPS', 'Marine Communication', 'Sensors & IoT', 'Other Electronics'],
    },
    {
        name: 'Events / Publications',
        description: 'Industry events, exhibitions, and publications.',
        count: 22,
        icon: CalendarDays,
        items: ['Exhibitions & Expo', 'Seminars', 'Magazines & Publications', 'Industry News'],
    },
    {
        name: 'Insurance / Finance',
        description: 'Insurance protection and financing services.',
        count: 28,
        icon: ShieldCheck,
        items: ['Marine Insurance', 'Aquaculture Insurance', 'Trade Financing', 'Financial Consulting'],
    },
    {
        name: 'Marine Services',
        description: 'Marine support and maintenance services.',
        count: 48,
        icon: ShipWheel,
        items: ['Vessel Inspection', 'Dock & Yard', 'Vessel Cleaning', 'Other Marine Services'],
    },
    {
        name: 'Export / Import',
        description: 'Seafood export and import services.',
        count: 34,
        icon: Globe2,
        items: ['Export Seafood', 'Import Seafood', 'Documentation & Customs', 'Trade Consulting'],
    },
];

const popularCards = [
    { name: 'Fresh Fish', copy: 'Daily fresh fish selections.', count: 128, image: '/assets/hero-reference.jpeg', icon: Fish },
    { name: 'Shrimp', copy: 'Quality shrimp for every need.', count: 74, image: '/assets/hero-market.jpg', icon: Waves },
    { name: 'Frozen Seafood', copy: 'Fresh frozen, trusted quality.', count: 96, image: '/assets/hero.png', icon: Snowflake },
    { name: 'Aquaculture / Fish Farms', copy: 'Complete aquaculture solutions.', count: 86, image: '/assets/picture2.png', icon: Waves },
];

const businessTypes = [
    ['All Types', 16, true],
    ['Operators / Suppliers', 8, false],
    ['Wholesalers', 28, false],
    ['Services', 24, false],
    ['Institutions / Organisations', 10, false],
];

const popularFilters = ['Fresh Fish', 'Frozen Seafood', 'Shrimp', 'Squid & Cuttlefish', 'Wholesalers'];
const serviceFilters = ['Transport', 'Cold Storage', 'Installation', 'Maintenance', 'Consulting'];

export default function DirectoryIndex({ filters, companies }: DirectoryIndexProps) {
    const [query, setQuery] = useState(filters.q ?? '');
    const indexedSuppliers = companies.data.length;

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.get(route('directory.index'), { q: query }, { preserveState: true });
    };

    const searchCategory = (value: string) => {
        router.get(route('directory.index'), { q: value }, { preserveState: true });
    };

    return (
        <div className="min-h-screen bg-white text-[#071a3d]">
            <Head title="Directory Categories" />

            <header className="border-b border-[#dce8f6] bg-white/95">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
                    <Link href={route('home')} className="flex items-center gap-3">
                        <img src="/logo.svg" alt="IDXI Fisheries Directory" className="h-12 w-auto" />
                    </Link>

                    <nav className="hidden items-center gap-10 text-sm font-semibold text-[#071a3d] lg:flex">
                        <Link href={route('directory.index')} className="transition hover:text-[#075ccc]">
                            Directory
                        </Link>
                        <Link href={route('directory.index')} className="border-b-2 border-[#075ccc] py-7 text-[#075ccc]">
                            Categories
                        </Link>
                        <a href="#buyers" className="transition hover:text-[#075ccc]">
                            For Buyers
                        </a>
                        <Link href={route('register')} className="transition hover:text-[#075ccc]">
                            For Suppliers
                        </Link>
                        <button type="button" className="inline-flex items-center gap-1 transition hover:text-[#075ccc]">
                            Resources <ChevronDown className="size-3.5" />
                        </button>
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

            <section className="relative isolate overflow-hidden border-b border-[#dce8f6] bg-[#eef7ff]">
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(246,251,255,0.98)_0%,rgba(246,251,255,0.92)_48%,rgba(246,251,255,0.1)_76%),url('/assets/hero.png')] bg-cover bg-[72%_center]" />
                <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-2 text-xs font-semibold text-[#62738f]">
                            <Link href={route('home')} className="text-[#075ccc]">
                                Home
                            </Link>
                            <span>/</span>
                            <span>Categories</span>
                            <span>/</span>
                            <span>All Categories</span>
                        </div>

                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight text-[#071a3d] sm:text-5xl">All Categories</h1>
                            <p className="mt-3 max-w-3xl text-base font-medium text-[#233f68]">
                                Explore every supplier, product, and fishery service category across Malaysia. {indexedSuppliers} suppliers are
                                currently indexed.
                            </p>
                        </div>

                        <form onSubmit={submit} className="max-w-3xl rounded-lg bg-white p-2 shadow-[0_18px_45px_rgba(7,26,61,0.12)]">
                            <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                                <label className="relative flex h-14 items-center rounded-md bg-white px-4">
                                    <Search className="size-5 shrink-0 text-[#073d91]" />
                                    <Input
                                        value={query}
                                        onChange={(event) => setQuery(event.target.value)}
                                        placeholder="Search category, product, or service..."
                                        className="h-full border-0 bg-transparent pl-4 text-sm shadow-none placeholder:text-slate-500 focus-visible:ring-0"
                                    />
                                </label>
                                <Button type="submit" className="h-14 rounded-md bg-[#073d91] px-8 font-bold text-white hover:bg-[#082f6f]">
                                    Search
                                </Button>
                            </div>
                        </form>

                        <div className="flex flex-wrap gap-3">
                            <FilterTab active icon={Grid2X2} label="All" />
                            <FilterTab icon={Star} label="Popular" />
                            <FilterTab icon={BadgeCheck} label="A-Z" />
                            <FilterTab icon={SlidersHorizontal} label="For Buyers" />
                            <FilterTab icon={ShieldCheck} label="For Suppliers" />
                        </div>
                    </div>
                </div>
            </section>

            <main className="bg-[#f8fbff] py-8">
                <div className="mx-auto grid max-w-7xl gap-7 px-4 sm:px-6 lg:grid-cols-[15rem_1fr] lg:px-8">
                    <aside className="h-fit rounded-lg border border-[#d6e3f2] bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between gap-4 border-b border-[#d6e3f2] pb-4">
                            <h2 className="text-base font-extrabold text-[#071a3d]">Category Filters</h2>
                            <SlidersHorizontal className="size-5 text-[#075ccc]" />
                        </div>

                        <FilterGroup title="Business Type">
                            {businessTypes.map(([label, count, checked]) => (
                                <label key={String(label)} className="flex items-center justify-between gap-3 text-sm font-medium text-[#233f68]">
                                    <span className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            defaultChecked={Boolean(checked)}
                                            className="size-4 rounded border-[#b8cbe6] accent-[#075ccc]"
                                        />
                                        {label}
                                    </span>
                                    <span className="text-[#62738f]">({count})</span>
                                </label>
                            ))}
                        </FilterGroup>

                        <FilterGroup title="Popular Categories">
                            {popularFilters.map((filter) => (
                                <label key={filter} className="flex items-center gap-2 text-sm font-medium text-[#233f68]">
                                    <input type="checkbox" className="size-4 rounded border-[#b8cbe6] accent-[#075ccc]" />
                                    {filter}
                                </label>
                            ))}
                        </FilterGroup>

                        <FilterGroup title="Location">
                            <button
                                className="flex h-10 w-full items-center justify-between rounded-md border border-[#b8cbe6] px-3 text-sm font-semibold text-[#233f68]"
                                type="button"
                            >
                                <span className="inline-flex items-center gap-2">
                                    <MapPin className="size-4 text-[#075ccc]" />
                                    All States
                                </span>
                                <ChevronDown className="size-4" />
                            </button>
                        </FilterGroup>

                        <FilterGroup title="Services">
                            {serviceFilters.map((filter) => (
                                <label key={filter} className="flex items-center gap-2 text-sm font-medium text-[#233f68]">
                                    <input type="checkbox" className="size-4 rounded border-[#b8cbe6] accent-[#075ccc]" />
                                    {filter}
                                </label>
                            ))}
                        </FilterGroup>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <Button variant="outline" className="h-11 rounded-md border-[#b8cbe6] font-bold text-[#071a3d]">
                                Clear
                            </Button>
                            <Button className="h-11 rounded-md bg-[#073d91] font-bold text-white hover:bg-[#082f6f]">Filter</Button>
                        </div>
                    </aside>

                    <section>
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                            <p className="text-sm font-extrabold text-[#071a3d]">{categoryCards.length} Categories Found</p>
                            <label className="flex items-center gap-3 text-sm font-semibold text-[#233f68]">
                                Sort by:
                                <select className="h-10 rounded-md border border-[#b8cbe6] bg-white px-3 text-sm font-semibold text-[#233f68]">
                                    <option>Popularity</option>
                                    <option>A-Z</option>
                                    <option>Newest</option>
                                </select>
                            </label>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            {categoryCards.map((category) => {
                                const Icon = category.icon;

                                return (
                                    <button
                                        key={category.name}
                                        type="button"
                                        onClick={() => searchCategory(category.name)}
                                        className="group rounded-lg border border-[#d6e3f2] bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#075ccc] hover:shadow-lg"
                                    >
                                        <Icon className="size-11 text-[#075ccc] transition group-hover:scale-110" strokeWidth={1.7} />
                                        <h3 className="mt-4 text-lg font-extrabold text-[#071a3d]">{category.name}</h3>
                                        <p className="mt-1 min-h-10 text-xs leading-5 font-medium text-[#405675]">{category.description}</p>
                                        <ul className="mt-3 space-y-1.5 text-xs font-medium text-[#233f68]">
                                            {category.items.map((item) => (
                                                <li key={item} className="flex items-start gap-2">
                                                    <span className="mt-1.5 size-1 rounded-full bg-[#075ccc]" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="mt-4 text-sm font-extrabold text-[#075ccc]">{category.count} Suppliers</p>
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                </div>

                <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-4 flex items-center justify-between gap-4">
                        <h2 className="text-2xl font-extrabold tracking-tight text-[#071a3d]">Popular Categories</h2>
                        <Link href={route('directory.index')} className="inline-flex items-center gap-2 text-sm font-bold text-[#075ccc]">
                            View all categories <ArrowRight className="size-4" />
                        </Link>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {popularCards.map((card) => {
                            const Icon = card.icon;

                            return (
                                <button
                                    key={card.name}
                                    type="button"
                                    onClick={() => searchCategory(card.name)}
                                    className="group relative min-h-36 overflow-hidden rounded-lg text-left shadow-sm"
                                >
                                    <img
                                        src={card.image}
                                        alt={card.name}
                                        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#041d43]/95 via-[#041d43]/72 to-[#041d43]/15" />
                                    <div className="relative flex h-full flex-col justify-end p-5 text-white">
                                        <Icon className="mb-3 size-10" strokeWidth={1.7} />
                                        <h3 className="text-xl font-extrabold">{card.name}</h3>
                                        <p className="mt-1 text-sm font-medium text-white/85">{card.copy}</p>
                                        <p className="mt-3 text-sm font-bold">{card.count} Suppliers</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </section>

                <section id="buyers" className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative isolate overflow-hidden rounded-lg bg-[#073d91] p-6 text-white shadow-lg">
                        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,61,145,0.98),rgba(7,61,145,0.82),rgba(7,61,145,0.25)),url('/assets/picture2.png')] bg-cover bg-center" />
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-5">
                                <div className="flex size-20 shrink-0 items-center justify-center rounded-full border border-white/45 bg-white/10">
                                    <CircleUserRound className="size-12 text-white" strokeWidth={1.6} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-extrabold">Can&apos;t find the right category?</h2>
                                    <p className="mt-2 max-w-2xl text-sm leading-6 font-medium text-white/90">
                                        Register as a supplier and showcase your business to thousands of buyers across Malaysia.
                                    </p>
                                </div>
                            </div>
                            <Button asChild className="h-14 rounded-md bg-white px-10 font-extrabold text-[#073d91] hover:bg-[#eaf4ff]">
                                <Link href={route('register')}>Register as Supplier</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-[#051936] text-white">
                <div className="mx-auto grid max-w-7xl gap-8 px-4 py-9 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr] lg:px-8">
                    <div>
                        <img src="/logo_white.png" alt="IDXI Fisheries Directory" className="h-12 w-auto" />
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
                        <p>© {new Date().getFullYear()} IDXI Fisheries Directory. All Rights Reserved.</p>
                        <p>Built in Malaysia</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FilterTab({ icon: Icon, label, active = false }: { icon: typeof Grid2X2; label: string; active?: boolean }) {
    return (
        <button
            type="button"
            className={`inline-flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-bold transition ${
                active
                    ? 'border-[#073d91] bg-[#073d91] text-white'
                    : 'border-[#b8cbe6] bg-white/90 text-[#233f68] hover:border-[#075ccc] hover:text-[#075ccc]'
            }`}
        >
            <Icon className="size-4" />
            {label}
        </button>
    );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="border-b border-[#d6e3f2] py-5 last:border-b-0">
            <h3 className="mb-3 text-sm font-extrabold text-[#071a3d]">{title}</h3>
            <div className="space-y-3">{children}</div>
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
