<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Inertia\Inertia;
use Inertia\Response;

class AdminCompanyController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/companies', [
            'companies' => Company::query()->with(['owner:id,name,email', 'categories:id,name'])->latest()->paginate(12),
        ]);
    }

    public function update(Company $company)
    {
        $payload = request()->validate([
            'status' => 'required|in:unclaimed,pending,approved,rejected',
        ]);

        $company->update(['status' => $payload['status']]);

        return back()->with('success', 'Company status updated.');
    }
}
