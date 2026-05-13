<?php

namespace App\Repositories\Contracts;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

interface UserRepositoryInterface
{
    public function findByEmail(string $email): ?User;

    public function getByRole(string $role): Collection;

    public function getAdmins(): Collection;
}
