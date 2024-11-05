<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProduitController;
use App\Http\Controllers\FournisseurController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\RapportController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Produits
Route::get('/produit', [ProduitController::class, 'index']);
Route::post('/produit', [ProduitController::class, 'ajout']);
Route::put('/produit', [ProduitController::class, 'modification']);
Route::delete('/produit', [ProduitController::class, 'suppression']);

//Fournisseurs
Route::get('/fournisseur', [FournisseurController::class, 'index']);
Route::post('/fournisseur', [FournisseurController::class, 'ajouter']);
Route::put('/fournisseur', [FournisseurController::class, 'modifier']);
Route::delete('/fournisseur', [FournisseurController::class, 'supprimer']);

//Commandes
Route::get('/commande', [CommandeController::class, 'index']);
Route::post('/commande', [CommandeController::class, 'ajout']);
Route::put('/commande', [CommandeController::class, 'modification']);
Route::delete('/commande', [CommandeController::class, 'suppression']);
Route::put('/commande/terminer', [CommandeController::class, 'terminer']);

//Rapports
Route::get('/rapport', [RapportController::class, 'index']);
Route::post('/rapport', [RapportController::class, 'ajout']);
Route::put('/rapport', [RapportController::class, 'modification']);
Route::delete('/rapport', [RapportController::class, 'suppression']);
