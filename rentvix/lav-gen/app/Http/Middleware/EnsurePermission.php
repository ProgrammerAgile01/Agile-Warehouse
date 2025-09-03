<?php

namespace App\Http\Middleware;

use App\Models\AccessControlMatrix;
use Closure;
use Illuminate\Http\Request;

class EnsurePermission
{
    // Pakai: ->middleware('perm:view,123')
    public function handle(Request $request, Closure $next, string $action, string $menuId)
    {
        $allowed = false;

        // 1) Cek dari klaim perms (cepat)
        $perms = $request->get('perms');
        if (is_array($perms)) {
            foreach ($perms as $p) {
                if ((int)($p['menu_id'] ?? 0) === (int)$menuId) {
                    $allowed = (bool) ($p[$action] ?? false);
                    break;
                }
            }
        }

        // 2) Fallback cek DB (jika klaim kosong atau menu belum ada)
        if (!$allowed) {
            $levelId = $request->get('level_id');
            if ($levelId) {
                $row = AccessControlMatrix::query()
                    ->where('user_level_id', $levelId)
                    ->where('menu_id', $menuId)
                    ->first();
                if ($row && (bool) $row->{$action}) {
                    $allowed = true;
                }
            }
        }

        if (!$allowed) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return $next($request);
    }
}
