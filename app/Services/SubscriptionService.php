<?php

namespace App\Services;

use App\DTOs\CreateSubscriptionDto;
use App\Models\Subscription;
use App\Models\SubscriptionPlan;
use App\Repositories\Contracts\SubscriptionPlanRepositoryInterface;
use App\Repositories\Contracts\SubscriptionRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class SubscriptionService
{
    public function __construct(
        private SubscriptionPlanRepositoryInterface $planRepo,
        private SubscriptionRepositoryInterface $subscriptionRepo,
    ) {}

    public function getActivePlans(): Collection
    {
        return $this->planRepo->getActive();
    }

    public function getAllPlans(): Collection
    {
        return $this->planRepo->getAll();
    }

    public function findBySlug(string $slug): ?SubscriptionPlan
    {
        return $this->planRepo->findBySlug($slug);
    }

    public function createPlan(array $data): SubscriptionPlan
    {
        return $this->planRepo->createPlan($data);
    }

    public function updatePlan(SubscriptionPlan $plan, array $data): bool
    {
        return $this->planRepo->updatePlan($plan, $data);
    }

    public function deletePlan(SubscriptionPlan $plan): bool
    {
        return $this->planRepo->deletePlan($plan);
    }

    public function subscribe(CreateSubscriptionDto $dto): Subscription
    {
        $plan = $this->planRepo->findById($dto->planId);
        $days = $dto->durationDays ?? $plan->duration_days;

        return $this->subscriptionRepo->createSubscription([
            'subscription_plan_id' => $dto->planId,
            'subscribable_type' => $dto->subscribableType,
            'subscribable_id' => $dto->subscribableId,
            'status' => $dto->status ?? 'active',
            'payment_status' => $dto->paymentStatus ?? 'unpaid',
            'start_date' => now(),
            'end_date' => now()->addDays($days),
        ]);
    }

    public function getActiveSubscription(string $type, int $id): ?Subscription
    {
        return $this->subscriptionRepo->findActiveForSubscribable($type, $id);
    }

    public function getSubscriptionHistory(string $type, int $id)
    {
        return $this->subscriptionRepo->getAllForSubscribable($type, $id);
    }

    public function getAllPaginated(int $perPage = 20)
    {
        return $this->subscriptionRepo->getAllPaginated($perPage);
    }
}
