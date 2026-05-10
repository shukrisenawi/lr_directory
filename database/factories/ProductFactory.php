<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->words(3, true);

        return [
            'name' => str($name)->title()->value(),
            'slug' => str($name)->slug()->value(),
            'summary' => fake()->sentence(),
            'image' => '/assets/listing-sample.jpg',
            'is_active' => true,
        ];
    }
}
