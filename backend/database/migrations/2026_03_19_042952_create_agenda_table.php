<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('agenda', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->text('deskripsi')->nullable();
            $table->date('tanggal_mulai');
            $table->date('tanggal_selesai')->nullable();
            $table->string('waktu', 20)->nullable();    // contoh: 08.00 - selesai
            $table->string('lokasi')->nullable();
            $table->string('penyelenggara')->nullable();
            $table->enum('kategori', ['akademik', 'olahraga', 'seni', 'keagamaan', 'umum'])->default('umum');
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index('tanggal_mulai');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('agenda');
    }
};
