<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prestasi extends Model
{
    protected $table = 'prestasi';

    protected $fillable = [
        'nama_prestasi', 'kategori', 'tingkat', 'juara',
        'penyelenggara', 'tahun', 'deskripsi', 'foto', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'tahun'     => 'integer',
    ];
}
