<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('galeri', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->text('deskripsi')->nullable();
            $table->enum('tipe', ['foto', 'video'])->default('foto');
            $table->string('file')->nullable();        // path foto atau URL video Youtube
            $table->string('thumbnail')->nullable();   // thumbnail untuk video
            $table->string('kategori', 50)->default('umum'); // umum, kegiatan, prestasi, dll
            $table->date('tanggal')->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedSmallInteger('urutan')->default(0);
            $table->timestamps();

            $table->index(['tipe', 'kategori', 'is_active']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('galeri');
    }
};
