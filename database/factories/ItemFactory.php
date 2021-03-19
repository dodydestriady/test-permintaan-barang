<?php

namespace Database\Factories;

use App\Models\Item;
use App\Models\Location;
use App\Models\Unit;
use Illuminate\Database\Eloquent\Factories\Factory;

class ItemFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Item::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'code' => $this->faker->unique()->numerify('P####'),
            'name' => $this->faker->name,
            'location_id' => Location::all()->random()->id,
            'unit_id' => Unit::all()->random()->id,
            'stock' => $this->faker->numberBetween(0, 9999)
        ];
    }
}
