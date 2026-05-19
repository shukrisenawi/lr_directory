import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type Category, type Company } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
    Anchor,
    BadgeCheck,
    ChevronDown,
    CircleDollarSign,
    Fish,
    Grid2X2,
    LayoutList,
    MapPin,
    PackageCheck,
    Search,
    ShieldCheck,
    SlidersHorizontal,
    Snowflake,
    Star,
    Timer,
    Truck,
    UsersRound,
    Waves,
    X,
    type LucideIcon,
} from 'lucide-react';
import { FormEvent, useState, type ReactNode } from 'react';

interface DirectoryIndexProps {
    filters: { q: string; location: string };
    categories: Category[];
    companies: {
        data: Company[];
        current_page?: number;
        last_page?: number;
        total?: number;
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
}

const supplierImages = ['/assets/hero-reference.jpeg', '/assets/hero-market.jpg', '/assets/hero.png', '/assets/picture2.png'];
const states = ['California', 'Texas', 'Florida', 'New York', 'Washington'];
const supplierTypes = ['Wholesaler', 'Fisherman', 'Importer', 'Producer'];
const productTypes = ['Marine Fish', 'Freshwater Fish', 'Local Fish', 'Imported Fish'];
const priceRanges = ['< 10', '10 - 20', '20 - 30', '> 30'];

export default function DirectoryIndex({ filters, categories, companies }: DirectoryIndexProps) {
    const [query, setQuery] = useState(filters.q ?? '');
    const selectedCategory = filters.q?.trim();
    const supplierTotal = companies.total ?? companies.data.length;
    const pageTitle = selectedCategory ? `Suppliers for ${selectedCategory}` : 'Supplier Directory';
    const popularCategories = categories.slice(0, 6);

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.get(route('directory.index'), { q: query }, { preserveState: true });
    };

    const searchCategory = (value: string) => {
        router.get(route('directory.index'), { q: value }, { preserveState: true });
    };

    const clearSearch = () => {
        setQuery('');
        router.get(route('directory.index'), {}, { preserveState: true });
    };

    return (
        <div className="min-h-screen bg-white text-[#071a3d]">
            <Head title={pageTitle} />

            <header className="border-b border-[#dce8f6] bg-white/95">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
                    <Link href={route('home')} className="flex items-center gap-3">
                        <img src="/assets/logo.png" alt="IDXI Fisheries Directory" className="h-16 w-auto" />
                    </Link>

                    <nav className="hidden items-center gap-10 text-sm font-semibold text-[#071a3d] lg:flex">
                        <Link href={route('categories.index')} className="transition hover:text-[#075ccc]">
                            Categories
                        </Link>
                        <Link href={route('directory.index')} className="border-b-2 border-[#075ccc] py-7 text-[#075ccc]">
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

            <section className="relative isolate overflow-hidden border-b border-[#dce8f6] bg-[#eef7ff]">
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(246,251,255,0.98)_0%,rgba(246,251,255,0.9)_50%,rgba(246,251,255,0.08)_78%),url('/assets/hero.png')] bg-cover bg-[74%_center]" />
                <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#62738f]">
                        <Link href={route('home')} className="text-[#075ccc]">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href={route('directory.index')} className="text-[#075ccc]">
                            Directory
                        </Link>
                        {selectedCategory ? (
                            <>
                                <span>/</span>
                                <span>{selectedCategory}</span>
                            </>
                        ) : null}
                    </div>

                    <div className="mt-5">
                        <h1 className="text-4xl font-extrabold tracking-tight text-[#071a3d] sm:text-5xl">{pageTitle}</h1>
                        <p className="mt-3 max-w-3xl text-base font-medium text-[#233f68]">
                            Explore verified fishery suppliers worldwide and connect directly with trusted businesses.
                        </p>
                    </div>

                    <form onSubmit={submit} className="mt-6 max-w-4xl rounded-lg bg-white p-2 shadow-[0_18px_45px_rgba(7,26,61,0.12)]">
                        <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                            <label className="relative flex h-14 items-center rounded-md bg-white px-4">
                                <Search className="size-5 shrink-0 text-[#073d91]" />
                                <Input
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder="Search company name, fish type, location, or product..."
                                    className="h-full border-0 bg-transparent pl-4 text-sm shadow-none placeholder:text-slate-500 focus-visible:ring-0"
                                />
                            </label>
                            <Button type="submit" className="h-14 rounded-md bg-[#073d91] px-9 font-bold text-white hover:bg-[#082f6f]">
                                Search
                            </Button>
                        </div>
                    </form>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <FilterPill active icon={MapPin} label="All" onClick={clearSearch} />
                        {popularCategories.slice(0, 5).map((category) => (
                            <FilterPill
                                key={category.slug}
                                icon={categoryIcon(category.name)}
                                label={category.name}
                                onClick={() => searchCategory(category.name)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <main className="bg-[#f8fbff] py-8">
                <div className="mx-auto grid max-w-7xl gap-7 px-4 sm:px-6 lg:grid-cols-[16rem_1fr] lg:px-8">
                    <aside className="h-fit rounded-lg border border-[#d6e3f2] bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between gap-4 border-b border-[#d6e3f2] pb-4">
                            <h2 className="text-base font-extrabold text-[#071a3d]">Filter Suppliers</h2>
                            <SlidersHorizontal className="size-5 text-[#075ccc]" />
                        </div>

                        <FilterGroup title="Location / State" icon={MapPin}>
                            <SelectShell label="All States" />
                            {states.map((state, index) => (
                                <CheckRow key={state} label={state} count={[46, 38, 24, 22, 18][index]} />
                            ))}
                        </FilterGroup>

                        <FilterGroup title="Supplier Type" icon={UsersRound}>
                            {supplierTypes.map((type, index) => (
                                <CheckRow key={type} label={type} count={[82, 56, 28, 12][index]} />
                            ))}
                        </FilterGroup>

                        <FilterGroup title="Verified Status" icon={ShieldCheck}>
                            <CheckRow label="All" count={supplierTotal} checked />
                            <CheckRow label="Verified Supplier" count={supplierTotal} />
                            <CheckRow label="Premium Supplier" count={Math.min(34, supplierTotal)} />
                        </FilterGroup>

                        <FilterGroup title="Price Range (USD / kg)" icon={CircleDollarSign}>
                            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                                <Input placeholder="Min" className="h-10 border-[#d6e3f2] text-sm" />
                                <span className="text-[#62738f]">-</span>
                                <Input placeholder="Max" className="h-10 border-[#d6e3f2] text-sm" />
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {priceRanges.map((range) => (
                                    <button
                                        key={range}
                                        type="button"
                                        className="h-9 rounded-md border border-[#d6e3f2] bg-[#f8fbff] text-xs font-semibold text-[#405675]"
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>
                        </FilterGroup>

                        <FilterGroup title="Delivery" icon={Truck}>
                            <CheckRow label="Nationwide Delivery" count={96} />
                            <CheckRow label="Regional Delivery" count={38} />
                            <CheckRow label="Self Pickup" count={82} />
                        </FilterGroup>

                        <FilterGroup title="Product Type" icon={Fish}>
                            {productTypes.map((type, index) => (
                                <CheckRow key={type} label={type} count={[128, 28, 96, 34][index]} />
                            ))}
                        </FilterGroup>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <Button variant="outline" onClick={clearSearch} className="h-11 rounded-md border-[#b8cbe6] font-bold text-[#071a3d]">
                                Clear
                            </Button>
                            <Button className="h-11 rounded-md bg-[#073d91] font-bold text-white hover:bg-[#082f6f]">Filter</Button>
                        </div>
                    </aside>

                    <section>
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                            <p className="text-sm font-extrabold text-[#071a3d]">
                                <span className="text-[#075ccc]">{supplierTotal}</span> suppliers found
                                {selectedCategory ? ` for ${selectedCategory}` : ''}
                            </p>
                            <div className="flex items-center gap-3">
                                <label className="flex items-center gap-3 text-sm font-semibold text-[#233f68]">
                                    Sort by:
                                    <select className="h-10 rounded-md border border-[#b8cbe6] bg-white px-3 text-sm font-semibold text-[#233f68]">
                                        <option>Most Relevant</option>
                                        <option>Newest</option>
                                        <option>A-Z</option>
                                    </select>
                                </label>
                                <button type="button" className="flex size-10 items-center justify-center rounded-md bg-[#073d91] text-white">
                                    <Grid2X2 className="size-5" />
                                </button>
                                <button
                                    type="button"
                                    className="flex size-10 items-center justify-center rounded-md border border-[#b8cbe6] bg-white text-[#073d91]"
                                >
                                    <LayoutList className="size-5" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-5">
                            {companies.data.length > 0 ? (
                                companies.data.map((company, index) => <SupplierCard key={company.slug} company={company} index={index} />)
                            ) : (
                                <EmptyState title="No suppliers found" copy="Try another category, product, or location search." />
                            )}
                        </div>

                        {companies.links.length > 3 ? (
                            <div className="mt-8 flex flex-wrap justify-center gap-2">
                                {companies.links.map((link, index) => (
                                    <button
                                        key={`${link.label}-${index}`}
                                        type="button"
                                        disabled={!link.url}
                                        onClick={() => link.url && router.visit(link.url, { preserveState: true })}
                                        className={`flex h-10 min-w-10 items-center justify-center rounded-md border px-3 text-sm font-bold ${
                                            link.active
                                                ? 'border-[#073d91] bg-[#073d91] text-white'
                                                : 'border-[#d6e3f2] bg-white text-[#405675] disabled:opacity-40'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        ) : null}
                    </section>
                </div>

                <section id="buyers" className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative isolate overflow-hidden rounded-lg bg-[#073d91] p-6 text-white shadow-lg">
                        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,61,145,0.98),rgba(7,61,145,0.82),rgba(7,61,145,0.25)),url('/assets/picture2.png')] bg-cover bg-center" />
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-5">
                                <div className="flex size-20 shrink-0 items-center justify-center rounded-full border border-white/45 bg-white/10">
                                    <UsersRound className="size-11 text-white" strokeWidth={1.6} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-extrabold">Own a fishery business? Register as a supplier</h2>
                                    <p className="mt-2 max-w-2xl text-sm leading-6 font-medium text-white/90">
                                        Increase your visibility and reach more buyers through the IDXI supplier marketplace.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Button
                                    asChild
                                    variant="outline"
                                    className="h-12 rounded-md border-white bg-white/10 px-8 font-extrabold text-white hover:bg-white/20"
                                >
                                    <Link href={route('home')}>Learn More</Link>
                                </Button>
                                <Button asChild className="h-12 rounded-md bg-[#0d6bff] px-9 font-extrabold text-white hover:bg-[#075ccc]">
                                    <Link href={route('register')}>Register Now</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function SupplierCard({ company, index }: { company: Company; index: number }) {
    const image = company.hero_image || supplierImages[index % supplierImages.length];
    const categories = company.categories?.slice(0, 4) ?? [];

    return (
        <article className="overflow-hidden rounded-xl border border-[#d6e3f2] bg-white shadow-sm">
            <div className="grid gap-5 p-4 md:grid-cols-[18rem_1fr_8.5rem]">
                <div className="relative h-52 overflow-hidden rounded-lg md:h-full">
                    <img src={image} alt={company.name} className="h-full w-full object-cover" />
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-md bg-white px-3 py-1.5 text-xs font-extrabold text-[#075ccc] shadow">
                        <ShieldCheck className="size-3.5" />
                        Verified
                    </span>
                    <div className="absolute bottom-4 left-4 flex size-20 items-center justify-center rounded-full border-4 border-white bg-white shadow-lg">
                        {company.logo ? (
                            <img src={company.logo} alt="" className="size-14 object-contain" />
                        ) : (
                            <Fish className="size-10 text-[#075ccc]" />
                        )}
                    </div>
                </div>

                <div className="py-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-extrabold text-[#071a3d]">{company.name}</h2>
                        <BadgeCheck className="size-4 fill-[#075ccc] text-white" />
                        <span className="text-xs font-bold text-[#075ccc]">Verified Supplier</span>
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-6 font-medium text-[#233f68]">
                        {company.summary || 'Verified fishery supplier listed in the IDXI database.'}
                    </p>
                    <p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#405675]">
                        <MapPin className="size-4 text-[#075ccc]" />
                        {company.location || 'Global'}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <span key={category.slug} className="rounded bg-[#edf4fd] px-3 py-1 text-xs font-semibold text-[#405675]">
                                    {category.name}
                                </span>
                            ))
                        ) : (
                            <span className="rounded bg-[#edf4fd] px-3 py-1 text-xs font-semibold text-[#405675]">General Supplier</span>
                        )}
                        {company.categories && company.categories.length > 4 ? (
                            <span className="rounded bg-[#edf4fd] px-3 py-1 text-xs font-semibold text-[#405675]">
                                +{company.categories.length - 4} more
                            </span>
                        ) : null}
                    </div>

                    <div className="mt-5 grid gap-3 text-xs font-semibold text-[#405675] sm:grid-cols-4">
                        <Metric icon={PackageCheck} label="Min. Order" value="On request" />
                        <Metric icon={Truck} label="Stock Available" value="Contact supplier" />
                        <Metric icon={Timer} label="Response Time" value="< 24 hours" />
                        <Metric icon={Anchor} label="Market" value={company.company_type || 'Supplier'} />
                    </div>
                </div>

                <div className="flex flex-col justify-between gap-4 border-t border-[#e5edf7] pt-4 md:border-t-0 md:pt-1">
                    <div className="flex items-center justify-start gap-2 md:justify-end">
                        <Star className="size-5 fill-[#f6ae21] text-[#f6ae21]" />
                        <span className="text-lg font-extrabold text-[#071a3d]">4.{8 - (index % 4)}</span>
                        <span className="text-xs font-semibold text-[#62738f]">({126 - index * 7})</span>
                    </div>
                    <div className="grid gap-3">
                        <Button asChild variant="outline" className="h-11 rounded-md border-[#075ccc] font-extrabold text-[#075ccc]">
                            <Link href={route('directory.show', company.slug)}>View Profile</Link>
                        </Button>
                        <Button variant="outline" className="h-11 rounded-md border-[#075ccc] font-extrabold text-[#075ccc]">
                            Contact
                        </Button>
                        <Button asChild className="h-11 rounded-md bg-[#073d91] font-extrabold text-white hover:bg-[#082f6f]">
                            <Link href={route('directory.show', company.slug)}>Request Quote</Link>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="border-t border-[#e5edf7] bg-[#fbfdff] px-4 py-3 text-xs font-semibold text-[#62738f]">
                <Truck className="mr-2 inline size-4 text-[#7d91ad]" />
                Delivery: {company.delivery_coverage || 'Worldwide'}
            </div>
        </article>
    );
}

function FilterPill({ icon: Icon, label, active = false, onClick }: { icon: LucideIcon; label: string; active?: boolean; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
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

function FilterGroup({ title, icon: Icon, children }: { title: string; icon: LucideIcon; children: ReactNode }) {
    return (
        <div className="border-b border-[#d6e3f2] py-5 last:border-b-0">
            <h3 className="mb-3 flex items-center justify-between gap-3 text-sm font-extrabold text-[#071a3d]">
                {title}
                <Icon className="size-4 text-[#075ccc]" />
            </h3>
            <div className="space-y-3">{children}</div>
        </div>
    );
}

function CheckRow({ label, count, checked = false }: { label: string; count: number; checked?: boolean }) {
    return (
        <label className="flex items-center justify-between gap-3 text-sm font-medium text-[#233f68]">
            <span className="flex items-center gap-2">
                <input type="checkbox" defaultChecked={checked} className="size-4 rounded border-[#b8cbe6] accent-[#075ccc]" />
                {label}
            </span>
            <span className="text-[#62738f]">({count})</span>
        </label>
    );
}

function SelectShell({ label }: { label: string }) {
    return (
        <button
            type="button"
            className="flex h-10 w-full items-center justify-between rounded-md border border-[#b8cbe6] px-3 text-sm font-semibold text-[#233f68]"
        >
            <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-[#075ccc]" />
                {label}
            </span>
            <ChevronDown className="size-4" />
        </button>
    );
}

function Metric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
    return (
        <div className="flex items-start gap-2">
            <Icon className="mt-0.5 size-4 shrink-0 text-[#075ccc]" />
            <div>
                <p className="text-[11px] text-[#62738f]">{label}</p>
                <p className="mt-0.5 font-extrabold text-[#233f68]">{value}</p>
            </div>
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
                        The global fishery directory platform connecting buyers and suppliers digitally.
                    </p>
                </div>
                <FooterLinks title="Platform" links={['Directory', 'Categories', 'For Buyers', 'For Suppliers']} />
                <FooterLinks title="Resources" links={['Articles & News', 'Events', 'Guides', 'FAQ']} />
                <FooterLinks title="About IDXI" links={['About Us', 'Contact Us', 'Terms & Conditions', 'Privacy Policy']} />
                <div>
                    <h3 className="text-sm font-extrabold">Contact Us</h3>
                    <div className="mt-4 space-y-2 text-sm text-white/75">
                        <p>+1 (555) 123-4567</p>
                        <p>support@idxi.directory</p>
                        <p>Global Headquarters</p>
                    </div>
                </div>
            </div>
            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <p>© {new Date().getFullYear()} IDXI Fisheries Directory. All Rights Reserved.</p>
                    <p>Built for the World</p>
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

function categoryIcon(name: string): LucideIcon {
    const normalized = name.toLowerCase();

    if (normalized.includes('frozen') || normalized.includes('cold')) return Snowflake;
    if (normalized.includes('shrimp') || normalized.includes('aquaculture') || normalized.includes('farm')) return Waves;
    if (normalized.includes('truck') || normalized.includes('transport') || normalized.includes('logistic')) return Truck;
    if (normalized.includes('verified') || normalized.includes('finance')) return ShieldCheck;

    return Fish;
}

function EmptyState({ title, copy }: { title: string; copy: string }) {
    return (
        <div className="rounded-lg border border-dashed border-[#b8cbe6] bg-white p-10 text-center">
            <X className="mx-auto size-10 text-[#075ccc]" />
            <h3 className="mt-4 text-lg font-extrabold text-[#071a3d]">{title}</h3>
            <p className="mt-2 text-sm font-medium text-[#405675]">{copy}</p>
        </div>
    );
}
