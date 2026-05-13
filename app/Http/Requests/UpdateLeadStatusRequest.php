<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLeadStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'company';
    }

    public function rules(): array
    {
        return [
            'status' => 'required|in:new,contacted,converted,closed',
        ];
    }
}
