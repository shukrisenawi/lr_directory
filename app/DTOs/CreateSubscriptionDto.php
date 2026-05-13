<?php

namespace App\DTOs;

readonly class CreateSubscriptionDto
{
    public function __construct(
        public int $planId,
        public string $subscribableType,
        public int $subscribableId,
        public ?string $status = 'active',
        public ?string $paymentStatus = 'unpaid',
        public ?int $durationDays = null,
    ) {}
}
