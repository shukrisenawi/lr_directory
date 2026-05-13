<?php

namespace App\Events;

use App\Models\ClaimRequest;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ClaimApproved
{
    use Dispatchable, SerializesModels;

    public function __construct(public ClaimRequest $claimRequest) {}
}
