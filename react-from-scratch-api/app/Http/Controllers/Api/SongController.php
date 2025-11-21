<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\SongCollection;
use App\Http\Resources\SongResource;
use App\Models\Song;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SongController extends Controller
{
    public function index()
    {
        // Use the resource collection for uniform response structure
        return response()->json([
            'data' => SongResource::collection(Song::all()),
        ]);
    }

    public function show(Song $song)
    {
        return new SongResource($song);
    }

    // Implement storing/adding new songs
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'trait' => 'required|string',
            'imageUrl' => 'required|string',
            // likedBy defaults to []
        ]);

        $song = Song::create([
            'name' => $validated['name'],
            'trait' => $validated['trait'],
            'imageUrl' => $validated['imageUrl'],
            'likedBy' => [],
        ]);

        return new SongResource($song);
    }

    // Like/unlike logic (optional, for future, not required by UI yet)
    public function like(Request $request, Song $song)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer',
        ]);
        $likedBy = collect($song->likedBy);
        if (!$likedBy->contains($validated['user_id'])) {
            $likedBy->push($validated['user_id']);
        }
        $song->likedBy = $likedBy->values()->all();
        $song->save();

        return new SongResource($song);
    }

    public function unlike(Request $request, Song $song)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer',
        ]);
        $likedBy = collect($song->likedBy)->filter(fn($id) => $id !== $validated['user_id']);
        $song->likedBy = $likedBy->values()->all();
        $song->save();

        return new SongResource($song);
    }

}