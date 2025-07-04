<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReportMedia extends Model
{
    use HasFactory;

    protected $table = 'report_media'; // Pastikan nama tabel sesuai jika berbeda dari konvensi

    protected $guarded = [
        'id'
    ];

    public function report(): BelongsTo
    {
        return $this->belongsTo(Report::class);
    }
}
