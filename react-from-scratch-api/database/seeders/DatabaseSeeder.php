<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Song;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run()
    {
        // Remove old factory if present
        Song::truncate();

        $songs = [
            ['name' => 'Alisson Shore', 'vibe' => 'HOYA', 'imagePath' => '/images/Alisson.jpg'],
            ['name' => 'Bruno', 'vibe' => 'Just the way you are', 'imagePath' => '/images/Bruno.jpg'],
            ['name' => 'Bruno1', 'vibe' => 'Locked out of heaven', 'imagePath' => '/images/Bruno1.jpg'],
            ['name' => 'Dionela', 'vibe' => 'Marilag', 'imagePath' => '/images/Dionela.jpg'],
            ['name' => 'Frank Ocean', 'vibe' => 'Blonde', 'imagePath' => '/images/Frank.jpg'],
            ['name' => 'Harry Styles', 'vibe' => 'As It Was', 'imagePath' => '/images/Harry.jpg'],
        ];

        foreach ($songs as $song) {
            Song::create($song);
        }
    }

}
