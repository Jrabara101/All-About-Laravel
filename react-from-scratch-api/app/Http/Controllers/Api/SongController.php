<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\SongCollection;
use App\Http\Resources\SongResource;
use App\Models\Song;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SongController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return response()->json(Song::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Song $song) {
        return new SongResource($song);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
