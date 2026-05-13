<?php

namespace App\Services;

use App\Enums\UserRole;
use App\Models\ClaimRequest;
use App\Models\Company;
use App\Models\Conversation;
use App\Models\Favorite;
use App\Models\Lead;
use App\Models\SearchHistory;
use App\Models\User;

class DashboardService
{
    public function getAdminStats(): array
    {
        return [
            'total_companies' => Company::count(),
            'pending_claims' => ClaimRequest::where('status', 'pending')->count(),
            'total_users' => User::count(),
            'company_users' => User::where('role', UserRole::Company->value)->count(),
            'total_leads' => Lead::count(),
            'recent_claims' => ClaimRequest::with(['company', 'user'])
                ->latest()
                ->limit(5)
                ->get(),
        ];
    }

    public function getCompanyStats(User $user): array
    {
        $company = $user->companyProfile;

        if (!$company) {
            return [];
        }

        return [
            'products_count' => $company->products()->count(),
            'campaigns_count' => $company->campaigns()->count(),
            'news_count' => $company->newsEvents()->count(),
            'leads_count' => $company->leads()->count(),
            'messages_count' => $company->conversations()->count(),
            'unread_messages' => $company->conversations()
                ->withCount(['messages as unread' => fn($q) => $q->whereNull('read_at')->where('user_id', '!=', $user->id)])
                ->get()
                ->sum('unread'),
        ];
    }

    public function getUserStats(User $user): array
    {
        return [
            'favorites_count' => Favorite::where('user_id', $user->id)->count(),
            'conversations_count' => Conversation::where('user_id', $user->id)->count(),
            'search_count' => SearchHistory::where('user_id', $user->id)->count(),
        ];
    }
}
