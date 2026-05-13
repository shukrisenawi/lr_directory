<?php

namespace App\Http\Controllers\Supplier;

use App\DTOs\CreateSubscriptionDto;
use App\Enums\PaymentStatus;
use App\Enums\SubscriptionStatus;
use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\SubscriptionPlan;
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
        $company = $user->companyProfile;

        $activeSub = $company
            ? $this->subscriptionService->getActiveSubscription(\App\Models\Company::class, $company->id)
            : null;

        $history = $company
            ? $this->subscriptionService->getSubscriptionHistory(\App\Models\Company::class, $company->id)
            : collect();

        $plans = $this->subscriptionService->getActivePlans();

        return Inertia::render('supplier/subscription', [
            'activeSubscription' => $activeSub,
            'subscriptionHistory' => $history,
            'plans' => $plans,
        ]);
    }

    public function store(SubscriptionPlan $plan): RedirectResponse
    {
        $company = request()->user()->companyProfile;

        abort_unless($company && $plan->role_type === 'company' && $plan->is_active, 404);

        $this->subscriptionService->subscribe(new CreateSubscriptionDto(
            planId: $plan->id,
            subscribableType: Company::class,
            subscribableId: $company->id,
            status: SubscriptionStatus::Active->value,
            paymentStatus: PaymentStatus::Pending->value,
        ));

        return back()->with('success', 'Subscription activated.');
    }
}
