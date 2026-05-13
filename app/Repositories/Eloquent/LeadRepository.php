<?php

namespace App\Repositories\Eloquent;

use App\Models\Company;
use App\Models\Lead;
use App\Repositories\Contracts\LeadRepositoryInterface;

class LeadRepository extends BaseRepository implements LeadRepositoryInterface
{
    protected function modelClass(): string
    {
        return Lead::class;
    }

    public function createLead(array $data): Lead
    {
        return $this->model->create($data);
    }

    public function getForCompany(Company $company, int $perPage = 20)
    {
        return $this->model->where('company_id', $company->id)
            ->with('user:id,name,email')
            ->latest()
            ->paginate($perPage);
    }

    public function updateStatus(Lead $lead, string $status): bool
    {
        return $lead->update([
            'status' => $status,
            'contacted_at' => $status === 'contacted' ? now() : $lead->contacted_at,
        ]);
    }
}
