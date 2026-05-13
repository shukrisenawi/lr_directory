<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\AnalyticsService;
use Inertia\Inertia;
use Inertia\Response;

class AdminAnalyticsController extends Controller
{
    public function __construct(
        private AnalyticsService $analyticsService,
    ) {}

    public function index(): Response
    {
        return Inertia::render('admin/analytics', [
            'summary' => $this->analyticsService->getPlatformSummary(),
        ]);
    }
}
