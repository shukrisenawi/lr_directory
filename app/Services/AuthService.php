<?php

namespace App\Services;

use App\DTOs\RegisterUserDto;
use App\Enums\CompanyStatus;
use App\Enums\UserRole;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function __construct(
        private UserRepositoryInterface $userRepo,
    ) {}

    public function register(RegisterUserDto $dto): User
    {
        $user = $this->userRepo->create([
            'name' => $dto->name,
            'email' => $dto->email,
            'password' => Hash::make($dto->password),
            'role' => $dto->role,
        ]);

        if ($dto->role === UserRole::Company->value) {
            $user->companyProfile()->create([
                'name' => $dto->name,
                'slug' => str($dto->name)->slug()->append('-company'),
                'status' => CompanyStatus::Pending->value,
            ]);
        }

        return $user;
    }

    public function findByEmail(string $email): ?User
    {
        return $this->userRepo->findByEmail($email);
    }
}
