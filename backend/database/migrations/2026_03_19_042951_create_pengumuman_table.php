<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pengumuman', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('judul');
            $table->text('konten');
            $table->string('file_lampiran')->nullable();  // path file PDF/DOC
            $table->string('nama_file_asli')->nullable(); // nama file aslinya
            $table->enum('status', ['aktif', 'nonaktif'])->default('aktif');
            $table->timestamp('tanggal_tayang')->nullable();
            $table->timestamp('tanggal_kadaluarsa')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pengumuman');
    }
};
