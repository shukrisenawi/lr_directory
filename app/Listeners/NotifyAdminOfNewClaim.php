<?php

namespace App\Listeners;

use App\Events\CompanyClaimed;
use App\Models\User;
use App\Notifications\NewClaimNotification;
use Illuminate\Support\Facades\Notification;

class NotifyAdminOfNewClaim
{
    public function handle(CompanyClaimed $event): void
    {
        $admins = User::where('role', 'admin')->get();

        Notification::send($admins, new NewClaimNotification($event->claimRequest));
    }
}
