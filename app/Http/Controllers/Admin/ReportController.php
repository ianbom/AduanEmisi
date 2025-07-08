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

            $report = $this->reportService->updateStatus($report->id, 'verified', $user->id, null, $assignedType);

        } catch (\Throwable $th) {
            //throw $th;
        }


    }


}
