<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->string('supplier_type')->nullable()->after('company_type');
            $table->string('whatsapp')->nullable()->after('contact_phone');
            $table->text('address')->nullable()->after('location');
            $table->string('delivery_coverage')->nullable()->after('address');
            $table->string('operating_hours')->nullable()->after('delivery_coverage');
            $table->decimal('latitude', 10, 7)->nullable()->after('operating_hours');
            $table->decimal('longitude', 10, 7)->nullable()->after('latitude');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->string('fish_type')->nullable()->after('summary');
            $table->text('description')->nullable()->after('fish_type');
            $table->decimal('price', 10, 2)->nullable()->after('description');
            $table->string('price_unit')->nullable()->after('price');
            $table->string('minimum_order')->nullable()->after('price_unit');
            $table->string('availability_status')->default('available')->after('minimum_order');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['fish_type', 'description', 'price', 'price_unit', 'minimum_order', 'availability_status']);
        });

        Schema::table('companies', function (Blueprint $table) {
            $table->dropColumn(['supplier_type', 'whatsapp', 'address', 'delivery_coverage', 'operating_hours', 'latitude', 'longitude']);
        });
    }
};
