<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;
    protected $primaryKey = 'ID_Commande';
    protected $fillable = [
        'ID_Commande',
        'Date_Commande',
        'Qte_Commande',
        'Prix_Total',
        'Status',
        'ID_Produit',
        'ID_Fournisseur'
    ];

    public function produit()
{
    return $this->belongsTo('App\Models\Produit', 'ID_Produit');
}

public function fournisseur()
{
    return $this->belongsTo('App\Models\Fournisseur', 'ID_Fournisseur');
}

public function rapports (){
    return $this->hasMany('App\Models\Rapport', 'ID_Commande');
}

}
