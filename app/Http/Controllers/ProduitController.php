<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produit;

class ProduitController extends Controller
{
    //essai
    function simple() {
        return "ciacia";
    }
    //liste produit
    function index(Request $request) {
        $name = $request->input('name');
        $query = Produit::query();

        if ($name){
            $query->where('Nom_Produit', 'like', '%'.$name.'%');
        }

        $produits = $query->get();
        return $produits;
    }
    //ajout produit
    function ajout(Request $request) {
        $produit = new Produit();
        $produit->Nom_Produit = $request->input('Nom_Produit');
        $produit->Description = $request->input('Description');
        $produit->Prix_Unitaire = $request->input('Prix_Unitaire');
        $produit->Qte_En_Stock = $request->input('Qte_En_Stock');
        $produit->save();
        return response()->json(['message' => 'Produit ajouté avec succès'], 201);
    }

    //modification produit
    function modification(Request $request) {
        $ID_Produit = $request->input('ID_Produit');

        $produit = Produit::findOrFail($ID_Produit);
        $produit->update($request->all());
        // $produit->Nom_Produit = $request->input('Nom_Produit');
        // $produit->Description = $request->input('Description');
        // $produit->Prix_Unitaire = $request->input('Prix_Unitaire');
        // $produit->Qte_En_Stock = $request->input('Qte_En_Stock');
        // $produit->save();
    }

    //suppression produit
    function suppression(Request $request) {
        $ID_Produit = $request->input('ID_Produit');
        $produit = Produit::findOrFail($ID_Produit);
        $produit->delete();
    }
}
