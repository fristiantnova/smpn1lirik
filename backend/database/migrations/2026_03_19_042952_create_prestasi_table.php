<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('prestasi', function (Blueprint $table) {
            $table->id();
            $table->string('nama_prestasi');
            $table->string('kategori', 50)->default('akademik'); // akademik, olahraga, seni, dll
            $table->enum('tingkat', ['sekolah', 'kecamatan', 'kabupaten', 'provinsi', 'nasional', 'internasional']);
            $table->string('juara', 20)->nullable();    // Juara 1, 2, 3, Harapan I, dll
            $table->string('penyelenggara')->nullable();
            $table->year('tahun');
            $table->text('deskripsi')->nullable();
            $table->string('foto')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['tahun', 'tingkat']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('prestasi');
    }
};
