<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Company;
use App\Models\Product;
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

    public function test_directory_page_uses_categories_from_database(): void
    {
        $parent = Category::factory()->create([
            'name' => 'Frozen Seafood',
            'slug' => 'frozen-seafood',
        ]);

        $child = Category::factory()->create([
            'parent_id' => $parent->id,
            'name' => 'Frozen Fish',
            'slug' => 'frozen-fish',
        ]);

        $company = Company::factory()->create([
            'name' => 'Database Cold Chain',
            'slug' => 'database-cold-chain',
            'status' => 'approved',
        ]);

        $company->categories()->attach([$parent->id, $child->id]);

        $this->get('/directory')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('directory/index')
                ->has('categories', 1)
                ->where('categories.0.slug', 'frozen-seafood')
                ->where('categories.0.children.0.slug', 'frozen-fish')
                ->where('companies.data.0.slug', 'database-cold-chain'));

        $this->get('/directory?q=Frozen%20Seafood')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('directory/index')
                ->where('filters.q', 'Frozen Seafood')
                ->where('companies.data.0.slug', 'database-cold-chain'));
    }

    public function test_categories_menu_page_uses_categories_from_database(): void
    {
        $category = Category::factory()->create([
            'name' => 'Fresh Fish',
            'slug' => 'fresh-fish',
        ]);

        $company = Company::factory()->create([
            'name' => 'Fresh Supplier',
            'slug' => 'fresh-supplier',
            'status' => 'approved',
        ]);

        $company->categories()->attach($category);

        $this->get('/categories')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('categories/index')
                ->has('categories', 1)
                ->where('categories.0.slug', 'fresh-fish'));
    }

    public function test_supplier_profile_uses_products_and_similar_suppliers_from_database(): void
    {
        $category = Category::factory()->create([
            'name' => 'Fresh Fish',
            'slug' => 'fresh-fish',
        ]);

        $company = Company::factory()->create([
            'name' => 'Database Seafood',
            'slug' => 'database-seafood',
            'status' => 'approved',
        ]);

        $similarCompany = Company::factory()->create([
            'name' => 'Similar Fish Supplier',
            'slug' => 'similar-fish-supplier',
            'status' => 'approved',
        ]);

        $company->categories()->attach($category);
        $similarCompany->categories()->attach($category);

        Product::factory()->for($company)->create([
            'name' => 'Database Mackerel',
            'slug' => 'database-mackerel',
            'fish_type' => 'Fresh Fish',
            'is_active' => true,
        ]);

        $this->get('/directory/database-seafood')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('directory/show')
                ->where('company.slug', 'database-seafood')
                ->where('company.products.0.slug', 'database-mackerel')
                ->where('similarCompanies.0.slug', 'similar-fish-supplier'));
    }
}
