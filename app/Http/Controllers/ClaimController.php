<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\RedirectResponse;

class ClaimController extends Controller
{
    public function store(Company $company): RedirectResponse
    {
        request()->validate([
            'message' => 'nullable|string|max:1000',
        ]);

        request()->user()->claimRequests()->updateOrCreate(
            ['company_id' => $company->id],
            [
                'status' => 'pending',
                'message' => request('message'),
                'reviewed_at' => null,
            ],
        );

        return back()->with('success', 'Claim request submitted for review.');
    }
}
