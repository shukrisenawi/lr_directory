<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function __construct(
        private DashboardService $dashboardService,
    ) {}

    public function __invoke(): Response
    {
        $stats = $this->dashboardService->getAdminStats();

        return Inertia::render('admin/index', [
            'stats' => [
                'companies' => $stats['total_companies'],
                'pendingCompanies' => $stats['pending_claims'],
                'pendingClaims' => $stats['pending_claims'],
                'users' => $stats['total_users'],
            ],
            'recentClaims' => $stats['recent_claims'],
        ]);
    }
}
