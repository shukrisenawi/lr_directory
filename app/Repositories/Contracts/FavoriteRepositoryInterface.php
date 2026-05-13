<?php

namespace App\Repositories\Contracts;

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

interface FavoriteRepositoryInterface
{
    public function getUserFavorites(User $user): Collection;

    public function isFavorited(User $user, Company $company): bool;

    public function add(User $user, Company $company): void;

    public function remove(User $user, Company $company): void;
}
