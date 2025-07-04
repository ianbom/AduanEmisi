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

    Route::prefix('')->middleware(['isProfileComplete', 'auth'])->group(function () {

        Route::get('/homepage', function () {
        return Inertia::render('Citizen/HomePage');
        })->name('homepage');

        Route::get('/profile', function () {
        return Inertia::render('Citizen/Index');
        })->name('profile');


        Route::get('/report', function () {
        return Inertia::render('Citizen/ReportsPage');
        })->name('report');

        Route::get('/report-create', function () {
        return Inertia::render('Citizen/CreateReportPage');
        })->name('create.report');

        Route::get('/map', function () {
        return Inertia::render('Citizen/MapPage');
        })->name('map');

        Route::get('/education', function () {
        return Inertia::render('Citizen/EducationalContentPage');
        })->name('education');



    });

        Route::get('/complete-profile', function () {
        return Inertia::render('Citizen/CompleteProfile');
        })->name('complete.profile')->middleware(['auth']);



    // Route::middleware('auth')->group(function () {
    //     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    //     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    //     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // });

require __DIR__.'/auth.php';
