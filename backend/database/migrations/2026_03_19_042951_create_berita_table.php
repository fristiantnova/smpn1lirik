<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('berita', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete(); // penulis
            $table->string('judul');
            $table->string('slug')->unique();
            $table->longText('konten');
            $table->string('gambar')->nullable();        // path gambar utama
            $table->string('kategori', 50)->default('umum'); // umum, prestasi, kegiatan, dll
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->timestamp('tanggal_publikasi')->nullable();
            $table->unsignedInteger('views')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['status', 'tanggal_publikasi']);
            $table->index('kategori');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('berita');
    }
};
