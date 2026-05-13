<?php

namespace App\Jobs;

use App\Models\Category;
use App\Models\Company;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\View;

class GenerateSitemap implements ShouldQueue
{
    use Dispatchable, Queueable;

    public function handle(): void
    {
        $companies = Company::where('status', 'approved')->get(['slug', 'updated_at']);
        $categories = Category::all(['slug', 'updated_at']);

        $xml = View::make('sitemap', compact('companies', 'categories'))->render();
        Storage::disk('public')->put('sitemap.xml', $xml);
    }
}
