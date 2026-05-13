<?php

namespace App\Http\Controllers;

use App\Services\CategoryService;
use App\Services\CompanyService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(
        private CompanyService $companyService,
        private CategoryService $categoryService,
    ) {}

    public function __invoke(): Response
    {
        return Inertia::render('welcome', [
            'featuredCategories' => $this->categoryService->getWithChildren(),
            'newListings' => $this->companyService->getNewListings(6),
            'featuredCompanies' => $this->companyService->getFeatured(4),
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
