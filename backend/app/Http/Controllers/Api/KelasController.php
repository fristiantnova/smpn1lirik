<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class KelasController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Kelas::with('waliKelas:id,nama,foto')
                      ->where('is_active', true)
                      ->orderBy('tingkat')
                      ->orderBy('nama_kelas');

        if ($request->tahun_ajaran) $query->where('tahun_ajaran', $request->tahun_ajaran);
        if ($request->tingkat)      $query->where('tingkat', $request->tingkat);

        return response()->json($query->get());
    }

    public function show(int $id): JsonResponse
    {
        return response()->json(
            Kelas::with(['waliKelas:id,nama,foto', 'siswa:id,nama,nisn,kelas_id,jenis_kelamin'])
                 ->findOrFail($id)
        );
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'nama_kelas'    => 'required|string|max:20',
            'tingkat'       => 'required|in:VII,VIII,IX',
            'tahun_ajaran'  => 'required|string|max:10',
            'wali_kelas_id' => 'nullable|exists:guru,id',
            'kapasitas'     => 'nullable|integer|min:1',
        ]);

        $kelas = Kelas::create($request->all());
        return response()->json(['message' => 'Kelas berhasil ditambahkan.', 'data' => $kelas], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $kelas = Kelas::findOrFail($id);
        $request->validate([
            'nama_kelas'    => 'sometimes|required|string|max:20',
            'tingkat'       => 'sometimes|required|in:VII,VIII,IX',
            'wali_kelas_id' => 'nullable|exists:guru,id',
        ]);
        $kelas->update($request->all());
        return response()->json(['message' => 'Kelas berhasil diperbarui.', 'data' => $kelas]);
    }

    public function destroy(int $id): JsonResponse
    {
        $kelas = Kelas::findOrFail($id);
        $kelas->update(['is_active' => false]);
        return response()->json(['message' => 'Kelas berhasil dinonaktifkan.']);
    }
}
