<?php

use App\Jobs\CleanupOldSearchHistory;
use App\Jobs\GenerateSitemap;
use Illuminate\Support\Facades\Schedule;

Schedule::job(new GenerateSitemap)->daily();
Schedule::job(new CleanupOldSearchHistory)->weekly();

Schedule::command('model:prune')->daily();
