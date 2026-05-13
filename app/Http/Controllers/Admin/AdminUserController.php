<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateUserStatusRequest;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminUserController extends Controller
{
    public function index(): Response
    {
        $users = User::query()
            ->select(['id', 'name', 'email', 'role', 'status', 'created_at'])
            ->latest()
            ->paginate(20);

        return Inertia::render('admin/users', [
            'users' => $users,
        ]);
    }

    public function show(User $user): Response
    {
        $user->loadCount([
            'companies' => fn($q) => $q->whereNull('deleted_at'),
        ]);

        $companies = Company::query()
            ->where('user_id', $user->id)
            ->select(['id', 'name', 'status', 'slug', 'created_at'])
            ->latest()
            ->get();

        return Inertia::render('admin/user-show', [
            'userData' => $user,
            'companies' => $companies,
        ]);
    }

    public function update(UpdateUserStatusRequest $request, User $user): RedirectResponse
    {
        abort_if($user->is($request->user()), 422, 'You cannot update your own status.');

        $user->update($request->validated());

        return back();
    }
}
