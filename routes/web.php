<?php

use App\Http\Controllers\Admin\ContentController as AdmContentController;
use App\Http\Controllers\Admin\MissionController as AdmMissionController;
use App\Http\Controllers\Admin\ReportController as AdmReportController;
use App\Http\Controllers\Citizen\ReportController as CtzReportController;
use App\Http\Controllers\Citizen\ProfileController as CtzProfileController;
use App\Http\Controllers\Citizen\MapController as CtzMapController;
use App\Http\Controllers\Community\ReportController as ComReportController;
use App\Http\Controllers\Community\ProfileController as ComProfileController;
use App\Http\Controllers\Community\MapController as ComMapController;
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

Route::get('/complete-profile', [CtzProfileController::class, 'completeProfile'])->name('profile.complete');
Route::post('/complete-profile', [CtzProfileController::class, 'updateCompleteProfile'])->name('profile.complete.update');

Route::get('/dashboard', function () {
    return redirect()->route('homepage');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route untuk akses fitur peran admin
Route::prefix('admin')->as('admin.')->middleware(['auth'])->group(function () {
    Route::resource('missions', AdmMissionController::class);
    Route::resource('reports', AdmReportController::class);
});

// Route untuk akses fitur peran warga
Route::prefix('')->middleware(['auth'])->group(function () {
    Route::get('/homepage', function () {
        return Inertia::render('Citizen/HomePage');
    })->name('homepage');

    // Route untuk keperluan yang berkaitan dengan Profil
    Route::get('/profile', [CtzProfileController::class, 'showProfile'])->name('profile.show');

    // Route untuk keperluan yang berkaitan dengan Laporan
    Route::get('/report', [CtzReportController::class, 'viewAllReportsPage'])->name('report');
    Route::get('/my-report', [CtzReportController::class, 'viewMyReportsPage'])->name('my-report');
    Route::get('/report/{id}', [CtzReportController::class, 'show'])->name('report.show');
    Route::get('/report-create', [CtzReportController::class, 'create'])->name('create.report');
    Route::post('/reports', [CtzReportController::class, 'store'])->name('reports.store');

    // Route untuk keperluan yang berkaitan dengan Peta
    Route::get('/map', [CtzMapController::class, 'indexMap'])->name('map.index');

    // Route untuk keperluan yang berkaitan dengan Konten Edukasi
    Route::get('/education', function () {
        return Inertia::render('Citizen/EducationalContent/EducationalContentPage');
    })->name('education');
    Route::get('/education-detail/1', function () {
        return Inertia::render('Citizen/EducationalContent/EducationalContentDetailsPage');
    })->name('education-detail');
});


// Route untuk akses fitur peran kommunitas
Route::prefix('community')->as('community.')->middleware(['auth'])->group(function () {
    // Route untuk keperluan yang berkaitan dengan Laporan
    Route::get('/report', [ComReportController::class, 'viewAllReportsPage'])->name('report');
    Route::get('/my-report', [ComReportController::class, 'viewMyReportsPage'])->name('my-report');
    Route::get('/report/{id}', [ComReportController::class, 'show'])->name('report.show');
    Route::get('/report-create', [ComReportController::class, 'create'])->name('create.report');
    Route::post('/reports', [ComReportController::class, 'store'])->name('reports.store');

    // Route untuk keperluan yang berkaitan dengan Profil
    Route::get('/profile', [ComProfileController::class, 'showProfile'])->name('profile.show');

    // Route untuk keperluan yang berkaitan dengan Peta
    Route::get('/map', [ComMapController::class, 'indexMap'])->name('map.index');
});






    Route::resource('missions',AdmMissionController::class);
    Route::put('missions/update/volunteer/{missionVolunteer}',[AdmMissionController::class, 'updateStatusVolunteer'])->name('update.volunteerStatus');

    Route::resource('reports', AdmReportController::class);
    Route::put('reject-report/{report}', [AdmReportController::class, 'rejectReport'])->name('reports.reject');
    Route::put('accept-report/{report}', [AdmReportController::class, 'acceptReport'])->name('reports.accept');

    Route::resource('contents',AdmContentController::class);
    Route::delete('content-media/{contentMedia}', [AdmContentController::class, 'deleteMedia'])->name('delete.contentMedia');
});


// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__ . '/auth.php';
