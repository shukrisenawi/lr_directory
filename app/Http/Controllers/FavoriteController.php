<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\CompanyAnalyticsEvent;
use Inertia\Inertia;
use Inertia\Response;

class FavoriteController extends Controller
{
    public function index(): Response
    {
        $favorites = request()->user()->favorites()->with('categories:id,name,slug')->get();

        return Inertia::render('favorites', [
            'favorites' => $favorites,
        ]);
    }

    public function store(Company $company)
    {
        request()->user()->favorites()->syncWithoutDetaching([$company->id]);

        CompanyAnalyticsEvent::query()->create([
            'company_id' => $company->id,
            'user_id' => request()->user()->id,
            'event_type' => 'favorite_added',
        ]);

        return back()->with('success', 'Company added to favorites.');
    }

    public function destroy(Company $company)
    {
        request()->user()->favorites()->detach($company->id);

        return back()->with('success', 'Company removed from favorites.');
    }
}
