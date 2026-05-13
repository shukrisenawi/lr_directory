<?php

namespace App\DTOs;

readonly class SearchDto
{
    public function __construct(
        public ?string $query = null,
        public ?string $location = null,
        public ?int $categoryId = null,
        public int $perPage = 12,
        public string $sort = 'name',
        public string $direction = 'asc',
    ) {}
}
