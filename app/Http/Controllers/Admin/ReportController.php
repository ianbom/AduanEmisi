<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\District;
use App\Services\ReportService;
use Illuminate\Http\Request;

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
}
