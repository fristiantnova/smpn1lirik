<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kelas extends Model
{
    protected $table = 'kelas';

    protected $fillable = [
        'nama_kelas', 'tingkat', 'tahun_ajaran',
        'wali_kelas_id', 'kapasitas', 'jumlah_siswa', 'is_active',
    ];

    protected $casts = [
        'is_active'     => 'boolean',
        'kapasitas'     => 'integer',
        'jumlah_siswa'  => 'integer',
    ];

    public function waliKelas(): BelongsTo
    {
        return $this->belongsTo(Guru::class, 'wali_kelas_id');
    }

    public function siswa(): HasMany
    {
        return $this->hasMany(Siswa::class, 'kelas_id');
    }
}
