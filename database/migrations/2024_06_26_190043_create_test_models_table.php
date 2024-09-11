<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('test_models', function (Blueprint $table) {
            $table->id();
            $table->json('name')->nullable();
            $table->timestamps();
        });

        Schema::create('test_model_repeatables', function (Blueprint $table) {
            $table->id();
            $table->json('name')->nullable();
            $table->timestamps();
        });
    }
};
