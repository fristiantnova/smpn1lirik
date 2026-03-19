<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fasilitas', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('kategori', 50)->default('ruangan'); // ruangan, lapangan, laboratorium, dll
            $table->text('deskripsi')->nullable();
            $table->unsignedSmallInteger('jumlah')->default(1);
            $table->string('kondisi', 30)->default('baik');     // baik, cukup, rusak ringan
            $table->string('foto')->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedSmallInteger('urutan')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fasilitas');
    }
};
