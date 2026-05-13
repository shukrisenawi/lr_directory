<?php

namespace App\Repositories\Contracts;

use App\Models\ClaimRequest;
use App\Models\Company;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface ClaimRequestRepositoryInterface
{
    public function getAllPaginated(int $perPage = 20): LengthAwarePaginator;

    public function getPending(): Collection;

    public function findByCompany(Company $company): Collection;

    public function findByUser(User $user): Collection;

    public function findPendingForUserAndCompany(User $user, Company $company): ?ClaimRequest;
}
