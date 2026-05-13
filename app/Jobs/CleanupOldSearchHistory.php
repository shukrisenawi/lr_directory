<?php

namespace App\Jobs;

use App\Models\SearchHistory;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;

class CleanupOldSearchHistory implements ShouldQueue
{
    use Dispatchable, Queueable;

    public function handle(): void
    {
        SearchHistory::where('created_at', '<', now()->subMonths(3))->delete();
    }
}
