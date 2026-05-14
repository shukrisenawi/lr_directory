import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { type Campaign, type Company, type NewsEvent, type Product, type SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    Anchor,
    ArrowRight,
    BadgeCheck,
    BriefcaseBusiness,
    CalendarDays,
    ChevronDown,
    Clock3,
    Facebook,
    Fish,
    Globe,
    Heart,
    Instagram,
    Mail,
    MapPin,
    MessageSquareText,
    Phone,
    Play,
    ShieldCheck,
    Snowflake,
    Truck,
    Waves,
    type LucideIcon,
} from 'lucide-react';
import { type ReactNode } from 'react';

interface CompanyShowProps {
    company: Company;
    similarCompanies: Company[];
}

const categoryImages = ['/assets/hero-reference.jpeg', '/assets/hero-market.jpg', '/assets/hero.png', '/assets/picture2.png'];

export default function CompanyShow({ company, similarCompanies }: CompanyShowProps) {
    const { auth } = usePage<SharedData>().props;
    const claimForm = useForm({ message: '' });
    const leadForm = useForm({
        name: auth.user?.name ?? '',
        email: auth.user?.email ?? '',
        phone: '',
        product_interest: '',
        message: '',
    });

    const products = company.products && company.products.length > 0 ? company.products : [];
    const displayProducts = products.map((product) => productToDisplay(product));
    const productCategories = (company.categories ?? []).map((category, index) => ({
        ...category,
        count: products.filter((product) => product.fish_type === category.name).length || products.length,
        icon: categoryIcon(category.name),
        image: categoryImages[index % categoryImages.length],
    }));
    const newsItems = [...(company.campaigns ?? []).map(campaignToNewsItem), ...(company.news_events ?? []).map(newsEventToNewsItem)];
    const heroImage = company.hero_image || '/assets/hero.png';
    const companyType = company.company_type || 'Seafood Supplier & Exporter';
    const location = company.location || 'Malaysia';

    return (
        <div className="min-h-screen bg-white text-[#071a3d]">
            <Head title={company.name} />

            <header className="border-b border-[#dce8f6] bg-white/95">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
                    <Link href={route('home')} className="flex items-center gap-3">
                        <img src="/logo.svg" alt="IDXI Fisheries Directory" className="h-12 w-auto" />
                    </Link>

                    <nav className="hidden items-center gap-10 text-sm font-semibold text-[#071a3d] lg:flex">
                        <Link href={route('directory.index')} className="transition hover:text-[#075ccc]">
                            Directory
                        </Link>
                        <a href="#contact" className="transition hover:text-[#075ccc]">
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
                        {auth.user ? (
                            <Button asChild className="h-11 rounded-md bg-[#073d91] px-5 text-white hover:bg-[#082f6f]">
                                <Link href={route('dashboard')}>Dashboard</Link>
                            </Button>
                        ) : (
                            <>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="hidden h-11 rounded-md border-[#071a3d]/40 bg-white px-5 text-[#071a3d] sm:inline-flex"
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
                        <Link href={route('directory.index')} className="text-[#075ccc]">
                            All Suppliers
                        </Link>
                        <span>&gt;</span>
                        <span>{company.name}</span>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-[12rem_1fr] lg:items-end">
                        <div className="flex h-40 w-40 items-center justify-center rounded-xl bg-white p-5 shadow-[0_24px_60px_rgba(7,26,61,0.16)] lg:h-48 lg:w-48">
                            {company.logo ? (
                                <img src={company.logo} alt={`${company.name} logo`} className="max-h-full max-w-full object-contain" />
                            ) : (
                                <div className="text-center">
                                    <Fish className="mx-auto size-16 text-[#075ccc]" strokeWidth={1.6} />
                                    <p className="mt-3 text-sm font-extrabold text-[#071a3d]">{company.name}</p>
                                </div>
                            )}
                        </div>

                        <div className="rounded-xl bg-white/96 p-5 shadow-[0_24px_70px_rgba(7,26,61,0.16)] backdrop-blur">
                            <div className="grid gap-5 lg:grid-cols-[1fr_27rem]">
                                <div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h1 className="text-3xl font-extrabold tracking-tight text-[#071a3d] sm:text-4xl">{company.name}</h1>
                                        <span className="inline-flex items-center gap-1.5 rounded-md bg-[#eaf4ff] px-3 py-1.5 text-sm font-extrabold text-[#075ccc]">
                                            <BadgeCheck className="size-4 fill-[#d7ecff]" />
                                            Verified
                                        </span>
                                    </div>
                                    <div className="mt-4 flex flex-wrap gap-5 text-sm font-semibold text-[#405675]">
                                        <span className="inline-flex items-center gap-2">
                                            <MapPin className="size-4 text-[#073d91]" />
                                            {location}
                                        </span>
                                        <span>+</span>
                                        <span>{companyType}</span>
                                    </div>
                                    <p className="mt-5 max-w-3xl text-sm leading-7 font-medium text-[#233f68]">
                                        {company.summary ||
                                            'A trusted seafood supplier offering consistent quality, safe handling, and reliable delivery for business customers.'}
                                    </p>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <Button
                                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="h-12 rounded-md bg-[#073d91] font-extrabold text-white hover:bg-[#082f6f]"
                                    >
                                        <Mail className="size-4" />
                                        Contact Supplier
                                    </Button>
                                    <Button className="h-12 rounded-md bg-[#20b557] font-extrabold text-white hover:bg-[#159746]">
                                        <MessageSquareText className="size-4" />
                                        WhatsApp
                                    </Button>
                                    <Button variant="outline" className="h-12 rounded-md border-[#b8cbe6] font-extrabold text-[#071a3d]">
                                        <Heart className="size-4" />
                                        Save to Favorites
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="h-12 rounded-md border-[#b8cbe6] font-extrabold text-[#071a3d]"
                                    >
                                        <BriefcaseBusiness className="size-4" />
                                        Request Quote
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <main className="bg-white">
                <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="grid rounded-lg border border-[#d6e3f2] bg-white shadow-sm md:grid-cols-2 lg:grid-cols-5">
                        <InfoTile icon={Truck} title="Business Type" value={companyType} />
                        <InfoTile icon={Anchor} title="Delivery Area" value={company.delivery_coverage || 'Malaysia & International Export'} />
                        <InfoTile icon={CalendarDays} title="Listing Status" value={company.status} />
                        <InfoTile
                            icon={ShieldCheck}
                            title="Verification"
                            value={company.status === 'approved' ? 'Approved listing' : 'Pending verification'}
                        />
                        <InfoTile icon={Clock3} title="Operating Hours" value={company.operating_hours || 'Mon - Sat, 8:00 AM - 6:00 PM'} />
                    </div>
                </section>

                <section className="mx-auto grid max-w-7xl gap-8 px-4 py-3 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
                    <div>
                        <h2 className="text-2xl font-extrabold text-[#071a3d]">About Us</h2>
                        <p className="mt-4 text-sm leading-7 font-medium text-[#233f68]">
                            {company.description ||
                                `${company.name} is an experienced fishery supplier focused on reliable product quality, food safety, and consistent service for restaurants, hotels, processors, and export buyers.`}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            {['High Quality Products', 'Consistent Supply', 'Competitive Pricing', 'Fast Delivery'].map((item) => (
                                <span
                                    key={item}
                                    className="inline-flex items-center gap-2 rounded-md border border-[#d6e3f2] bg-[#f8fbff] px-4 py-2 text-xs font-extrabold text-[#233f68]"
                                >
                                    <BadgeCheck className="size-4 text-[#075ccc]" />
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="relative min-h-56 overflow-hidden rounded-lg shadow-sm">
                        <img src={heroImage} alt={`${company.name} facility`} className="absolute inset-0 h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#041d43]/80 to-transparent" />
                        <button
                            className="absolute inset-0 m-auto flex size-16 items-center justify-center rounded-full bg-white text-[#073d91] shadow-lg"
                            type="button"
                        >
                            <Play className="ml-1 size-8 fill-[#073d91]" />
                        </button>
                        <div className="absolute bottom-4 left-4 text-white">
                            <p className="text-sm font-extrabold">Watch Company Video</p>
                            <p className="text-xs font-semibold text-white/80">2:35 min</p>
                        </div>
                    </div>
                </section>

                {productCategories.length > 0 ? (
                    <SectionShell title="Product Categories">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                            {productCategories.map((category) => {
                                const Icon = category.icon;

                                return (
                                    <button
                                        key={category.slug}
                                        type="button"
                                        className="group relative h-32 overflow-hidden rounded-lg text-left shadow-sm"
                                    >
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#041d43]/95 via-[#041d43]/55 to-transparent" />
                                        <div className="relative flex h-full flex-col justify-end p-4 text-white">
                                            <Icon className="mb-2 size-8" strokeWidth={1.6} />
                                            <h3 className="text-base font-extrabold">{category.name}</h3>
                                            <p className="text-xs font-semibold text-white/85">{category.count} Products</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </SectionShell>
                ) : null}

                <SectionShell title="Featured Products / Available Stock">
                    {displayProducts.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                            {displayProducts.slice(0, 5).map((product) => (
                                <div key={product.name} className="overflow-hidden rounded-lg border border-[#d6e3f2] bg-white shadow-sm">
                                    <div className="relative h-32 overflow-hidden">
                                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                        <span className="absolute top-3 right-3 rounded-full bg-white px-3 py-1 text-[11px] font-extrabold text-[#075ccc] shadow">
                                            {product.category}
                                        </span>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-sm font-extrabold text-[#071a3d]">{product.name}</h3>
                                        <p className="mt-1 text-xs font-medium text-[#62738f]">{product.stock}</p>
                                        <p className="mt-3 text-sm font-extrabold text-[#075ccc]">{product.price}</p>
                                        <Button
                                            variant="outline"
                                            className="mt-4 h-9 w-full rounded-md border-[#b8cbe6] text-xs font-extrabold text-[#071a3d]"
                                        >
                                            View Product
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState title="No products available" copy="This supplier has not added active products in the database yet." />
                    )}
                </SectionShell>

                <section className="mx-auto grid max-w-7xl gap-6 px-4 py-3 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <div className="rounded-lg border border-[#d6e3f2] bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-extrabold text-[#071a3d]">Certifications & Licenses</h2>
                        </div>
                        <EmptyState
                            title="No certifications listed"
                            copy="Certification records will appear here after the supplier adds them to the database."
                        />
                    </div>

                    <div className="rounded-lg border border-[#d6e3f2] bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-extrabold text-[#071a3d]">News & Promotions</h2>
                            <Link href={route('directory.index')} className="inline-flex items-center gap-1 text-xs font-extrabold text-[#075ccc]">
                                View all <ArrowRight className="size-3" />
                            </Link>
                        </div>
                        {newsItems.length > 0 ? (
                            <div className="mt-5 space-y-4">
                                {newsItems.slice(0, 2).map((item) => (
                                    <NewsItem
                                        key={`${item.tag}-${item.title}`}
                                        image={item.image}
                                        tag={item.tag}
                                        title={item.title}
                                        date={item.date}
                                        summary={item.summary}
                                    />
                                ))}
                            </div>
                        ) : (
                            <EmptyState title="No news or promotions" copy="Active campaigns and news from the database will appear here." />
                        )}
                    </div>
                </section>

                <section id="contact" className="mx-auto grid max-w-7xl gap-6 px-4 py-3 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
                    <div className="rounded-lg border border-[#d6e3f2] bg-white p-5 shadow-sm">
                        <h2 className="text-xl font-extrabold text-[#071a3d]">Contact Us</h2>
                        <div className="mt-5 grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
                            <div className="space-y-4 text-sm font-semibold text-[#233f68]">
                                <ContactLine icon={Phone} text={company.contact_phone || 'Sign in to view phone number'} />
                                <ContactLine icon={Mail} text={company.contact_email || 'Sign in to view email address'} />
                                <ContactLine icon={MapPin} text={company.address || location} />
                                {company.website ? <ContactLine icon={Globe} text={company.website} /> : null}
                                <div className="flex gap-3 pt-2 text-[#075ccc]">
                                    <Facebook className="size-5" />
                                    <Instagram className="size-5" />
                                    <MessageSquareText className="size-5" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-sm font-extrabold text-[#071a3d]">Send Enquiry</h3>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <Input
                                        value={leadForm.data.name}
                                        onChange={(event) => leadForm.setData('name', event.target.value)}
                                        placeholder="Full name"
                                    />
                                    <Input
                                        value={leadForm.data.email}
                                        onChange={(event) => leadForm.setData('email', event.target.value)}
                                        placeholder="Email"
                                    />
                                    <Input
                                        value={leadForm.data.phone}
                                        onChange={(event) => leadForm.setData('phone', event.target.value)}
                                        placeholder="Phone no."
                                    />
                                    <Input
                                        value={leadForm.data.product_interest}
                                        onChange={(event) => leadForm.setData('product_interest', event.target.value)}
                                        placeholder="Request type"
                                    />
                                </div>
                                <Textarea
                                    value={leadForm.data.message}
                                    onChange={(event) => leadForm.setData('message', event.target.value)}
                                    placeholder="Message"
                                    className="min-h-24 border-[#d6e3f2]"
                                />
                                {auth.user ? (
                                    <Button
                                        onClick={() =>
                                            leadForm.post(route('leads.store', company.id), {
                                                preserveScroll: true,
                                                onSuccess: () => leadForm.reset('phone', 'product_interest', 'message'),
                                            })
                                        }
                                        disabled={leadForm.processing}
                                        className="h-11 w-full rounded-md bg-[#073d91] font-extrabold text-white hover:bg-[#082f6f]"
                                    >
                                        Send Enquiry
                                    </Button>
                                ) : (
                                    <Button asChild className="h-11 w-full rounded-md bg-[#073d91] font-extrabold text-white hover:bg-[#082f6f]">
                                        <Link href={route('login')}>Sign in to Send Enquiry</Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-[#d6e3f2] bg-white shadow-sm">
                        <div className="h-full min-h-80 bg-[linear-gradient(135deg,#dff3ed_0%,#f2f8ff_45%,#b7daf5_100%)] p-7">
                            <div className="max-w-xs rounded-lg bg-white p-4 shadow-lg">
                                <h3 className="text-sm font-extrabold text-[#071a3d]">{company.name}</h3>
                                <p className="mt-2 text-xs leading-5 font-medium text-[#405675]">{company.address || location}</p>
                                <Link href={route('directory.index')} className="mt-3 inline-block text-xs font-extrabold text-[#075ccc]">
                                    View larger map
                                </Link>
                            </div>
                            <div className="mt-10 flex justify-end">
                                <MapPin className="size-16 fill-[#ff5a3d] text-white drop-shadow-xl" />
                            </div>
                        </div>
                    </div>
                </section>

                {auth.user ? (
                    <section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
                        <div className="rounded-lg border border-[#d6e3f2] bg-white p-5 shadow-sm">
                            <h2 className="text-xl font-extrabold text-[#071a3d]">Claim this Listing</h2>
                            <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
                                <Textarea
                                    value={claimForm.data.message}
                                    onChange={(event) => claimForm.setData('message', event.target.value)}
                                    placeholder="Tell the admin how this listing belongs to your company."
                                    className="min-h-20 border-[#d6e3f2]"
                                />
                                <Button
                                    onClick={() => claimForm.post(route('claims.store', company.id))}
                                    disabled={claimForm.processing}
                                    className="h-full rounded-md bg-[#073d91] px-8 font-extrabold text-white hover:bg-[#082f6f]"
                                >
                                    Submit Claim
                                </Button>
                            </div>
                        </div>
                    </section>
                ) : null}

                <SectionShell title="Buyer Reviews">
                    <EmptyState
                        title="No buyer reviews yet"
                        copy="Review data is not available in the database yet, so no sample reviews are shown."
                    />
                </SectionShell>

                <SectionShell title="Similar Suppliers" action="View all suppliers">
                    {similarCompanies.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {similarCompanies.map((supplier) => (
                                <div key={supplier.slug} className="rounded-lg border border-[#d6e3f2] bg-white p-4 shadow-sm">
                                    <div className="flex gap-4">
                                        <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#eaf4ff]">
                                            {supplier.logo ? (
                                                <img src={supplier.logo} alt="" className="size-12 object-contain" />
                                            ) : (
                                                <Fish className="size-8 text-[#075ccc]" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-extrabold text-[#071a3d]">{supplier.name}</h3>
                                            <p className="mt-1 text-xs font-medium text-[#62738f]">{supplier.location || 'Malaysia'}</p>
                                            <p className="mt-1 text-xs font-medium text-[#405675]">{supplier.company_type || 'Supplier'}</p>
                                        </div>
                                    </div>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="mt-4 h-9 w-full rounded-md border-[#b8cbe6] text-xs font-extrabold text-[#071a3d]"
                                    >
                                        <Link href={route('directory.show', supplier.slug)}>View Profile</Link>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="No similar suppliers found"
                            copy="Similar suppliers will appear when other approved companies share this supplier's categories."
                        />
                    )}
                </SectionShell>
            </main>

            <footer className="bg-[#051936] text-white">
                <div className="mx-auto grid max-w-7xl gap-8 px-4 py-9 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr] lg:px-8">
                    <div>
                        <img src="/logo_white.png" alt="IDXI Fisheries Directory" className="h-12 w-auto" />
                        <p className="mt-4 max-w-xs text-sm leading-6 text-white/75">
                            Malaysia&apos;s largest fishery directory platform connecting buyers and suppliers digitally.
                        </p>
                    </div>
                    <FooterLinks title="Platform" links={['Directory', 'Categories', 'For Buyers', 'For Suppliers', 'Resources']} />
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

function productToDisplay(product: Product) {
    return {
        name: product.name,
        category: product.fish_type || 'Product',
        price: product.price ? `${product.price}${product.price_unit ? ` / ${product.price_unit}` : ''}` : 'Price on request',
        stock: product.minimum_order || product.availability_status || 'Available',
        image: product.image || '/assets/hero-market.jpg',
    };
}

function InfoTile({ icon: Icon, title, value }: { icon: LucideIcon; title: string; value: string }) {
    return (
        <div className="flex gap-4 border-b border-[#d6e3f2] p-5 last:border-b-0 md:odd:border-r lg:border-r lg:border-b-0 lg:last:border-r-0">
            <Icon className="size-9 shrink-0 text-[#075ccc]" strokeWidth={1.7} />
            <div>
                <p className="text-sm font-extrabold text-[#071a3d]">{title}</p>
                <p className="mt-1 text-xs leading-5 font-medium text-[#405675]">{value}</p>
            </div>
        </div>
    );
}

function SectionShell({ title, action, children }: { title: string; action?: string; children: ReactNode }) {
    return (
        <section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="text-2xl font-extrabold text-[#071a3d]">{title}</h2>
                {action ? (
                    <Link href={route('directory.index')} className="inline-flex items-center gap-2 text-xs font-extrabold text-[#075ccc]">
                        {action} <ArrowRight className="size-3.5" />
                    </Link>
                ) : null}
            </div>
            {children}
        </section>
    );
}

function NewsItem({ image, tag, title, date, summary }: { image: string; tag: string; title: string; date: string; summary?: string | null }) {
    return (
        <div className="flex gap-4 rounded-lg border border-[#d6e3f2] p-3">
            <img src={image} alt={title} className="size-24 rounded-md object-cover" />
            <div>
                <span className="rounded bg-[#eaf4ff] px-2 py-1 text-[11px] font-extrabold text-[#075ccc]">{tag}</span>
                <h3 className="mt-2 text-sm font-extrabold text-[#071a3d]">{title}</h3>
                <p className="mt-1 text-xs leading-5 font-medium text-[#405675]">{summary || 'Company update from the database.'}</p>
                <p className="mt-1 text-[11px] font-medium text-[#62738f]">{date}</p>
            </div>
        </div>
    );
}

function ContactLine({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
    return (
        <div className="flex items-start gap-3">
            <Icon className="mt-0.5 size-4 shrink-0 text-[#075ccc]" />
            <span>{text}</span>
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

function campaignToNewsItem(campaign: Campaign) {
    return {
        tag: 'Promotion',
        title: campaign.title,
        summary: campaign.summary,
        date: formatDate(campaign.starts_at),
        image: '/assets/hero-market.jpg',
    };
}

function newsEventToNewsItem(newsEvent: NewsEvent) {
    return {
        tag: 'News',
        title: newsEvent.title,
        summary: newsEvent.summary,
        date: formatDate(newsEvent.published_on),
        image: '/assets/hero-reference.jpeg',
    };
}

function formatDate(value?: string | null) {
    if (!value) return 'Date not set';

    return new Intl.DateTimeFormat('en-MY', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(value));
}

function categoryIcon(name: string): LucideIcon {
    const normalized = name.toLowerCase();

    if (normalized.includes('frozen') || normalized.includes('cold')) return Snowflake;
    if (normalized.includes('shrimp') || normalized.includes('aquaculture') || normalized.includes('farm')) return Waves;
    if (normalized.includes('transport') || normalized.includes('logistic') || normalized.includes('wholesale')) return Truck;
    if (normalized.includes('fish')) return Fish;
    if (normalized.includes('squid') || normalized.includes('cuttlefish') || normalized.includes('marine')) return Anchor;

    return Fish;
}

function EmptyState({ title, copy }: { title: string; copy: string }) {
    return (
        <div className="rounded-lg border border-dashed border-[#b8cbe6] bg-[#f8fbff] p-6 text-center">
            <Fish className="mx-auto size-9 text-[#075ccc]" />
            <h3 className="mt-3 text-base font-extrabold text-[#071a3d]">{title}</h3>
            <p className="mt-2 text-sm font-medium text-[#405675]">{copy}</p>
        </div>
    );
}
