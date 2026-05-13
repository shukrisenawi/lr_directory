<?php

namespace App\Services;

use App\Enums\EventType;
use App\Models\Company;
use App\Models\CompanyAnalyticsEvent;
use App\Models\Lead;
use App\Models\Message;
use App\Models\User;
use Illuminate\Support\Facades\DB;

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

    public function getCompanySummary(Company $company): array
    {
        return [
            'daily_views' => $this->getDailyViews($company),
            'total_views' => $this->getTotalViews($company),
            'favorites' => $company->favorites()->count(),
            'leads' => $company->leads()->count(),
            'messages' => $company->conversations()->withCount('messages')->get()->sum('messages_count'),
            'events_by_type' => CompanyAnalyticsEvent::where('company_id', $company->id)
                ->select('event_type', DB::raw('count(*) as total'))
                ->groupBy('event_type')
                ->pluck('total', 'event_type'),
        ];
    }

    public function getPlatformSummary(): array
    {
        return [
            'total_views' => CompanyAnalyticsEvent::where('event_type', EventType::ListingView->value)->count(),
            'total_events' => CompanyAnalyticsEvent::count(),
            'total_leads' => Lead::count(),
            'total_messages' => Message::count(),
            'events_by_type' => CompanyAnalyticsEvent::query()
                ->select('event_type', DB::raw('count(*) as total'))
                ->groupBy('event_type')
                ->pluck('total', 'event_type'),
        ];
    }
}
