<?php

namespace Tests\Feature;

use App\Models\ClaimRequest;
use App\Models\Company;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminWorkflowTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_approve_claim_requests(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $companyUser = User::factory()->create(['role' => 'company']);
        $company = Company::factory()->create(['status' => 'pending']);
        $claim = ClaimRequest::query()->create([
            'company_id' => $company->id,
            'user_id' => $companyUser->id,
            'message' => 'Please assign this listing to our team.',
            'status' => 'pending',
        ]);

        $this->actingAs($admin)
            ->patch(route('admin.claims.update', $claim), [
                'status' => 'approved',
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('claim_requests', [
            'id' => $claim->id,
            'status' => 'approved',
        ]);
        $this->assertDatabaseHas('companies', [
            'id' => $company->id,
            'claimed_by_user_id' => $companyUser->id,
            'status' => 'approved',
        ]);
    }
}
