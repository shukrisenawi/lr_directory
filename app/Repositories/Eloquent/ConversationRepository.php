<?php

namespace App\Repositories\Eloquent;

use App\Models\Company;
use App\Models\Conversation;
use App\Models\User;
use App\Repositories\Contracts\ConversationRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class ConversationRepository extends BaseRepository implements ConversationRepositoryInterface
{
    protected function modelClass(): string
    {
        return Conversation::class;
    }

    public function findByUser(User $user): Collection
    {
        return $this->model
            ->where('user_id', $user->id)
            ->with(['company', 'messages' => fn($q) => $q->latest()->limit(1)])
            ->latest('last_message_at')
            ->get();
    }

    public function findByCompany(Company $company): Collection
    {
        return $this->model
            ->where('company_id', $company->id)
            ->with(['user', 'messages' => fn($q) => $q->latest()->limit(1)])
            ->latest('last_message_at')
            ->get();
    }

    public function findBetween(User $user, Company $company): ?Conversation
    {
        return $this->model
            ->where('user_id', $user->id)
            ->where('company_id', $company->id)
            ->first();
    }
}
