<?php

namespace App\Notifications;

use App\Models\ClaimRequest;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewClaimNotification extends Notification
{
    public function __construct(public ClaimRequest $claimRequest) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Company Claim Request')
            ->line("{$this->claimRequest->user->name} has requested to claim {$this->claimRequest->company->name}.")
            ->action('Review Claim', url("/admin/claims"));
    }

    public function toArray(object $notifiable): array
    {
        return [
            'claim_id' => $this->claimRequest->id,
            'company' => $this->claimRequest->company->name,
            'user' => $this->claimRequest->user->name,
            'type' => 'new_claim',
        ];
    }
}
