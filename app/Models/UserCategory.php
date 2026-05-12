<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class UserCategory extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'sort_order'];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'category_user', 'user_category_id', 'user_id');
    }
}
