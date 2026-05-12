<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Company;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('welcome', [
            'featuredCategories' => Category::query()
                ->whereNull('parent_id')
                ->with(['children' => fn ($q) => $q->withCount('companies')->orderBy('sort_order')])
                ->orderBy('sort_order')
                ->get(['id', 'name', 'slug']),
            'newListings' => Company::query()
                ->where('status', 'approved')
                ->latest()
                ->limit(6)
                ->get(['id', 'name', 'slug', 'location', 'summary', 'company_type', 'hero_image']),
            'featuredCompanies' => Company::query()
                ->where('status', 'approved')
                ->where('is_featured', true)
                ->limit(4)
                ->get(['id', 'name', 'slug', 'location', 'summary', 'company_type', 'hero_image']),
            'steps' => [
                ['title' => 'Get Claimed', 'copy' => 'Register a company account and submit a claim for your listing.'],
                ['title' => 'Complete Profile', 'copy' => 'Add products, campaigns, and company details after approval.'],
                ['title' => 'Convert Leads', 'copy' => 'Reply in real time and track engagement from interested buyers.'],
            ],
            'testimonial' => [
                'quote' => 'IDXI creates a cleaner bridge between fishery operators, processors, and service providers.',
                'author' => 'Regional trade directory pilot team',
            ],
        ]);
    }
}
