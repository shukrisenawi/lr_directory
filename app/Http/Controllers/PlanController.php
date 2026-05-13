<?php

namespace App\Http\Controllers;

use App\Services\SubscriptionService;
use Inertia\Inertia;
use Inertia\Response;

class PlanController extends Controller
{
    public function __construct(
        private SubscriptionService $subscriptionService,
    ) {}

    public function index(): Response
    {
        $plans = $this->subscriptionService->getActivePlans();

        return Inertia::render('plans/index', [
            'plans' => $plans,
        ]);
    }
}
