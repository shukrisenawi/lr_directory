<?php

namespace App\Services;

use App\DTOs\LeadDto;
use App\Enums\LeadStatus;
use App\Models\Company;
use App\Models\Lead;
use App\Models\User;
use App\Repositories\Contracts\LeadRepositoryInterface;

class LeadService
{
    public function __construct(
        private LeadRepositoryInterface $leadRepo,
    ) {}

    public function create(Company $company, ?User $user, LeadDto $dto): Lead
    {
        return $this->leadRepo->createLead([
            'company_id' => $company->id,
            'user_id' => $user?->id,
            'name' => $dto->name,
            'email' => $dto->email,
            'phone' => $dto->phone,
            'product_interest' => $dto->productInterest,
            'message' => $dto->message,
            'status' => LeadStatus::New->value,
        ]);
    }

    public function getForCompany(Company $company, int $perPage = 20)
    {
        return $this->leadRepo->getForCompany($company, $perPage);
    }

    public function updateStatus(Lead $lead, string $status): bool
    {
        return $this->leadRepo->updateStatus($lead, $status);
    }
}
