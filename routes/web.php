<?php

use App\Http\Controllers\Admin\BadgeController as AdmBadgeController;
use App\Http\Controllers\Admin\CertificateController as AdmCertificateController;
use App\Http\Controllers\Admin\ContentController as AdmContentController;
use App\Http\Controllers\Admin\MissionController as AdmMissionController;
use App\Http\Controllers\Admin\ReportController as AdmReportController;

use App\Http\Controllers\Admin\UserController as AdmUserController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\ChatBotController;
use App\Http\Controllers\Citizen\CommentController as CtzCommentController;
use App\Http\Controllers\Citizen\NotificationController;
use App\Http\Controllers\Citizen\ReportController as CtzReportController;
use App\Http\Controllers\Citizen\ProfileController as CtzProfileController;
use App\Http\Controllers\Citizen\MapController as CtzMapController;
use App\Http\Controllers\Citizen\ContentController as CtzContentController;
use App\Http\Controllers\Citizen\MissionController as CtzMissionController;
use App\Http\Controllers\Community\ReportController as ComReportController;
use App\Http\Controllers\Community\ProfileController as ComProfileController;
use App\Http\Controllers\Community\MapController as ComMapController;
use App\Http\Controllers\ProfileController;
use App\Models\Report;
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

Route::get('/auth/google/redirect', [GoogleAuthController::class, 'redirect'])->name('auth.google.redirect');
Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback'])->name('auth.google.callback');

Route::get('/complete-profile', [CtzProfileController::class, 'completeProfile'])->name('profile.complete');
Route::post('/complete-profile', [CtzProfileController::class, 'updateCompleteProfile'])->name('profile.complete.update');

Route::get('/dashboard', function () {
    return redirect()->route('homepage');
})->middleware(['auth', 'verified'])->name('dashboard');



// Route untuk akses fitur peran warga
Route::prefix('')->middleware(['auth', 'isProfileComplete'])->group(function () {
    Route::get('/homepage', function () {
        return Inertia::render('Citizen/HomePage');
    })->name('homepage');

    Route::put('/read-notification/{id}', [NotificationController::class, 'readNotification'])->name('notification.read');
    Route::put('/read/all/notification', [NotificationController::class, 'readAllNotification'])->name('notification.readAll');
    Route::delete('/delete/notification/{id}', [NotificationController::class, 'destroy'])->name('notification.delete');
    // Route untuk keperluan yang berkaitan dengan Profil
    Route::get('/profile', [CtzProfileController::class, 'showProfile'])->name('profile.show');
    Route::get('/edit-profile', [CtzProfileController::class, 'editProfile'])->name('profile.edit');
    Route::post('/update-profile', [CtzProfileController::class, 'updateProfile'])->name('profile.update');

    // Route untuk keperluan yang berkaitan dengan Laporan
    Route::get('/report', [CtzReportController::class, 'viewAllReportsPage'])->name('report');
    Route::get('/my-report', [CtzReportController::class, 'viewMyReportsPage'])->name('my-report');
    Route::get('/report/{id}', [CtzReportController::class, 'show'])->name('report.show');
    Route::get('/report-create', [CtzReportController::class, 'create'])->name('create.report');
    Route::post('/reports', [CtzReportController::class, 'store'])->name('reports.store');

    Route::post('/reports/{report}/vote', [CtzReportController::class, 'vote'])->name('report.vote');


    Route::post('comments/store', [CtzCommentController::class, 'store'])->name('comments.store');

    // Route untuk keperluan yang berkaitan dengan misi
    Route::get('/mission', [CtzMissionController::class, 'index'])->name('mission');
    Route::get('/my-mission', [CtzMissionController::class, 'myMissions'])->name('my-mission');

    Route::post('/join-missions/{id}', [CtzMissionController::class, 'join'])->name('mission.join');
    Route::post('/attendance-members', [CtzMissionController::class, 'attend'])->name('attendance.store');
    Route::delete('/volunteers/{mission}', [CtzMissionController::class, 'cancel'])->name('volunteer.cancel');
    Route::post('/mission/media-documentation/upload', [CtzMissionController::class, 'uploadDocumentation'])->name('mission.documentation.upload');

    // Route untuk keperluan yang berkaitan dengan Peta
    Route::get('/map', [CtzMapController::class, 'indexMap'])->name('map.index');

    // Route untuk keperluan yang berkaitan dengan Konten Edukasi
    Route::get('/education', [CtzContentController::class, 'index'])->name('content.index');
    Route::get('/education/{id}', [CtzContentController::class, 'show'])->name('content.show');
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


Route::prefix('admin')->as('admin.')->middleware(['auth'])->group(function () {
    Route::resource('missions', AdmMissionController::class);
    Route::put('missions/update/volunteer/{missionVolunteer}', [AdmMissionController::class, 'updateStatusVolunteer'])->name('update.volunteerStatus');

    Route::resource('reports', AdmReportController::class);
    Route::put('reject-report/{report}', [AdmReportController::class, 'rejectReport'])->name('reports.reject');
    Route::put('accept-report/{report}', [AdmReportController::class, 'acceptReport'])->name('reports.accept');
    Route::put('authority-report/{report}', [AdmReportController::class, 'underAuthority'])->name('reports.underAuthority');

    Route::resource('contents', AdmContentController::class);
    Route::delete('content-media/{contentMedia}', [AdmContentController::class, 'deleteMedia'])->name('delete.contentMedia');

    Route::resource('badges', AdmBadgeController::class);

    Route::resource('users', AdmUserController::class);

    Route::get('certificate/generate', [AdmCertificateController::class, 'generateCertificate'])->name('certificate.generate');
    Route::post('/missions/certificates/generate', [AdmCertificateController::class, 'generate'])->name('missions.certificates.generate');
    Route::resource('certificates', AdmCertificateController::class);

    Route::resource('chatbot', ChatBotController::class);
});


// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__ . '/auth.php';
