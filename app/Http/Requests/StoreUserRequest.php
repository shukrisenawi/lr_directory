<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class StoreUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'role' => 'required|in:normal,company',
            'company_name' => 'nullable|required_if:role,company|string|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ];
    }
}
