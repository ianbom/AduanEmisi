<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Http;

class GeminiService
{
    protected $apiKey;
    protected $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
     public function __construct()
    {
        $this->apiKey = config('services.gemini.api_key');

        if (is_null($this->apiKey)) {
            throw new Exception('GEMINI_API_KEY tidak ditemukan di environment Anda.');
        }
    }

    public function generateText(string $prompt): string
    {
        $url = $this->baseUrl . '?key=' . $this->apiKey;

        $response = Http::post($url, [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $prompt]
                    ]
                ]
            ]
        ]);

        if ($response->failed()) {
            throw new Exception('Gagal berkomunikasi dengan Gemini API: ' . $response->body());
        }

        return $response->json('candidates.0.content.parts.0.text');
    }
}
