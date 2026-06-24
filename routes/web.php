<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SalesController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/sales', function () {
//     return Inertia::render('Sales/IndexSales');
// })->middleware(['auth', 'verified'])->name('sales');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/sales', [SalesController::class, 'index'])->name('sales');
Route::post('/sales', [SalesController::class, 'store'])->name('sales.store');
Route::put('/sales/{sm_id}', [SalesController::class, 'update'])->name('sales.update');
Route::delete('/sales/{sm_id}', [SalesController::class, 'destroy'])->name('sales.destroy');


require __DIR__.'/auth.php';
