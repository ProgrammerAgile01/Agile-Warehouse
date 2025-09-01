<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\VerifyClientKey;
use App\Http\Controllers\Gateway\ProductGatewayController;
use App\Http\Controllers\Gateway\FeatureGatewayController;
use App\Http\Controllers\Gateway\MenuGatewayController;

// Health check (tanpa middleware)
Route::get('/health', fn () => response()->json([
    'ok'      => true,
    'service' => 'agile-warehouse',
]));

// ================== CATALOG (read-only proxy to AppGenerate) ==================
Route::prefix('catalog')
    // ->middleware(['client.key']) // <-- aktifkan jika punya middleware validasi X-CLIENT-KEY
    ->group(function () {
        // Daftar produk (digroup dari semua fitur AppGenerate)
        Route::get('/products',            [ProductGatewayController::class, 'index']);
        // Detail agregat satu produk (dari kumpulan fiturnya)
        Route::get('/products/{code}',     [ProductGatewayController::class, 'show']);

        // Fitur per produk (read-only, bersumber dari AppGenerate)
        Route::get('/products/{code}/features', [ProductGatewayController::class, 'features']);

        // Menu per produk (read-only, bersumber dari AppGenerate)
        Route::get('/products/{code}/menus',    [ProductGatewayController::class, 'menus']);
    });

// ================== (Opsional) Endpoint util untuk debugging ==================
Route::prefix('features')
    // ->middleware(['client.key']) // <-- opsional validasi X-CLIENT-KEY
    ->group(function () {
        // List fitur dengan filter ?product_code=...&type=...
        Route::get('/',                 [FeatureGatewayController::class, 'index']);
        // Alias fitur-per-produk: /api/features/{product}
        Route::get('/{product}',        [FeatureGatewayController::class, 'byProduct']);
    });

    // === MENUS gateway (baru) ===
    Route::get('/catalog/menus',                    [MenuGatewayController::class, 'index']);     // ?product_code=&type=
    Route::get('/catalog/menus/tree',               [MenuGatewayController::class, 'tree']);      // ?product_code=
    Route::get('/catalog/products/{code}/menus',    [MenuGatewayController::class, 'byProduct']); // by product code