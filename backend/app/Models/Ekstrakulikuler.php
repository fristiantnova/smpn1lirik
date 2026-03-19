<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ekstrakulikuler extends Model
{
    protected $table = 'ekstrakulikuler';

    protected $fillable = [
        'nama', 'deskripsi', 'pembina', 'ketua', 'jadwal',
        'tempat', 'foto', 'is_active', 'urutan',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'urutan'    => 'integer',
    ];
}
