<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PesanKontak;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class KontakController extends Controller
{
    // Admin: lihat semua pesan
    public function index(Request $request): JsonResponse
    {
        $query = PesanKontak::latest();

        if ($request->boolean('belum_dibaca')) {
            $query->belumDibaca();
        }

        return response()->json($query->paginate($request->per_page ?? 15));
    }

    // Publik: kirim pesan baru
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'nama'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'telepon' => 'nullable|string|max:20',
            'subjek'  => 'nullable|string|max:255',
            'pesan'   => 'required|string|min:10|max:2000',
        ]);

        PesanKontak::create($request->only(['nama', 'email', 'telepon', 'subjek', 'pesan']));

        return response()->json([
            'message' => 'Pesan Anda berhasil terkirim. Kami akan segera membalasnya. Terima kasih!'
        ], 201);
    }

    // Admin: tandai sudah dibaca
    public function markRead(int $id): JsonResponse
    {
        $pesan = PesanKontak::findOrFail($id);
        $pesan->update([
            'sudah_dibaca' => true,
            'dibaca_pada'  => now(),
        ]);
        return response()->json(['message' => 'Pesan ditandai sudah dibaca.']);
    }
}
