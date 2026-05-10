<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('conversation.{conversationId}', function ($user, int $conversationId) {
    return \App\Models\Conversation::query()
        ->whereKey($conversationId)
        ->where(function ($query) use ($user) {
            $query->where('user_id', $user->id)
                ->orWhereHas('company', fn ($companyQuery) => $companyQuery->where('claimed_by_user_id', $user->id));
        })
        ->exists();
});
