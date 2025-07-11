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
}
