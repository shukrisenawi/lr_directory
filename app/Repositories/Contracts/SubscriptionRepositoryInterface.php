<?php

namespace App\Repositories\Contracts;

use App\Models\Subscription;

interface SubscriptionRepositoryInterface
{
    public function findById(int $id): ?Subscription;
    public function findActiveForSubscribable(string $type, int $id): ?Subscription;
    public function getAllForSubscribable(string $type, int $id);
    public function createSubscription(array $data): Subscription;
    public function updateSubscription(Subscription $subscription, array $data): bool;
    public function getAllPaginated(int $perPage = 20);
}
