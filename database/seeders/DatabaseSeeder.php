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
            'Aquaculture' => ['Fish Farming', 'Fish Feed', 'Aquaculture Services', 'Fish Pump'],
            'Electronics / Communications' => ['Communications', 'Computers', 'Navigation Equipment', 'Radar'],
            'Fishing Equipment' => ['Bait', 'Fishing Gear', 'Jigging Equipment', 'Nets'],
            'Fish Handling' => ['Containers / Storage', 'Fish Trading', 'Fish Transportation', 'Refrigerated Transport'],
            'Power / Propulsion' => ['Engines', 'Generators', 'Heat Pumps', 'Propellers'],
            'Processing / Refrigeration' => ['Blast Freezer', 'Filleting', 'Packaging', 'Refrigeration'],
            'Safety' => ['Clothing', 'Fire Fighting Equipment', 'Safety Equipment', 'Security Equipment'],
            'Vessel / Shipyard' => ['Anchors', 'Cranes', 'Marine Equipment', 'Ship Repair / Conversion'],
        ])->map(function (array $children, string $parentName) {
            $parent = Category::query()->create([
                'name' => $parentName,
                'slug' => str($parentName)->slug()->value(),
                'description' => $parentName.' services and suppliers in the fishery supply chain.',
                'sort_order' => Category::count() + 1,
            ]);

            collect($children)->each(function (string $childName, int $index) use ($parent) {
                Category::query()->create([
                    'parent_id' => $parent->id,
                    'name' => $childName,
                    'slug' => str($childName)->slug()->value(),
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

        $blueHarbour->categories()->attach([
            $categories['Aquaculture']->id,
            $categories['Fish Handling']->id,
            $categories['Processing / Refrigeration']->id,
        ]);
        $oceanNav->categories()->attach([
            $categories['Electronics / Communications']->id,
            $categories['Vessel / Shipyard']->id,
        ]);
        $harvest->categories()->attach([
            $categories['Fish Handling']->id,
            $categories['Processing / Refrigeration']->id,
        ]);

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
