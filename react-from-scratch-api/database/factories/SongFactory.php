<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SongFactory extends Factory
{
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'trait' => $this->faker->sentence,
            'imageUrl' => '/images/' . $this->faker->word . '.jpg',
            'likedBy' => [],
        ];
    }
}
