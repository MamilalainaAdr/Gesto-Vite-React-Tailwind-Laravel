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
        Schema::create('commandes', function (Blueprint $table) {
            $table->id('ID_Commande');
            $table->date('Date_Commande');
            $table->integer('Qte_Commande');
            $table->integer('Prix_Total');
            $table->string('Status')->default('En cours');
            
            $table->foreignId('ID_Produit')->constrained('produits', 'ID_Produit')->onDelete('cascade'); //Lie avec la table des produits
            $table->foreignId('ID_Fournisseur')->constrained('fournisseurs', 'ID_Fournisseur')->onDelete('cascade'); // Lie avec la table des fournisseurs
            
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
