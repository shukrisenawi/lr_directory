<?php

namespace App\Services;

use App\Models\SearchHistory;
use App\Models\User;

class SearchService
{
    public function logSearch(?User $user, ?string $query, ?string $location = null, array $filters = []): void
    {
        if (!$user) {
            return;
        }

        SearchHistory::create([
            'user_id' => $user->id,
            'query' => $query,
            'location' => $location,
            'filters' => $filters,
        ]);
    }

    public function getUserHistory(User $user, int $limit = 10)
    {
        return SearchHistory::where('user_id', $user->id)
            ->latest()
            ->limit($limit)
            ->get();
    }

    public function getPopularSearches(int $limit = 10)
    {
        return SearchHistory::select('query')
            ->whereNotNull('query')
            ->selectRaw('COUNT(*) as count')
            ->groupBy('query')
            ->orderByDesc('count')
            ->limit($limit)
            ->get();
    }
}
