<?php

namespace App\DTOs;

readonly class LeadDto
{
    public function __construct(
        public string $name,
        public ?string $email,
        public ?string $phone,
        public ?string $productInterest,
        public string $message,
    ) {}
}
