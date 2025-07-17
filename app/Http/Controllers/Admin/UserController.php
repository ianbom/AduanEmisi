<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\District;
use App\Models\Province;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService){
        $this->userService = $userService;
    }

    public function index(Request $request){

        $filters = $this->userService->buildFilter($request);
        $users = $this->userService->getUserByFilter($filters);

        $provinces = Province::orderBy('name', 'asc')->get();
        $cities = City::orderBy('name', 'asc')->get();
        $districts = District::orderBy('name', 'asc')->get();
        return view('admin.users.index', ['users' => $users,
        'cities' => $cities,
        'provinces' => $provinces,
        'districts' => $districts ]);

    }
}
