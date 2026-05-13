<?php

namespace App\Repositories\Eloquent;

use App\Models\Category;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class CategoryRepository extends BaseRepository implements CategoryRepositoryInterface
{
    protected function modelClass(): string
    {
        return Category::class;
    }

    public function findBySlug(string $slug): ?Category
    {
        return $this->model->where('slug', $slug)->first();
    }

    public function getAll(): Collection
    {
        return $this->model->orderBy('sort_order')->get();
    }

    public function getParents(): Collection
    {
        return $this->model->whereNull('parent_id')
            ->with(['children' => fn($q) => $q->orderBy('sort_order')])
            ->orderBy('sort_order')
            ->get();
    }

    public function getWithChildren(): Collection
    {
        return $this->model->withCount('companies')
            ->with(['children' => function ($query) {
                $query->withCount('companies')
                    ->whereHas('companies')
                    ->orderBy('sort_order');
            }])
            ->whereNull('parent_id')
            ->where(function ($query) {
                $query->whereHas('companies')
                    ->orWhereHas('children', function ($q) {
                        $q->whereHas('companies');
                    });
            })
            ->orderBy('sort_order')
            ->get();
    }
}
