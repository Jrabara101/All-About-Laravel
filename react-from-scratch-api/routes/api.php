<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SongController;

Route::get('test', function() {
    return response()->json(['message' => 'API working!']);
});

// Songs API routes
Route::apiResource('songs', SongController::class);
