<?php

namespace App\Http\Controllers;

use App\DTOs\CreateSubscriptionDto;
use App\Enums\PaymentStatus;
use App\Enums\SubscriptionStatus;
use App\Models\SubscriptionPlan;
use App\Models\User;
use App\Services\SubscriptionService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SubscriptionController extends Controller
{
    public function __construct(
        private SubscriptionService $subscriptionService,
    ) {}

    public function index(): Response
    {
        $user = request()->user();

        return Inertia::render('subscription', [
            'activeSubscription' => $this->subscriptionService->getActiveSubscription(User::class, $user->id),
            'subscriptionHistory' => $this->subscriptionService->getSubscriptionHistory(User::class, $user->id),
            'plans' => $this->subscriptionService->getActivePlans()->where('role_type', 'normal')->values(),
        ]);
    }

    public function store(SubscriptionPlan $plan): RedirectResponse
    {
        $user = request()->user();

        abort_unless($plan->role_type === 'normal' && $plan->is_active, 404);

        $this->subscriptionService->subscribe(new CreateSubscriptionDto(
            planId: $plan->id,
            subscribableType: User::class,
            subscribableId: $user->id,
            status: SubscriptionStatus::Active->value,
            paymentStatus: PaymentStatus::Pending->value,
        ));

        return back()->with('success', 'Subscription activated.');
    }
}
