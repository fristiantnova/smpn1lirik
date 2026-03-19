<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Prestasi;
use App\Services\FileUploadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PrestasiController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Prestasi::where('is_active', true)
                         ->orderByDesc('tahun')
                         ->orderBy('nama_prestasi');

        if ($request->tingkat)  $query->where('tingkat', $request->tingkat);
        if ($request->kategori) $query->where('kategori', $request->kategori);
        if ($request->tahun)    $query->where('tahun', $request->tahun);

        $prestasi = $query->paginate($request->per_page ?? 12);
        $prestasi->getCollection()->transform(fn ($p) => $this->appendUrls($p));
        return response()->json($prestasi);
    }

    public function show(int $id): JsonResponse
    {
        $p = Prestasi::where('is_active', true)->findOrFail($id);
        return response()->json($this->appendUrls($p));
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'nama_prestasi' => 'required|string|max:255',
            'tingkat'       => 'required|in:sekolah,kecamatan,kabupaten,provinsi,nasional,internasional',
            'tahun'         => 'required|integer|min:2000',
            'foto'          => 'nullable|image|mimes:jpg,jpeg,png,webp|max:3072',
        ]);
        $data = $request->except('foto');
        if ($request->hasFile('foto')) {
            $data['foto'] = FileUploadService::upload($request->file('foto'), 'prestasi');
        }
        $prestasi = Prestasi::create($data);
        return response()->json(['message' => 'Prestasi berhasil ditambahkan.', 'data' => $prestasi], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $prestasi = Prestasi::findOrFail($id);
        $request->validate([
            'nama_prestasi' => 'sometimes|required|string|max:255',
            'tingkat'       => 'sometimes|required|in:sekolah,kecamatan,kabupaten,provinsi,nasional,internasional',
            'foto'          => 'nullable|image|mimes:jpg,jpeg,png,webp|max:3072',
        ]);
        $data = $request->except('foto');
        if ($request->hasFile('foto')) {
            $data['foto'] = FileUploadService::upload($request->file('foto'), 'prestasi', $prestasi->foto);
        }
        $prestasi->update($data);
        return response()->json(['message' => 'Prestasi berhasil diperbarui.', 'data' => $prestasi]);
    }

    public function destroy(int $id): JsonResponse
    {
        $prestasi = Prestasi::findOrFail($id);
        FileUploadService::delete($prestasi->foto);
        $prestasi->delete();
        return response()->json(['message' => 'Prestasi berhasil dihapus.']);
    }

    private function appendUrls(Prestasi $p): Prestasi
    {
        $p->foto_url = FileUploadService::url($p->foto);
        return $p;
    }
}
