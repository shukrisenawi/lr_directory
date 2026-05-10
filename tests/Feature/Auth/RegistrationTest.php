<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered()
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register()
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'role' => 'normal',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertAuthenticated();
        $this->assertDatabaseHas(User::class, [
            'email' => 'test@example.com',
            'role' => 'normal',
        ]);
        $response->assertRedirect(route('dashboard', absolute: false));
    }

    public function test_company_users_can_register_with_a_pending_listing_profile()
    {
        $response = $this->post('/register', [
            'name' => 'Blue Harbour Foods',
            'email' => 'company@example.com',
            'role' => 'company',
            'company_name' => 'Blue Harbour Foods',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertAuthenticated();
        $this->assertDatabaseHas(User::class, [
            'email' => 'company@example.com',
            'role' => 'company',
        ]);
        $this->assertDatabaseHas('companies', [
            'name' => 'Blue Harbour Foods',
            'status' => 'pending',
        ]);
        $response->assertRedirect(route('dashboard', absolute: false));
    }
}
