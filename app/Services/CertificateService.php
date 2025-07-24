<?php

namespace App\Services;

use App\Models\Mission;
use App\Models\MissionVolunteer;
use App\Models\UserCertificate;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Barryvdh\DomPDF\Facade\Pdf;

class CertificateService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {

    }

    public function generateForMissionVolunteers(int $missionId, string $certificateTitle, string $certificateDate): int
    {
        $mission = Mission::findOrFail($missionId);
        $volunteers = MissionVolunteer::where('mission_id', $mission->id)
            ->where('participation_status', 'attended')
            ->with('user')
            ->get();

        if ($volunteers->isEmpty()) {
            throw new Exception('Tidak ada volunteer yang hadir pada misi ini.');
        }


        DB::beginTransaction();

        try {
            foreach ($volunteers as $volunteer) {

                $pdf = Pdf::loadView('admin.certificate.template.template_2', [
                    'volunteerName'    => $volunteer->user->name,
                    'missionTitle'     => $mission->title,
                    'certificateTitle' => $certificateTitle,
                    'certificateDate'  => $certificateDate,
                ]);
                $pdf->setPaper('a4', 'landscape');


                $pdfFileName = 'sertifikat-' . Str::slug($mission->title) . '-' . Str::slug($volunteer->user->name) . '-' . time() . '.pdf';
                $filePath = 'certificates/' . $pdfFileName;


                Storage::disk('public')->put($filePath, $pdf->output());

                UserCertificate::create([
                    'user_id'         => $volunteer->user_id,
                    'title'           => $certificateTitle,
                    'date'            => $certificateDate,
                    'certificate_url' => $filePath,
                    'mission_id' => $missionId
                ]);

                $volunteer->update(['certificate_url' => $filePath, 'awarded_at' => now()]);
            }


            DB::commit();

            return $volunteers->count();

        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception('Gagal membuat sertifikat: ' . $e->getMessage());
        }
    }
}

