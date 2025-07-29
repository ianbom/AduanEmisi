<?php

namespace App\Http\Controllers\Citizen;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use App\Service\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DonationController extends Controller
{

    protected $midtransService;

    public function __construct(MidtransService $midtransService)
    {
        $this->midtransService = $midtransService;
    }

    public function donateReport(Request $request, $reportId)
    {
        $data = $request->all();
        $user = Auth::user();

        DB::beginTransaction();
        try {
            // PERBAIKAN: Dapatkan hasil dari midtransService yang sudah termasuk donation_id
            $result = $this->midtransService->payTransaction($user, $reportId, $data);

            DB::commit();

            return response()->json([
                'snap_token' => $result['snap_token'],
                'donation_id' => $result['donation_id'],
                'transaction_id' => $result['transaction_id'],
                'message' => 'Success'
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }
    public function paymentSuccess(Request $request, $donationId)
    {
        try {
            $donation = Donation::findOrFail($donationId);

            // Update status donation
            $donation->update([
                'status' => 'paid',
                // 'payment_data' => json_encode($request->all()),
                // 'paid_at' => now()
            ]);

            // Log untuk debugging
            Log::info('Payment success confirmation received', [
                'donation_id' => $donationId,
                'payment_data' => $request->all()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Payment confirmation received',
                'donation_id' => $donationId
            ]);
        } catch (\Exception $e) {
            Log::error('Payment success confirmation failed', [
                'donation_id' => $donationId,
                'error' => $e->getMessage(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to confirm payment: ' . $e->getMessage()
            ], 500);
        }
    }
    public function viewMyDonations()
    {
        $user = Auth::user();

        $donations = Donation::with('report')
            ->where('user_id', $user->id)
            ->latest()
            ->paginate(10); 

        return Inertia::render('Citizen/Donation/MyDonationPage', [
            'donations' => $donations
        ]);
    }
}
