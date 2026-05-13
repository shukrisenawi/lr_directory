<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Services\AnalyticsService;
use Inertia\Inertia;
use Inertia\Response;

class CompanyAnalyticsController extends Controller
{
    public function __construct(
        private AnalyticsService $analyticsService,
    ) {}

    public function index(): Response
    {
        $company = request()->user()->companyProfile;

        return Inertia::render('company/analytics', [
            'summary' => $company ? $this->analyticsService->getCompanySummary($company) : [],
        ]);
    }
}
