<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCompanyStatusRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'status' => 'required|in:unclaimed,pending,approved,rejected',
        ];
    }
}
