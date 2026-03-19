<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ppdb;
use App\Services\FileUploadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PpdbController extends Controller
{
    // Admin: lihat semua pendaftar
    public function index(Request $request): JsonResponse
    {
        $query = Ppdb::latest('tanggal_daftar');

        if ($request->status)       $query->where('status', $request->status);
        if ($request->tahun_ajaran) $query->where('tahun_ajaran', $request->tahun_ajaran);
        if ($request->search) {
            $query->where(fn ($q) =>
                $q->where('nama_lengkap', 'like', '%' . $request->search . '%')
                  ->orWhere('nisn', 'like', '%' . $request->search . '%')
                  ->orWhere('asal_sekolah', 'like', '%' . $request->search . '%')
            );
        }

        $ppdb = $query->paginate($request->per_page ?? 15);
        return response()->json($ppdb);
    }

    // Publik: form pendaftaran
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'nama_lengkap'      => 'required|string|max:255',
            'jenis_kelamin'     => 'required|in:L,P',
            'tanggal_lahir'     => 'required|date|before:today',
            'alamat'            => 'required|string',
            'asal_sekolah'      => 'required|string|max:255',
            'telepon_ortu'      => 'required|string|max:20',
            'tahun_ajaran'      => 'required|string|max:10',
            'foto_calon_siswa'  => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'ijazah'            => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'akta_kelahiran'    => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        $data = $request->except(['foto_calon_siswa', 'ijazah', 'akta_kelahiran']);
        $data['status'] = 'pending';

        if ($request->hasFile('foto_calon_siswa')) {
            $data['foto_calon_siswa'] = FileUploadService::upload($request->file('foto_calon_siswa'), 'ppdb/foto');
        }
        if ($request->hasFile('ijazah')) {
            $data['ijazah'] = FileUploadService::upload($request->file('ijazah'), 'ppdb/dokumen');
        }
        if ($request->hasFile('akta_kelahiran')) {
            $data['akta_kelahiran'] = FileUploadService::upload($request->file('akta_kelahiran'), 'ppdb/dokumen');
        }

        $ppdb = Ppdb::create($data);

        return response()->json([
            'message' => 'Pendaftaran berhasil dikirim! Kami akan menghubungi Anda segera.',
            'nomor_daftar' => 'PPDB-' . str_pad($ppdb->id, 5, '0', STR_PAD_LEFT),
        ], 201);
    }

    // Admin: update status pendaftaran
    public function update(Request $request, int $id): JsonResponse
    {
        $ppdb = Ppdb::findOrFail($id);
        $request->validate([
            'status'         => 'required|in:pending,diterima,ditolak,wawancara',
            'catatan_admin'  => 'nullable|string',
        ]);
        $ppdb->update($request->only(['status', 'catatan_admin']));
        return response()->json(['message' => 'Status pendaftaran berhasil diperbarui.', 'data' => $ppdb]);
    }
}
