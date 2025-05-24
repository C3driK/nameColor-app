<?php

use App\Http\Controllers\Api\WordController;
use App\Http\Controllers\Api\NameColorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// This gives API endpoints
Route::apiResource('name-colors', NameColorController::class);
Route::apiResource('words', WordController::class);

// External API proxy route
Route::get('/finnish-words', [WordController::class, 'fetchFromFinnfast']);

// Optional: auth-protected user route
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
