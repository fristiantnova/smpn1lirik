<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Fasilitas;
use App\Services\FileUploadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FasilitasController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Fasilitas::where('is_active', true)->orderBy('urutan')->orderBy('nama');

        if ($request->kategori) $query->where('kategori', $request->kategori);

        $fasilitas = $query->get();
        $fasilitas->transform(fn ($f) => $this->appendUrls($f));
        return response()->json($fasilitas);
    }

    public function show(int $id): JsonResponse
    {
        $f = Fasilitas::where('is_active', true)->findOrFail($id);
        return response()->json($this->appendUrls($f));
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'nama'     => 'required|string|max:255',
            'kategori' => 'nullable|string|max:50',
            'foto'     => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);
        $data = $request->except('foto');
        if ($request->hasFile('foto')) {
            $data['foto'] = FileUploadService::upload($request->file('foto'), 'fasilitas');
        }
        $fasilitas = Fasilitas::create($data);
        return response()->json(['message' => 'Fasilitas berhasil ditambahkan.', 'data' => $fasilitas], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $fasilitas = Fasilitas::findOrFail($id);
        $request->validate([
            'nama' => 'sometimes|required|string|max:255',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);
        $data = $request->except('foto');
        if ($request->hasFile('foto')) {
            $data['foto'] = FileUploadService::upload($request->file('foto'), 'fasilitas', $fasilitas->foto);
        }
        $fasilitas->update($data);
        return response()->json(['message' => 'Fasilitas berhasil diperbarui.', 'data' => $fasilitas]);
    }

    public function destroy(int $id): JsonResponse
    {
        $fasilitas = Fasilitas::findOrFail($id);
        FileUploadService::delete($fasilitas->foto);
        $fasilitas->delete();
        return response()->json(['message' => 'Fasilitas berhasil dihapus.']);
    }

    private function appendUrls(Fasilitas $f): Fasilitas
    {
        $f->foto_url = FileUploadService::url($f->foto);
        return $f;
    }
}
