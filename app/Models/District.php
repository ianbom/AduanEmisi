<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class District extends Model
{

    protected $guarded = ['id'];
     public function city()
    {
        return $this->belongsTo(City::class);
    }

    /**
     * Get the users for the district (subdistrict).
     */
    public function users()
    {
        return $this->hasMany(User::class, 'subdistrict_id');
    }

    /**
     * Get the reports for the district.
     */
    public function reports()
    {
        return $this->hasMany(Report::class, 'subdistrict_id');
    }

    /**
     * Get the missions for the district.
     */
    public function missions()
    {
        return $this->hasMany(Mission::class, 'subdistrict_id');
    }
}
