<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pesan_kontak', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('email');
            $table->string('telepon', 20)->nullable();
            $table->string('subjek')->nullable();
            $table->text('pesan');
            $table->boolean('sudah_dibaca')->default(false);
            $table->timestamp('dibaca_pada')->nullable();
            $table->text('balasan_admin')->nullable();
            $table->timestamp('dibalas_pada')->nullable();
            $table->timestamps();

            $table->index('sudah_dibaca');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pesan_kontak');
    }
};
