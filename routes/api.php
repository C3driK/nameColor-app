<?php

use App\Http\Controllers\Api\NameColorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//this give api endpoints
Route::apiResource('name-colors', NameColorController::class);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
