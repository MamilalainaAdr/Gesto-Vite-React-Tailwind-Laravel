<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fournisseur extends Model
{
    use HasFactory;

    protected $primaryKey = 'ID_Fournisseur';
    protected $fillable = [
        'ID_Fournisseur',
        'Nom_Fournisseur',
        'Adresse',
        'Telephone',
        'Email'
    ];

    public function commandes()
    {
        return $this->hasMany('App\Models\Commande', 'ID_Fournisseur');
    }
}
