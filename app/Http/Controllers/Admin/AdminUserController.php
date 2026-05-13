<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateUserStatusRequest;
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

    public function update(UpdateUserStatusRequest $request, User $user): RedirectResponse
    {
        abort_if($user->is($request->user()), 422, 'You cannot update your own status.');

        $user->update($request->validated());

        return back();
    }
}
