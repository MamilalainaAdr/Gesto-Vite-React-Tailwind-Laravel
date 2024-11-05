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
        Schema::create('fournisseurs', function (Blueprint $table) { //Table contenant les fournisseurs
            $table->id('ID_Fournisseur');
            $table->string('Nom_Fournisseur');
            $table->string('Adresse');
            $table->string('Telephone');
            $table->string('Email')->unique();

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
