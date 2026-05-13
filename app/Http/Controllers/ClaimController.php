<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClaimRequest;
use App\Models\Company;
use App\Services\CompanyService;
use Illuminate\Http\RedirectResponse;

class ClaimController extends Controller
{
    public function __construct(
        private CompanyService $companyService,
    ) {}

    public function store(StoreClaimRequest $request, Company $company): RedirectResponse
    {
        $this->companyService->claim($company, $request->user(), $request->validated('message'));

        return back()->with('success', 'Claim request submitted for review.');
    }
}
