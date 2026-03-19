<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kelas', function (Blueprint $table) {
            $table->id();
            $table->string('nama_kelas', 20);     // contoh: VII A, VIII B
            $table->enum('tingkat', ['VII', 'VIII', 'IX']);
            $table->string('tahun_ajaran', 10);   // contoh: 2024/2025
            $table->foreignId('wali_kelas_id')->nullable()->constrained('guru')->nullOnDelete();
            $table->unsignedSmallInteger('kapasitas')->default(32);
            $table->unsignedSmallInteger('jumlah_siswa')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->unique(['nama_kelas', 'tahun_ajaran']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kelas');
    }
};
