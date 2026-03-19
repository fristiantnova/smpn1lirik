<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ekstrakulikuler', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->text('deskripsi')->nullable();
            $table->string('pembina')->nullable();          // nama pembina ekskul
            $table->string('ketua')->nullable();
            $table->string('jadwal')->nullable();           // contoh: Senin & Rabu, 14.00-16.00
            $table->string('tempat')->nullable();
            $table->string('foto')->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedSmallInteger('urutan')->default(0); // untuk pengurutan tampilan
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ekstrakulikuler');
    }
};
