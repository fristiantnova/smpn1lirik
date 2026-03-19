<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pengumuman;
use App\Services\FileUploadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PengumumanController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $pengumuman = Pengumuman::with('penulis:id,name')
            ->aktif()
            ->latest()
            ->paginate($request->per_page ?? 10);

        $pengumuman->getCollection()->transform(fn ($p) => $this->appendUrls($p));

        return response()->json($pengumuman);
    }

    public function show(int $id): JsonResponse
    {
        $p = Pengumuman::with('penulis:id,name')->aktif()->findOrFail($id);
        return response()->json($this->appendUrls($p));
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'judul'              => 'required|string|max:255',
            'konten'             => 'required|string',
            'file_lampiran'      => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx|max:10240',
            'tanggal_kadaluarsa' => 'nullable|date',
        ]);

        $data = $request->except('file_lampiran');
        $data['user_id'] = auth()->id();
        $data['status']  = 'aktif';

        if ($request->hasFile('file_lampiran')) {
            $file = $request->file('file_lampiran');
            $data['file_lampiran']   = FileUploadService::upload($file, 'pengumuman');
            $data['nama_file_asli']  = $file->getClientOriginalName();
        }

        $pengumuman = Pengumuman::create($data);
        return response()->json(['message' => 'Pengumuman berhasil dibuat.', 'data' => $pengumuman], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $pengumuman = Pengumuman::findOrFail($id);
        $request->validate([
            'judul'         => 'sometimes|required|string|max:255',
            'konten'        => 'sometimes|required|string',
            'file_lampiran' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx|max:10240',
        ]);

        $data = $request->except('file_lampiran');
        if ($request->hasFile('file_lampiran')) {
            $file = $request->file('file_lampiran');
            $data['file_lampiran']  = FileUploadService::upload($file, 'pengumuman', $pengumuman->file_lampiran);
            $data['nama_file_asli'] = $file->getClientOriginalName();
        }

        $pengumuman->update($data);
        return response()->json(['message' => 'Pengumuman berhasil diperbarui.', 'data' => $pengumuman]);
    }

    public function destroy(int $id): JsonResponse
    {
        $pengumuman = Pengumuman::findOrFail($id);
        FileUploadService::delete($pengumuman->file_lampiran);
        $pengumuman->delete();
        return response()->json(['message' => 'Pengumuman berhasil dihapus.']);
    }

    private function appendUrls(Pengumuman $p): Pengumuman
    {
        $p->file_url = FileUploadService::url($p->file_lampiran);
        return $p;
    }
}
