<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Company;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DirectoryFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_shows_directory_sections(): void
    {
        $category = Category::factory()->create([
            'name' => 'Aquaculture',
            'slug' => 'aquaculture',
        ]);

        $company = Company::factory()->create([
            'name' => 'Ocean Fresh Export',
            'slug' => 'ocean-fresh-export',
            'status' => 'approved',
        ]);

        $company->categories()->attach($category);

        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('welcome')
                ->has('featuredCategories', 1)
                ->has('newListings', 1)
                ->where('featuredCategories.0.slug', 'aquaculture')
                ->where('newListings.0.slug', 'ocean-fresh-export'));
    }
}
