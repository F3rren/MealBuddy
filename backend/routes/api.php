<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
<<<<<<< HEAD
=======
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
>>>>>>> parent of 1a58eea (implemented login function)

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    // $request->user() restituisce l’utente loggato
    return response()->json([
        'id' => $request->user()->id,
        'name' => $request->user()->name,
        'email' => $request->user()->email,
    ]);
});

Route::post('/login', [AuthController::class, 'login']);

