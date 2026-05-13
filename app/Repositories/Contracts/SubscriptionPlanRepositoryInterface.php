<?php

namespace App\Repositories\Contracts;

use App\Models\SubscriptionPlan;
use Illuminate\Database\Eloquent\Collection;

interface SubscriptionPlanRepositoryInterface
{
    public function findById(int $id): ?SubscriptionPlan;
    public function findBySlug(string $slug): ?SubscriptionPlan;
    public function getActive(): Collection;
    public function getAll(): Collection;
    public function createPlan(array $data): SubscriptionPlan;
    public function updatePlan(SubscriptionPlan $plan, array $data): bool;
    public function deletePlan(SubscriptionPlan $plan): bool;
}
