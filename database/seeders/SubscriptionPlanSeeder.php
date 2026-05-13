<?php

namespace Database\Seeders;

use App\Models\SubscriptionPlan;
use Illuminate\Database\Seeder;

class SubscriptionPlanSeeder extends Seeder
{
    public function run(): void
    {
        collect([
            [
                'name' => 'Buyer Basic',
                'slug' => 'buyer-basic',
                'role_type' => 'normal',
                'price' => 0,
                'duration_days' => 30,
                'features' => ['Browse suppliers', 'Save favorites', 'Send messages'],
                'sort_order' => 1,
            ],
            [
                'name' => 'Supplier Starter',
                'slug' => 'supplier-starter',
                'role_type' => 'company',
                'price' => 49,
                'duration_days' => 30,
                'features' => ['Supplier profile', 'Product listings', 'Campaigns and news', 'Receive messages'],
                'sort_order' => 2,
            ],
            [
                'name' => 'Supplier Pro',
                'slug' => 'supplier-pro',
                'role_type' => 'company',
                'price' => 99,
                'duration_days' => 30,
                'features' => ['Featured supplier exposure', 'Analytics access', 'Priority campaign placement'],
                'sort_order' => 3,
            ],
        ])->each(fn (array $plan) => SubscriptionPlan::query()->updateOrCreate(['slug' => $plan['slug']], $plan));
    }
}
