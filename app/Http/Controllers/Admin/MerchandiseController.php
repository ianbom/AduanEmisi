<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateMerchandiseRequest;
use App\Models\Merchandise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MerchandiseController extends Controller
{

    public function index(){
        $merchandises = Merchandise::all();
        return view('admin.merchandise.index', [ 'merchandise' => $merchandises ]);
    }

    public function create(){
        return view('admin.merchandise.create');
    }

    public function store(CreateMerchandiseRequest $request){
        $data = $request->validated();

        DB::beginTransaction();
        try {
        $imagePath = $data['image_url']->store('merchandise', 'public');
        $data['image_url'] = $imagePath;
        $result = Merchandise::create($data);
        DB::commit();
        return redirect()->back()->with('success', 'Merchandise berhasil dibuat');
        } catch (\Throwable $th) {
            DB::rollBack();
            // return response()->json(['err' => $th->getMessage()]);
            return redirect()->back()->with('error', 'Terjadi kesalahan');
        }
    }

}
