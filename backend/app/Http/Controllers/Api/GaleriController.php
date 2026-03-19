<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Galeri;
use App\Services\FileUploadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GaleriController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Galeri::where('is_active', true)->orderBy('urutan')->latest('tanggal');

        if ($request->tipe)     $query->where('tipe', $request->tipe);
        if ($request->kategori) $query->where('kategori', $request->kategori);

        $galeri = $query->paginate($request->per_page ?? 12);
        $galeri->getCollection()->transform(fn ($g) => $this->appendUrls($g));
        return response()->json($galeri);
    }

    public function show(int $id): JsonResponse
    {
        $g = Galeri::where('is_active', true)->findOrFail($id);
        return response()->json($this->appendUrls($g));
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'judul'    => 'required|string|max:255',
            'tipe'     => 'required|in:foto,video',
            'file'     => 'nullable|image|mimes:jpg,jpeg,png,webp|max:8192',
            'kategori' => 'nullable|string|max:50',
        ]);
        $data = $request->except('file');
        if ($request->hasFile('file')) {
            $data['file'] = FileUploadService::upload($request->file('file'), 'galeri');
        }
        $galeri = Galeri::create($data);
        return response()->json(['message' => 'Item galeri berhasil ditambahkan.', 'data' => $galeri], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $galeri = Galeri::findOrFail($id);
        $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'file'  => 'nullable|image|mimes:jpg,jpeg,png,webp|max:8192',
        ]);
        $data = $request->except('file');
        if ($request->hasFile('file')) {
            $data['file'] = FileUploadService::upload($request->file('file'), 'galeri', $galeri->file);
        }
        $galeri->update($data);
        return response()->json(['message' => 'Galeri berhasil diperbarui.', 'data' => $galeri]);
    }

    public function destroy(int $id): JsonResponse
    {
        $galeri = Galeri::findOrFail($id);
        FileUploadService::delete($galeri->file);
        FileUploadService::delete($galeri->thumbnail);
        $galeri->delete();
        return response()->json(['message' => 'Item galeri berhasil dihapus.']);
    }

    private function appendUrls(Galeri $g): Galeri
    {
        $g->file_url      = FileUploadService::url($g->file);
        $g->thumbnail_url = FileUploadService::url($g->thumbnail);
        return $g;
    }
}
