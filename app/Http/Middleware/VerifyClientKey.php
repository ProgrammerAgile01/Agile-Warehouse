<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VerifyClientKey
{
    public function handle(Request $request, Closure $next)
    {
        $allowed = array_filter(array_map('trim', explode(',', (string) env('WAREHOUSE_TRUSTED_KEYS', ''))));

        // Dev mode: jika kosong, jangan blokir
        if (!count($allowed)) {
            return $next($request);
        }

        $key = $request->header('X-CLIENT-KEY');

        if (!$key || !in_array($key, $allowed, true)) {
            return response()->json(['message' => 'Forbidden client'], 403);
        }

        return $next($request);
    }
}
