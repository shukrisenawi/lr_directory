<?php

namespace Database\Factories;

use App\Models\NewsEvent;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<NewsEvent>
 */
class NewsEventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(5),
            'summary' => fake()->sentence(),
            'published_on' => now()->subDays(fake()->numberBetween(1, 20)),
            'is_active' => true,
        ];
    }
}
