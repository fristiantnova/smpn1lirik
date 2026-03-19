<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadService
{
    /**
     * Upload gambar/file, hapus file lama jika ada.
     *
     * @param  UploadedFile  $file
     * @param  string        $folder   Subfolder di storage/app/public/
     * @param  string|null   $oldFile  Path file lama yang akan dihapus
     * @return string        Path file baru relatif
     */
    public static function upload(UploadedFile $file, string $folder, ?string $oldFile = null): string
    {
        // Hapus file lama
        if ($oldFile && Storage::disk('public')->exists($oldFile)) {
            Storage::disk('public')->delete($oldFile);
        }

        // Generate nama unik
        $ext      = $file->getClientOriginalExtension();
        $filename = Str::uuid() . '.' . $ext;

        // Simpan ke storage/app/public/{folder}
        $path = $file->storeAs($folder, $filename, 'public');

        return $path;
    }

    /**
     * Hapus file dari storage.
     */
    public static function delete(?string $path): void
    {
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }

    /**
     * Ambil URL publik dari path.
     */
    public static function url(?string $path): ?string
    {
        if (!$path) return null;
        return Storage::disk('public')->url($path);
    }
}
