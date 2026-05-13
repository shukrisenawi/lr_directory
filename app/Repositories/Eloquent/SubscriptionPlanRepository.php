<?php

namespace App\Repositories\Eloquent;

use App\Models\SubscriptionPlan;
use App\Repositories\Contracts\SubscriptionPlanRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class SubscriptionPlanRepository extends BaseRepository implements SubscriptionPlanRepositoryInterface
{
    protected function modelClass(): string
    {
        return SubscriptionPlan::class;
    }

    public function findBySlug(string $slug): ?SubscriptionPlan
    {
        return $this->model->where('slug', $slug)->first();
    }

    public function findById(int $id): ?SubscriptionPlan
    {
        return $this->model->find($id);
    }

    public function createPlan(array $data): SubscriptionPlan
    {
        return $this->model->create($data);
    }

    public function updatePlan(SubscriptionPlan $plan, array $data): bool
    {
        return $plan->update($data);
    }

    public function deletePlan(SubscriptionPlan $plan): bool
    {
        return $plan->delete();
    }

    public function getActive(): Collection
    {
        return $this->model->where('is_active', true)
            ->orderBy('sort_order')
            ->get();
    }

    public function getAll(): Collection
    {
        return $this->model->orderBy('sort_order')->get();
    }
}
