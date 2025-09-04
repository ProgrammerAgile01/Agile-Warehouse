<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AccessControlMatrix extends Model
{
    protected $table = 'access_control_matrix';

    protected $fillable = [
        'user_level_id',
        'menu_id',
        'menu_key',
        'view',
        'add',
        'edit',
        'delete',
        'approve',
    ];

    protected $casts = [
        'user_level_id' => 'integer',
        'menu_id' => 'integer',
        'menu_key' => 'string',
        'view' => 'boolean',
        'add' => 'boolean',
        'edit' => 'boolean',
        'delete' => 'boolean',
        'approve' => 'boolean',
    ];

    public function level(): BelongsTo
    {
        return $this->belongsTo(LevelUser::class, 'user_level_id');
    }

    public function menu(): BelongsTo
    {
        return $this->belongsTo(Menu::class, 'menu_id');
    }

    public function scopeForLevel($q, $levelId)
    {
        return $q->where('user_level_id', $levelId);
    }

    /**
     * Helper sinkron massal (flex: menu_id atau menu_key).
     */
   public static function syncForLevel(int $levelId, array $rows): void
{
    $now = now();

    // Bentuk payload minimal (tanpa kolom yang tidak dipakai)
    $byId  = [];
    $byKey = [];

    foreach ($rows as $r) {
        $menuId  = array_key_exists('menu_id',  $r) ? (int)   $r['menu_id']  : null;
        $menuKey = array_key_exists('menu_key', $r) ? (string)$r['menu_key'] : null;

        $common = [
            'user_level_id' => $levelId,
            'view'    => (bool)($r['view'] ?? false),
            'add'     => (bool)($r['add'] ?? false),
            'edit'    => (bool)($r['edit'] ?? false),
            'delete'  => (bool)($r['delete'] ?? false),
            'approve' => (bool)($r['approve'] ?? false),
            'updated_at' => $now,
            'created_at' => $now,
        ];

        if (!empty($menuId)) {
            // HANYA sertakan menu_id, JANGAN sertakan menu_key
            $byId[] = $common + ['menu_id' => $menuId];
        } elseif (!empty($menuKey)) {
            // HANYA sertakan menu_key, JANGAN sertakan menu_id
            $byKey[] = $common + ['menu_key' => $menuKey];
        }
        // Kalau dua-duanya kosong, sudah disaring di controller sebelumnya
    }

    if ($byId) {
        static::upsert(
            $byId,
            ['user_level_id', 'menu_id'],
            ['view', 'add', 'edit', 'delete', 'approve', 'updated_at']
        );
    }

    if ($byKey) {
        static::upsert(
            $byKey,
            ['user_level_id', 'menu_key'],
            ['view', 'add', 'edit', 'delete', 'approve', 'updated_at']
        );
    }
}

}
