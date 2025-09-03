<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('user_management', function (Blueprint $table) {
            // FK ke company
            $table->uuid('company_id')->nullable()->after('id');
            $table->foreign('company_id')->references('id')->on('mst_company')->onDelete('set null');

            // password untuk login by password
            $table->string('password')->nullable()->after('email'); // nullable agar data lama aman

            // index bantu
            $table->index(['company_id']);
            $table->index(['email']);
            $table->index(['nomor_telp']);
        });
    }

    public function down(): void
    {
        Schema::table('user_management', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->dropColumn(['company_id', 'password']);
        });
    }
};
