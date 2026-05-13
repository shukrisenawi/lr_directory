<?php

namespace App\Http\Requests\Company;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCompanyProfileRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'company_type' => 'nullable|string|max:100',
            'contact_email' => 'nullable|email|max:255',
            'contact_phone' => 'nullable|string|max:50',
            'website' => 'nullable|url|max:255',
            'summary' => 'nullable|string|max:500',
            'description' => 'nullable|string|max:5000',
            'social_links' => 'nullable|array',
            'category_ids' => 'nullable|array',
            'category_ids.*' => 'exists:categories,id',
        ];
    }
}
