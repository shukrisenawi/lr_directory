<?php

namespace App\DTOs;

readonly class CompanyProfileDto
{
    public function __construct(
        public string $name,
        public ?string $location = null,
        public ?string $companyType = null,
        public ?string $contactEmail = null,
        public ?string $contactPhone = null,
        public ?string $website = null,
        public ?string $summary = null,
        public ?string $description = null,
        public ?array $socialLinks = null,
        public ?array $categoryIds = null,
    ) {}
}
