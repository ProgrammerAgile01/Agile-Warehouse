<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LevelUser extends Model
{
    protected $table = 'level_user';
    protected $fillable = [
        'nama_level',
        'deskripsi',
        'status'
    ];
    
    

    
}
