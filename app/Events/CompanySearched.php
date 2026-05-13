<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CompanySearched
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public ?User $user,
        public ?string $query,
        public ?string $location,
    ) {}
}
