<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Location::factory(10)->create();
        \App\Models\Unit::factory(10)->create();
        \App\Models\Department::factory(10)->create();
        \App\Models\Employee::factory(10)->create();
        \App\Models\Item::factory(10)->create();

    }
}
