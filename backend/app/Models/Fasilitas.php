<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fasilitas extends Model
{
    protected $fillable = [
        'nama', 'kategori', 'deskripsi', 'jumlah', 'kondisi',
        'foto', 'is_active', 'urutan',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'jumlah'    => 'integer',
        'urutan'    => 'integer',
    ];
}
