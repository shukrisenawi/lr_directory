<?php

namespace App\Services;

use App\Models\Category;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class CategoryService
{
    public function __construct(
        private CategoryRepositoryInterface $categoryRepo,
    ) {}

    public function findBySlug(string $slug): ?Category
    {
        return $this->categoryRepo->findBySlug($slug);
    }

    public function getParents(): Collection
    {
        return $this->categoryRepo->getParents();
    }

    public function getWithChildren(): Collection
    {
        return $this->categoryRepo->getWithChildren();
    }

    public function getAll(): Collection
    {
        return $this->categoryRepo->getAll();
    }

    public function create(array $data): Category
    {
        return $this->categoryRepo->create($data);
    }

    public function update(Category $category, array $data): bool
    {
        return $this->categoryRepo->update($category, $data);
    }

    public function delete(Category $category): bool
    {
        return $this->categoryRepo->delete($category);
    }

    public function getCompanyCount(Category $category): int
    {
        return $category->companies()->where('status', 'approved')->count();
    }
}
