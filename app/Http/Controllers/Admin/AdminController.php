<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClaimRequest;
use App\Models\Company;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('admin/index', [
            'stats' => [
                'companies' => Company::count(),
                'pendingCompanies' => Company::query()->where('status', 'pending')->count(),
                'pendingClaims' => ClaimRequest::query()->where('status', 'pending')->count(),
                'users' => User::count(),
            ],
            'recentClaims' => ClaimRequest::query()->with(['company:id,name,slug', 'user:id,name,email'])->latest()->limit(5)->get(),
        ]);
    }
}
