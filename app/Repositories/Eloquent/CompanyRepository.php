<?php

namespace App\Repositories\Eloquent;

use App\DTOs\SearchDto;
use App\Models\Category;
use App\Models\Company;
use App\Repositories\Contracts\CompanyRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class CompanyRepository extends BaseRepository implements CompanyRepositoryInterface
{
    protected function modelClass(): string
    {
        return Company::class;
    }

    public function findBySlug(string $slug): ?Company
    {
        return $this->model->where('slug', $slug)->first();
    }

    public function findApproved(string $slug): ?Company
    {
        return $this->model->where('slug', $slug)
            ->where('status', 'approved')
            ->with(['categories'])
            ->first();
    }

    public function search(SearchDto $dto): LengthAwarePaginator
    {
        return $this->model
            ->where('status', 'approved')
            ->when($dto->query, fn($q) => $q->where(function ($sub) use ($dto) {
                $sub->where('name', 'like', "%{$dto->query}%")
                    ->orWhere('summary', 'like', "%{$dto->query}%")
                    ->orWhere('description', 'like', "%{$dto->query}%");
            }))
            ->when($dto->location, fn($q) => $q->where('location', 'like', "%{$dto->location}%"))
            ->when($dto->categoryId, fn($q) => $q->whereHas('categories', fn($c) => $c->where('id', $dto->categoryId)))
            ->with(['categories'])
            ->orderBy($dto->sort, $dto->direction)
            ->paginate($dto->perPage);
    }

    public function findByCategory(Category $category, int $limit = 12): Collection
    {
        return $this->model
            ->where('status', 'approved')
            ->whereHas('categories', fn($q) => $q->where('id', $category->id))
            ->with(['categories'])
            ->limit($limit)
            ->get();
    }

    public function getFeatured(int $limit = 6): Collection
    {
        return $this->model
            ->where('status', 'approved')
            ->where('is_featured', true)
            ->with(['categories'])
            ->limit($limit)
            ->get();
    }

    public function getNewListings(int $limit = 6): Collection
    {
        return $this->model
            ->where('status', 'approved')
            ->with(['categories'])
            ->latest()
            ->limit($limit)
            ->get();
    }

    public function getAllPaginated(int $perPage = 20): LengthAwarePaginator
    {
        return $this->model
            ->with(['categories', 'owner'])
            ->latest()
            ->paginate($perPage);
    }

    public function updateStatus(Company $company, string $status): void
    {
        $company->update(['status' => $status]);
    }
}
