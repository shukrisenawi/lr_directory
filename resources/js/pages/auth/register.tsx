import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/react';
import { Anchor, BarChart3, ChevronDown, Eye, Fish, Globe2, Handshake, LoaderCircle, Lock, Mail, ShieldCheck, User, Users } from 'lucide-react';
import { type FormEventHandler, type ReactNode } from 'react';

interface RegisterForm {
    name: string;
    email: string;
    role: 'normal' | 'company';
    company_name: string;
    password: string;
    password_confirmation: string;
}

const benefits = [
    {
        title: 'Global Visibility',
        copy: 'Get discovered by buyers and suppliers worldwide.',
        icon: Globe2,
    },
    {
        title: 'Trusted Connections',
        copy: 'Connect with verified industry professionals.',
        icon: Handshake,
    },
    {
        title: 'Grow Your Business',
        copy: 'Access new opportunities and grow with confidence.',
        icon: BarChart3,
    },
];

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        email: '',
        role: 'normal',
        company_name: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-white text-[#071a3d]">
            <Head title="Register" />

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
                        <Link href={route('register')} className="border-b-2 border-[#075ccc] py-7 text-[#075ccc]">
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

            <main className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-7xl lg:grid-cols-[0.42fr_0.58fr]">
                    <section className="relative isolate hidden overflow-hidden bg-[#eaf6ff] lg:block">
                        <img
                            src="/assets/hero.png"
                            alt="Fishing boats at harbour"
                            className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
                        />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#eaf6ff]/90 via-[#dff2ff]/35 to-[#0a6ab5]/30" />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/25 to-transparent" />

                        <div className="relative flex h-full flex-col justify-between px-10 py-12 xl:px-14">
                            <div>
                                <h1 className="max-w-sm text-4xl leading-tight font-extrabold tracking-tight text-[#07316f]">
                                    The global fisheries network starts here.
                                </h1>
                                <div className="mt-6 h-1 w-14 rounded-full bg-[#0b78ff]" />
                                <p className="mt-6 max-w-sm text-base leading-7 font-medium text-[#405675]">
                                    Join IDXI, the trusted directory connecting buyers, suppliers and industry professionals worldwide.
                                </p>
                            </div>

                            <div className="mb-4 max-w-sm rounded-2xl bg-[#063579]/95 p-5 text-white shadow-[0_20px_55px_rgba(4,24,62,0.24)] backdrop-blur">
                                <h2 className="text-xl font-extrabold">Why join IDXI?</h2>
                                <div className="mt-5 space-y-4">
                                    {benefits.map((benefit) => {
                                        const Icon = benefit.icon;

                                        return (
                                            <div key={benefit.title} className="flex gap-4">
                                                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#116cc8]/55">
                                                    <Icon className="size-6" strokeWidth={1.8} />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-extrabold">{benefit.title}</h3>
                                                    <p className="mt-1 text-xs leading-5 font-medium text-white/85">{benefit.copy}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="flex items-center justify-center bg-[radial-gradient(circle_at_50%_10%,rgba(11,120,255,0.08),transparent_22rem),linear-gradient(180deg,#f6fbff_0%,#ffffff_52%,#f6fbff_100%)] px-5 py-7 sm:px-8 lg:px-10">
                        <div className="w-full max-w-2xl rounded-2xl border border-[#d8e6f6] bg-white p-6 shadow-[0_20px_60px_rgba(7,26,61,0.1)] sm:p-7 lg:p-8">
                            <div className="text-center">
                                <h2 className="text-2xl font-extrabold tracking-tight text-[#071a3d] sm:text-3xl">Create an account</h2>
                                <p className="mt-2 text-sm font-medium text-[#526b90]">Enter your details below to create your account</p>
                            </div>

                            <form className="mt-6 space-y-4" onSubmit={submit}>
                                <Field label="Name" error={errors.name}>
                                    <div className="relative">
                                        <User
                                            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-[#214877]"
                                            strokeWidth={1.7}
                                        />
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            disabled={processing}
                                            placeholder="Full name"
                                            className="h-11 rounded-md border-[#c7d8eb] pl-12 text-sm shadow-none placeholder:text-[#7b8daa] focus-visible:ring-[#0b78ff]"
                                        />
                                    </div>
                                </Field>

                                <Field label="Email address" error={errors.email}>
                                    <div className="relative">
                                        <Mail
                                            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-[#214877]"
                                            strokeWidth={1.7}
                                        />
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            tabIndex={2}
                                            autoComplete="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            disabled={processing}
                                            placeholder="email@example.com"
                                            className="h-11 rounded-md border-[#c7d8eb] pl-12 text-sm shadow-none placeholder:text-[#7b8daa] focus-visible:ring-[#0b78ff]"
                                        />
                                    </div>
                                </Field>

                                <Field label="Account type" error={errors.role}>
                                    <div className="relative">
                                        <Users
                                            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-[#214877]"
                                            strokeWidth={1.7}
                                        />
                                        <select
                                            id="role"
                                            value={data.role}
                                            onChange={(event) => setData('role', event.target.value as 'normal' | 'company')}
                                            className="h-11 w-full appearance-none rounded-md border border-[#c7d8eb] bg-white px-12 text-sm font-medium text-[#405675] shadow-none transition outline-none focus:border-[#0b78ff] focus:ring-2 focus:ring-[#0b78ff]/25"
                                        >
                                            <option value="normal">Normal User</option>
                                            <option value="company">Company</option>
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-[#214877]" />
                                    </div>
                                </Field>

                                {data.role === 'company' && (
                                    <Field label="Company name" error={errors.company_name}>
                                        <div className="relative">
                                            <Globe2
                                                className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-[#214877]"
                                                strokeWidth={1.7}
                                            />
                                            <Input
                                                id="company_name"
                                                type="text"
                                                required
                                                tabIndex={3}
                                                value={data.company_name}
                                                onChange={(event) => setData('company_name', event.target.value)}
                                                disabled={processing}
                                                placeholder="Blue Harbour Foods"
                                                className="h-11 rounded-md border-[#c7d8eb] pl-12 text-sm shadow-none placeholder:text-[#7b8daa] focus-visible:ring-[#0b78ff]"
                                            />
                                        </div>
                                    </Field>
                                )}

                                <Field label="Password" error={errors.password}>
                                    <div className="relative">
                                        <Lock
                                            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-[#214877]"
                                            strokeWidth={1.7}
                                        />
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            tabIndex={4}
                                            autoComplete="new-password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            disabled={processing}
                                            placeholder="Password"
                                            className="h-11 rounded-md border-[#c7d8eb] px-12 text-sm shadow-none placeholder:text-[#7b8daa] focus-visible:ring-[#0b78ff]"
                                        />
                                        <Eye
                                            className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-[#214877]"
                                            strokeWidth={1.7}
                                        />
                                    </div>
                                </Field>

                                <Field label="Confirm password" error={errors.password_confirmation}>
                                    <div className="relative">
                                        <Lock
                                            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-[#214877]"
                                            strokeWidth={1.7}
                                        />
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            required
                                            tabIndex={5}
                                            autoComplete="new-password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            disabled={processing}
                                            placeholder="Confirm password"
                                            className="h-11 rounded-md border-[#c7d8eb] px-12 text-sm shadow-none placeholder:text-[#7b8daa] focus-visible:ring-[#0b78ff]"
                                        />
                                        <Eye
                                            className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-[#214877]"
                                            strokeWidth={1.7}
                                        />
                                    </div>
                                </Field>

                                <div className="flex items-center gap-3 rounded-md bg-[#edf5ff] px-3 py-3 text-[#405675]">
                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-[#073d91] shadow-inner">
                                        <Lock className="size-5" />
                                    </div>
                                    <p className="text-xs leading-5 font-medium">
                                        We use industry-standard encryption to keep your information secure.
                                    </p>
                                </div>

                                <Button
                                    type="submit"
                                    className="h-11 w-full rounded-md bg-[#075bd8]/60 text-sm font-extrabold text-white shadow-none"
                                    tabIndex={-1}
                                    disabled={true}
                                >
                                    Create account
                                </Button>

                                <div className="text-center text-sm font-medium text-[#526b90]">
                                    Already have an account?{' '}
                                    <Link href={route('login')} className="font-semibold text-[#075bd8] underline underline-offset-2" tabIndex={7}>
                                        Log in
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </section>
                </main>

            <Footer />
        </div>
    );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
    return (
        <div className="grid gap-2">
            <Label className="text-sm font-extrabold text-[#071a3d]">{label}</Label>
            {children}
            <InputError message={error} />
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
