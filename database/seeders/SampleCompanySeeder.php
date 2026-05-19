<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Company;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class SampleCompanySeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all();

        if ($categories->isEmpty()) {
            $this->call(UserCategorySeeder::class);
            $this->call(SubscriptionPlanSeeder::class);
            $categories = Category::all();
        }

        $companyTypes = ['Exporter', 'Processor', 'Equipment Supplier', 'Distributor', 'Manufacturer'];
        $locations = [
            'Seattle, USA', 'Rotterdam, Netherlands', 'Busan, South Korea',
            'Tokyo, Japan', 'Oslo, Norway', 'Vancouver, Canada',
            'Auckland, New Zealand', 'Sydney, Australia', 'Lisbon, Portugal',
            'Bangkok, Thailand', 'Jakarta, Indonesia', 'Manila, Philippines',
            'Hanoi, Vietnam', 'Mumbai, India', 'Istanbul, Turkey',
        ];

        Company::factory()
            ->count(100)
            ->sequence(fn ($seq) => [
                'name' => fake()->unique()->company(),
                'slug' => fn ($attrs) => str($attrs['name'])->slug()->value(),
                'status' => fake()->randomElement(['approved', 'approved', 'approved', 'pending', 'unclaimed']),
                'location' => fake()->randomElement($locations),
                'company_type' => fake()->randomElement($companyTypes),
                'hero_image' => '/assets/hero.png',
                'is_featured' => fake()->boolean(20),
            ])
            ->create()
            ->each(function (Company $company) use ($categories) {
                $assigned = $categories->random(rand(1, 3));
                $company->categories()->attach($assigned->pluck('id'));

                Product::factory()->count(rand(1, 4))->for($company)->create();
            });
    }
}
