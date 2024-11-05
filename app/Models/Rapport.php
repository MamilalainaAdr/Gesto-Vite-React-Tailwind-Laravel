<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rapport extends Model
{
    use HasFactory;
    protected $primaryKey = 'ID_Rapport';
    protected $fillable = [
        'ID_Rapport',
        'Date_Rapport',
        'Note',
        'ID_Commande',
    ];

    public function commande()
{
    return $this->belongsTo('App\Models\Commande', 'ID_Commande');
}
}
