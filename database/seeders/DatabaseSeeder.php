<?php

namespace Database\Seeders;

use App\Models\Campaign;
use App\Models\Category;
use App\Models\Company;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\NewsEvent;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UserCategorySeeder::class);

        $admin = User::factory()->create([
            'name' => 'IDXI Admin',
            'email' => 'admin@idxi.test',
            'role' => 'admin',
        ]);

        $member = User::factory()->create([
            'name' => 'Normal Buyer',
            'email' => 'member@idxi.test',
            'role' => 'normal',
        ]);

        $companyUser = User::factory()->create([
            'name' => 'Blue Harbour Team',
            'email' => 'company@idxi.test',
            'role' => 'company',
        ]);

        $categories = collect([
            'Aquaculture' => [
                'Fish Farming', 'Fish Feed', 'Aquaculture Services', 'Fish Pump',
            ],
            'Electronics / Communication' => [
                'Communications', 'Computer Software', 'Computers', 'Control Systems',
                'Electronic Equipment', 'Electronic Logbooks', 'Electronics',
                'Fish Finding Equipment', 'Navigation Equipment', 'Radar',
                'Sonar Equipment', 'Telecommunications', 'Weather / Temperature',
            ],
            'Event' => [
                'Event Management',
            ],
            'Fishing Equipment' => [
                'Bait', 'Bobbins', 'Buoys', 'Cables', 'Chains', 'Fish Catching',
                'Fishhooks', 'Fishing Gear', 'Jigging Equipment', 'Lights',
                'Lines and Longlines', 'Longline Systems', 'Longlining / Jigging',
                'Net and Rope Coatings', 'Net Rings', 'Nets', 'Purse Seine',
                'Ropes', 'Seining', 'Trawl Doors', 'Trawl Gear', 'Trawl Makers',
                'Trawls', 'Trawls / Nets / Ropes', 'Twines',
                'Wire and Combination Rope', 'Yarns',
            ],
            'Fish Handling' => [
                'Boxes / Baskets', 'Containers / Storage', 'Fish Auction',
                'Fish Handling', 'Fish Market', 'Fish Market Support Services',
                'Fish Trading', 'Fish Transportation', 'Ice Storage',
                'Import / Export', 'Refrigerated Transport',
                'Shipping / Forwarding / Air Freight', 'Storage Equipment',
                'Tub Cleaning', 'Tub Solutions',
            ],
            'Organisation' => [
                'Certification Bodies', 'Consultants', 'Education and Training',
                'Environmental Organisations', 'Fishing Companies',
                'Governmental Departments', 'Management Consultancy', 'Marketing',
                'Port Authorities', 'Research Organisations', 'Ship Brokers',
                'Trade Associations', 'NGOs',
            ],
            'Publication' => [
                'Publication',
            ],
            'Power / Propulsion' => [
                'Bow Thrusters / Bow Thrust Drives', 'Compressors', 'Engines',
                'Generators', 'Heat Exchangers', 'Heat Pumps',
                'Other Engine Room Equipment', 'Power',
                'Propellers / Propeller Shafts / Nozzles', 'Propulsion',
            ],
            'Processing / Refrigeration' => [
                'Blast Freezer', 'Bone Separators', 'Chilling Tanks', 'Chilling Units',
                'Cold Stores', 'Conveyor Belts', 'Coolers', 'Cutlery / Knives / Steels',
                'Cutting Machines', 'De-icing Equipment', 'De-scaling', 'Filleting',
                'Fish Head Processing', 'Fish Oil', 'Fish Processing Equipment - Used',
                'Grading', 'Gutting', 'Ice', 'IQ Freezing', 'Onboard Processing',
                'Packaging', 'Packets', 'Plate Freezers', 'Processing Machinery',
                'Refrigeration', 'RSW Systems', 'Scales', 'Skinning Machines',
                'Slurry Ice', 'Smoking / Drying Equipment', 'Sorting',
                'Thawing Equipment', 'Washing Machines',
                'Weighing / Grading / Sorting', 'Weighing Equipment',
            ],
            'Safety' => [
                'Clothing', 'Fire Fighting Equipment', 'Floats and Buoyancy Devices',
                'Lighting', 'Man Overboard Recovery Systems', 'Protective Gloves',
                'Safety Equipment', 'Security Equipment',
            ],
            'Vessel / Shipyard' => [
                'Anchors', 'Chains and Fittings', 'Cleaning Equipment / Products',
                'Coatings', 'Cranes', 'Deck Coverings', 'Deck Machinery',
                'Fish Pumps', 'Galley Equipment',
                'Heating, Venting and Air Conditioning (HVAC)', 'Hoists',
                'Hydraulic Equipment', 'Maintenance', 'Marine Equipment',
                'Net Drums', 'Ship Design', 'Ship Repair / Conversion',
                'Shipbuilders', 'Shipyards', 'Vessel Builders',
                'Vessel Building Materials', 'Vessels', 'Welding Equipment', 'Winches',
            ],
        ])->map(function (array $children, string $parentName) {
            $parent = Category::query()->create([
                'name' => $parentName,
                'slug' => str($parentName)->slug()->value(),
                'description' => $parentName.' services and suppliers in the fishery supply chain.',
                'sort_order' => Category::count() + 1,
            ]);

            collect($children)->each(function (string $childName, int $index) use ($parent) {
                $slug = str($parent->name.' '.$childName)->slug()->value();
                Category::query()->create([
                    'parent_id' => $parent->id,
                    'name' => $childName,
                    'slug' => $slug,
                    'description' => $childName.' category inside '.$parent->name.'.',
                    'sort_order' => $index + 1,
                ]);
            });

            return $parent;
        });

        $blueHarbour = Company::factory()->claimed($companyUser)->create([
            'name' => 'Blue Harbour Foods',
            'slug' => 'blue-harbour-foods',
            'summary' => 'Processor and exporter for chilled tuna, frozen fillets, and regional seafood sourcing.',
            'description' => 'Blue Harbour Foods connects processors, cold-chain operators, and buyers across regional fish markets.',
            'location' => 'Penang, Malaysia',
            'company_type' => 'Processor',
            'is_featured' => true,
        ]);

        $oceanNav = Company::factory()->create([
            'name' => 'OceanNav Systems',
            'slug' => 'oceannav-systems',
            'summary' => 'Navigation systems, radar, sonar, and bridge electronics for modern fishing vessels.',
            'description' => 'OceanNav Systems supplies electronics and communications equipment for long-haul fleets.',
            'location' => 'Johor Bahru, Malaysia',
            'company_type' => 'Equipment Supplier',
            'is_featured' => true,
        ]);

        $harvest = Company::factory()->create([
            'name' => 'Harvest Cold Chain',
            'slug' => 'harvest-cold-chain',
            'summary' => 'Ice storage, blast freezing, and refrigerated transport for landing-to-market continuity.',
            'description' => 'Harvest Cold Chain focuses on reliable fish handling and refrigerated logistics for exporters.',
            'location' => 'Kota Kinabalu, Malaysia',
            'company_type' => 'Distributor',
        ]);

        $blueHarbour->categories()->attach(
            Category::whereIn('name', ['Filleting', 'Fish Oil', 'Blast Freezer', 'Packaging', 'Fish Trading'])->pluck('id')
        );
        $oceanNav->categories()->attach(
            Category::whereIn('name', ['Navigation Equipment', 'Radar', 'Sonar Equipment', 'Fish Finding Equipment', 'Electronic Equipment', 'Marine Equipment'])->pluck('id')
        );
        $harvest->categories()->attach(
            Category::whereIn('name', ['Cold Stores', 'Ice', 'Refrigeration', 'Refrigerated Transport', 'Ice Storage', 'Storage Equipment'])->pluck('id')
        );

        Product::factory()->for($blueHarbour)->create([
            'name' => 'Premium Tuna Portions',
            'slug' => 'premium-tuna-portions',
            'summary' => 'Portioned tuna cuts prepared for export buyers and private label partners.',
        ]);
        Product::factory()->for($blueHarbour)->create([
            'name' => 'Frozen Reef Fish Packs',
            'slug' => 'frozen-reef-fish-packs',
            'summary' => 'Mixed frozen reef fish packs for regional wholesale channels.',
        ]);

        Campaign::factory()->for($blueHarbour)->create([
            'title' => 'June export booking window',
            'summary' => 'Secure freezer capacity and export packaging slots for the next seafood run.',
        ]);

        NewsEvent::factory()->for($blueHarbour)->create([
            'title' => 'New cold storage line goes live',
            'summary' => 'The second cold storage line is now active for larger buyer allocations.',
        ]);

        $conversation = Conversation::factory()->create([
            'user_id' => $member->id,
            'company_id' => $blueHarbour->id,
            'last_message_at' => now(),
        ]);

        Message::factory()->create([
            'conversation_id' => $conversation->id,
            'user_id' => $member->id,
            'body' => 'Hello, can you share the latest pricing sheet for frozen tuna portions?',
        ]);

        Message::factory()->create([
            'conversation_id' => $conversation->id,
            'user_id' => $companyUser->id,
            'body' => 'Absolutely. We can share current export pricing after account verification.',
        ]);
    }
}
