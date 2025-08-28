<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Gateway\ProductGatewayController;
use App\Http\Controllers\Gateway\FeatureGatewayController;
use App\Http\Controllers\Gateway\MenuGatewayController;

/*
|--------------------------------------------------------------------------
| API Routes - Agile Warehouse (Gateway)
|--------------------------------------------------------------------------
|
| Panel FE → Warehouse: kirim X-CLIENT-KEY (opsional: jika VerifyClientKey diaktifkan)
| Warehouse → AppGenerate: kirim X-AG-KEY (diatur di service client)
|
*/

Route::middleware(['client.key'])->group(function () {

    // Products (proxy dari AppGenerate)
    Route::get('/catalog/products', [ProductGatewayController::class, 'index']);
    Route::get('/catalog/products/{idOrCode}', [ProductGatewayController::class, 'show']);

    // Features (proxy dari AppGenerate)
    Route::get('/catalog/features', [FeatureGatewayController::class, 'index']);
    Route::get('/catalog/products/{idOrCode}/features', [FeatureGatewayController::class, 'byProduct']);

       // === MENUS (baru) ===
    Route::get('/catalog/menus', [MenuGatewayController::class, 'index']);
    Route::get('/catalog/menus/tree', [MenuGatewayController::class, 'tree']);
    Route::get('/catalog/products/{idOrCode}/menus', [MenuGatewayController::class, 'byProduct']);
});

// Healthcheck sederhana (tanpa kunci)
Route::get('/health', fn () => response()->json(['ok' => true, 'service' => 'agile-warehouse']));
