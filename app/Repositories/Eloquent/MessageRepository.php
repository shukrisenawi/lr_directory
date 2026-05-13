<?php

namespace App\Repositories\Eloquent;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use App\Repositories\Contracts\MessageRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class MessageRepository extends BaseRepository implements MessageRepositoryInterface
{
    protected function modelClass(): string
    {
        return Message::class;
    }

    public function findByConversation(Conversation $conversation): Collection
    {
        return $this->model
            ->where('conversation_id', $conversation->id)
            ->with(['user'])
            ->oldest()
            ->get();
    }

    public function markAsRead(Message $message): bool
    {
        return $message->update(['read_at' => now()]);
    }
}
