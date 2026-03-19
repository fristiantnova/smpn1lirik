<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profil_sekolah', function (Blueprint $table) {
            $table->id();
            $table->string('nama_sekolah');
            $table->string('npsn', 20)->nullable();
            $table->string('akreditasi', 5)->nullable();
            $table->text('visi')->nullable();
            $table->text('misi')->nullable();
            $table->text('sejarah')->nullable();
            $table->text('alamat')->nullable();
            $table->string('kelurahan')->nullable();
            $table->string('kecamatan')->nullable();
            $table->string('kabupaten')->nullable();
            $table->string('provinsi')->nullable();
            $table->string('kode_pos', 10)->nullable();
            $table->string('telepon', 20)->nullable();
            $table->string('email')->nullable();
            $table->string('website')->nullable();
            $table->string('logo')->nullable();          // path file logo
            $table->string('foto_sekolah')->nullable();  // path foto gedung
            $table->string('kepala_sekolah')->nullable();
            $table->string('nip_kepala_sekolah', 30)->nullable();
            $table->text('sambutan_kepala_sekolah')->nullable();
            $table->string('facebook')->nullable();
            $table->string('instagram')->nullable();
            $table->string('youtube')->nullable();
            $table->string('maps_embed')->nullable();    // URL Google Maps embed
            $table->timestamps();
        });

        // Insert 1 row default
        \DB::table('profil_sekolah')->insert([
            'nama_sekolah' => 'SMP Negeri 2 Lirik',
            'created_at'   => now(),
            'updated_at'   => now(),
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('profil_sekolah');
    }
};
