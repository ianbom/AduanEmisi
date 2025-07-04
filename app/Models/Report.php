<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{

    protected $guarded = ['id'];
    protected $casts = [
        'verified_at' => 'datetime',
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
    ];

    /**
     * Get the user who reported this.
     */
    public function reporter()
    {
        return $this->belongsTo(User::class, 'reporter_id');
    }

    /**
     * Get the city where the report occurred.
     */
    public function city()
    {
        return $this->belongsTo(City::class);
    }

    /**
     * Get the subdistrict (district) where the report occurred.
     */
    public function subdistrict()
    {
        return $this->belongsTo(District::class);
    }

    /**
     * Get the user who verified the report.
     */
    public function verifiedBy()
    {
        return $this->belongsTo(User::class, 'verified_by_user_id');
    }

    /**
     * Get the user who completed the report.
     */
    public function completedBy()
    {
        return $this->belongsTo(User::class, 'completed_by_user_id');
    }

    /**
     * Get the media for the report.
     */
    public function media()
    {
        return $this->hasMany(ReportMedia::class);
    }

    /**
     * Get the comments for the report.
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Get the votes for the report.
     */
    public function votes()
    {
        return $this->hasMany(ReportVote::class);
    }

    /**
     * Get the donations for the report.
     */
    public function donations()
    {
        return $this->hasMany(Donation::class);
    }

    /**
     * Get the mission related to this report.
     */
    public function mission()
    {
        return $this->hasOne(Mission::class);
    }
}
