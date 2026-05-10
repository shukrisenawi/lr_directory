<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\CompanyAnalyticsEvent;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DirectoryController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('q')->value();
        $location = $request->string('location')->value();

        $query = Company::query()
            ->where('status', 'approved')
            ->with('categories:id,name,slug');

        if ($search !== '') {
            $query->where(function ($builder) use ($search) {
                $builder->where('name', 'like', '%'.$search.'%')
                    ->orWhere('summary', 'like', '%'.$search.'%')
                    ->orWhere('company_type', 'like', '%'.$search.'%');
            });
        }

        if ($location !== '') {
            $query->where('location', 'like', '%'.$location.'%');
        }

        if ($request->user()) {
            $request->user()->searchHistories()->create([
                'query' => $search ?: null,
                'location' => $location ?: null,
                'filters' => ['route' => 'directory.index'],
            ]);
        }

        return Inertia::render('directory/index', [
            'filters' => [
                'q' => $search,
                'location' => $location,
            ],
            'companies' => $query->paginate(12)->through(fn (Company $company) => [
                'id' => $company->id,
                'name' => $company->name,
                'slug' => $company->slug,
                'location' => $company->location,
                'company_type' => $company->company_type,
                'summary' => $company->summary,
                'hero_image' => $company->hero_image,
                'categories' => $company->categories->map(fn ($category) => [
                    'name' => $category->name,
                    'slug' => $category->slug,
                ]),
            ]),
        ]);
    }

    public function show(Request $request, Company $company): Response
    {
        abort_unless(in_array($company->status, ['approved', 'pending', 'unclaimed'], true), 404);

        CompanyAnalyticsEvent::query()->create([
            'company_id' => $company->id,
            'user_id' => $request->user()?->id,
            'event_type' => 'listing_view',
            'meta' => ['route' => 'directory.show'],
        ]);

        $company->load(['categories:id,name,slug', 'products', 'campaigns', 'newsEvents', 'owner:id,name,email']);

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
        ]);
    }
}
