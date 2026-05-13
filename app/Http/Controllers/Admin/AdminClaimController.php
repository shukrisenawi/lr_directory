<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateClaimStatusRequest;
use App\Models\ClaimRequest;
use App\Repositories\Contracts\ClaimRequestRepositoryInterface;
use App\Services\CompanyService;
use Inertia\Inertia;
use Inertia\Response;

class AdminClaimController extends Controller
{
    public function __construct(
        private CompanyService $companyService,
        private ClaimRequestRepositoryInterface $claimRepo,
    ) {}

    public function index(): Response
    {
        $claims = $this->claimRepo->getAllPaginated(12);

        return Inertia::render('admin/claims', [
            'claims' => $claims,
        ]);
    }

    public function update(UpdateClaimStatusRequest $request, ClaimRequest $claimRequest)
    {
        $status = $request->validated('status');

        if ($status === 'approved') {
            $this->companyService->approveClaim($claimRequest, $request->user());
        } elseif ($status === 'rejected') {
            $this->companyService->rejectClaim($claimRequest, $request->user());
        }

        return back()->with('success', 'Claim request updated.');
    }
}
