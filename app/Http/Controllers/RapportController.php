<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rapport;

class RapportController extends Controller
{
    /**
     * Affiche la liste des rapports.
     */
    public function index()
    {
        $rapports = Rapport::with('commande.produit', 'commande.fournisseur')->get();
        return $rapports;
    }


    /**
     * Stocke un nouveau rapport dans la base de données.
     */
    public function ajout(Request $request)
    {
        $rapport = new Rapport;
        $rapport->Date_Rapport = $request->input('Date_Rapport');
        $rapport->Note = $request->input('Note');
        $rapport->ID_Commande = $request->input('ID_Commande');
        $rapport->save();
    }


    /**
     * Met à jour le rapport spécifié dans la base de données.
     */
    public function modification(Request $request)
    {
        $id = $request->input('id'); //recupère l'id

        $rapport = Rapport::findOrFail($id);
        $rapport->Date_Rapport = $request->input('Date_Rapport');
        $rapport->Note = $request->input('Note');
        $rapport->ID_Commande = $request->input('ID_Commande');
        $rapport->save();
    }

    /**
     * Supprime le rapport spécifié de la base de données.
     */
    public function suppression(Request $request)
    {
        $id = $request->input('id'); //recupère l'id

        $rapport = Rapport::findOrFail($id);
        $rapport->delete();
    }
}
