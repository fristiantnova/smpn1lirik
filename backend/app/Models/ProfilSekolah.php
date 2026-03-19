<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfilSekolah extends Model
{
    protected $table = 'profil_sekolah';

    protected $fillable = [
        'nama_sekolah', 'npsn', 'akreditasi', 'visi', 'misi', 'sejarah',
        'alamat', 'kelurahan', 'kecamatan', 'kabupaten', 'provinsi', 'kode_pos',
        'telepon', 'email', 'website', 'logo', 'foto_sekolah',
        'kepala_sekolah', 'nip_kepala_sekolah', 'sambutan_kepala_sekolah',
        'facebook', 'instagram', 'youtube', 'maps_embed',
    ];
}
