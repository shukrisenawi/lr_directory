<?php

namespace App\Enums;

enum SubscriptionStatus: string
{
    case Active = 'active';
    case Inactive = 'inactive';
    case Pending = 'pending';
    case Expired = 'expired';
    case Cancelled = 'cancelled';
}
