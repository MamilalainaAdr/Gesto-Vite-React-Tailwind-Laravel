<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Fournisseur;

class FournisseurController extends Controller
{
    /**
     * Affiche la liste des fournisseurs.
     */
    public function index(Request $request)
    {
        $name = $request->input('name');
        $query = Fournisseur::query();

        if ($name){
            $query->where('Nom_Fournisseur', 'like', '%'.$name.'%');
        }

        $fournisseurs = $query->get();
        return $fournisseurs;
    }


    /**
     * Stocke un nouveau fournisseur dans la base de données.
     */
    public function ajouter(Request $request)
    {
        $fournisseur = new Fournisseur;
        $fournisseur->Nom_Fournisseur = $request->input('Nom_Fournisseur');
        $fournisseur->Adresse = $request->input('Adresse');
        $fournisseur->Telephone = $request->input('Telephone');
        $fournisseur->Email = $request->input('Email');
        $fournisseur->save();
    }

    /**
     * Met à jour le fournisseur spécifié dans la base de données.
     */
    public function modifier(Request $request)
    {
        $id = $request->input('id'); //recupère l'id

        $fournisseur = Fournisseur::findOrFail($id);
        $fournisseur->Nom_Fournisseur = $request->input('Nom_Fournisseur');
        $fournisseur->Adresse = $request->input('Adresse');
        $fournisseur->Telephone = $request->input('Telephone');
        $fournisseur->Email = $request->input('Email');
        $fournisseur->save();
    }

    /**
     * Supprime le fournisseur spécifié de la base de données.
     */
    public function supprimer(Request $request)
    {
        $id = $request->input('id'); //recupère l'id

        $fournisseur = Fournisseur::findOrFail($id);
        $fournisseur->delete();
    }
}
