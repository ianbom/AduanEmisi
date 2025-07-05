<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateMissionRequest;
use App\Services\MissionServices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MissionController extends Controller
{
    protected $missionService;

    public function __construct(MissionServices $missionService)
    {
        $this->missionService = $missionService;
    }

     public function store(CreateMissionRequest $request)
    {
        $data = $request->validated();
        DB::beginTransaction();
        try {
            $mission = $this->missionService->createMission($data);

            // Load relationships for response
            $mission->load([
                'creator:id,name,email',
                'city:id,name',
                'district:id,name',
                'assignedVolunteer:id,name,email',
                'report:id,title'
            ]);
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Misi berhasil dibuat',
                'data' => [
                    'mission' => [
                        'id' => $mission->id,
                        'report_id' => $mission->report_id,
                        'creator' => $mission->creator,
                        'city' => $mission->city,
                        'district' => $mission->district,
                        'title' => $mission->title,
                        'description' => $mission->description,
                        'latitude' => $mission->latitude,
                        'longitude' => $mission->longitude,
                        'address' => $mission->address,
                        'status' => $mission->status,
                        'scheduled_date' => $mission->scheduled_date?->format('Y-m-d H:i:s'),
                        'completed_at' => $mission->completed_at?->format('Y-m-d H:i:s'),
                        'assigned_to_type' => $mission->assigned_to_type,
                        'assigned_volunteer' => $mission->assignedVolunteer,
                        'report' => $mission->report,
                        'created_at' => $mission->created_at->format('Y-m-d H:i:s'),
                        'updated_at' => $mission->updated_at->format('Y-m-d H:i:s'),
                    ]
                ]
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal membuat misi: ' . $e->getMessage()
            ], 500);
        }
    }

    public function index(Request $request)
    {
        try {
            $filters = $request->only([
                'status', 'city_id', 'district_id', 'assigned_to_type',
                'creator_user_id', 'assigned_volunteer_id', 'search',
                'date_from', 'date_to'
            ]);

            $perPage = $request->query('per_page', 10);
            $missions = $this->missionService->getMissions($filters, $perPage);

            return response()->json([
                'success' => true,
                'message' => 'Misi berhasil diambil',
                'data' => [
                    'missions' => $missions->items(),
                    'pagination' => [
                        'current_page' => $missions->currentPage(),
                        'per_page' => $missions->perPage(),
                        'total' => $missions->total(),
                        'last_page' => $missions->lastPage(),
                        'from' => $missions->firstItem(),
                        'to' => $missions->lastItem(),
                    ]
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil misi: ' . $e->getMessage()
            ], 500);
        }
    }

    // public function myMissions(Request $request)
    // {
    //     try {
    //         $perPage = $request->query('per_page', 10);
    //         $missions = $this->missionService->getMyMissions($perPage);

    //         return response()->json([
    //             'success' => true,
    //             'message' => 'Misi saya berhasil diambil',
    //             'data' => [
    //                 'missions' => $missions->items(),
    //                 'pagination' => [
    //                     'current_page' => $missions->currentPage(),
    //                     'per_page' => $missions->perPage(),
    //                     'total' => $missions->total(),
    //                     'last_page' => $missions->lastPage(),
    //                     'from' => $missions->firstItem(),
    //                     'to' => $missions->lastItem(),
    //                 ]
    //             ]
    //         ]);

    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Gagal mengambil misi: ' . $e->getMessage()
    //         ], 500);
    //     }
    // }



}
