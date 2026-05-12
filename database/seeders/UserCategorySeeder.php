<?php

namespace Database\Seeders;

use App\Models\UserCategory;
use Illuminate\Database\Seeder;

class UserCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Importer', 'slug' => 'importer', 'sort_order' => 1],
            ['name' => 'Exporter', 'slug' => 'exporter', 'sort_order' => 2],
            ['name' => 'Processor', 'slug' => 'processor', 'sort_order' => 3],
            ['name' => 'Canner', 'slug' => 'canner', 'sort_order' => 4],
            ['name' => 'Distributor', 'slug' => 'distributor', 'sort_order' => 5],
            ['name' => 'Wholesaler', 'slug' => 'wholesaler', 'sort_order' => 6],
            ['name' => 'Broker/Supplier', 'slug' => 'broker-supplier', 'sort_order' => 7],
            ['name' => 'Retailer', 'slug' => 'retailer', 'sort_order' => 8],
            ['name' => 'Caterer', 'slug' => 'caterer', 'sort_order' => 9],
            ['name' => 'Equipment Supplier', 'slug' => 'equipment-supplier', 'sort_order' => 10],
            ['name' => 'Fishing Operator', 'slug' => 'fishing-operator', 'sort_order' => 11],
            ['name' => 'Academic', 'slug' => 'academic', 'sort_order' => 12],
            ['name' => 'Consultant', 'slug' => 'consultant', 'sort_order' => 13],
            ['name' => 'Press', 'slug' => 'press', 'sort_order' => 14],
            ['name' => 'NGO', 'slug' => 'ngo', 'sort_order' => 15],
            ['name' => 'Government', 'slug' => 'government', 'sort_order' => 16],
            ['name' => 'International Organisation', 'slug' => 'international-organisation', 'sort_order' => 17],
        ];

        foreach ($categories as $cat) {
            UserCategory::create($cat);
        }
    }
}
