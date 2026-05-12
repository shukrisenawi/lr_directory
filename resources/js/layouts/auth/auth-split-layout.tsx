import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: AuthLayoutProps) {
    const { name, quote } = usePage<SharedData>().props;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col p-10 text-white lg:flex">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--idxi-deep-ocean)] to-[#0D1F3C]" />
                <Link href={route('home')} className="relative z-20 flex items-center text-lg font-medium">
                    <div className="mr-3 flex size-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
                        <AppLogoIcon className="size-6 fill-current text-white" />
                    </div>
                    {name}
                </Link>
                {quote && (
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg leading-relaxed">&ldquo;{quote.message}&rdquo;</p>
                            <footer className="text-sm text-blue-300">{quote.author}</footer>
                        </blockquote>
                    </div>
                )}
            </div>
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link href={route('home')} className="relative z-20 flex items-center justify-center lg:hidden">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--idxi-deep-ocean)] to-[var(--idxi-current)] shadow-sm">
                            <AppLogoIcon className="size-6 fill-current text-white" />
                        </div>
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-semibold tracking-tight text-[var(--idxi-abyss)]">{title}</h1>
                        <p className="text-sm text-balance text-[var(--idxi-tide)]">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
