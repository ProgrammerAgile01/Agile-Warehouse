<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DataKendaraan extends Model
{
    protected $table = 'mst_kendaraan';
    protected $fillable = [
        'brand',
        'model',
        'tahun',
        'lokasi',
        'status',
        'foto_depan',
        'foto_belakang',
        'foto_samping'
    ];

    protected $appends = ['foto_depan_url', 'foto_belakang_url', 'foto_samping_url'];

    
    
    

    
    public function getFotoDepanUrlAttribute()
    {
        return $this->foto_depan
            ? asset('storage/' . $this->foto_depan)
            : null;
    }

    public function getFotoBelakangUrlAttribute()
    {
        return $this->foto_belakang
            ? asset('storage/' . $this->foto_belakang)
            : null;
    }

    public function getFotoSampingUrlAttribute()
    {
        return $this->foto_samping
            ? asset('storage/' . $this->foto_samping)
            : null;
    }

}
