<?php

namespace App\Services;

use App\DTOs\CompanyProfileDto;
use App\DTOs\SearchDto;
use App\Enums\ClaimStatus;
use App\Enums\CompanyStatus;
use App\Models\ClaimRequest;
use App\Models\Company;
use App\Models\User;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use App\Repositories\Contracts\ClaimRequestRepositoryInterface;
use App\Repositories\Contracts\CompanyRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class CompanyService
{
    public function __construct(
        private CompanyRepositoryInterface $companyRepo,
        private ClaimRequestRepositoryInterface $claimRepo,
        private CategoryRepositoryInterface $categoryRepo,
        private AnalyticsService $analytics,
    ) {}

    public function search(SearchDto $dto): LengthAwarePaginator
    {
        return $this->companyRepo->search($dto);
    }

    public function findBySlug(string $slug): ?Company
    {
        return $this->companyRepo->findApproved($slug);
    }

    public function findByCategory(int $categoryId, int $limit = 12): Collection
    {
        $category = $this->categoryRepo->findById($categoryId);

        return $category ? $this->companyRepo->findByCategory($category, $limit) : collect();
    }

    public function getFeatured(int $limit = 6): Collection
    {
        return $this->companyRepo->getFeatured($limit);
    }

    public function getNewListings(int $limit = 6): Collection
    {
        return $this->companyRepo->getNewListings($limit);
    }

    public function claim(Company $company, User $user, ?string $message = null): ClaimRequest
    {
        $claim = $this->claimRepo->create([
            'company_id' => $company->id,
            'user_id' => $user->id,
            'message' => $message,
            'status' => ClaimStatus::Pending->value,
        ]);

        $this->companyRepo->updateStatus($company, CompanyStatus::Pending->value);

        return $claim;
    }

    public function approveClaim(ClaimRequest $claim, User $reviewer): void
    {
        $this->claimRepo->update($claim, [
            'status' => ClaimStatus::Approved->value,
            'reviewed_at' => now(),
        ]);

        $company = $claim->company;
        $this->companyRepo->update($company, [
            'claimed_by_user_id' => $claim->user_id,
            'status' => CompanyStatus::Approved->value,
        ]);
    }

    public function rejectClaim(ClaimRequest $claim, User $reviewer): void
    {
        $this->claimRepo->update($claim, [
            'status' => ClaimStatus::Rejected->value,
            'reviewed_at' => now(),
        ]);

        $this->companyRepo->updateStatus($claim->company, CompanyStatus::Unclaimed->value);
    }

    public function updateProfile(Company $company, CompanyProfileDto $dto): Company
    {
        $data = array_filter([
            'name' => $dto->name,
            'location' => $dto->location,
            'address' => $dto->address,
            'delivery_coverage' => $dto->deliveryCoverage,
            'operating_hours' => $dto->operatingHours,
            'latitude' => $dto->latitude,
            'longitude' => $dto->longitude,
            'company_type' => $dto->companyType,
            'supplier_type' => $dto->supplierType,
            'contact_email' => $dto->contactEmail,
            'contact_phone' => $dto->contactPhone,
            'whatsapp' => $dto->whatsapp,
            'website' => $dto->website,
            'summary' => $dto->summary,
            'description' => $dto->description,
            'social_links' => $dto->socialLinks,
        ], fn($value) => !is_null($value));

        $this->companyRepo->update($company, $data);

        if ($dto->categoryIds !== null) {
            $company->categories()->sync($dto->categoryIds);
        }

        return $company->fresh();
    }

    public function getAllPaginated(int $perPage = 20): LengthAwarePaginator
    {
        return $this->companyRepo->getAllPaginated($perPage);
    }

    public function updateStatus(Company $company, string $status): void
    {
        $this->companyRepo->updateStatus($company, $status);
    }
}
