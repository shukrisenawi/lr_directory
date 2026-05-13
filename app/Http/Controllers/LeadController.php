<?php

namespace App\Http\Controllers;

use App\DTOs\LeadDto;
use App\Http\Requests\StoreLeadRequest;
use App\Models\Company;
use App\Services\LeadService;
use Illuminate\Http\RedirectResponse;

class LeadController extends Controller
{
    public function __construct(
        private LeadService $leadService,
    ) {}

    public function store(StoreLeadRequest $request, Company $company): RedirectResponse
    {
        $this->leadService->create($company, $request->user(), new LeadDto(
            name: $request->string('name')->toString(),
            email: $request->input('email'),
            phone: $request->input('phone'),
            productInterest: $request->input('product_interest'),
            message: $request->string('message')->toString(),
        ));

        return back()->with('success', 'Lead submitted successfully.');
    }
}
