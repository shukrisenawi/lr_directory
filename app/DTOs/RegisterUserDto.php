<?php

namespace App\DTOs;

readonly class RegisterUserDto
{
    public function __construct(
        public string $name,
        public string $email,
        public string $password,
        public string $role,
    ) {}
}
