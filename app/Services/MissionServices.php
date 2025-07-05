<?php

namespace App\Services;

use App\Models\Mission;
use App\Models\Report;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MissionServices
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
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
