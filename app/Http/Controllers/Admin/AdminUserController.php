<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateUserStatusRequest;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $companies = Company::query()
            ->where('claimed_by_user_id', $user->id)
            ->select(['id', 'name', 'status', 'slug', 'created_at'])
            ->latest()
            ->get();

        return Inertia::render('admin/user-show', [
            'userData' => $user,
            'companies' => $companies,
        ]);
    }

    public function impersonate(Request $request, User $user): RedirectResponse
    {
        abort_if($user->is($request->user()), 422, 'You cannot impersonate yourself.');
        abort_if($user->role === 'admin', 422, 'You cannot impersonate another admin.');

        $request->session()->put('impersonator_id', $request->user()->id);

        Auth::login($user);
        $request->session()->regenerate();

        return to_route('dashboard')->with('success', "Logged in as {$user->name}.");
    }

    public function stopImpersonating(Request $request): RedirectResponse
    {
        $adminId = $request->session()->pull('impersonator_id');

        abort_if(! $adminId, 403);

        Auth::loginUsingId($adminId);
        $request->session()->regenerate();

        return to_route('admin.users.index')->with('success', 'Returned as admin.');
    }

    public function update(UpdateUserStatusRequest $request, User $user): RedirectResponse
    {
        abort_if($user->is($request->user()), 422, 'You cannot update your own status.');

        $user->update($request->validated());

        return back();
    }
}
