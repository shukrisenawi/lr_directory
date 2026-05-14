import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/react';
import { Anchor, Eye, Fish, Handshake, LoaderCircle, Lock, Mail, ShieldCheck, Users } from 'lucide-react';
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
        <main className="min-h-screen bg-[#f5f9ff] font-sans text-[#09214c]">
            <Head title="Log in" />

            <div className="grid min-h-screen lg:grid-cols-[45%_55%]">
                <section className="relative hidden overflow-hidden bg-[#d8efff] lg:block">
                    <img src="/assets/hero.png" alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-sky-100/15 to-[#0265a2]/30" />

                    <div className="relative z-10 flex h-full min-h-[760px] flex-col justify-between px-12 py-10 xl:px-16">
                        <div>
                            <Link href={route('home')} className="inline-flex items-center gap-4">
                                <img src="/logo.svg" alt="IDXI Fisheries Directory" className="h-[72px] w-auto" />
                            </Link>

                            <div className="mt-20 max-w-[470px]">
                                <h1 className="text-[42px] leading-[1.16] font-semibold tracking-normal text-[#08285a] xl:text-[48px]">
                                    Connecting the Fisheries Industry, Worldwide.
                                </h1>
                                <div className="mt-8 h-1 w-16 rounded-full bg-[#0965e8]" />
                                <p className="mt-8 max-w-[430px] text-lg leading-8 font-medium text-[#31517f]">
                                    IDXI Fisheries Directory brings buyers, suppliers, and partners together on a trusted, industry-focused platform.
                                </p>
                            </div>
                        </div>

                        <div className="mb-8 w-full max-w-[520px] rounded-[18px] bg-[#062b63]/88 p-7 text-white shadow-2xl shadow-[#062b63]/25 backdrop-blur-md">
                            <div className="grid gap-5">
                                {featureItems.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div key={item.title} className="grid grid-cols-[58px_1fr] items-start gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#116eee] text-white shadow-lg shadow-blue-950/20">
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h2 className="text-[19px] leading-6 font-semibold">{item.title}</h2>
                                                <p className="mt-1 text-[14px] leading-5 text-blue-50/90">{item.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="flex min-h-screen items-center justify-center px-5 py-8 sm:px-8 lg:px-10">
                    <div className="w-full max-w-[660px]">
                        <div className="mb-8 flex justify-center lg:hidden">
                            <Link href={route('home')} className="inline-flex items-center">
                                <img src="/logo.svg" alt="IDXI Fisheries Directory" className="h-16 w-auto" />
                            </Link>
                        </div>

                        <form
                            onSubmit={submit}
                            className="rounded-[22px] border border-[#d9e4f2] bg-white px-8 py-9 shadow-[0_24px_60px_rgba(8,40,90,0.12)] sm:px-12 sm:py-11"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#dce9f6] bg-white shadow-lg shadow-[#0b2b5d]/12">
                                    <img src="/assets/idxi-fish-logo.png" alt="" className="h-16 w-16 object-contain" />
                                </div>

                                <h2 className="mt-7 text-[30px] leading-tight font-semibold tracking-normal text-[#08285a] sm:text-[34px]">
                                    Log in to your account
                                </h2>
                                <p className="mt-3 text-base leading-7 text-[#6e7f9d]">Enter your email and password below to log in</p>
                            </div>

                            {status && (
                                <div className="mt-7 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm font-medium text-emerald-700">
                                    {status}
                                </div>
                            )}

                            <div className="mt-9 grid gap-6">
                                <div className="grid gap-2.5">
                                    <Label htmlFor="email" className="text-[15px] font-semibold text-[#102a5d]">
                                        Email address
                                    </Label>
                                    <div className="relative">
                                        <Mail className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#60789d]" />
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
                                            className="h-14 rounded-lg border-[#cfdced] pl-[52px] text-base text-[#12315f] shadow-none placeholder:text-[#7888a3] focus-visible:border-[#0a62d8] focus-visible:ring-[#0a62d8]/20"
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2.5">
                                    <div className="flex items-center justify-between gap-4">
                                        <Label htmlFor="password" className="text-[15px] font-semibold text-[#102a5d]">
                                            Password
                                        </Label>
                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="text-sm font-semibold text-[#0965e8] hover:text-[#064fb5]"
                                                tabIndex={5}
                                            >
                                                Forgot password?
                                            </Link>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <Lock className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#60789d]" />
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Password"
                                            className="h-14 rounded-lg border-[#cfdced] px-[52px] text-base text-[#12315f] shadow-none placeholder:text-[#7888a3] focus-visible:border-[#0a62d8] focus-visible:ring-[#0a62d8]/20"
                                        />
                                        <Eye className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-[#60789d]" />
                                    </div>
                                    <InputError message={errors.password} />
                                </div>

                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        id="remember"
                                        checked={data.remember}
                                        onCheckedChange={(checked) => setData('remember', checked === true)}
                                        tabIndex={3}
                                    />
                                    <Label htmlFor="remember" className="cursor-pointer text-base font-medium text-[#384f75]">
                                        Remember me
                                    </Label>
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-2 h-[60px] w-full rounded-lg bg-[#075fde] text-lg font-semibold text-white shadow-[0_14px_26px_rgba(7,95,222,0.24)] hover:bg-[#064fbd]"
                                    tabIndex={4}
                                    disabled={processing}
                                >
                                    {processing && <LoaderCircle className="h-5 w-5 animate-spin" />}
                                    Log in
                                </Button>

                                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-5 text-sm font-medium text-[#7888a3]">
                                    <div className="h-px bg-[#d7e0ec]" />
                                    <span>Or continue with</span>
                                    <div className="h-px bg-[#d7e0ec]" />
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-[52px] rounded-lg border-[#cfdced] bg-white text-[15px] font-semibold text-[#435675] hover:bg-[#f4f8fd]"
                                    >
                                        <span className="text-2xl font-bold text-[#4285f4]">G</span>
                                        Continue with Google
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-[52px] rounded-lg border-[#cfdced] bg-white text-[15px] font-semibold text-[#435675] hover:bg-[#f4f8fd]"
                                    >
                                        <span className="grid h-5 w-5 grid-cols-2 gap-0.5">
                                            <span className="bg-[#f25022]" />
                                            <span className="bg-[#7fba00]" />
                                            <span className="bg-[#00a4ef]" />
                                            <span className="bg-[#ffb900]" />
                                        </span>
                                        Continue with Microsoft
                                    </Button>
                                </div>

                                <p className="text-center text-base text-[#435675]">
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

                        <div className="mt-10 flex items-center justify-center gap-3 text-sm font-medium text-[#7a8aa6]">
                            <Anchor className="h-5 w-5 text-[#5f789f]" />
                            <span>Secure</span>
                            <span>•</span>
                            <span>Trusted</span>
                            <span>•</span>
                            <span>Fisheries Industry Focused</span>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
