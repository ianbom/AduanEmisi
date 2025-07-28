<?php

namespace App\Http\Controllers\Citizen;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function index(){
        $quizzes = Quiz::where('is_active', true)->get();

        return Inertia::render('Citizen/Quiz/QuizPage', ['quizzes' => $quizzes]);
    }

    public function show(Quiz $quiz){
        $quiz = Quiz::with('questions.answers')->findOrFail($quiz->id);
        return Inertia::render('Citizen/Quiz/DetailQuizPage', ['quiz' => $quiz]);
    }
}
