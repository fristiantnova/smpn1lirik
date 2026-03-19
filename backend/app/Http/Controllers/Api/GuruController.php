<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Guru;
use App\Services\FileUploadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GuruController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Guru::where('is_active', true)->orderBy('nama');

        if ($request->search) {
            $query->where('nama', 'like', '%' . $request->search . '%')
                  ->orWhere('jabatan', 'like', '%' . $request->search . '%')
                  ->orWhere('mata_pelajaran', 'like', '%' . $request->search . '%');
        }

        $guru = $query->paginate($request->per_page ?? 20);
        $guru->getCollection()->transform(fn ($g) => $this->appendUrls($g));
        return response()->json($guru);
    }

    public function show(int $id): JsonResponse
    {
        $guru = Guru::where('is_active', true)->findOrFail($id);
        return response()->json($this->appendUrls($guru));
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'nama'  => 'required|string|max:255',
            'nip'   => 'nullable|string|max:30|unique:guru,nip',
            'foto'  => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $data = $request->except('foto');
        if ($request->hasFile('foto')) {
            $data['foto'] = FileUploadService::upload($request->file('foto'), 'guru');
        }

        $guru = Guru::create($data);
        return response()->json(['message' => 'Data guru berhasil ditambahkan.', 'data' => $guru], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $guru = Guru::findOrFail($id);
        $request->validate([
            'nama'  => 'sometimes|required|string|max:255',
            'nip'   => 'nullable|string|max:30|unique:guru,nip,' . $id,
            'foto'  => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $data = $request->except('foto');
        if ($request->hasFile('foto')) {
            $data['foto'] = FileUploadService::upload($request->file('foto'), 'guru', $guru->foto);
        }

        $guru->update($data);
        return response()->json(['message' => 'Data guru berhasil diperbarui.', 'data' => $guru]);
    }

    public function destroy(int $id): JsonResponse
    {
        $guru = Guru::findOrFail($id);
        FileUploadService::delete($guru->foto);
        $guru->delete();
        return response()->json(['message' => 'Data guru berhasil dihapus.']);
    }

    private function appendUrls(Guru $g): Guru
    {
        $g->foto_url = FileUploadService::url($g->foto);
        return $g;
    }
}
