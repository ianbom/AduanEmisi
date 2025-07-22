<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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
        // dd($data); // ⬅️ taruh di sini

        // // Handle file upload jika ada profile picture
        // if (isset($data['profile_url']) && $data['profile_url'] instanceof \Illuminate\Http\UploadedFile) {
        //     $path = $data['profile_url']->store('uploads', 'public');
        //     $data['profile_url'] = $path;
        // } else {
        //     unset($data['profile_url']);
        // }
        // Handle password
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
}
