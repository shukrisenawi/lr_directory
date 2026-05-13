<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        private DashboardService $dashboardService,
    ) {}

    public function __invoke(): Response
    {
        $user = request()->user();
        $company = $user->companyProfile;

        $stats = match ($user->role) {
            'admin' => $this->dashboardService->getAdminStats(),
            'company' => $this->dashboardService->getCompanyStats($user),
            default => $this->dashboardService->getUserStats($user),
        };

        return Inertia::render('dashboard', [
            'role' => $user->role,
            'stats' => $stats,
            'companyProfile' => $company?->only(['id', 'name', 'status', 'summary']),
        ]);
    }
}
