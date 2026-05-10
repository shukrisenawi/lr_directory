import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Company } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Favorites', href: '/favorites' }];

export default function FavoritesPage({ favorites }: { favorites: Company[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Favorites" />
            <div className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
                {favorites.map((company) => (
                    <Link key={company.id} href={route('directory.show', company.slug)}>
                        <Card className="overflow-hidden border-slate-200 shadow-none">
                            <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                                <img src={company.hero_image || '/assets/hero-market.jpg'} alt={company.name} className="h-full w-full object-cover" />
                            </div>
                            <CardContent className="space-y-2 p-5">
                                <div className="text-lg font-semibold text-slate-900">{company.name}</div>
                                <div className="text-sm text-slate-500">{company.location}</div>
                                <p className="text-sm text-slate-600">{company.summary}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </AppLayout>
    );
}
