<?php

namespace Tests\Feature;

use App\Models\Company;
use App\Models\Conversation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EngagementFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_normal_users_can_favorite_companies(): void
    {
        $user = User::factory()->create(['role' => 'normal']);
        $company = Company::factory()->create(['status' => 'approved']);

        $this->actingAs($user)
            ->post(route('favorites.store', $company))
            ->assertRedirect();

        $this->assertDatabaseHas('favorites', [
            'user_id' => $user->id,
            'company_id' => $company->id,
        ]);
    }

    public function test_company_users_can_submit_claim_requests(): void
    {
        $companyUser = User::factory()->create(['role' => 'company']);
        $company = Company::factory()->create([
            'status' => 'unclaimed',
            'claimed_by_user_id' => null,
        ]);

        $this->actingAs($companyUser)
            ->post(route('claims.store', $company), [
                'message' => 'We would like to manage this listing.',
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('claim_requests', [
            'company_id' => $company->id,
            'user_id' => $companyUser->id,
            'status' => 'pending',
        ]);
    }

    public function test_participants_can_send_messages_in_a_conversation(): void
    {
        $user = User::factory()->create(['role' => 'normal']);
        $companyOwner = User::factory()->create(['role' => 'company']);
        $company = Company::factory()->create([
            'claimed_by_user_id' => $companyOwner->id,
            'status' => 'approved',
        ]);

        $conversation = Conversation::factory()->create([
            'user_id' => $user->id,
            'company_id' => $company->id,
        ]);

        $this->actingAs($user)
            ->post(route('messages.store', $conversation), [
                'body' => 'Hello, I would like your latest product catalog.',
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('messages', [
            'conversation_id' => $conversation->id,
            'user_id' => $user->id,
            'body' => 'Hello, I would like your latest product catalog.',
        ]);
    }
}
