<?php

namespace App\Services;
use App\Models\Content;
use App\Models\ContentMedia;
use App\Services\Service;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

use function Illuminate\Log\log;

class ContentService extends Service
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }


public function createContent(array $data, int $authorId): Content
{
    try {
        DB::beginTransaction();

        $content = Content::create([
            'author_user_id' => $authorId,
            'title' => $data['title'],
            'body' => $data['body'],
            'content_type' => $data['content_type'] ?? null,
        ]);



        // Handle uploaded files
        if (isset($data['media']) && is_array($data['media']) && !empty($data['media'])) {
            foreach ($data['media'] as $file) {
                if ($file && $file->isValid()) {
                    try {
                        $mediaUrl = $this->uploadFile($file);
                        $mediaType = $this->getMediaType($file);

                        // Debug: Log data yang akan diinsert
                        Log::info('Creating media with data:', [
                            'content_id' => $content->id,
                            'media_url' => $mediaUrl,
                            'media_type' => $mediaType,
                        ]);

                        ContentMedia::create([
                            'content_id' => $content->id,
                            'media_url' => $mediaUrl,
                            'media_type' => $mediaType,
                        ]);
                    } catch (\Exception $e) {
                        Log::error('Error uploading file: ' . $e->getMessage());
                        throw new Exception('Gagal mengupload file: ' . $e->getMessage());
                    }
                }
            }
        }

        // Handle media URLs (jika ada)
        if (isset($data['media_urls']) && isset($data['media_types']) &&
            is_array($data['media_urls']) && is_array($data['media_types'])) {

            $mediaUrls = $data['media_urls'];
            $mediaTypes = $data['media_types'];

            for ($i = 0; $i < count($mediaUrls); $i++) {
                if (isset($mediaUrls[$i]) && isset($mediaTypes[$i]) &&
                    !empty($mediaUrls[$i]) && !empty($mediaTypes[$i])) {

                    ContentMedia::create([
                        'content_id' => $content->id,
                        'media_url' => $mediaUrls[$i],
                        'media_type' => $mediaTypes[$i],
                    ]);
                }
            }
        }

        DB::commit();

        return $content;
    } catch (Exception $e) {
        DB::rollback();

        throw new Exception('Gagal membuat konten: ' . $e->getMessage());
    }
}

private function uploadFile($file): string
{
    if (!$file || !$file->isValid()) {
        throw new Exception('File tidak valid');
    }

    $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
    $filePath = $file->storeAs('contents', $fileName, 'public');

    if (!$filePath) {
        throw new Exception('Gagal menyimpan file');
    }

    return $filePath;
}

private function getMediaType($file): string
{
    if (!$file || !$file->isValid()) {
        return 'image'; // default fallback
    }

    $extension = strtolower($file->getClientOriginalExtension());
    $imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    $videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'wmv'];

    if (in_array($extension, $imageExtensions)) {
        return 'image';
    } elseif (in_array($extension, $videoExtensions)) {
        return 'video';
    }

    return 'image'; // default fallback
}

public function updateContent(int $contentId, array $data, int $authorId): Content
{
    try {
        DB::beginTransaction();

        // Find the content
        $content = Content::findOrFail($contentId);

        // Check if user is authorized to update this content
        if ($content->author_user_id !== $authorId) {
            throw new Exception('Anda tidak memiliki izin untuk mengupdate konten ini');
        }

        // Update content data
        $content->update([
            'title' => $data['title'] ?? $content->title,
            'body' => $data['body'] ?? $content->body,
            'content_type' => $data['content_type'] ?? $content->content_type,
        ]);

        // Handle media deletion if specified
        if (isset($data['delete_media_ids']) && is_array($data['delete_media_ids'])) {
            foreach ($data['delete_media_ids'] as $mediaId) {
                $media = ContentMedia::where('content_id', $content->id)
                    ->where('id', $mediaId)
                    ->first();

                if ($media) {
                    // Delete file from storage if it exists
                    if (Storage::disk('public')->exists($media->media_url)) {
                        Storage::disk('public')->delete($media->media_url);
                    }

                    // Delete media record
                    $media->delete();
                }
            }
        }

        // Handle new uploaded files
        if (isset($data['media']) && is_array($data['media']) && !empty($data['media'])) {
            foreach ($data['media'] as $file) {
                if ($file && $file->isValid()) {
                    try {
                        $mediaUrl = $this->uploadFile($file);
                        $mediaType = $this->getMediaType($file);

                        // Debug: Log data yang akan diinsert
                        Log::info('Creating media with data:', [
                            'content_id' => $content->id,
                            'media_url' => $mediaUrl,
                            'media_type' => $mediaType,
                        ]);

                        ContentMedia::create([
                            'content_id' => $content->id,
                            'media_url' => $mediaUrl,
                            'media_type' => $mediaType,
                        ]);
                    } catch (\Exception $e) {
                        Log::error('Error uploading file: ' . $e->getMessage());
                        throw new Exception('Gagal mengupload file: ' . $e->getMessage());
                    }
                }
            }
        }

        // Handle new media URLs (jika ada)
        if (isset($data['media_urls']) && isset($data['media_types']) &&
            is_array($data['media_urls']) && is_array($data['media_types'])) {

            $mediaUrls = $data['media_urls'];
            $mediaTypes = $data['media_types'];

            for ($i = 0; $i < count($mediaUrls); $i++) {
                if (isset($mediaUrls[$i]) && isset($mediaTypes[$i]) &&
                    !empty($mediaUrls[$i]) && !empty($mediaTypes[$i])) {

                    ContentMedia::create([
                        'content_id' => $content->id,
                        'media_url' => $mediaUrls[$i],
                        'media_type' => $mediaTypes[$i],
                    ]);
                }
            }
        }

        DB::commit();

        // Refresh content to get updated data
        $content->refresh();

        return $content;
    } catch (Exception $e) {
        DB::rollback();

        throw new Exception('Gagal mengupdate konten: ' . $e->getMessage());
    }
}

// Helper function untuk menghapus semua media dari konten
public function deleteAllContentMedia(int $contentId): bool
{
    try {
        $mediaItems = ContentMedia::where('content_id', $contentId)->get();

        foreach ($mediaItems as $media) {
            // Delete file from storage if it exists
            if (Storage::disk('public')->exists($media->media_url)) {
                Storage::disk('public')->delete($media->media_url);
            }

            // Delete media record
            $media->delete();
        }

        return true;
    } catch (\Exception $e) {
        Log::error('Error deleting all content media: ' . $e->getMessage());
        return false;
    }
}

// Helper function untuk replace semua media (hapus semua lalu tambah baru)
public function replaceAllContentMedia(int $contentId, array $data): bool
{
    try {
        // Hapus semua media yang ada
        $this->deleteAllContentMedia($contentId);

        // Handle new uploaded files
        if (isset($data['media']) && is_array($data['media']) && !empty($data['media'])) {
            foreach ($data['media'] as $file) {
                if ($file && $file->isValid()) {
                    $mediaUrl = $this->uploadFile($file);
                    $mediaType = $this->getMediaType($file);

                    ContentMedia::create([
                        'content_id' => $contentId,
                        'media_url' => $mediaUrl,
                        'media_type' => $mediaType,
                    ]);
                }
            }
        }

        // Handle new media URLs
        if (isset($data['media_urls']) && isset($data['media_types']) &&
            is_array($data['media_urls']) && is_array($data['media_types'])) {

            $mediaUrls = $data['media_urls'];
            $mediaTypes = $data['media_types'];

            for ($i = 0; $i < count($mediaUrls); $i++) {
                if (isset($mediaUrls[$i]) && isset($mediaTypes[$i]) &&
                    !empty($mediaUrls[$i]) && !empty($mediaTypes[$i])) {

                    ContentMedia::create([
                        'content_id' => $contentId,
                        'media_url' => $mediaUrls[$i],
                        'media_type' => $mediaTypes[$i],
                    ]);
                }
            }
        }

        return true;
    } catch (\Exception $e) {
        Log::error('Error replacing all content media: ' . $e->getMessage());
        return false;
    }
}
}
