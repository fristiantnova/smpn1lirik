<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Galeri extends Model
{
    protected $table = 'galeri';

    protected $fillable = [
        'judul', 'deskripsi', 'tipe', 'file', 'thumbnail',
        'kategori', 'tanggal', 'is_active', 'urutan',
    ];

    protected $casts = [
        'tanggal'   => 'date',
        'is_active' => 'boolean',
        'urutan'    => 'integer',
    ];

    public function scopeFoto($query)   { return $query->where('tipe', 'foto'); }
    public function scopeVideo($query)  { return $query->where('tipe', 'video'); }
}
