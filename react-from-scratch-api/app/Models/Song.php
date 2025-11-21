<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'trait',
        'imageUrl',
        'likedBy',
    ];

    protected $casts = [
        'likedBy' => 'array', // will cast JSON to array automatically
    ];
}