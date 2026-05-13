<?php

namespace App\Jobs;

use App\Models\Company;
use App\Models\CompanyAnalyticsEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Cache;

class AggregateCompanyAnalytics implements ShouldQueue
{
    use Dispatchable, Queueable;

    public function __construct(public Company $company) {}

    public function handle(): void
    {
        $dailyViews = CompanyAnalyticsEvent::where('company_id', $this->company->id)
            ->where('event_type', 'listing_view')
            ->where('created_at', '>=', now()->startOfDay())
            ->count();

        $totalViews = CompanyAnalyticsEvent::where('company_id', $this->company->id)
            ->where('event_type', 'listing_view')
            ->count();

        $totalFavorites = CompanyAnalyticsEvent::where('company_id', $this->company->id)
            ->where('event_type', 'favorite_added')
            ->count();

        Cache::put("analytics:company:{$this->company->id}:daily_views", $dailyViews, now()->addDay());
        Cache::put("analytics:company:{$this->company->id}:total_views", $totalViews, now()->addDay());
        Cache::put("analytics:company:{$this->company->id}:total_favorites", $totalFavorites, now()->addDay());
    }
}
