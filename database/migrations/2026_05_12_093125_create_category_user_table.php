<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('category_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_category_id')->constrained('user_categories')->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['user_id', 'user_category_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('category_user');
    }
};
