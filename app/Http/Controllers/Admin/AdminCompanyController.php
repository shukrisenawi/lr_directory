<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateCompanyStatusRequest;
use App\Models\Company;
use App\Services\CompanyService;
use Inertia\Inertia;
use Inertia\Response;

class AdminCompanyController extends Controller
{
    public function __construct(
        private CompanyService $companyService,
    ) {}

    public function index(): Response
    {
        $companies = $this->companyService->getAllPaginated(12);

        return Inertia::render('admin/companies', [
            'companies' => $companies,
        ]);
    }

    public function update(UpdateCompanyStatusRequest $request, Company $company)
    {
        $this->companyService->updateStatus($company, $request->validated('status'));

        return back()->with('success', 'Company status updated.');
    }
}
