<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Arr;
use App\Models\User;

class ProfileService
{
    /**
     * Create a new class instance.
     */
    public function __construct() {}

    public function updateProfile(array $data)
    {
        $user = Auth::user();

        if (!$user) {
            throw new \Exception('User not authenticated.');
        }
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }
        $user->update($data);

        return $user;
    }
    public function updateProfileData(array $data)
    {
        $user = Auth::user();
        if (!$user) {
            throw new \Exception('User not authenticated.');
        }
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }
        if (!$user->update($data)) {
            dd('Update gagal', $data);
        } else {
            dd('Update berhasil', $data);
        }
        return $user;
    }
    // public function updateProfileDataCommunity(array $data)
    // {
    //     $user = Auth::user();
    //     if (!$user) {
    //         throw new \Exception('User not authenticated.');
    //     }
    //     // Debug: Log user dan data
    //     \Log::info('Current User:', ['id' => $user->id, 'name' => $user->name]);
    //     \Log::info('Update Data:', $data);
    //     $userData = Arr::only($data, [
    //         'name',
    //         'email',
    //         'password',
    //         'profile_url',
    //         'phone',
    //         'address',
    //         'province_id',
    //         'city_id',
    //         'district_id'
    //     ]);

    //     if (isset($userData['password'])) {
    //         $userData['password'] = Hash::make($userData['password']);
    //     } else {
    //         unset($userData['password']);
    //     }

    //     $communityData = $data['community'] ?? [];
    //     // Debug: Log data yang akan diupdate
    //     \Log::info('User Data to Update:', $userData);
    //     \Log::info('Community Data to Update:', $communityData);

    //     $user->update($userData);

    //     // if ($user->community) {
    //     //     $user->community->update($communityData);
    //     // }
    //     if ($user->community) {
    //         $user->community->update($communityData);
    //     } else {
    //         $user->community()->create($communityData);
    //     }


    //     return $user;
    // }
    public function updateProfileDataCommunity(array $data)
    {
        $user = Auth::user();
        if (!$user) {
            throw new \Exception('User not authenticated.');
        }

        // Debug: Log user dan data
        \Log::info('Current User:', ['id' => $user->id, 'name' => $user->name]);
        \Log::info('Update Data:', $data);

        $userData = Arr::only($data, [
            'name',
            'email',
            'password',
            'profile_url',
            'phone',
            'address',
            'province_id',
            'city_id',
            'district_id'
        ]);

        if (isset($userData['password'])) {
            $userData['password'] = Hash::make($userData['password']);
        } else {
            unset($userData['password']);
        }

        $communityData = $data['community'] ?? [];

        // Debug: Log data yang akan diupdate
        \Log::info('User Data to Update:', $userData);
        \Log::info('Community Data to Update:', $communityData);

        // Update user data
        $userUpdated = $user->update($userData);
        \Log::info('User Update Result:', ['success' => $userUpdated]);

        // Update atau create community
        if ($user->community) {
            \Log::info('Updating existing community:', ['community_id' => $user->community->id]);
            $communityUpdated = $user->community->update($communityData);
            \Log::info('Community Update Result:', ['success' => $communityUpdated]);
        } else {
            \Log::info('Creating new community for user');
            $community = $user->community()->create($communityData);
            \Log::info('Community Create Result:', ['community_id' => $community->id]);
        }

        // Refresh user dengan relationship
        $user->refresh();
        $user->load('community');

        \Log::info('Final User Data:', [
            'user_id' => $user->id,
            'user_name' => $user->name,
            'community_name' => $user->community ? $user->community->name : 'No community'
        ]);

        return $user;
    }
}
