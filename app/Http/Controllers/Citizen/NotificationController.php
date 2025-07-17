<?php

namespace App\Http\Controllers\Citizen;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class NotificationController extends Controller
{
 public function readNotification($id){
    DB::beginTransaction();
    try {
        $notification = Notification::where('id', $id)
            ->where('user_id', Auth::id()) // Pastikan user hanya bisa update notifikasi miliknya
            ->firstOrFail();

        $notification->update(['is_read' => true]);
        DB::commit();

        return redirect()->back()->with('success', 'Notifikasi berhasil ditandai sebagai dibaca');
    } catch (\Throwable $th) {
        DB::rollBack();
        return redirect()->back()->with('error', 'Gagal menandai notifikasi sebagai dibaca');
    }
}
}
