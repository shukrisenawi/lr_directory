<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\SubscriptionService;
use Inertia\Inertia;
use Inertia\Response;

class AdminSubscriptionController extends Controller
{
    public function __construct(
        private SubscriptionService $subscriptionService,
    ) {}

    public function index(): Response
    {
        $subscriptions = $this->subscriptionService->getAllPaginated(20);

        return Inertia::render('admin/subscriptions', [
            'subscriptions' => $subscriptions,
        ]);
    }

    public function plans(): Response
    {
        $plans = $this->subscriptionService->getAllPlans();

        return Inertia::render('admin/plans', [
            'plans' => $plans,
        ]);
    }
}
