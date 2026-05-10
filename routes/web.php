<?php

use App\Http\Controllers\Admin\AdminClaimController;
use App\Http\Controllers\Admin\AdminCompanyController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClaimController;
use App\Http\Controllers\Company\CompanyProfileController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DirectoryController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::get('/directory', [DirectoryController::class, 'index'])->name('directory.index');
Route::get('/directory/{company:slug}', [DirectoryController::class, 'show'])->name('directory.show');
Route::get('/categories/{category:slug}', [CategoryController::class, 'show'])->name('categories.show');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('/favorites/{company}', [FavoriteController::class, 'store'])->name('favorites.store');
    Route::delete('/favorites/{company}', [FavoriteController::class, 'destroy'])->name('favorites.destroy');

    Route::get('/messages', [ConversationController::class, 'index'])->name('messages.index');
    Route::get('/messages/{conversation}', [ConversationController::class, 'show'])->name('messages.show');
    Route::post('/messages/{conversation}', [ConversationController::class, 'store'])->name('messages.store');

    Route::post('/claim/{company}', [ClaimController::class, 'store'])->name('claims.store');

    Route::middleware('role:company')->prefix('company')->name('company.')->group(function () {
        Route::get('/profile', [CompanyProfileController::class, 'profile'])->name('profile');
        Route::get('/products', [CompanyProfileController::class, 'products'])->name('products');
        Route::get('/campaigns', [CompanyProfileController::class, 'campaigns'])->name('campaigns');
        Route::get('/news', [CompanyProfileController::class, 'news'])->name('news');
    });

    Route::middleware('role:admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/', AdminController::class)->name('index');
        Route::get('/companies', [AdminCompanyController::class, 'index'])->name('companies.index');
        Route::patch('/companies/{company}', [AdminCompanyController::class, 'update'])->name('companies.update');
        Route::get('/claims', [AdminClaimController::class, 'index'])->name('claims.index');
        Route::patch('/claims/{claimRequest}', [AdminClaimController::class, 'update'])->name('claims.update');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
