<?php

namespace App\DTOs;

readonly class ClaimDto
{
    public function __construct(
        public ?string $message = null,
    ) {}
}
