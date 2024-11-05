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
        Schema::create('produits', function (Blueprint $table) { //Table contenant les produits
            $table->id('ID_Produit');
            $table->string('Nom_Produit');
            $table->string('Description');
            $table->integer('Prix_Unitaire');
            $table->integer('Qte_En_Stock');

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
