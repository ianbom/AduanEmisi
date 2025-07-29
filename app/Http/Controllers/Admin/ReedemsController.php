<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reedems;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReedemsController extends Controller
{
     public function index(){
        $redeems = Reedems::all();
        return view('admin.redeems.index', ['redeems' => $redeems]);
    }

  public function edit($id) {
    // Load relationships for better performance
    $redeems = Reedems::with('user')->findOrFail($id);
    // return response()->json(['redems' => $redeems]);
    return view('admin.redeems.edit', ['redeems' => $redeems]);
}

public function update($id, Request $request) {
    // $request->validate([
    //     'status' => 'required|in:pending,processing,shipped,completed,cancelled',
    //     'logistic' => 'nullable|string|max:255',
    //     'tracking_number' => 'nullable|string|max:255',
    // ]);

    $redeems = Reedems::findOrFail($id);
    DB::beginTransaction();
    try {
        $redeems->update($request->all());
        DB::commit();
        return redirect()->back()->with('success', 'Data berhasil diperbarui');
    } catch (\Throwable $th) {
        DB::rollBack();
        return redirect()->back()->with('error', 'Terjadi kesalahan');
    }
}


}
