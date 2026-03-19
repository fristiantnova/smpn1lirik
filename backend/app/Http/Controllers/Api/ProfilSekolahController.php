<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProfilSekolah;
use App\Services\FileUploadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfilSekolahController extends Controller
{
    public function show(): JsonResponse
    {
        $profil = ProfilSekolah::first();
        if ($profil && $profil->logo) {
            $profil->logo_url        = FileUploadService::url($profil->logo);
            $profil->foto_sekolah_url = FileUploadService::url($profil->foto_sekolah);
        }
        return response()->json($profil);
    }

    public function update(Request $request): JsonResponse
    {
        $request->validate([
            'nama_sekolah' => 'required|string|max:255',
            'email'        => 'nullable|email',
            'logo'         => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'foto_sekolah' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        $profil = ProfilSekolah::firstOrNew([]);
        $data   = $request->except(['logo', 'foto_sekolah']);

        if ($request->hasFile('logo')) {
            $data['logo'] = FileUploadService::upload($request->file('logo'), 'profil', $profil->logo);
        }
        if ($request->hasFile('foto_sekolah')) {
            $data['foto_sekolah'] = FileUploadService::upload($request->file('foto_sekolah'), 'profil', $profil->foto_sekolah);
        }

        $profil->fill($data)->save();

        return response()->json(['message' => 'Profil sekolah berhasil diperbarui.', 'data' => $profil]);
    }
}
