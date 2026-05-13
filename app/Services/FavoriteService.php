<?php

namespace App\Services;

use App\Enums\EventType;
use App\Models\Company;
use App\Models\User;
use App\Repositories\Contracts\FavoriteRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class FavoriteService
{
    public function __construct(
        private FavoriteRepositoryInterface $favoriteRepo,
        private AnalyticsService $analytics,
    ) {}

    public function getUserFavorites(User $user): Collection
    {
        return $this->favoriteRepo->getUserFavorites($user);
    }

    public function isFavorited(User $user, Company $company): bool
    {
        return $this->favoriteRepo->isFavorited($user, $company);
    }

    public function toggle(User $user, Company $company): bool
    {
        if ($this->favoriteRepo->isFavorited($user, $company)) {
            $this->favoriteRepo->remove($user, $company);

            return false;
        }

        $this->favoriteRepo->add($user, $company);

        return true;
    }

    public function add(User $user, Company $company): void
    {
        $this->favoriteRepo->add($user, $company);
        $this->analytics->track($company, $user, EventType::FavoriteAdded);
    }

    public function remove(User $user, Company $company): void
    {
        $this->favoriteRepo->remove($user, $company);
    }
}
