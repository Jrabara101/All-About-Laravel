<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SongCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return $this->collection->map(function ($song) {
            return [
                'id' => $song->id,
                'name' => $song->name,
                'trait' => $song->trait,
                'imageUrl' => $song->imageUrl,
                'likedBy' => $song->likedBy,
            ];
        })->toArray();
    }
}