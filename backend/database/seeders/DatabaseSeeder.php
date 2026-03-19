<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Siswa;
use App\Models\Berita;
use App\Models\Pengumuman;
use App\Models\Ekstrakulikuler;
use App\Models\Fasilitas;
use App\Models\Galeri;
use App\Models\Prestasi;
use App\Models\Agenda;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Buat roles
        $adminRole = Role::firstOrCreate(['name' => 'admin',  'guard_name' => 'web']);
        Role::firstOrCreate(['name' => 'guru',  'guard_name' => 'web']);
        Role::firstOrCreate(['name' => 'siswa', 'guard_name' => 'web']);

        // Admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@smpn2lirik.sch.id'],
            ['name' => 'Administrator', 'password' => Hash::make('admin123')]
        );
        $admin->assignRole($adminRole);

        // ===== DATA GURU =====
        $guruData = [
            ['nama' => 'Drs. Ahmad Fauzi, M.Pd', 'nip' => '196801011990031001', 'jabatan' => 'Kepala Sekolah',       'mata_pelajaran' => NULL,           'status_kepegawaian' => 'PNS', 'jenis_kelamin' => 'L'],
            ['nama' => 'Sri Wahyuni, S.Pd',       'nip' => '197205121999032002', 'jabatan' => 'Waka Kurikulum',      'mata_pelajaran' => 'Matematika',    'status_kepegawaian' => 'PNS', 'jenis_kelamin' => 'P'],
            ['nama' => 'Bambang Susilo, S.Pd',    'nip' => '197403151998031003', 'jabatan' => 'Guru',                'mata_pelajaran' => 'Bahasa Indonesia', 'status_kepegawaian' => 'PNS', 'jenis_kelamin' => 'L'],
            ['nama' => 'Rina Marlina, S.Pd',      'nip' => '198007202005042004', 'jabatan' => 'Waka Kesiswaan',     'mata_pelajaran' => 'IPA',           'status_kepegawaian' => 'PNS', 'jenis_kelamin' => 'P'],
            ['nama' => 'Hendra Gunawan, S.Pd',    'nip' => NULL,                 'jabatan' => 'Guru',                'mata_pelajaran' => 'Penjaskes',     'status_kepegawaian' => 'GTT', 'jenis_kelamin' => 'L'],
            ['nama' => 'Dewi Rahayu, S.Pd',       'nip' => '197912102003122005', 'jabatan' => 'Guru',                'mata_pelajaran' => 'Bahasa Inggris','status_kepegawaian' => 'PNS', 'jenis_kelamin' => 'P'],
        ];
        $guruIds = [];
        foreach ($guruData as $g) {
            $guru = Guru::firstOrCreate(['nama' => $g['nama']], array_merge($g, ['is_active' => true]));
            $guruIds[] = $guru->id;
        }

        // ===== DATA KELAS =====
        $kelasData = [
            ['nama_kelas' => 'VII A',   'tingkat' => 'VII',  'tahun_ajaran' => '2024/2025', 'wali_kelas_id' => $guruIds[1] ?? null],
            ['nama_kelas' => 'VII B',   'tingkat' => 'VII',  'tahun_ajaran' => '2024/2025', 'wali_kelas_id' => $guruIds[2] ?? null],
            ['nama_kelas' => 'VIII A',  'tingkat' => 'VIII', 'tahun_ajaran' => '2024/2025', 'wali_kelas_id' => $guruIds[3] ?? null],
            ['nama_kelas' => 'VIII B',  'tingkat' => 'VIII', 'tahun_ajaran' => '2024/2025', 'wali_kelas_id' => $guruIds[4] ?? null],
            ['nama_kelas' => 'IX A',    'tingkat' => 'IX',   'tahun_ajaran' => '2024/2025', 'wali_kelas_id' => $guruIds[5] ?? null],
            ['nama_kelas' => 'IX B',    'tingkat' => 'IX',   'tahun_ajaran' => '2024/2025', 'wali_kelas_id' => $guruIds[0] ?? null],
        ];
        $kelasIds = [];
        foreach ($kelasData as $k) {
            $kelas = Kelas::firstOrCreate(['nama_kelas' => $k['nama_kelas'], 'tahun_ajaran' => $k['tahun_ajaran']], $k);
            $kelasIds[] = $kelas->id;
        }

        // ===== DATA SISWA (sample) =====
        $siswaSample = [
            ['nama' => 'Andi Pratama',     'nisn' => '0098765432', 'kelas_id' => $kelasIds[0] ?? null, 'angkatan' => '2024', 'jenis_kelamin' => 'L'],
            ['nama' => 'Siti Nurhaliza',   'nisn' => '0087654321', 'kelas_id' => $kelasIds[0] ?? null, 'angkatan' => '2024', 'jenis_kelamin' => 'P'],
            ['nama' => 'Budi Santoso',     'nisn' => '0076543210', 'kelas_id' => $kelasIds[2] ?? null, 'angkatan' => '2023', 'jenis_kelamin' => 'L'],
            ['nama' => 'Fatimah Az-Zahra', 'nisn' => '0065432109', 'kelas_id' => $kelasIds[4] ?? null, 'angkatan' => '2022', 'jenis_kelamin' => 'P'],
        ];
        foreach ($siswaSample as $s) {
            Siswa::firstOrCreate(['nisn' => $s['nisn']], array_merge($s, ['status' => 'aktif']));
        }

        // ===== DATA BERITA =====
        $beritaSample = [
            ['judul' => 'Siswa SMPN 2 Lirik Raih Juara 1 Olimpiade Matematika Kabupaten', 'kategori' => 'prestasi'],
            ['judul' => 'Kegiatan MPLS Tahun Pelajaran 2024/2025 Berjalan Sukses',          'kategori' => 'kegiatan'],
            ['judul' => 'SMPN 2 Lirik Gelar Peringatan Hari Pendidikan Nasional',            'kategori' => 'umum'],
        ];
        foreach ($beritaSample as $b) {
            $slug = Str::slug($b['judul']);
            Berita::firstOrCreate(['slug' => $slug], [
                'user_id'           => $admin->id,
                'judul'             => $b['judul'],
                'slug'              => $slug,
                'konten'            => '<p>Konten berita ' . $b['judul'] . ' akan diisi oleh admin.</p>',
                'kategori'          => $b['kategori'],
                'status'            => 'published',
                'tanggal_publikasi' => now()->subDays(rand(1, 30)),
            ]);
        }

        // ===== DATA PENGUMUMAN =====
        Pengumuman::firstOrCreate(['judul' => 'Jadwal Ujian Tengah Semester Ganjil 2024/2025'], [
            'user_id' => $admin->id, 'konten' => 'Ujian Tengah Semester dilaksanakan tanggal 14-18 Oktober 2024.', 'status' => 'aktif',
        ]);
        Pengumuman::firstOrCreate(['judul' => 'Pembayaran SPP Bulan Oktober 2024'], [
            'user_id' => $admin->id, 'konten' => 'Mohon segera melakukan pembayaran SPP sebelum tanggal 10.', 'status' => 'aktif',
        ]);

        // ===== DATA EKSTRAKULIKULER =====
        $ekstraSample = [
            ['nama' => 'Pramuka',       'pembina' => 'Bambang Susilo, S.Pd',  'jadwal' => 'Jumat, 14.00–16.00',  'tempat' => 'Lapangan Sekolah'],
            ['nama' => 'Futsal',        'pembina' => 'Hendra Gunawan, S.Pd',  'jadwal' => 'Sabtu, 08.00–10.00',  'tempat' => 'Lapangan Futsal'],
            ['nama' => 'Seni Tari',     'pembina' => 'Dewi Rahayu, S.Pd',     'jadwal' => 'Rabu, 14.00–16.00',   'tempat' => 'Aula Sekolah'],
            ['nama' => 'English Club',  'pembina' => 'Dewi Rahayu, S.Pd',     'jadwal' => 'Kamis, 14.00–16.00',  'tempat' => 'Ruang Kelas VIII A'],
            ['nama' => 'Palang Merah Remaja', 'pembina' => 'Rina Marlina, S.Pd', 'jadwal' => 'Senin, 14.00–16.00', 'tempat' => 'Ruang UKS'],
        ];
        foreach ($ekstraSample as $i => $e) {
            Ekstrakulikuler::firstOrCreate(['nama' => $e['nama']], array_merge($e, ['is_active' => true, 'urutan' => $i + 1]));
        }

        // ===== DATA FASILITAS =====
        $fasilitasSample = [
            ['nama' => 'Ruang Kelas',        'kategori' => 'ruangan',      'jumlah' => 12, 'kondisi' => 'baik'],
            ['nama' => 'Laboratorium IPA',   'kategori' => 'laboratorium', 'jumlah' => 1,  'kondisi' => 'baik'],
            ['nama' => 'Laboratorium Komputer','kategori' => 'laboratorium','jumlah' => 1,  'kondisi' => 'baik'],
            ['nama' => 'Perpustakaan',       'kategori' => 'ruangan',      'jumlah' => 1,  'kondisi' => 'baik'],
            ['nama' => 'Aula / Gedung Serba Guna', 'kategori' => 'ruangan','jumlah' => 1, 'kondisi' => 'baik'],
            ['nama' => 'Lapangan Olahraga',  'kategori' => 'lapangan',     'jumlah' => 1,  'kondisi' => 'baik'],
            ['nama' => 'Masjid / Musholla',  'kategori' => 'ibadah',       'jumlah' => 1,  'kondisi' => 'baik'],
            ['nama' => 'UKS (Unit Kesehatan Sekolah)', 'kategori' => 'ruangan', 'jumlah' => 1, 'kondisi' => 'baik'],
        ];
        foreach ($fasilitasSample as $i => $f) {
            Fasilitas::firstOrCreate(['nama' => $f['nama']], array_merge($f, ['is_active' => true, 'urutan' => $i + 1]));
        }

        // ===== DATA PRESTASI =====
        $prestasiSample = [
            ['nama_prestasi' => 'Juara 1 Olimpiade Matematika', 'tingkat' => 'kabupaten', 'juara' => 'Juara 1', 'tahun' => 2024, 'kategori' => 'akademik'],
            ['nama_prestasi' => 'Juara 2 Lomba Pidato Bahasa Indonesia', 'tingkat' => 'provinsi', 'juara' => 'Juara 2', 'tahun' => 2024, 'kategori' => 'akademik'],
            ['nama_prestasi' => 'Juara 1 Turnamen Futsal Pelajar', 'tingkat' => 'kecamatan', 'juara' => 'Juara 1', 'tahun' => 2024, 'kategori' => 'olahraga'],
            ['nama_prestasi' => 'Juara 3 Lomba Seni Tari Daerah', 'tingkat' => 'kabupaten', 'juara' => 'Juara 3', 'tahun' => 2023, 'kategori' => 'seni'],
        ];
        foreach ($prestasiSample as $p) {
            Prestasi::firstOrCreate(['nama_prestasi' => $p['nama_prestasi'], 'tahun' => $p['tahun']], array_merge($p, ['is_active' => true]));
        }

        // ===== DATA AGENDA =====
        $agendaSample = [
            ['judul' => 'Ujian Akhir Semester Ganjil', 'tanggal_mulai' => '2025-12-08', 'tanggal_selesai' => '2025-12-13', 'lokasi' => 'Ruang Kelas', 'kategori' => 'akademik'],
            ['judul' => 'Peringatan Hari Pahlawan', 'tanggal_mulai' => '2025-11-10', 'tanggal_selesai' => null, 'lokasi' => 'Lapangan Upacara', 'kategori' => 'umum'],
            ['judul' => 'Retret Pramuka Kelas VII', 'tanggal_mulai' => '2025-11-22', 'tanggal_selesai' => '2025-11-24', 'lokasi' => 'Bumi Perkemahan', 'kategori' => 'olahraga'],
        ];
        foreach ($agendaSample as $a) {
            Agenda::firstOrCreate(['judul' => $a['judul']], array_merge($a, ['is_active' => true]));
        }

        $this->command->info('✅ Seeder selesai! Admin: admin@smpn2lirik.sch.id | Password: admin123');
        $this->command->info('📊 Data dummy berhasil dibuat: 6 guru, 6 kelas, 4 siswa, 3 berita, 5 ekskul, 8 fasilitas, 4 prestasi, 3 agenda.');
    }
}
