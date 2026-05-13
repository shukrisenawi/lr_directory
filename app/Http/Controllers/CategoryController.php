<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Services\CategoryService;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function __construct(
        private CategoryService $categoryService,
    ) {}

    public function show(Category $category): Response
    {
        $category->load([
            'children:id,parent_id,name,slug',
            'companies' => fn($query) => $query->where('status', 'approved')->limit(12),
        ]);

        return Inertia::render('categories/show', [
            'category' => $category,
        ]);
    }
}
