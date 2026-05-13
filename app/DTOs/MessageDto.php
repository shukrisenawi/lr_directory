<?php

namespace App\DTOs;

readonly class MessageDto
{
    public function __construct(
        public string $body,
    ) {}
}
