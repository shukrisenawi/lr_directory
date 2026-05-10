<?php

namespace Database\Factories;

use App\Models\Campaign;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Campaign>
 */
class CampaignFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'summary' => fake()->sentence(),
            'starts_at' => now()->subDays(5),
            'ends_at' => now()->addDays(20),
            'is_active' => true,
        ];
    }
}
