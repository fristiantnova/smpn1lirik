<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PesanKontak extends Model
{
    protected $table = 'pesan_kontak';

    protected $fillable = [
        'nama', 'email', 'telepon', 'subjek', 'pesan',
        'sudah_dibaca', 'dibaca_pada', 'balasan_admin', 'dibalas_pada',
    ];

    protected $casts = [
        'sudah_dibaca' => 'boolean',
        'dibaca_pada'  => 'datetime',
        'dibalas_pada' => 'datetime',
    ];

    public function scopeBelumDibaca($query)
    {
        return $query->where('sudah_dibaca', false);
    }
}
