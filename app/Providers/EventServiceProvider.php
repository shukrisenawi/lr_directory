<?php

namespace App\Providers;

use App\Events\ClaimApproved;
use App\Events\CompanyClaimed;
use App\Events\CompanySearched;
use App\Events\CompanyViewed;
use App\Listeners\LogSearchHistory;
use App\Listeners\NotifyAdminOfNewClaim;
use App\Listeners\NotifyUserOfApproval;
use App\Listeners\TrackCompanyView;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        CompanyClaimed::class => [
            NotifyAdminOfNewClaim::class,
        ],
        ClaimApproved::class => [
            NotifyUserOfApproval::class,
        ],
        CompanySearched::class => [
            LogSearchHistory::class,
        ],
        CompanyViewed::class => [
            TrackCompanyView::class,
        ],
    ];

    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
