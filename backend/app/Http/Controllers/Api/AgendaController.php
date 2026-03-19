<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Agenda;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AgendaController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Agenda::where('is_active', true);

        if ($request->kategori) {
            $query->where('kategori', $request->kategori);
        }

        // Default: tampilkan agenda mendatang
        if (!$request->boolean('semua')) {
            $query->mendatang();
        } else {
            $query->orderByDesc('tanggal_mulai');
        }

        return response()->json($query->paginate($request->per_page ?? 10));
    }

    public function show(int $id): JsonResponse
    {
        return response()->json(Agenda::findOrFail($id));
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'judul'          => 'required|string|max:255',
            'tanggal_mulai'  => 'required|date',
            'tanggal_selesai'=> 'nullable|date|after_or_equal:tanggal_mulai',
            'kategori'       => 'nullable|in:akademik,olahraga,seni,keagamaan,umum',
        ]);
        $agenda = Agenda::create($request->all());
        return response()->json(['message' => 'Agenda berhasil ditambahkan.', 'data' => $agenda], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $agenda = Agenda::findOrFail($id);
        $request->validate([
            'judul'           => 'sometimes|required|string|max:255',
            'tanggal_mulai'   => 'sometimes|required|date',
            'tanggal_selesai' => 'nullable|date|after_or_equal:tanggal_mulai',
        ]);
        $agenda->update($request->all());
        return response()->json(['message' => 'Agenda berhasil diperbarui.', 'data' => $agenda]);
    }

    public function destroy(int $id): JsonResponse
    {
        Agenda::findOrFail($id)->delete();
        return response()->json(['message' => 'Agenda berhasil dihapus.']);
    }
}
