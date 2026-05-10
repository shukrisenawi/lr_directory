<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NewsEvent extends Model
{
    /** @use HasFactory<\Database\Factories\NewsEventFactory> */
    use HasFactory;

    protected $fillable = [
        'company_id',
        'title',
        'summary',
        'published_on',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'published_on' => 'date',
            'is_active' => 'boolean',
        ];
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
