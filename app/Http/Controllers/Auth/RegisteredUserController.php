<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'role' => 'required|in:normal,company',
            'company_name' => 'nullable|required_if:role,company|string|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($request->password),
        ]);

        if ($request->role === 'company') {
            Company::create([
                'claimed_by_user_id' => $user->id,
                'name' => $request->string('company_name')->value(),
                'slug' => str($request->string('company_name')->value())->slug()->value(),
                'status' => 'pending',
                'contact_email' => $user->email,
                'logo' => '/assets/idxi-fish-logo.png',
                'hero_image' => '/assets/hero-market.jpg',
                'summary' => 'Pending company profile awaiting approval.',
                'description' => 'This listing is waiting for administrator approval before it becomes publicly manageable.',
            ]);
        }

        event(new Registered($user));

        Auth::login($user);

        return to_route('dashboard');
    }
}
