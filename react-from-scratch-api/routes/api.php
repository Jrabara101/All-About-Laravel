<?php

use App\Http\Resources\SongResource;
use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

// Test route to verify API is working
Route::get('/test', function () {
    return response()->json(['message' => 'API is working!', 'timestamp' => now()]);
});

// ------------------------------
// Get all songs
// ------------------------------
Route::get('/songs', function () {
    sleep(1);
    try {
        $songs = Song::all();
        // SongResource::collection automatically wraps in 'data' key
        return SongResource::collection($songs);
    } catch (\Exception $e) {
        Log::error('Error fetching songs: ' . $e->getMessage());
        return response()->json([
            'error' => 'Failed to fetch songs',
            'message' => $e->getMessage()
        ], 500);
    }
});

// ------------------------------
// Create new song
// ------------------------------
Route::post('/songs', function (Request $request) {
    sleep(1);
    $validated = $request->validate([
        'name' => 'required|string',
        'trait' => 'required|string',
        'image_url' => 'required|mimes:jpg,jpeg,png|max:2048',
    ]);

    $file = $request->file('image_url');
    $path = $file->store('avatars', 'public');
    
    // Get full URL for the stored image
    $imageUrl = \Illuminate\Support\Facades\Storage::url($path);
    // Convert to absolute URL if it's relative
    if (!str_starts_with($imageUrl, 'http')) {
        $imageUrl = url($imageUrl);
    }

    $song = Song::factory()->create(
        [
            'name' => $validated['name'],
            'trait' => $validated['trait'],
            'imageUrl' => $imageUrl,
            'likedBy' => [],
        ]
    );
    return new SongResource($song);
});

// ------------------------------
// Toggle like status for a song
// ------------------------------
Route::patch('/songs/{song}/like', function (Song $song) {
    sleep(1);
    $userId = 1; // Default user ID
    $likedBy = collect($song->likedBy);
    
    if ($likedBy->contains($userId)) {
        $likedBy = $likedBy->filter(fn($id) => $id !== $userId)->values();
    } else {
        $likedBy->push($userId);
    }
    
    $song->likedBy = $likedBy->toArray();
    $song->save();
    
    return new SongResource($song);
});