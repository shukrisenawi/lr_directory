<?php

namespace App\Repositories\Contracts;

use App\Models\Company;
use App\Models\Conversation;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

interface ConversationRepositoryInterface
{
    public function findByUser(User $user): Collection;

    public function findByCompany(Company $company): Collection;

    public function findBetween(User $user, Company $company): ?Conversation;
}
