<?php

namespace App\DTOs;

readonly class CompanyProfileDto
{
    public function __construct(
        public string $name,
        public ?string $location = null,
        public ?string $address = null,
        public ?string $deliveryCoverage = null,
        public ?string $operatingHours = null,
        public ?string $latitude = null,
        public ?string $longitude = null,
        public ?string $companyType = null,
        public ?string $supplierType = null,
        public ?string $contactEmail = null,
        public ?string $contactPhone = null,
        public ?string $whatsapp = null,
        public ?string $website = null,
        public ?string $summary = null,
        public ?string $description = null,
        public ?array $socialLinks = null,
        public ?array $categoryIds = null,
    ) {}
}
