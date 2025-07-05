<?php

use App\Http\Controllers\Admin\MissionController;
use App\Http\Controllers\Citizen\CommentController as CtzCommentController;
use App\Http\Controllers\Citizen\ProfileController as CtzProfileController;
use App\Http\Controllers\Citizen\ReportController as CtzReportController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [CtzProfileController::class, 'register']);
Route::post('/login', [CtzProfileController::class, 'login']);
;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [CtzProfileController::class, 'me']);
    Route::post('/complete-profile', [CtzProfileController::class, 'updateCompleteProfile']);
    Route::post('/create-report', [CtzReportController::class, 'store']);
    Route::get('/report/detail/{id}', [CtzReportController::class, 'show']);
    Route::get('/report-all', [CtzReportController::class, 'index']);
    Route::get('/my-report', [CtzReportController::class, 'myReports']);
    Route::post('/report/update/{id}', [CtzReportController::class, 'update']);
    Route::post('comment-create', [CtzCommentController::class, 'store']);
    Route::get('comment/by-report/{id}', [CtzCommentController::class, 'getByReport']);

    Route::post('create-mission', [MissionController::class, 'store']);

    Route::post('register-volunteer', [CtzReportController::class, 'registerAsVolunteer']);
    Route::post('register-leader-volunteer', [CtzReportController::class, 'registerAsLeaderVolunteer']);
});
