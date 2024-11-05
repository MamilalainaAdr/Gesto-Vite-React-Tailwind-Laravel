<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;

    protected $primaryKey = 'ID_Produit';
    protected $fillable = [
        'ID_Produit',
        'Nom_Produit',
        'Description',
        'Prix_Unitaire',
        'Qte_En_Stock'
    ];

    public function commandes()
    {
        return $this->hasMany('App\Models\Commande', 'ID_Produit');
    }
}
