<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'password.confirm'])->group(function () {
    Route::get('/', function () {
        return view('welcome');
    })->middleware('verified');
});

