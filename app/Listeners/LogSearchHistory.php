<?php

namespace App\Listeners;

use App\Events\CompanySearched;
use App\Models\SearchHistory;

class LogSearchHistory
{
    public function handle(CompanySearched $event): void
    {
        if (!$event->user) {
            return;
        }

        SearchHistory::create([
            'user_id' => $event->user->id,
            'query' => $event->query,
            'location' => $event->location,
            'filters' => ['route' => 'directory.index'],
        ]);
    }
}
