<?php

namespace App\Http\Controllers\Community;

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
use App\Models\Report;
use Throwable;
use Inertia\Inertia;

class ProfileController extends Controller
{

    protected $profileService;

    public function __construct(ProfileService $profileService)
    {
        $this->profileService = $profileService;
    }
    // public function showProfile()
    // {
    //     $user = User::with('province', 'city', 'district', 'community')->find(Auth::id());
    //     $myReports = Report::where('reporter_id', $user->id)->get();
    //     $myReportsCount = Report::where('reporter_id', $user->id)->count();
    //     return Inertia::render('Community/Profile/ProfilePage', [
    //         'auth' => [
    //             'user' => $user,

    //         ],
    //         'myReports' => $myReports,
    //         'myReportsCount' => $myReportsCount
    //     ]);
    // }
    public function showProfile()
    {
        $user = User::with('province', 'city', 'district', 'community')->find(Auth::id());

        $myReports = Report::with(['reporter'])->where('reporter_id', $user->id)->get();
        $myReportCount = Report::where('reporter_id', $user->id)->count();
        // $myMissions = $user->volunteeredMissions()->with('pivot')->get();
        $myMissions = $user->volunteeredMissions; // otomatis get()
        $myMissionCounts = $myMissions->count(); // hitung dari hasil atas
        // $myMissionCounts = $user->volunteeredMissions()->count();
        return Inertia::render('Community/Profile/ProfilePage', [
            'auth' => [
                'user' => $user,
            ],
            'myReports' => $myReports,
            'myReportsCount' => $myReportCount,
            'myMissions' => $myMissions,
            'myMissionCounts' => $myMissionCounts,
        ]);
    }
    public function editProfile()
    {


        $user = User::with('community')->find(Auth::id());
        $provinces = Province::with('cities.districts')->get();
        return Inertia::render('Community/Profile/EditProfilePage', [
            'provinces' => $provinces,
            'auth' => [
                'user' => $user
            ]
        ]);
    }
    public function updateProfile(ProfileRequest $request)
    {
        \Log::info('Update Profile Data:', $request->all());
        $data = $request->validated();
        \Log::info('Validated Data:', $data);
        try {
            if ($request->hasFile('profile_url')) {
                $file = $request->file('profile_url');
                $path = $file->store('profile_url', 'public');
                $data['profile_url'] = $path;
                \Log::info('File uploaded to:', ['path' => $path]);
            }
            $result = $this->profileService->updateProfileDataCommunity($data);
            \Log::info('Update result:', ['user_id' => $result->id, 'community_exists' => $result->community ? 'yes' : 'no']);
            return redirect()
                ->route('community.profile.show')
                ->with('success', 'Profile berhasil diperbarui');
        } catch (Throwable $th) {
            \Log::error('Update Profile Error:', [
                'message' => $th->getMessage(),
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString()
            ]);
            return back()
                ->withErrors(['error' => 'Gagal memperbarui profile. ' . $th->getMessage()])
                ->withInput();
        }
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

    public function updateCompleteProfile(ProfileRequest $request)
    {
        $data = $request->validated();

        try {
            $this->profileService->updateProfile($data);
            return redirect()
                ->route('community.profile.show')
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
