<?php

namespace App\Http\Controllers\Citizen;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileRequest;
use App\Models\User;
use App\Services\ProfileService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Province;
use Throwable;
use Inertia\Inertia;

class ProfileController extends Controller
{

    protected $profileService;

    public function __construct(ProfileService $profileService)
    {
        $this->profileService = $profileService;
    }
    public function showProfile()
    {
        $user = Auth::user();
        
        return Inertia::render('Citizen/Index', [
            'auth' => [
                'user' => $user
            ]
        ]);
    }
    public function completeProfile()
    {
        $user = Auth::user();
        $provinces = Province::with('cities.districts')->get();
        return Inertia::render('Citizen/CompleteProfile', [
            'provinces' => $provinces,
            'auth' => [
                'user' => $user
            ]
        ]);
    }

    // public function updateCompleteProfile(ProfileRequest $request)
    // {
    //     $data = $request->validated();

    //     try {
    //         $user = $this->profileService->updateProfile($data);
    //         return response()->json([
    //             'status'  => 'success',
    //             'message' => 'Profile updated successfully',
    //             'data'    => $user
    //         ], 200);
    //     } catch (Throwable $th) {
    //         return response()->json([
    //             'status'  => 'error',
    //             'message' => 'Failed to update profile. ' . $th->getMessage(),
    //         ], 500);
    //     }
    // }
    public function updateCompleteProfile(ProfileRequest $request)
    {
        $data = $request->validated();

        try {
            $this->profileService->updateProfile($data);
            return redirect()
                ->route('profile.show')
                ->with('success', 'Profile berhasil diperbarui');
        } catch (Throwable $th) {
            return back()
                ->withErrors(['error' => 'Gagal memperbarui profile. ' . $th->getMessage()])
                ->withInput();
        }
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:8'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'data' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer'
        ]);
    }

    public function login(Request $request)
    {
        if (! Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login success',
            'access_token' => $token,
            'token_type' => 'Bearer'
        ]);
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();
        return response()->json([
            'message' => 'logout success'
        ]);
    }

    public function me()
    {
        $user = Auth::user();
        return response()->json([
            'data' => $user,
        ]);
    }
}
