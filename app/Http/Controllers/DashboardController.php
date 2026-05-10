<?php

namespace App\Http\Controllers;

use App\Models\ClaimRequest;
use App\Models\Company;
use App\Models\Conversation;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        /** @var User $user */
        $user = request()->user();
        $company = $user->companyProfile;

        return Inertia::render('dashboard', [
            'role' => $user->role,
            'stats' => match ($user->role) {
                'admin' => [
                    'companies' => Company::count(),
                    'pendingClaims' => ClaimRequest::query()->where('status', 'pending')->count(),
                    'activeUsers' => User::query()->where('status', 'active')->count(),
                ],
                'company' => [
                    'products' => $company?->products()->count() ?? 0,
                    'campaigns' => $company?->campaigns()->count() ?? 0,
                    'messages' => $company ? Conversation::query()->where('company_id', $company->id)->count() : 0,
                ],
                default => [
                    'favorites' => $user->favorites()->count(),
                    'conversations' => $user->conversations()->count(),
                    'recentSearches' => $user->searchHistories()->count(),
                ],
            },
            'companyProfile' => $company?->only(['id', 'name', 'status', 'summary']),
        ]);
    }
}
