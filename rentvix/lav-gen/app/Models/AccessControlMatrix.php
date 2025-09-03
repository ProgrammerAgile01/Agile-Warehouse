<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccessControlMatrix extends Model
{
    protected $table = 'access_control_matrix';
    protected $fillable = [
        'user_level_id',
        'menu_id',
        'view',
        'add',
        'edit',
        'delete',
        'approve'
    ];

    
    
    
    public function userLevel() {
        return $this->belongsTo(\App\Models\LevelUser::class, 'user_level_id');
    }
    public function menu() {
        return $this->belongsTo(\App\Models\MenuId::class, 'menu_id');
    }

    
}
