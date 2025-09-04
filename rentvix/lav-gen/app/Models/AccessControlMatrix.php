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
        $payload = array_map(function ($r) use ($levelId, $now) {
            $menuId = array_key_exists('menu_id', $r) ? (int) $r['menu_id'] : null;
            $menuKey = array_key_exists('menu_key', $r) ? (string) $r['menu_key'] : null;

            return [
                'user_level_id' => $levelId,
                'menu_id' => $menuId,
                'menu_key' => $menuKey,
                'view' => (bool) ($r['view'] ?? false),
                'add' => (bool) ($r['add'] ?? false),
                'edit' => (bool) ($r['edit'] ?? false),
                'delete' => (bool) ($r['delete'] ?? false),
                'approve' => (bool) ($r['approve'] ?? false),
                'updated_at' => $now,
                'created_at' => $now,
            ];
        }, $rows);

        $byId = array_values(array_filter($payload, fn($p) => !empty($p['menu_id'])));
        $byKey = array_values(array_filter($payload, fn($p) => !empty($p['menu_key'])));

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
