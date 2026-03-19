<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - SMPN 2 Lirik
|--------------------------------------------------------------------------
*/

// Health check
Route::get('/ping', fn () => response()->json(['status' => 'ok', 'app' => config('app.name')]));

// Auth routes
Route::prefix('auth')->group(function () {
    Route::post('/login', [\App\Http\Controllers\Api\AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [\App\Http\Controllers\Api\AuthController::class, 'logout']);
        Route::get('/me', [\App\Http\Controllers\Api\AuthController::class, 'me']);
    });
});

// Public routes (no auth needed)
Route::prefix('v1')->group(function () {
    Route::get('/profil-sekolah', [\App\Http\Controllers\Api\ProfilSekolahController::class, 'show']);
    Route::apiResource('/berita', \App\Http\Controllers\Api\BeritaController::class)->only(['index', 'show']);
    Route::apiResource('/pengumuman', \App\Http\Controllers\Api\PengumumanController::class)->only(['index', 'show']);
    Route::apiResource('/guru', \App\Http\Controllers\Api\GuruController::class)->only(['index', 'show']);
    Route::apiResource('/siswa', \App\Http\Controllers\Api\SiswaController::class)->only(['index', 'show']);
    Route::apiResource('/kelas', \App\Http\Controllers\Api\KelasController::class)->only(['index', 'show']);
    Route::apiResource('/ekstrakulikuler', \App\Http\Controllers\Api\EkstrakulikulerController::class)->only(['index', 'show']);
    Route::apiResource('/fasilitas', \App\Http\Controllers\Api\FasilitasController::class)->only(['index', 'show']);
    Route::apiResource('/galeri', \App\Http\Controllers\Api\GaleriController::class)->only(['index', 'show']);
    Route::apiResource('/prestasi', \App\Http\Controllers\Api\PrestasiController::class)->only(['index', 'show']);
    Route::apiResource('/agenda', \App\Http\Controllers\Api\AgendaController::class)->only(['index', 'show']);
    Route::post('/ppdb', [\App\Http\Controllers\Api\PpdbController::class, 'store']);
    Route::post('/kontak', [\App\Http\Controllers\Api\KontakController::class, 'store']);
});

// Admin routes (auth required)
Route::prefix('v1/admin')->middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::put('/profil-sekolah', [\App\Http\Controllers\Api\ProfilSekolahController::class, 'update']);

    Route::apiResource('/berita', \App\Http\Controllers\Api\BeritaController::class)->except(['index', 'show']);
    Route::apiResource('/pengumuman', \App\Http\Controllers\Api\PengumumanController::class)->except(['index', 'show']);
    Route::apiResource('/guru', \App\Http\Controllers\Api\GuruController::class)->except(['index', 'show']);
    Route::apiResource('/siswa', \App\Http\Controllers\Api\SiswaController::class)->except(['index', 'show']);
    Route::apiResource('/kelas', \App\Http\Controllers\Api\KelasController::class)->except(['index', 'show']);
    Route::apiResource('/ekstrakulikuler', \App\Http\Controllers\Api\EkstrakulikulerController::class)->except(['index', 'show']);
    Route::apiResource('/fasilitas', \App\Http\Controllers\Api\FasilitasController::class)->except(['index', 'show']);
    Route::apiResource('/galeri', \App\Http\Controllers\Api\GaleriController::class)->except(['index', 'show']);
    Route::apiResource('/prestasi', \App\Http\Controllers\Api\PrestasiController::class)->except(['index', 'show']);
    Route::apiResource('/agenda', \App\Http\Controllers\Api\AgendaController::class)->except(['index', 'show']);
    Route::get('/ppdb', [\App\Http\Controllers\Api\PpdbController::class, 'index']);
    Route::get('/kontak', [\App\Http\Controllers\Api\KontakController::class, 'index']);
    Route::patch('/kontak/{id}/read', [\App\Http\Controllers\Api\KontakController::class, 'markRead']);
});
