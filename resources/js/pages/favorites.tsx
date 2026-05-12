import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Company } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MapPin } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Favorites', href: '/favorites' }];

export default function FavoritesPage({ favorites }: { favorites: Company[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Favorites" />
            <div className="p-4">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold tracking-tight text-[var(--idxi-abyss)]">Favorites</h1>
                    <p className="mt-1 text-sm text-[var(--idxi-tide)]">Your saved companies</p>
                </div>
                {favorites.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {favorites.map((company) => (
                            <Link key={company.id} href={route('directory.show', company.slug)} className="group">
                                <Card className="overflow-hidden border-[var(--idxi-shallows)] bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--idxi-deep-ocean)]/8">
                                    <div className="aspect-[16/10] overflow-hidden bg-[var(--idxi-foam)]">
                                        <img src={company.hero_image || '/assets/hero-market.jpg'} alt={company.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                    </div>
                                    <CardContent className="space-y-2 p-5">
                                        <div className="flex items-start justify-between">
                                            <h2 className="font-semibold text-[var(--idxi-abyss)]">{company.name}</h2>
                                            <Heart className="size-4 fill-amber-500 text-amber-500" />
                                        </div>
                                        <p className="flex items-center gap-1.5 text-sm text-[var(--idxi-tide)]">
                                            <MapPin className="size-3.5 shrink-0" />
                                            {company.location}
                                        </p>
                                        <p className="line-clamp-2 text-sm text-[var(--idxi-tide)]">{company.summary}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-[var(--idxi-shallows)] bg-white p-12 text-center">
                        <Heart className="mx-auto mb-3 size-8 text-[var(--idxi-shallows)]" />
                        <p className="text-sm text-[var(--idxi-tide)]">No favorites yet</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
