<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateLeadStatusRequest;
use App\Models\Lead;
use App\Services\LeadService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CompanyLeadController extends Controller
{
    public function __construct(
        private LeadService $leadService,
    ) {}

    public function index(): Response
    {
        $company = request()->user()->companyProfile;

        return Inertia::render('company/leads', [
            'leads' => $company ? $this->leadService->getForCompany($company) : ['data' => []],
        ]);
    }

    public function update(UpdateLeadStatusRequest $request, Lead $lead): RedirectResponse
    {
        abort_unless($lead->company_id === $request->user()->companyProfile?->id, 403);

        $this->leadService->updateStatus($lead, $request->validated('status'));

        return back();
    }
}
