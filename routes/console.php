<?php

use App\Jobs\CleanupOldSearchHistory;
use App\Jobs\AggregateCompanyAnalytics;
use App\Jobs\GenerateSitemap;
use App\Models\Company;
use Illuminate\Support\Facades\Schedule;

Schedule::job(new GenerateSitemap)->daily();
Schedule::job(new CleanupOldSearchHistory)->weekly();
Schedule::call(fn () => Company::query()->each(fn (Company $company) => AggregateCompanyAnalytics::dispatch($company)))->hourly();

Schedule::command('model:prune')->daily();
