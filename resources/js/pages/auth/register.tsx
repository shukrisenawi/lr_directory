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

const trustItems = [
    { title: 'Verified & Trusted', copy: 'Quality you can rely on', icon: ShieldCheck },
    { title: 'Secure Platform', copy: 'Your data is protected', icon: Lock },
    { title: 'Global Community', copy: 'Join professionals worldwide', icon: Users },
    { title: 'Built for Fisheries', copy: 'Industry-focused solutions', icon: Anchor },
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
        <div className="min-h-screen bg-[#eef7ff] text-[#071a3d]">
            <Head title="Register" />

            <div className="mx-auto min-h-screen max-w-[96rem] overflow-hidden rounded-t-2xl border-t-3 border-[#073d91] bg-white shadow-[0_24px_70px_rgba(7,26,61,0.14)]">
                <header className="flex flex-col gap-4 border-b border-[#dbe8f6] bg-white px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
                    <Link href={route('home')} className="flex items-center gap-5">
                        <img src="/logo.svg" alt="IDXI Fisheries Directory" className="h-12 w-auto sm:h-14" />
                    </Link>

                    <div className="flex items-center gap-3">
                        <div className="flex size-11 items-center justify-center rounded-full bg-[#eaf4ff] text-[#073d91] shadow-inner">
                            <ShieldCheck className="size-6" strokeWidth={1.8} />
                        </div>
                        <div>
                            <p className="text-sm font-extrabold text-[#071a3d]">Secure. Trusted. Connected.</p>
                            <p className="mt-0.5 text-xs font-medium text-[#526b90]">Your data is safe with IDXI.</p>
                        </div>
                    </div>
                </header>

                <main className="grid min-h-[calc(100vh-10rem)] lg:grid-cols-[0.75fr_1fr]">
                    <section className="relative isolate hidden overflow-hidden bg-[#eaf6ff] lg:block">
                        <img
                            src="/assets/hero.png"
                            alt="Fishing boats at harbour"
                            className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
                        />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#eaf6ff]/90 via-[#dff2ff]/35 to-[#0a6ab5]/30" />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/25 to-transparent" />

                        <div className="relative flex h-full flex-col justify-between px-10 py-12">
                            <div>
                                <h1 className="max-w-sm text-4xl leading-tight font-extrabold tracking-tight text-[#07316f]">
                                    The global fisheries network starts here.
                                </h1>
                                <div className="mt-5 h-1 w-14 rounded-full bg-[#0b78ff]" />
                                <p className="mt-5 max-w-sm text-base leading-7 font-medium text-[#405675]">
                                    Join IDXI, the trusted directory connecting buyers, suppliers and industry professionals worldwide.
                                </p>
                            </div>

                            <div className="mb-4 max-w-xs rounded-2xl bg-[#063579]/95 p-5 text-white shadow-[0_20px_55px_rgba(4,24,62,0.24)] backdrop-blur">
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

                    <section className="flex items-center justify-center bg-[radial-gradient(circle_at_50%_10%,rgba(11,120,255,0.08),transparent_22rem),linear-gradient(180deg,#f6fbff_0%,#ffffff_52%,#f6fbff_100%)] px-5 py-6 sm:px-8 lg:px-10">
                        <div className="w-full max-w-2xl rounded-2xl border border-[#d8e6f6] bg-white p-6 shadow-[0_20px_60px_rgba(7,26,61,0.1)] sm:p-7 lg:p-8">
                            <div className="text-center">
                                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#073d91] text-white shadow-lg shadow-blue-900/20">
                                    <Fish className="size-8" strokeWidth={1.7} />
                                </div>
                                <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-[#071a3d] sm:text-3xl">Create an account</h2>
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
                                            className="h-12 rounded-lg border-[#c7d8eb] pl-12 text-base shadow-none placeholder:text-[#7b8daa] focus-visible:ring-[#0b78ff]"
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
                                            className="h-12 rounded-lg border-[#c7d8eb] pl-12 text-base shadow-none placeholder:text-[#7b8daa] focus-visible:ring-[#0b78ff]"
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
                                            className="h-12 w-full appearance-none rounded-lg border border-[#c7d8eb] bg-white px-12 text-base font-medium text-[#405675] shadow-none transition outline-none focus:border-[#0b78ff] focus:ring-2 focus:ring-[#0b78ff]/25"
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
                                                className="h-12 rounded-lg border-[#c7d8eb] pl-12 text-base shadow-none placeholder:text-[#7b8daa] focus-visible:ring-[#0b78ff]"
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
                                            className="h-12 rounded-lg border-[#c7d8eb] px-12 text-base shadow-none placeholder:text-[#7b8daa] focus-visible:ring-[#0b78ff]"
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
                                            className="h-12 rounded-lg border-[#c7d8eb] px-12 text-base shadow-none placeholder:text-[#7b8daa] focus-visible:ring-[#0b78ff]"
                                        />
                                        <Eye
                                            className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-[#214877]"
                                            strokeWidth={1.7}
                                        />
                                    </div>
                                </Field>

                                <div className="flex items-center gap-3 rounded-lg bg-[#edf5ff] px-3 py-3 text-[#405675]">
                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-[#073d91] shadow-inner">
                                        <Lock className="size-5" />
                                    </div>
                                    <p className="text-xs leading-5 font-medium">
                                        We use industry-standard encryption to keep your information secure.
                                    </p>
                                </div>

                                <Button
                                    type="submit"
                                    className="h-12 w-full rounded-lg bg-[#075bd8] text-base font-extrabold text-white shadow-[0_14px_30px_rgba(7,91,216,0.22)] hover:bg-[#064db8]"
                                    tabIndex={6}
                                    disabled={processing}
                                >
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Create account
                                </Button>

                                <div className="flex items-center gap-4 text-xs font-medium text-[#6b7d99]">
                                    <div className="h-px flex-1 bg-[#d8e6f6]" />
                                    <span>or sign up with</span>
                                    <div className="h-px flex-1 bg-[#d8e6f6]" />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-11 rounded-lg border-[#c7d8eb] text-sm font-semibold text-[#405675]"
                                    >
                                        <span className="text-lg font-extrabold text-[#4285f4]">G</span>
                                        Continue with Google
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-11 rounded-lg border-[#c7d8eb] text-sm font-semibold text-[#405675]"
                                    >
                                        <span className="grid size-4 grid-cols-2 gap-0.5">
                                            <span className="bg-[#f25022]" />
                                            <span className="bg-[#7fba00]" />
                                            <span className="bg-[#00a4ef]" />
                                            <span className="bg-[#ffb900]" />
                                        </span>
                                        Continue with Microsoft
                                    </Button>
                                </div>

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

                <footer className="border-t border-[#dbe8f6] bg-white px-5 py-5 sm:px-8">
                    <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {trustItems.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className={`flex items-center gap-3 lg:border-r lg:border-[#dbe8f6] ${index === trustItems.length - 1 ? 'lg:border-r-0' : ''}`}
                                >
                                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#c7d8eb] bg-[#f6fbff] text-[#073d91]">
                                        <Icon className="size-5" strokeWidth={1.7} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-extrabold text-[#071a3d]">{item.title}</h3>
                                        <p className="mt-0.5 text-xs font-medium text-[#526b90]">{item.copy}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </footer>
            </div>
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
