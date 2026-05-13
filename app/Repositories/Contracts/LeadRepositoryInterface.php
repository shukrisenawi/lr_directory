<?php

namespace App\Repositories\Contracts;

use App\Models\Company;
use App\Models\Lead;

interface LeadRepositoryInterface
{
    public function createLead(array $data): Lead;
    public function getForCompany(Company $company, int $perPage = 20);
    public function updateStatus(Lead $lead, string $status): bool;
}
