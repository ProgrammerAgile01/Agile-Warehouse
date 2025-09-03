<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class UserManagement extends Authenticatable implements JWTSubject
{
    protected $table = 'user_management';
    protected $fillable = [
        'nama',
        'email',
        'nomor_telp',
        'role',
        'status',
        'foto'
    ];
    
     protected $hidden = ['password'];

    protected $casts = [
        'password' => 'hashed', // auto hash saat set
    ];
    public function role() {
        return $this->belongsTo(\App\Models\LevelUser::class, 'role');
    }

      public function company() {
        return $this->belongsTo(\App\Models\Company::class, 'company_id');
    }

    public function getFotoUrlAttribute()
    {
        return $this->foto
            ? asset('storage/' . $this->foto)
            : null;
    }

     public function getJWTIdentifier() { return $this->getKey(); }
    public function getJWTCustomClaims() { return ['typ' => 'user']; }

}
