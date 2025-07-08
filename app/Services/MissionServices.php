<?php

namespace App\Services;

use App\Models\Mission;
use App\Models\Report;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MissionServices extends Service
{
    /**
     * Create a new class instance.
     */
    public function __construct(Mission $mission)
    {
        parent::__construct($mission);
    }

    public function createMission(array $data): Mission
    {
        return DB::transaction(function () use ($data) {
            $missionData = [
                'report_id' => $data['report_id'] ?? null,
                'creator_user_id' => Auth::id(),
                'city_id' => $data['city_id'],
                'district_id' => $data['district_id'],
                'title' => $data['title'],
                'description' => $data['description'],
                'latitude' => $data['latitude'] ?? null,
                'longitude' => $data['longitude'] ?? null,
                'address' => $data['address'] ?? null,
                'status' => $data['status'] ?? 'open',
                'scheduled_date' => $data['scheduled_date'] ?? null,
                'assigned_to_type' => $data['assigned_to_type'] ?? null,
                'assigned_volunteer_id' => $data['assigned_volunteer_id'] ?? null,
            ];

            $report = Report::findOrFail($data['report_id']);
            $report->update(['status' => 'verified']);

            $mission = Mission::create($missionData);

            return $mission;
        });
    }

    public function getMissions(array $filters = [], int $perPage = 10)
    {
        $query = Mission::with([
            'creator:id,name,email',
            'city:id,name',
            'district:id,name',
            'assignedVolunteer:id,name,email',
            'report:id,title'
        ]);

        // Apply filters
        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['city_id'])) {
            $query->where('city_id', $filters['city_id']);
        }

        if (!empty($filters['district_id'])) {
            $query->where('district_id', $filters['district_id']);
        }

        if (!empty($filters['assigned_to_type'])) {
            $query->where('assigned_to_type', $filters['assigned_to_type']);
        }

        if (!empty($filters['creator_user_id'])) {
            $query->where('creator_user_id', $filters['creator_user_id']);
        }

        if (!empty($filters['assigned_volunteer_id'])) {
            $query->where('assigned_volunteer_id', $filters['assigned_volunteer_id']);
        }

        // Search by title or description
        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('title', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('description', 'like', '%' . $filters['search'] . '%');
            });
        }

        // Date range filter
        if (!empty($filters['date_from'])) {
            $query->whereDate('created_at', '>=', $filters['date_from']);
        }

        if (!empty($filters['date_to'])) {
            $query->whereDate('created_at', '<=', $filters['date_to']);
        }

        return $query->orderBy('created_at', 'desc')->paginate($perPage);
    }

     public function getMissionByFilters(array $filters = []) : Collection
    {
        $allowedFilters = [
          'missions.city_id' => 'value',
            'missions.district_id' => 'value',
            'missions.status' => 'value',
            'missions.assigned_to_type' => 'value',
            'missions.scheduled_date' => 'date',
            'missions.created_at' => 'date',
            'missions.completed_at' => 'date',
            'missions.address' => 'like',
        ];

        $selectColumns = [
           'missions.*',

        ];

        $query = Mission::select($selectColumns)
        ->join('districts', 'missions.district_id' , '=', 'districts.id')
        // ->join('kota', 'users.id_kota' , '=', 'kota.id_kota')
        ->join('cities', 'missions.city_id' , '=', 'cities.id')
            ->orderBy('missions.id', 'desc');

        $query = $this->applyFilters($query, $filters, $allowedFilters);

        $query->with([
            'city', 'district'
        ]);

        return $query->get();
    }

        public function buildFilter($request)
    {
    $filters = [];

    // Filter berdasarkan nilai (value) & pencarian (like)
    if ($request->filled('status')) {
        $filters['missions.status'] = $request->input('status');
    }
    if ($request->filled('city_id')) {
        $filters['missions.city_id'] = $request->input('city_id');
    }
    if ($request->filled('district_id')) {
        $filters['missions.district_id'] = $request->input('district_id');
    }
    if ($request->filled('assigned_to_type')) {
        $filters['missions.assigned_to_type'] = $request->input('assigned_to_type');
    }
    if ($request->filled('search')) {
        // 'search' dari request akan memfilter kolom 'address'
        $filters['missions.address'] = $request->input('search');
    }

    // Filter berdasarkan rentang tanggal (date range)
    if ($request->filled('date_from') && $request->filled('date_to')) {
        $filters['missions.scheduled_date'] = [
            'start' => $request->input('date_from'),
            'end'   => $request->input('date_to')
        ];
    }

    // Menambahkan filter tanggal lain yang ada di allowedFilters
    if ($request->filled('created_from') && $request->filled('created_to')) {
        $filters['missions.created_at'] = [
            'start' => $request->input('created_from'),
            'end'   => $request->input('created_to')
        ];
    }

    if ($request->filled('completed_from') && $request->filled('completed_to')) {
        $filters['missions.completed_at'] = [
            'start' => $request->input('completed_from'),
            'end'   => $request->input('completed_to')
        ];
    }

    return $filters;
}

    public function updateMissionStatus(int $missionId, string $status): Mission
    {
        $mission = Mission::findOrFail($missionId);

        // Check authorization
        if (!$this->canUpdateMission($mission)) {
            throw new \Exception('Unauthorized to update this mission');
        }

        $mission->status = $status;

        // Set completed_at if status is completed
        if ($status === 'completed' && !$mission->completed_at) {
            $mission->completed_at = Carbon::now();
        }

        $mission->save();

        return $mission;
    }



    // public function assignVolunteer(int $missionId, int $volunteerId)
    // {
    //     $mission = Mission::findOrFail($missionId);

    //     // Check authorization
    //     if (!$this->canUpdateMission($mission)) {
    //         throw new \Exception('Unauthorized to assign volunteer to this mission');
    //     }

    //     $mission->assigned_volunteer_id = $volunteerId;
    //     $mission->assigned_to_type = 'volunteer';

    //     // Update status to on-progress if still open
    //     if ($mission->status === 'open') {
    //         $mission->status = 'on-progress';
    //     }

    //     $mission->save();

    //     return $mission;
    // }

    /**
     * Delete mission
     *

     */
    public function deleteMission(int $missionId): bool
    {
        $mission = Mission::findOrFail($missionId);

        // Check authorization
        if (!$this->canDeleteMission($mission)) {
            throw new \Exception('Unauthorized to delete this mission');
        }

        // Only allow deletion if mission is not completed
        if ($mission->status === 'completed') {
            throw new \Exception('Cannot delete completed mission');
        }

        return $mission->delete();
    }

    /**
     * Get missions for current user
     *
     * @param int $perPage
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    // public function getMyMissions(int $perPage = 10)
    // {
    //     return Mission::with([
    //         'city:id,name',
    //         'district:id,name',
    //         'assignedVolunteer:id,name,email',
    //         'report:id,title'
    //     ])
    //     ->where('creator_user_id', Auth::id())
    //     ->orderBy('created_at', 'desc')
    //     ->paginate($perPage);
    // }


    public function getAssignedMissions(int $perPage = 10)
    {
        return Mission::with([
            'creator:id,name,email',
            'city:id,name',
            'district:id,name',
            'report:id,title'
        ])
        ->where('assigned_volunteer_id', Auth::id())
        ->orderBy('created_at', 'desc')
        ->paginate($perPage);
    }


    private function canUpdateMission(Mission $mission): bool
    {
        $userId = Auth::id();
        return $mission->creator_user_id === $userId ||
               $mission->assigned_volunteer_id === $userId;
    }


    private function canDeleteMission(Mission $mission): bool
    {
        return $mission->creator_user_id === Auth::id();
    }



}
