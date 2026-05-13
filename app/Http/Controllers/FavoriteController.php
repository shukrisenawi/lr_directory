<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Services\FavoriteService;
use Inertia\Inertia;
use Inertia\Response;

class FavoriteController extends Controller
{
    public function __construct(
        private FavoriteService $favoriteService,
    ) {}

    public function index(): Response
    {
        $favorites = $this->favoriteService->getUserFavorites(request()->user());

        return Inertia::render('favorites', [
            'favorites' => $favorites,
        ]);
    }

    public function store(Company $company)
    {
        $this->favoriteService->add(request()->user(), $company);

        return back()->with('success', 'Company added to favorites.');
    }

    public function destroy(Company $company)
    {
        $this->favoriteService->remove(request()->user(), $company);

        return back()->with('success', 'Company removed from favorites.');
    }
}
