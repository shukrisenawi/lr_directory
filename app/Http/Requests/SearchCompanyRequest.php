<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchCompanyRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'q' => 'nullable|string|max:100',
            'location' => 'nullable|string|max:100',
            'category' => 'nullable|exists:categories,id',
            'per_page' => 'nullable|integer|min:1|max:50',
            'sort' => 'nullable|in:name,created_at',
            'direction' => 'nullable|in:asc,desc',
        ];
    }
}
