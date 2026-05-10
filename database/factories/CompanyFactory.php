<?php

namespace Database\Factories;

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->company();

        return [
            'claimed_by_user_id' => null,
            'name' => $name,
            'slug' => str($name)->slug()->value(),
            'status' => 'approved',
            'location' => fake()->city().', Malaysia',
            'company_type' => fake()->randomElement(['Exporter', 'Processor', 'Equipment Supplier']),
            'contact_email' => fake()->companyEmail(),
            'contact_phone' => fake()->phoneNumber(),
            'website' => fake()->url(),
            'hero_image' => '/assets/hero-market.jpg',
            'logo' => '/assets/idxi-fish-logo.png',
            'summary' => fake()->sentence(),
            'description' => fake()->paragraphs(2, true),
            'social_links' => [
                'facebook' => fake()->url(),
                'linkedin' => fake()->url(),
            ],
            'is_featured' => fake()->boolean(35),
        ];
    }

    public function claimed(?User $owner = null): static
    {
        return $this->state(fn () => [
            'claimed_by_user_id' => $owner?->id ?? User::factory()->create(['role' => 'company'])->id,
            'status' => 'approved',
        ]);
    }
}
