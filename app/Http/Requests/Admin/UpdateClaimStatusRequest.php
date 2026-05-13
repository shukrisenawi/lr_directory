<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClaimStatusRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'status' => 'required|in:approved,rejected',
        ];
    }
}
