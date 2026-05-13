<?php

namespace App\Repositories\Contracts;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

interface MessageRepositoryInterface
{
    public function findByConversation(Conversation $conversation): Collection;

    public function markAsRead(Message $message): bool;
}
