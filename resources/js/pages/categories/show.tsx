import { Card, CardContent } from '@/components/ui/card';
import { type Category } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { MapPin } from 'lucide-react';

interface CategoryPageProps {
    category: Category & { companies: Array<{ id: number; name: string; slug: string; summary?: string | null; location?: string | null }> };
}

export default function CategoryShow({ category }: CategoryPageProps) {
    return (
        <div className="min-h-screen bg-[var(--idxi-foam)]">
            <Head title={category.name} />
            <div className="bg-gradient-to-b from-[var(--idxi-deep-ocean)] to-[var(--idxi-current)] py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-semibold tracking-tight text-white">{category.name}</h1>
                    <p className="mt-2 max-w-2xl text-sm text-blue-200">{category.description}</p>
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                {category.companies?.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {category.companies.map((company) => (
                            <Link key={company.id} href={route('directory.show', company.slug)} className="group">
                                <Card className="overflow-hidden border-[var(--idxi-shallows)] bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--idxi-deep-ocean)]/8">
                                    <CardContent className="space-y-3 p-5">
                                        <h2 className="font-semibold text-[var(--idxi-abyss)] group-hover:text-amber-600">{company.name}</h2>
                                        <p className="flex items-center gap-1.5 text-sm text-[var(--idxi-tide)]">
                                            <MapPin className="size-3.5 shrink-0" />
                                            {company.location}
                                        </p>
                                        <p className="line-clamp-2 text-sm leading-6 text-[var(--idxi-tide)]">{company.summary}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-[var(--idxi-shallows)] bg-white p-12 text-center text-sm text-[var(--idxi-tide)]">
                        No companies found in this category
                    </div>
                )}
            </div>
        </div>
    );
}
