<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ekstrakulikuler;
use App\Services\FileUploadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EkstrakulikulerController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $ekskul = Ekstrakulikuler::where('is_active', true)
                    ->orderBy('urutan')
                    ->orderBy('nama')
                    ->get();

        $ekskul->transform(fn ($e) => $this->appendUrls($e));
        return response()->json($ekskul);
    }

    public function show(int $id): JsonResponse
    {
        $ekskul = Ekstrakulikuler::where('is_active', true)->findOrFail($id);
        return response()->json($this->appendUrls($ekskul));
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'nama'  => 'required|string|max:255',
            'foto'  => 'nullable|image|mimes:jpg,jpeg,png,webp|max:3072',
        ]);

        $data = $request->except('foto');
        if ($request->hasFile('foto')) {
            $data['foto'] = FileUploadService::upload($request->file('foto'), 'ekskul');
        }

        $ekskul = Ekstrakulikuler::create($data);
        return response()->json(['message' => 'Ekstrakulikuler berhasil ditambahkan.', 'data' => $ekskul], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $ekskul = Ekstrakulikuler::findOrFail($id);
        $request->validate([
            'nama'  => 'sometimes|required|string|max:255',
            'foto'  => 'nullable|image|mimes:jpg,jpeg,png,webp|max:3072',
        ]);

        $data = $request->except('foto');
        if ($request->hasFile('foto')) {
            $data['foto'] = FileUploadService::upload($request->file('foto'), 'ekskul', $ekskul->foto);
        }

        $ekskul->update($data);
        return response()->json(['message' => 'Ekstrakulikuler berhasil diperbarui.', 'data' => $ekskul]);
    }

    public function destroy(int $id): JsonResponse
    {
        $ekskul = Ekstrakulikuler::findOrFail($id);
        FileUploadService::delete($ekskul->foto);
        $ekskul->delete();
        return response()->json(['message' => 'Ekstrakulikuler berhasil dihapus.']);
    }

    private function appendUrls(Ekstrakulikuler $e): Ekstrakulikuler
    {
        $e->foto_url = FileUploadService::url($e->foto);
        return $e;
    }
}
