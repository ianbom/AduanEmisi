<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserCertificate extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'user_certificate';
    protected $guarded = ['id'];
}
