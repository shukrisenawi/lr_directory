<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Conversation;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ConversationController extends Controller
{
    public function index(): Response
    {
        $user = request()->user();

        $conversations = Conversation::query()
            ->with(['company:id,name,slug,logo', 'messages' => fn ($query) => $query->latest()->limit(1)])
            ->where(function ($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->orWhereHas('company', fn ($companyQuery) => $companyQuery->where('claimed_by_user_id', $user->id));
            })
            ->latest('last_message_at')
            ->get();

        return Inertia::render('messages/index', [
            'conversations' => $conversations,
        ]);
    }

    public function show(Conversation $conversation): Response
    {
        $this->authorizeConversation($conversation);

        return Inertia::render('messages/show', [
            'conversation' => $conversation->load(['company', 'messages.user:id,name,email,role']),
        ]);
    }

    public function store(Conversation $conversation): RedirectResponse
    {
        $this->authorizeConversation($conversation);

        $payload = request()->validate([
            'body' => 'required|string|max:1000',
        ]);

        $message = $conversation->messages()->create([
            'user_id' => request()->user()->id,
            'body' => $payload['body'],
        ]);

        $conversation->update(['last_message_at' => now()]);

        if (! app()->environment('testing')) {
            broadcast(new MessageSent($message))->toOthers();
        }

        return back()->with('success', 'Message sent.');
    }

    protected function authorizeConversation(Conversation $conversation): void
    {
        $user = request()->user();

        abort_unless(
            $conversation->user_id === $user->id || $conversation->company()->where('claimed_by_user_id', $user->id)->exists(),
            403
        );
    }
}
