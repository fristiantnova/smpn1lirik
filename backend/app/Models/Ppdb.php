<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ppdb extends Model
{
    protected $table = 'ppdb';

    protected $fillable = [
        'nama_lengkap', 'nisn', 'jenis_kelamin', 'tempat_lahir', 'tanggal_lahir',
        'alamat', 'asal_sekolah', 'tahun_lulus', 'nilai_rata_rata',
        'nama_ayah', 'nama_ibu', 'pekerjaan_ayah', 'pekerjaan_ibu',
        'telepon_ortu', 'email_ortu',
        'foto_calon_siswa', 'ijazah', 'akta_kelahiran',
        'tahun_ajaran', 'status', 'catatan_admin', 'tanggal_daftar',
    ];

    protected $casts = [
        'tanggal_lahir'  => 'date',
        'tanggal_daftar' => 'datetime',
    ];
}
