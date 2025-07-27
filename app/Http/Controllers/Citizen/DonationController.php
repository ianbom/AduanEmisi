<?php

namespace App\Http\Controllers\Citizen;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DonationController extends Controller
{
    public function donateReport(Request $request, $reportId){

        $user = Auth::user();
        DB::beginTransaction();
        try {

           $donation = Donation::create([
            'user_id' => $user->id,
            'report_id' => $reportId,
            'amount' => $request->amount,
            'payment_method' => 'manual',
            'transaction_id' => rand(),
            'payment_response' => null,
            'status' => 'paid'
        ]);
        DB::commit();
        return redirect()->back()->with('success', 'Donasi berhasil dikirimkan');

        } catch (\Throwable $th) {
            DB::rollBack();
           return response()->json(['err' => $th->getMessage()]);
        }

    }
}
