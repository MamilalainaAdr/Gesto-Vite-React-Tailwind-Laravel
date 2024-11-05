<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rapports', function (Blueprint $table) {
            $table->id('ID_Rapport');
            $table->date('Date_Rapport');
            $table->text('Note'); //Commentaires venant du vendeurs ou du client sur la commande
            
            $table->foreignId('ID_Commande')->constrained('commandes', 'ID_Commande')->onDelete('cascade'); //Lie avec la table des produits
            
            $table->timestamps();
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
