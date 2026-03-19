<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Guru extends Model
{
    use SoftDeletes;

    protected $table = 'guru';

    protected $fillable = [
        'nama', 'nip', 'nuptk', 'email', 'telepon', 'jenis_kelamin',
        'tanggal_lahir', 'alamat', 'pendidikan_terakhir', 'status_kepegawaian',
        'jabatan', 'mata_pelajaran', 'biodata', 'foto', 'is_active',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'is_active'     => 'boolean',
    ];

    // Satu guru bisa jadi wali kelas
    public function kelasWali(): HasOne
    {
        return $this->hasOne(Kelas::class, 'wali_kelas_id');
    }

    // Guru yang punya siswa melalui kelas
    public function siswaBimbingan(): HasMany
    {
        return $this->hasMany(Siswa::class, 'kelas_id', 'id')
                    ->whereHas('kelas', fn ($q) => $q->where('wali_kelas_id', $this->id));
    }
}
