<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Berita extends Model
{
    use SoftDeletes;

    protected $table = 'berita';

    protected $fillable = [
        'user_id', 'judul', 'slug', 'konten', 'gambar',
        'kategori', 'status', 'tanggal_publikasi', 'views',
    ];

    protected $casts = [
        'tanggal_publikasi' => 'datetime',
        'views' => 'integer',
    ];

    // Relasi ke penulis (User)
    public function penulis(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Scope: hanya yang sudah dipublish
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
                     ->whereNotNull('tanggal_publikasi')
                     ->where('tanggal_publikasi', '<=', now());
    }
}
