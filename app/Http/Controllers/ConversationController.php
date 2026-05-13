<?php

namespace App\Http\Controllers;

use App\DTOs\MessageDto;
use App\Http\Requests\StoreMessageRequest;
use App\Models\Conversation;
use App\Services\ConversationService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ConversationController extends Controller
{
    public function __construct(
        private ConversationService $conversationService,
    ) {}

    public function index(): Response
    {
        $user = request()->user();
        $company = $user->companyProfile;

        $conversations = $company
            ? $this->conversationService->getUserConversations($user)
                ->merge($this->conversationService->getCompanyConversations($company))
                ->unique('id')
                ->sortByDesc('last_message_at')
                ->values()
            : $this->conversationService->getUserConversations($user);

        return Inertia::render('messages/index', [
            'conversations' => $conversations,
        ]);
    }

    public function show(Conversation $conversation): Response
    {
        $this->authorizeConversation($conversation);

        $conversation->load(['company', 'messages.user:id,name,email,role']);

        return Inertia::render('messages/show', [
            'conversation' => $conversation,
        ]);
    }

    public function store(Conversation $conversation, StoreMessageRequest $request): RedirectResponse
    {
        $this->authorizeConversation($conversation);

        $dto = new MessageDto(body: $request->validated('body'));
        $this->conversationService->sendMessage($conversation, $request->user(), $dto);

        return back()->with('success', 'Message sent.');
    }

    protected function authorizeConversation(Conversation $conversation): void
    {
        $user = request()->user();

        abort_unless(
            $conversation->user_id === $user->id
            || $conversation->company()->where('claimed_by_user_id', $user->id)->exists(),
            403
        );
    }
}
