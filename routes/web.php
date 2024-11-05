<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Http\Controllers\ProduitController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Dashboard', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware(['auth', 'verified']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


//routes
Route::get('/produit', function() {
    return Inertia::render('produit');
})->middleware(["auth", "verified"])->name('produit');

Route::get('/fournisseur', function() {
    return Inertia::render('fournisseur');
})->middleware(["auth", "verified"])->name('fournisseur');

Route::get('/commande', function() {
    return Inertia::render('commande');
})->middleware(["auth", "verified"])->name('commande');

Route::get('/rapport', function() {
    return Inertia::render('rapport');
})->middleware(["auth", "verified"])->name('rapport');

Route::get('/test', [ProduitController::class, 'simple']);

require __DIR__.'/auth.php';
