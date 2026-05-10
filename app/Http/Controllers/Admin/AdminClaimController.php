<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClaimRequest;
use Inertia\Inertia;
use Inertia\Response;

class AdminClaimController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/claims', [
            'claims' => ClaimRequest::query()->with(['company:id,name,slug,status', 'user:id,name,email'])->latest()->paginate(12),
        ]);
    }

    public function update(ClaimRequest $claimRequest)
    {
        $payload = request()->validate([
            'status' => 'required|in:approved,rejected,pending',
        ]);

        $claimRequest->update([
            'status' => $payload['status'],
            'reviewed_at' => now(),
        ]);

        if ($payload['status'] === 'approved') {
            $claimRequest->company()->update([
                'claimed_by_user_id' => $claimRequest->user_id,
                'status' => 'approved',
            ]);
        }

        if ($payload['status'] === 'rejected') {
            $claimRequest->company()->update([
                'status' => 'rejected',
            ]);
        }

        return back()->with('success', 'Claim request updated.');
    }
}
