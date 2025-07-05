<?php

namespace App\Services;

use App\Models\Report;
use App\Models\ReportMedia;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReportService
{

    public function __construct()
    {
        //
    }

   public function createReport(array $data): Report
    {
        try {
            DB::beginTransaction();

            $report = Report::create([
                'reporter_id' => Auth::id(),
                'city_id' => $data['city_id'],
                'district_id' => $data['district_id'],
                'title' => $data['title'],
                'description' => $data['description'],
                'category' => $data['category'] ?? null,
                'latitude' => $data['latitude'] ?? null,
                'longitude' => $data['longitude'] ?? null,
                'address' => $data['address'] ?? null,
                'status' => 'pending',
                'upvotes_count' => 0,
                'dislikes_count' => 0,
            ]);


            if (isset($data['media']) && is_array($data['media'])) {
                foreach ($data['media'] as $file) {
                    $mediaUrl = $this->uploadFile($file);
                    $mediaType = $this->getMediaType($file);

                    ReportMedia::create([
                        'report_id' => $report->id,
                        'media_url' => $mediaUrl,
                        'media_type' => $mediaType,
                    ]);
                }
            }

            // Handle media URLs (jika ada external URLs)
            if (isset($data['media_urls']) && isset($data['media_types'])) {
                $mediaUrls = $data['media_urls'];
                $mediaTypes = $data['media_types'];

                for ($i = 0; $i < count($mediaUrls); $i++) {
                    if (isset($mediaUrls[$i]) && isset($mediaTypes[$i])) {
                        ReportMedia::create([
                            'report_id' => $report->id,
                            'media_url' => $mediaUrls[$i],
                            'media_type' => $mediaTypes[$i],
                        ]);
                    }
                }
            }

            DB::commit();

            // Load relationships untuk response
            $report->load(['reporter', 'city', 'district', 'media']);

            return $report;
        } catch (Exception $e) {
            DB::rollback();
            throw new Exception('Gagal membuat laporan: ' . $e->getMessage());
        }
    }


    private function uploadFile($file): string
    {
        $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $filePath = $file->storeAs('reports', $fileName, 'public');

        return $filePath;
    }

    private function getMediaType($file): string
    {
        $extension = strtolower($file->getClientOriginalExtension());
        $imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        $videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'wmv'];

        if (in_array($extension, $imageExtensions)) {
            return 'image';
        } elseif (in_array($extension, $videoExtensions)) {
            return 'video';
        }

        return 'image';
    }

    public function getReportById(int $id): ?Report
    {
        return Report::with(['reporter', 'city', 'district', 'verifiedByUser', 'completedByUser', 'media'])
            ->find($id);
    }

    public function getReports(array $filters = [], int $perPage = 15)
    {
        $query = Report::with(['reporter', 'city', 'district', 'media']);

        // Filter by status
        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        // Filter by city
        if (isset($filters['city_id'])) {
            $query->where('city_id', $filters['city_id']);
        }

        // Filter by district
        if (isset($filters['district_id'])) {
            $query->where('district_id', $filters['district_id']);
        }

        // Filter by category
        if (isset($filters['category'])) {
            $query->where('category', $filters['category']);
        }

        // Filter by reporter (untuk melihat laporan sendiri)
        if (isset($filters['reporter_id'])) {
            $query->where('reporter_id', $filters['reporter_id']);
        }

        // Search by title or description
        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('title', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('description', 'like', '%' . $filters['search'] . '%');
            });
        }

        // Order by created_at desc by default
        $query->orderBy('created_at', 'desc');

        return $query->paginate($perPage);
    }



    public function updateStatus(int $id, string $status, ?int $userId = null, ?string $completionDetails = null): bool
    {
        try {
            DB::beginTransaction();

            $report = Report::findOrFail($id);
            $updateData = ['status' => $status];

            if ($status === 'verified') {
                $updateData['verified_by_user_id'] = $userId;
                $updateData['verified_at'] = now();
            } elseif ($status === 'completed') {
                $updateData['completed_by_user_id'] = $userId;
                $updateData['completion_details'] = $completionDetails;
            }

            $report->update($updateData);

            DB::commit();
            return true;
        } catch (Exception $e) {
            DB::rollback();
            throw new Exception('Gagal mengupdate status laporan: ' . $e->getMessage());
        }
    }

    public function updateReport(int $id, array $data): ?Report
{
    try {
        DB::beginTransaction();

        // Cari report berdasarkan ID dan pastikan hanya pemilik yang bisa update
        $report = Report::where('id', $id)
            ->where('reporter_id', Auth::id())
            ->first();

        if (!$report) {
            DB::rollback();
            return null;
        }

        // Cek apakah status masih pending (hanya laporan pending yang bisa diupdate)
        if ($report->status !== 'pending') {
            DB::rollback();
            throw new Exception('Laporan yang sudah diverifikasi atau sedang diproses tidak dapat diubah');
        }

        // Update data report
        $report->update([
            'city_id' => $data['city_id'] ?? $report->city_id,
            'district_id' => $data['district_id'] ?? $report->district_id,
            'title' => $data['title'] ?? $report->title,
            'description' => $data['description'] ?? $report->description,
            'category' => $data['category'] ?? $report->category,
            'latitude' => $data['latitude'] ?? $report->latitude,
            'longitude' => $data['longitude'] ?? $report->longitude,
            'address' => $data['address'] ?? $report->address,
        ]);

        // Handle media update jika ada
        if (isset($data['media']) && is_array($data['media'])) {
            // Hapus media lama
            ReportMedia::where('report_id', $report->id)->delete();

            // Upload media baru
            foreach ($data['media'] as $file) {
                $mediaUrl = $this->uploadFile($file);
                $mediaType = $this->getMediaType($file);

                ReportMedia::create([
                    'report_id' => $report->id,
                    'media_url' => $mediaUrl,
                    'media_type' => $mediaType,
                ]);
            }
        }

        // Handle media URLs update (jika ada external URLs)
        if (isset($data['media_urls']) && isset($data['media_types'])) {
            // Hapus media lama
            ReportMedia::where('report_id', $report->id)->delete();

            $mediaUrls = $data['media_urls'];
            $mediaTypes = $data['media_types'];

            for ($i = 0; $i < count($mediaUrls); $i++) {
                if (isset($mediaUrls[$i]) && isset($mediaTypes[$i])) {
                    ReportMedia::create([
                        'report_id' => $report->id,
                        'media_url' => $mediaUrls[$i],
                        'media_type' => $mediaTypes[$i],
                    ]);
                }
            }
        }

        DB::commit();

        // Load relationships untuk response
        $report->load(['reporter', 'city', 'district', 'media']);

        return $report;

    } catch (Exception $e) {
        DB::rollback();
        throw new Exception('Gagal memperbarui laporan: ' . $e->getMessage());
    }
}

// Method tambahan untuk update media saja (opsional)
public function updateReportMedia(int $id, array $mediaData): bool
{
    try {
        DB::beginTransaction();

        $report = Report::where('id', $id)
            ->where('reporter_id', Auth::id())
            ->where('status', 'pending')
            ->first();

        if (!$report) {
            DB::rollback();
            return false;
        }

        // Hapus media lama
        $oldMedia = ReportMedia::where('report_id', $report->id)->get();
        foreach ($oldMedia as $media) {
            // Hapus file dari storage
            if (file_exists(storage_path('app/public/' . $media->media_url))) {
                unlink(storage_path('app/public/' . $media->media_url));
            }
        }
        ReportMedia::where('report_id', $report->id)->delete();

        // Upload media baru
        if (isset($mediaData['media']) && is_array($mediaData['media'])) {
            foreach ($mediaData['media'] as $file) {
                $mediaUrl = $this->uploadFile($file);
                $mediaType = $this->getMediaType($file);

                ReportMedia::create([
                    'report_id' => $report->id,
                    'media_url' => $mediaUrl,
                    'media_type' => $mediaType,
                ]);
            }
        }

        DB::commit();
        return true;

    } catch (Exception $e) {
        DB::rollback();
        throw new Exception('Gagal memperbarui media laporan: ' . $e->getMessage());
    }
}
}
