<?php

namespace App\Http\Controllers\Auth;

use App\DTOs\RegisterUserDto;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Services\AuthService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function __construct(
        private AuthService $authService,
    ) {}

    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $dto = new RegisterUserDto(
            name: $request->name,
            email: $request->email,
            password: $request->password,
            role: $request->role,
        );

        $user = $this->authService->register($dto);

        event(new Registered($user));

        Auth::login($user);

        return to_route('dashboard');
    }
}
