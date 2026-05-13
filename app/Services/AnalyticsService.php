<?php

namespace App\Services;

use App\Enums\EventType;
use App\Models\Company;
use App\Models\CompanyAnalyticsEvent;
use App\Models\User;

class AnalyticsService
{
    public function track(Company $company, ?User $user, EventType $eventType, array $meta = []): void
    {
        CompanyAnalyticsEvent::create([
            'company_id' => $company->id,
            'user_id' => $user?->id,
            'event_type' => $eventType->value,
            'meta' => array_merge($meta, [
                'ip' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]),
        ]);
    }

    public function trackListingView(Company $company, ?User $user): void
    {
        $this->track($company, $user, EventType::ListingView);
    }

    public function getDailyViews(Company $company): int
    {
        return CompanyAnalyticsEvent::where('company_id', $company->id)
            ->where('event_type', EventType::ListingView->value)
            ->where('created_at', '>=', now()->startOfDay())
            ->count();
    }

    public function getTotalViews(Company $company): int
    {
        return CompanyAnalyticsEvent::where('company_id', $company->id)
            ->where('event_type', EventType::ListingView->value)
            ->count();
    }
}
