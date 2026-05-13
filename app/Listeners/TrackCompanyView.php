<?php

namespace App\Listeners;

use App\Enums\EventType;
use App\Events\CompanyViewed;
use App\Models\CompanyAnalyticsEvent;

class TrackCompanyView
{
    public function handle(CompanyViewed $event): void
    {
        CompanyAnalyticsEvent::create([
            'company_id' => $event->company->id,
            'user_id' => $event->user?->id,
            'event_type' => EventType::ListingView->value,
            'meta' => [
                'route' => 'directory.show',
                'ip' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ],
        ]);
    }
}
