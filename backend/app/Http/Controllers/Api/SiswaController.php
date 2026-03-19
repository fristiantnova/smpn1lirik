<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Siswa;
use App\Services\FileUploadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SiswaController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Siswa::with('kelas:id,nama_kelas,tingkat')
                      ->aktif()
                      ->orderBy('nama');

        if ($request->kelas_id)  $query->where('kelas_id', $request->kelas_id);
        if ($request->angkatan)  $query->where('angkatan', $request->angkatan);
        if ($request->search) {
            $query->where(fn ($q) =>
                $q->where('nama', 'like', '%' . $request->search . '%')
                  ->orWhere('nisn', 'like', '%' . $request->search . '%')
            );
        }

        return response()->json($query->paginate($request->per_page ?? 20));
    }

    public function show(int $id): JsonResponse
    {
        return response()->json(Siswa::with('kelas')->findOrFail($id));
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'nama'     => 'required|string|max:255',
            'nisn'     => 'nullable|string|max:20|unique:siswa,nisn',
            'kelas_id' => 'nullable|exists:kelas,id',
            'angkatan' => 'required|string|max:10',
            'foto'     => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $data = $request->except('foto');
        if ($request->hasFile('foto')) {
            $data['foto'] = FileUploadService::upload($request->file('foto'), 'siswa');
        }

        $siswa = Siswa::create($data);
        return response()->json(['message' => 'Data siswa berhasil ditambahkan.', 'data' => $siswa], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $siswa = Siswa::findOrFail($id);
        $request->validate([
            'nama'     => 'sometimes|required|string|max:255',
            'nisn'     => 'nullable|string|max:20|unique:siswa,nisn,' . $id,
            'kelas_id' => 'nullable|exists:kelas,id',
            'foto'     => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $data = $request->except('foto');
        if ($request->hasFile('foto')) {
            $data['foto'] = FileUploadService::upload($request->file('foto'), 'siswa', $siswa->foto);
        }

        $siswa->update($data);
        return response()->json(['message' => 'Data siswa berhasil diperbarui.', 'data' => $siswa]);
    }

    public function destroy(int $id): JsonResponse
    {
        $siswa = Siswa::findOrFail($id);
        FileUploadService::delete($siswa->foto);
        $siswa->delete();
        return response()->json(['message' => 'Data siswa berhasil dihapus.']);
    }
}
