<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agenda extends Model
{
    protected $table = 'agenda';

    protected $fillable = [
        'judul', 'deskripsi', 'tanggal_mulai', 'tanggal_selesai',
        'waktu', 'lokasi', 'penyelenggara', 'kategori', 'is_active',
    ];

    protected $casts = [
        'tanggal_mulai'    => 'date',
        'tanggal_selesai'  => 'date',
        'is_active'        => 'boolean',
    ];

    public function scopeMendatang($query)
    {
        return $query->where('tanggal_mulai', '>=', today())->orderBy('tanggal_mulai');
    }
}
