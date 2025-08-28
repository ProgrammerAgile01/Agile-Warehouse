<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('mst_users', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('email');
            $table->bigInteger('no_hp');
            $table->string('password');

            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('mst_users');
    }
};