<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\District;
use App\Models\Report;
use App\Services\ReportService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    protected $reportService;
    public function __construct(ReportService $reportService)
    {
        $this->reportService = $reportService;
    }


    public function index(Request $request){

        $filters = [];
        $filters = $this->reportService->buildFilter($request);
        $reports = $this->reportService->getReportByFilter($filters);


        $cities = City::orderBy('name', 'asc')->get();
        $districts = District::orderBy('name', 'asc')->get();

        return view('admin.reports.index', ['reports' => $reports,
        'filters' => $filters,
        'cities' => $cities,
        'districts' => $districts]);
    }

    public function edit(Report $report){
        return view('admin.reports.edit', ['report' => $report]);
    }

    public function acceptReport(Report $report, Request $request){
        $user = Auth::user();
        DB::beginTransaction();
        try {
            $assignedType = $request->input('assigned_type', 'community');
            $report = $this->reportService->updateStatus($report->id, 'verified',
            $user->id, null, $assignedType);

            DB::commit();
             return redirect()->back()->with('success', 'Aduan berhasil diverifikasi');
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['err' => $th->getMessage()]);
        }

    }

     public function rejectReport(Report $report, Request $request){
        $user = Auth::user();
        DB::beginTransaction();
        try {
            $assignedType = $request->input('assigned_type', 'community');
            $report = $this->reportService->updateStatus($report->id, 'rejected',
            $user->id, null, $assignedType);

            DB::commit();
            return redirect()->back()->with('success', 'Aduan berhasil ditolak');
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['err' => $th->getMessage()]);
        }

    }

    public function underAuthority(Report $report, Request $request){
        $user = Auth::user();
        DB::beginTransaction();
        try {
            $assignedType = $request->input('assigned_type', 'community');
            $report = $this->reportService->updateStatus($report->id, 'under-authority',
            $user->id, null, $assignedType);

            DB::commit();
            return redirect()->back()->with('success', 'Aduan ditangani oleh pihak berwenang');
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['err' => $th->getMessage()]);
        }

    }


}
