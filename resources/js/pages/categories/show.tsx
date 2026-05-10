import { Card, CardContent } from '@/components/ui/card';
import { type Category } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface CategoryPageProps {
    category: Category & { companies: Array<{ id: number; name: string; slug: string; summary?: string | null; location?: string | null }> };
}

export default function CategoryShow({ category }: CategoryPageProps) {
    return (
        <div className="min-h-screen bg-[var(--idxi-cream)]">
            <Head title={category.name} />
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-semibold text-slate-900">{category.name}</h1>
                <p className="mt-3 max-w-2xl text-slate-500">{category.description}</p>
                <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {category.companies?.map((company) => (
                        <Link key={company.id} href={route('directory.show', company.slug)}>
                            <Card className="border-slate-200">
                                <CardContent className="space-y-3 p-5">
                                    <h2 className="text-lg font-semibold text-slate-900">{company.name}</h2>
                                    <p className="text-sm text-slate-500">{company.location}</p>
                                    <p className="text-sm text-slate-600">{company.summary}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
