<?php

namespace Database\Seeders;

use App\Models\Song;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        Song::truncate();

        $songs = [
            ['name' => 'Alisson Shore', 'trait' => 'HOYA', 'imageUrl' => '/images/Alisson.jpg', 'likedBy' => []],
            ['name' => 'Bruno', 'trait' => 'Just the way you are', 'imageUrl' => '/images/Bruno.jpg', 'likedBy' => []],
            ['name' => 'Bruno1', 'trait' => 'Locked out of heaven', 'imageUrl' => '/images/Bruno1.jpg', 'likedBy' => []],
            ['name' => 'Dionela', 'trait' => 'Marilag', 'imageUrl' => '/images/Dionela.jpg', 'likedBy' => []],
            ['name' => 'Frank Ocean', 'trait' => 'Blonde', 'imageUrl' => '/images/Frank.jpg', 'likedBy' => []],
            ['name' => 'Harry Styles', 'trait' => 'As It Was', 'imageUrl' => '/images/Harry.jpg', 'likedBy' => []],
        ];

        foreach ($songs as $song) {
            Song::create($song);
        }
    }
}
