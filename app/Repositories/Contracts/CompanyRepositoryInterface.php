<?php

namespace App\Repositories\Contracts;

use App\DTOs\SearchDto;
use App\Models\Category;
use App\Models\Company;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface CompanyRepositoryInterface
{
    public function findBySlug(string $slug): ?Company;

    public function findApproved(string $slug): ?Company;

    public function search(SearchDto $dto): LengthAwarePaginator;

    public function findByCategory(Category $category, int $limit = 12): Collection;

    public function getFeatured(int $limit = 6): Collection;

    public function getNewListings(int $limit = 6): Collection;

    public function getAllPaginated(int $perPage = 20): LengthAwarePaginator;

    public function updateStatus(Company $company, string $status): void;
}
