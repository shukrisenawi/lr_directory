<?php

namespace App\Repositories\Eloquent;

use App\Models\Company;
use App\Models\User;
use App\Repositories\Contracts\FavoriteRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class FavoriteRepository implements FavoriteRepositoryInterface
{
    public function getUserFavorites(User $user): Collection
    {
        return $user->favorites()->with(['categories'])->get();
    }

    public function isFavorited(User $user, Company $company): bool
    {
        return $user->favorites()->where('company_id', $company->id)->exists();
    }

    public function add(User $user, Company $company): void
    {
        $user->favorites()->syncWithoutDetaching([$company->id]);
    }

    public function remove(User $user, Company $company): void
    {
        $user->favorites()->detach($company->id);
    }
}
