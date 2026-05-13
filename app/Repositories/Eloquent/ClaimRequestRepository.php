<?php

namespace App\Repositories\Eloquent;

use App\Models\ClaimRequest;
use App\Models\Company;
use App\Models\User;
use App\Repositories\Contracts\ClaimRequestRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class ClaimRequestRepository extends BaseRepository implements ClaimRequestRepositoryInterface
{
    protected function modelClass(): string
    {
        return ClaimRequest::class;
    }

    public function getAllPaginated(int $perPage = 20): LengthAwarePaginator
    {
        return $this->model
            ->with(['company', 'user'])
            ->latest()
            ->paginate($perPage);
    }

    public function getPending(): Collection
    {
        return $this->model
            ->where('status', 'pending')
            ->with(['company', 'user'])
            ->latest()
            ->get();
    }

    public function findByCompany(Company $company): Collection
    {
        return $this->model
            ->where('company_id', $company->id)
            ->with(['user'])
            ->latest()
            ->get();
    }

    public function findByUser(User $user): Collection
    {
        return $this->model
            ->where('user_id', $user->id)
            ->with(['company'])
            ->latest()
            ->get();
    }

    public function findPendingForUserAndCompany(User $user, Company $company): ?ClaimRequest
    {
        return $this->model
            ->where('user_id', $user->id)
            ->where('company_id', $company->id)
            ->where('status', 'pending')
            ->first();
    }
}
