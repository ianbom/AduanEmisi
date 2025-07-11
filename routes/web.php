<?php

use App\Http\Controllers\Admin\MissionController as AdmMissionController;
use App\Http\Controllers\Admin\ReportController as AdmReportController;
use App\Http\Controllers\Citizen\ReportController as CtzReportController;
use App\Http\Controllers\Citizen\ProfileController as CtzProfileController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix('')->middleware(['auth'])->group(function () {

    Route::get('/homepage', function () {
        return Inertia::render('Citizen/HomePage');
    })->name('homepage');

    Route::get('/profile', [CtzProfileController::class, 'showProfile'])->name('profile.show');

    // Route untuk keperluan yang berkaitan dengan Laporan
    Route::get('/report', [CtzReportController::class, 'viewAllReportsPage'])->name('report');
    Route::get('/my-report', [CtzReportController::class, 'viewMyReportsPage'])->name('my-report');
    Route::get('/report/{id}', [CtzReportController::class, 'show'])->name('report.show');

    Route::get('/report-create', [CtzReportController::class, 'create'])->name('create.report');
    Route::post('/reports', [CtzReportController::class, 'store'])->name('reports.store');



    // Route untuk keperluan yang berkaitan dengan Peta
    Route::get('/map', function () {
        return Inertia::render('Citizen/Map/MapPage');
    })->name('map');

    // Route untuk keperluan yang berkaitan dengan Konten Edukasi
    Route::get('/education', function () {
        return Inertia::render('Citizen/EducationalContent/EducationalContentPage');
    })->name('education');
    Route::get('/education-detail/1', function () {
        return Inertia::render('Citizen/EducationalContent/EducationalContentDetailsPage');
    })->name('education-detail');
});

Route::get('/complete-profile', [CtzProfileController::class, 'completeProfile'])->name('profile.complete');
Route::post('/complete-profile', [CtzProfileController::class, 'updateCompleteProfile'])->name('profile.complete.update');

// Route::get('/complete-profile', function () {
//     return Inertia::render('Citizen/CompleteProfile');
// })->name('complete.profile')->middleware(['auth']);




Route::prefix('admin')->as('admin.')->middleware(['auth'])->group(function () {

    Route::resource('missions', AdmMissionController::class);
    Route::resource('reports', AdmReportController::class);
});

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__ . '/auth.php';
