<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class CompanyProfileController extends Controller
{
    public function profile(): Response
    {
        return $this->renderTab('profile');
    }

    public function products(): Response
    {
        return $this->renderTab('products');
    }

    public function campaigns(): Response
    {
        return $this->renderTab('campaigns');
    }

    public function news(): Response
    {
        return $this->renderTab('news');
    }

    protected function renderTab(string $tab): Response
    {
        $company = request()->user()->companyProfile?->load(['products', 'campaigns', 'newsEvents', 'categories']);

        abort_unless($company, 404);

        return Inertia::render('company/profile', [
            'activeTab' => $tab,
            'company' => $company,
        ]);
    }
}
