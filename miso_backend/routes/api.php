<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/users', [UserController::class, 'index']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/categories', [UserController::class, 'categories']);
Route::post('/users/set-category', [UserController::class, 'setCategory'])->middleware('auth:sanctum');
