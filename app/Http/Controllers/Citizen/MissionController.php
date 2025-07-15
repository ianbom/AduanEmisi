<?php

namespace App\Http\Controllers\Citizen;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\MissionServices;
use App\Models\City;
use App\Models\District;
use Inertia\Inertia;
use App\Models\Province;
use App\Models\Mission;
use App\Models\MissionVolunteer;
use Illuminate\Support\Facades\Auth;

class MissionController extends Controller
{
    protected $missionService;

    public function __construct(MissionServices $missionService)
    {
        $this->missionService = $missionService;
    }
    public function index(Request $request)
    {
        try {
            $filters = $request->only(['content_type', 'search']);
            $perPage = $request->get('per_page', 15);
            $missions = $this->missionService->getMissions($filters, $perPage);
            return Inertia::render('Citizen/Mission/MissionPage', [
                'missions' => $missions
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil misi: ' . $e->getMessage()
            ], 500);
        }
    }
    // app/Http/Controllers/MissionVolunteerController.php

    public function join(Request $request, $missionId)
    {
        $request->validate([
            'is_leader' => 'required|boolean',
        ]);

        $mission = Mission::findOrFail($missionId);

        $already = MissionVolunteer::where('mission_id', $missionId)
            ->where('user_id', Auth::id())
            ->exists();

        if ($already) {
            return back()->with('error', 'Anda sudah mendaftar untuk misi ini.');
        }

        MissionVolunteer::create([
            'mission_id' => $missionId,
            'user_id' => Auth::id(),
            'is_leader' => $request->is_leader,
            'participation_status' => 'pending',
        ]);

        return back()->with('success', 'Pendaftaran berhasil. Tunggu verifikasi admin.');
    }
}
