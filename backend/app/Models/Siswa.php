<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Siswa extends Model
{
    use SoftDeletes;

    protected $table = 'siswa';

    protected $fillable = [
        'nama', 'nisn', 'nis', 'kelas_id', 'angkatan', 'jenis_kelamin',
        'tempat_lahir', 'tanggal_lahir', 'alamat',
        'nama_ayah', 'nama_ibu', 'pekerjaan_ayah', 'pekerjaan_ibu',
        'telepon_ortu', 'foto', 'status',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
    ];

    public function kelas(): BelongsTo
    {
        return $this->belongsTo(Kelas::class, 'kelas_id');
    }

    public function scopeAktif($query)
    {
        return $query->where('status', 'aktif');
    }
}
