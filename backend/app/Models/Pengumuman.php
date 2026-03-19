<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pengumuman extends Model
{
    use SoftDeletes;

    protected $table = 'pengumuman';

    protected $fillable = [
        'user_id', 'judul', 'konten', 'file_lampiran', 'nama_file_asli',
        'status', 'tanggal_tayang', 'tanggal_kadaluarsa',
    ];

    protected $casts = [
        'tanggal_tayang'      => 'datetime',
        'tanggal_kadaluarsa'  => 'datetime',
    ];

    public function penulis(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function scopeAktif($query)
    {
        return $query->where('status', 'aktif')
                     ->where(function ($q) {
                         $q->whereNull('tanggal_kadaluarsa')
                           ->orWhere('tanggal_kadaluarsa', '>=', now());
                     });
    }
}
