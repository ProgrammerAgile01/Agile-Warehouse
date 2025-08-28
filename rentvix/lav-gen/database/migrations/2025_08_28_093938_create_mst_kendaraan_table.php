<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('mst_kendaraan', function (Blueprint $table) {
            $table->id();
            $table->string('brand');
            $table->string('model');
            $table->integer('tahun');
            $table->string('lokasi');
            $table->enum('status', ['Avaliable', 'Rented', 'Maintenance', 'Out Of Service']);
            $table->string('foto_depan')->nullable();
            $table->string('foto_belakang')->nullable();
            $table->string('foto_samping')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('mst_kendaraan');
    }
};