<?php

namespace App\Listeners;

use App\Events\ClaimApproved;
use App\Notifications\ClaimApprovedNotification;

class NotifyUserOfApproval
{
    public function handle(ClaimApproved $event): void
    {
        $claim = $event->claimRequest;
        $claim->user->notify(new ClaimApprovedNotification($claim));
    }
}
