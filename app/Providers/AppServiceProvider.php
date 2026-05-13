<?php

namespace App\Providers;

use App\Repositories\Contracts\CategoryRepositoryInterface;
use App\Repositories\Contracts\ClaimRequestRepositoryInterface;
use App\Repositories\Contracts\CompanyRepositoryInterface;
use App\Repositories\Contracts\ConversationRepositoryInterface;
use App\Repositories\Contracts\FavoriteRepositoryInterface;
use App\Repositories\Contracts\MessageRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\Eloquent\CategoryRepository;
use App\Repositories\Eloquent\ClaimRequestRepository;
use App\Repositories\Eloquent\CompanyRepository;
use App\Repositories\Eloquent\ConversationRepository;
use App\Repositories\Eloquent\FavoriteRepository;
use App\Repositories\Eloquent\MessageRepository;
use App\Repositories\Eloquent\UserRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(CompanyRepositoryInterface::class, CompanyRepository::class);
        $this->app->bind(CategoryRepositoryInterface::class, CategoryRepository::class);
        $this->app->bind(ClaimRequestRepositoryInterface::class, ClaimRequestRepository::class);
        $this->app->bind(FavoriteRepositoryInterface::class, FavoriteRepository::class);
        $this->app->bind(ConversationRepositoryInterface::class, ConversationRepository::class);
        $this->app->bind(MessageRepositoryInterface::class, MessageRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
    }

    public function boot(): void
    {
        //
    }
}
