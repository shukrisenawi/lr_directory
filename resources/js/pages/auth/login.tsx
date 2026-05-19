import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, Fish, Handshake, LoaderCircle, Lock, Mail, ShieldCheck, Users } from 'lucide-react';
import { FormEventHandler } from 'react';

interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

const featureItems = [
    {
        title: 'Secure Platform',
        description: 'Your data and connections are protected with enterprise-grade security.',
        icon: ShieldCheck,
    },
    {
        title: 'Trusted Connections',
        description: 'Join a verified network of buyers, suppliers and industry professionals.',
        icon: Users,
    },
    {
        title: 'Buyer-Supplier Network',
        description: 'Discover opportunities and grow your business globally.',
        icon: Handshake,
    },
    {
        title: 'Fisheries-Focused Solution',
        description: 'Built exclusively for the fisheries and aquaculture industry.',
        icon: Fish,
    },
];

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-white text-[#071a3d]">
            <Head title="Log in" />

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

            <main className="mx-auto grid max-w-7xl lg:grid-cols-[45%_55%]">
                <section className="relative hidden overflow-hidden bg-[#d8efff] lg:block">
                    <img src="/assets/hero.png" alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-sky-100/15 to-[#0265a2]/30" />

                    <div className="relative z-10 flex h-full min-h-[760px] flex-col justify-between px-12 py-10 xl:px-16">
                        <div>
                            <div className="mt-16 max-w-[420px]">
                                <h1 className="text-[32px] leading-[1.18] font-extrabold tracking-tight text-[#08285a] xl:text-[36px]">
                                    Connecting the Fisheries Industry, Worldwide.
                                </h1>
                                <div className="mt-6 h-1 w-14 rounded-full bg-[#0965e8]" />
                                <p className="mt-6 max-w-[380px] text-base leading-7 font-medium text-[#31517f]">
                                    IDXI Fisheries Directory brings buyers, suppliers, and partners together on a trusted, industry-focused platform.
                                </p>
                            </div>
                        </div>

                        <div className="mb-6 w-full max-w-[460px] rounded-xl bg-[#062b63]/88 p-5 text-white shadow-xl shadow-[#062b63]/25 backdrop-blur-md">
                            <div className="grid gap-3">
                                {featureItems.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div key={item.title} className="grid grid-cols-[44px_1fr] items-start gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#116eee] text-white shadow-lg shadow-blue-950/20">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h2 className="text-[15px] leading-5 font-semibold">{item.title}</h2>
                                                <p className="mt-0.5 text-[13px] leading-5 text-blue-50/90">{item.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="flex items-center justify-center px-5 py-12 sm:px-6 lg:px-8">
                    <div className="w-full max-w-[440px]">

                        <form
                            onSubmit={submit}
                            className="rounded-xl border border-[#d9e4f2] bg-white px-6 py-6 shadow-[0_16px_40px_rgba(8,40,90,0.1)] sm:px-8"
                        >
                            <div className="flex flex-col items-center text-center">
                                <h2 className="text-2xl font-extrabold tracking-tight text-[#08285a] sm:text-3xl">
                                    Log in to your account
                                </h2>
                                <p className="mt-2 text-sm leading-6 text-[#6e7f9d]">Enter your email and password below to log in</p>
                            </div>

                            {status && (
                                <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-center text-xs font-medium text-emerald-700">
                                    {status}
                                </div>
                            )}

                            <div className="mt-6 grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-sm font-semibold text-[#102a5d]">
                                        Email address
                                    </Label>
                                    <div className="relative">
                                        <Mail className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#60789d]" />
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="email@example.com"
                                            className="h-11 rounded-lg border-[#cfdced] pl-[38px] text-sm text-[#12315f] shadow-none placeholder:text-[#7888a3] focus-visible:border-[#0a62d8] focus-visible:ring-[#0a62d8]/20"
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between gap-4">
                                        <Label htmlFor="password" className="text-sm font-semibold text-[#102a5d]">
                                            Password
                                        </Label>
                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="text-xs font-semibold text-[#0965e8] hover:text-[#064fb5]"
                                                tabIndex={5}
                                            >
                                                Forgot password?
                                            </Link>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <Lock className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#60789d]" />
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Password"
                                            className="h-11 rounded-lg border-[#cfdced] pl-[38px] text-sm text-[#12315f] shadow-none placeholder:text-[#7888a3] focus-visible:border-[#0a62d8] focus-visible:ring-[#0a62d8]/20"
                                        />
                                        <Eye className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-[#60789d]" />
                                    </div>
                                    <InputError message={errors.password} />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="remember"
                                        checked={data.remember}
                                        onCheckedChange={(checked) => setData('remember', checked === true)}
                                        tabIndex={3}
                                    />
                                    <Label htmlFor="remember" className="cursor-pointer text-sm font-medium text-[#384f75]">
                                        Remember me
                                    </Label>
                                </div>

                                <Button
                                    type="submit"
                                    className="h-11 w-full rounded-lg bg-[#075fde] text-sm font-semibold text-white shadow-[0_10px_20px_rgba(7,95,222,0.2)] hover:bg-[#064fbd]"
                                    tabIndex={4}
                                    disabled={processing}
                                >
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Log in
                                </Button>

                                <p className="text-center text-sm text-[#435675]">
                                    Don&apos;t have an account?{' '}
                                    <Link
                                        href={route('register')}
                                        className="font-semibold text-[#0965e8] underline-offset-4 hover:underline"
                                        tabIndex={6}
                                    >
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </form>

                        <div className="mt-6 flex items-center justify-center gap-2 text-xs font-medium text-[#7a8aa6]">
                            <Fish className="h-4 w-4 text-[#5f789f]" />
                            <span>Secure</span>
                            <span>&bull;</span>
                            <span>Trusted</span>
                            <span>&bull;</span>
                            <span>Fisheries Industry Focused</span>
                        </div>
                    </div>
                </section>
            </main>

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
                    <p>&copy; {new Date().getFullYear()} IDXI Fisheries Directory. All Rights Reserved.</p>
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
