<?php

namespace App\Http\Controllers;

use App\DTOs\SearchDto;
use App\Http\Requests\SearchCompanyRequest;
use App\Models\Company;
use App\Services\AnalyticsService;
use App\Services\CategoryService;
use App\Services\CompanyService;
use App\Services\SearchService;
use Inertia\Inertia;
use Inertia\Response;

class DirectoryController extends Controller
{
    public function __construct(
        private CompanyService $companyService,
        private CategoryService $categoryService,
        private SearchService $searchService,
        private AnalyticsService $analyticsService,
    ) {}

    public function index(SearchCompanyRequest $request): Response
    {
        $search = $request->string('q')->value();
        $location = $request->string('location')->value();

        $dto = new SearchDto(
            query: $search ?: null,
            location: $location ?: null,
            perPage: 12,
        );

        $this->searchService->logSearch(
            $request->user(),
            $search ?: null,
            $location ?: null,
        );

        $companies = $this->companyService->search($dto);

        return Inertia::render('directory/index', [
            'filters' => [
                'q' => $search,
                'location' => $location,
            ],
            'categories' => $this->categoryService->getWithChildren(),
            'companies' => $companies->through(fn(Company $company) => [
                'id' => $company->id,
                'name' => $company->name,
                'slug' => $company->slug,
                'location' => $company->location,
                'company_type' => $company->company_type,
                'summary' => $company->summary,
                'hero_image' => $company->hero_image,
                'categories' => $company->categories->map(fn($category) => [
                    'name' => $category->name,
                    'slug' => $category->slug,
                ]),
            ]),
        ]);
    }

    public function show(SearchCompanyRequest $request, Company $company): Response
    {
        abort_unless(in_array($company->status, ['approved', 'pending', 'unclaimed'], true), 404);

        $this->analyticsService->trackListingView($company, $request->user());

        $company->load([
            'categories:id,name,slug',
            'products' => fn($query) => $query->where('is_active', true)->latest(),
            'campaigns' => fn($query) => $query->where('is_active', true)->latest(),
            'newsEvents' => fn($query) => $query->where('is_active', true)->latest(),
            'owner:id,name,email',
        ]);

        $categoryIds = $company->categories->pluck('id');
        $similarCompanies = Company::query()
            ->where('status', 'approved')
            ->whereKeyNot($company->id)
            ->when($categoryIds->isNotEmpty(), fn($query) => $query->whereHas('categories', fn($categoryQuery) => $categoryQuery->whereIn('categories.id', $categoryIds)))
            ->with('categories:id,name,slug')
            ->limit(4)
            ->get();

        return Inertia::render('directory/show', [
            'company' => [
                'id' => $company->id,
                'name' => $company->name,
                'slug' => $company->slug,
                'status' => $company->status,
                'location' => $company->location,
                'company_type' => $company->company_type,
                'summary' => $company->summary,
                'description' => $company->description,
                'website' => $company->website,
                'contact_email' => $request->user() ? $company->contact_email : null,
                'contact_phone' => $request->user() ? $company->contact_phone : null,
                'hero_image' => $company->hero_image,
                'logo' => $company->logo,
                'categories' => $company->categories,
                'products' => $company->products,
                'campaigns' => $company->campaigns,
                'news_events' => $company->newsEvents,
                'owner' => $company->owner,
            ],
            'similarCompanies' => $similarCompanies->map(fn(Company $similarCompany) => [
                'id' => $similarCompany->id,
                'name' => $similarCompany->name,
                'slug' => $similarCompany->slug,
                'location' => $similarCompany->location,
                'company_type' => $similarCompany->company_type,
                'summary' => $similarCompany->summary,
                'logo' => $similarCompany->logo,
                'categories' => $similarCompany->categories->map(fn($category) => [
                    'name' => $category->name,
                    'slug' => $category->slug,
                ]),
            ]),
        ]);
    }
}
