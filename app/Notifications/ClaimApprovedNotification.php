<?php

namespace App\Notifications;

use App\Models\ClaimRequest;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ClaimApprovedNotification extends Notification
{
    public function __construct(public ClaimRequest $claimRequest) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Your Company Claim Has Been Approved')
            ->line("Your claim for {$this->claimRequest->company->name} has been approved.")
            ->action('Manage Company', url("/company/profile"));
    }

    public function toArray(object $notifiable): array
    {
        return [
            'claim_id' => $this->claimRequest->id,
            'company' => $this->claimRequest->company->name,
            'type' => 'claim_approved',
        ];
    }
}
