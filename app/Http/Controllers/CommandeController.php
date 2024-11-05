<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commande;

class CommandeController extends Controller
{
    //liste commande
    function index() {
        $commande = Commande::all();
        return $commande;
    }

    //ajout commande
    function ajout(Request $request) {
        $commande = new Commande();
        $commande->Date_Commande = $request->input('Date_Commande');
        $commande->Qte_Commande = $request->input('Qte_Commande');
        $commande->Prix_Total = $request->input('Prix_Total');
        $commande->ID_Produit = $request->input('ID_Produit');
        $commande->ID_Fournisseur = $request->input('ID_Fournisseur');
        $commande->save();
    }

    //Terminer tache

    function terminer(Request $request) {
        $ID_Commande = $request->input('ID_Commande');
        $status = $request->input("status");

        $commande = Commande::findOrFail($ID_Commande);
        $commande->update(['Status' => $status]);
    }

    //modification commande
    function modification(Request $request) {
        $ID_Commande = $request->input('ID_Commande');

        $commande = Commande::findOrFail($ID_Commande);
        $commande->update($request->all());
    }

    //suppression commande
    function suppression(Request $request) {
        $ID_Commande = $request->input('ID_Commande');
        $commande = Commande::findOrFail($ID_Commande);
        $commande->delete();
    }
}
