<?php

namespace App\Http\Requests;

use App\Models\Company;
use Illuminate\Foundation\Http\FormRequest;

class StoreClaimRequest extends FormRequest
{
    public function authorize(): bool
    {
        /** @var Company $company */
        $company = $this->route('company');

        return !$company->claimed_by_user_id
            && !$company->claimRequests()
                ->where('user_id', $this->user()->id)
                ->where('status', 'pending')
                ->exists();
    }

    public function rules(): array
    {
        return [
            'message' => 'nullable|string|max:1000',
        ];
    }
}
