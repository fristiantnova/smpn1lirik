<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use App\Services\FileUploadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BeritaController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Berita::with('penulis:id,name')
                       ->published()
                       ->latest('tanggal_publikasi');

        if ($request->kategori) {
            $query->where('kategori', $request->kategori);
        }
        if ($request->search) {
            $query->where('judul', 'like', '%' . $request->search . '%');
        }

        $berita = $query->paginate($request->per_page ?? 10);

        // Tambahkan URL gambar
        $berita->getCollection()->transform(fn ($b) => $this->appendUrls($b));

        return response()->json($berita);
    }

    public function show(int $id): JsonResponse
    {
        $berita = Berita::with('penulis:id,name')->published()->findOrFail($id);
        $berita->increment('views');
        return response()->json($this->appendUrls($berita));
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'judul'    => 'required|string|max:255',
            'konten'   => 'required|string',
            'kategori' => 'nullable|string|max:50',
            'status'   => 'in:draft,published',
            'gambar'   => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        $data = $request->except('gambar');
        $data['user_id'] = auth()->id();
        $data['slug']    = Str::slug($request->judul) . '-' . Str::random(5);

        if ($request->status === 'published' && !$request->tanggal_publikasi) {
            $data['tanggal_publikasi'] = now();
        }
        if ($request->hasFile('gambar')) {
            $data['gambar'] = FileUploadService::upload($request->file('gambar'), 'berita');
        }

        $berita = Berita::create($data);
        return response()->json(['message' => 'Berita berhasil dibuat.', 'data' => $berita], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $berita = Berita::findOrFail($id);
        $request->validate([
            'judul'  => 'sometimes|required|string|max:255',
            'konten' => 'sometimes|required|string',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        $data = $request->except('gambar');
        if ($request->hasFile('gambar')) {
            $data['gambar'] = FileUploadService::upload($request->file('gambar'), 'berita', $berita->gambar);
        }
        if (isset($data['status']) && $data['status'] === 'published' && !$berita->tanggal_publikasi) {
            $data['tanggal_publikasi'] = now();
        }

        $berita->update($data);
        return response()->json(['message' => 'Berita berhasil diperbarui.', 'data' => $berita]);
    }

    public function destroy(int $id): JsonResponse
    {
        $berita = Berita::findOrFail($id);
        FileUploadService::delete($berita->gambar);
        $berita->delete();
        return response()->json(['message' => 'Berita berhasil dihapus.']);
    }

    private function appendUrls(Berita $b): Berita
    {
        $b->gambar_url = FileUploadService::url($b->gambar);
        return $b;
    }
}
