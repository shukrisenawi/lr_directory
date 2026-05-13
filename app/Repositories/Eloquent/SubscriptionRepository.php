<?php

namespace App\Repositories\Eloquent;

use App\Models\Subscription;
use App\Repositories\Contracts\SubscriptionRepositoryInterface;

class SubscriptionRepository extends BaseRepository implements SubscriptionRepositoryInterface
{
    protected function modelClass(): string
    {
        return Subscription::class;
    }

    public function findById(int $id): ?Subscription
    {
        return $this->model->find($id);
    }

    public function createSubscription(array $data): Subscription
    {
        return $this->model->create($data);
    }

    public function updateSubscription(Subscription $subscription, array $data): bool
    {
        return $subscription->update($data);
    }

    public function findActiveForSubscribable(string $type, int $id): ?Subscription
    {
        return $this->model->where('subscribable_type', $type)
            ->where('subscribable_id', $id)
            ->with('plan')
            ->where('status', 'active')
            ->where(function ($q) {
                $q->whereNull('end_date')
                    ->orWhere('end_date', '>', now());
            })
            ->latest()
            ->first();
    }

    public function getAllForSubscribable(string $type, int $id)
    {
        return $this->model->where('subscribable_type', $type)
            ->where('subscribable_id', $id)
            ->with('plan')
            ->latest()
            ->get();
    }

    public function getAllPaginated(int $perPage = 20)
    {
        return $this->model->with(['plan', 'subscribable'])
            ->latest()
            ->paginate($perPage);
    }
}
