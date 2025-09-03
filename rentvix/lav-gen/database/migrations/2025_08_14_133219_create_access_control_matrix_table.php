<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('access_control_matrix', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_level_id')->constrained('level_user')->references('id')->onDelete('cascade');
            $table->foreignId('menu_id')->constrained('menu_id')->references('id')->onDelete('cascade');
            $table->boolean('view')->nullable();
            $table->boolean('add')->nullable();
            $table->boolean('edit')->nullable();
            $table->boolean('delete')->nullable();
            $table->boolean('approve')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('access_control_matrix');
    }
};