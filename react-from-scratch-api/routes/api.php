<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SongController;

Route::get('test', function() {
    return response()->json(['message' => 'API working!']);
});

// Songs API routes
Route::apiResource('songs', SongController::class);
// Optional for like/unlike:
Route::post('songs/{song}/like', [SongController::class, 'like']);
Route::post('songs/{song}/unlike', [SongController::class, 'unlike']);