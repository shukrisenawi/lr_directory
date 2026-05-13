<?php

namespace App\Services;

use App\DTOs\MessageDto;
use App\Events\MessageSent;
use App\Models\Company;
use App\Models\Conversation;
use App\Models\User;
use App\Repositories\Contracts\ConversationRepositoryInterface;
use App\Repositories\Contracts\MessageRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class ConversationService
{
    public function __construct(
        private ConversationRepositoryInterface $conversationRepo,
        private MessageRepositoryInterface $messageRepo,
    ) {}

    public function getUserConversations(User $user): Collection
    {
        return $this->conversationRepo->findByUser($user);
    }

    public function getCompanyConversations(Company $company): Collection
    {
        return $this->conversationRepo->findByCompany($company);
    }

    public function findOrCreate(User $user, Company $company): Conversation
    {
        $conversation = $this->conversationRepo->findBetween($user, $company);

        if (!$conversation) {
            $conversation = $this->conversationRepo->create([
                'user_id' => $user->id,
                'company_id' => $company->id,
            ]);
        }

        return $conversation;
    }

    public function sendMessage(Conversation $conversation, User $user, MessageDto $dto): \App\Models\Message
    {
        $message = $this->messageRepo->create([
            'conversation_id' => $conversation->id,
            'user_id' => $user->id,
            'body' => $dto->body,
        ]);

        $conversation->update(['last_message_at' => now()]);

        broadcast(new MessageSent($message))->toOthers();

        return $message;
    }

    public function getMessages(Conversation $conversation): Collection
    {
        return $this->messageRepo->findByConversation($conversation);
    }

    public function findConversation(int $id): ?Conversation
    {
        return $this->conversationRepo->findById($id);
    }
}
