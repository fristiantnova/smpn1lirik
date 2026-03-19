<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('guru', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('nip', 30)->nullable()->unique();
            $table->string('nuptk', 20)->nullable();
            $table->string('email')->nullable();
            $table->string('telepon', 20)->nullable();
            $table->enum('jenis_kelamin', ['L', 'P'])->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->text('alamat')->nullable();
            $table->string('pendidikan_terakhir', 10)->nullable(); // S1, S2, S3
            $table->string('status_kepegawaian', 30)->default('PNS'); // PNS, GTT, Honor
            $table->string('jabatan')->nullable();        // Kepala Sekolah, Wakil, dll
            $table->string('mata_pelajaran')->nullable();
            $table->text('biodata')->nullable();
            $table->string('foto')->nullable();           // path foto
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('guru');
    }
};
