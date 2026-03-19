<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ppdb', function (Blueprint $table) {
            $table->id();
            // Data Calon Siswa
            $table->string('nama_lengkap');
            $table->string('nisn', 20)->nullable();
            $table->enum('jenis_kelamin', ['L', 'P']);
            $table->string('tempat_lahir')->nullable();
            $table->date('tanggal_lahir');
            $table->text('alamat');
            $table->string('asal_sekolah'); // nama SD/MI asal
            $table->string('tahun_lulus', 6)->nullable();
            $table->string('nilai_rata_rata', 10)->nullable();
            // Data Orang Tua
            $table->string('nama_ayah')->nullable();
            $table->string('nama_ibu')->nullable();
            $table->string('pekerjaan_ayah')->nullable();
            $table->string('pekerjaan_ibu')->nullable();
            $table->string('telepon_ortu', 20);
            $table->string('email_ortu')->nullable();
            // Dokumen
            $table->string('foto_calon_siswa')->nullable();
            $table->string('ijazah')->nullable();           // path file scan ijazah
            $table->string('akta_kelahiran')->nullable();   // path file scan akta
            // Status
            $table->string('tahun_ajaran', 10);             // contoh: 2025/2026
            $table->enum('status', ['pending', 'diterima', 'ditolak', 'wawancara'])->default('pending');
            $table->text('catatan_admin')->nullable();
            $table->timestamp('tanggal_daftar')->useCurrent();
            $table->timestamps();

            $table->index(['tahun_ajaran', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ppdb');
    }
};
