<?php

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

    Route::get('/profile', function () {
        return Inertia::render('Citizen/Index');
    })->name('profile');

    // Route untuk keperluan yang berkaitan dengan Laporan
    Route::get('/report', function () {
        return Inertia::render('Citizen/Report/ReportsPage');
    })->name('report');
    Route::get('/report-detail/1', function () {
        return Inertia::render('Citizen/Report/ReportDetailsPage');
    })->name('report-detail');
    Route::get('/report-create', function () {
        return Inertia::render('Citizen/Report/CreateReportPage');
    })->name('create.report');

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

Route::get('/complete-profile', function () {
    return Inertia::render('Citizen/CompleteProfile');
})->name('complete.profile')->middleware(['auth']);



// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__ . '/auth.php';
