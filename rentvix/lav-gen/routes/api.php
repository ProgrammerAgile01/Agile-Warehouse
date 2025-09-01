<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Public\FeaturePublicController;
use App\Http\Controllers\Generate\MenuController;
use App\Http\Middleware\VerifyGatewayKey;

Route::get('{entity}/export-pdf', [\App\Http\Controllers\Export\ExportPdfController::class, 'export'])->name('pdf.export');
// Route for mst_users
Route::get('data-users/actions', [\App\Http\Controllers\Overrides\DataUserController::class, 'listActions']);
Route::match(['GET','POST'], 'data-users/actions/{actionKey}', [\App\Http\Controllers\Overrides\DataUserController::class, 'runAction']);
Route::get('data-users/export-excel', [\App\Http\Controllers\Generate\DataUserController::class, 'exportExcel']);
Route::apiResource('data-users', \App\Http\Controllers\Overrides\DataUserController::class);
// Route for mst_kendaraans
Route::get('data-kendaraans/actions', [\App\Http\Controllers\Overrides\DataKendaraanController::class, 'listActions']);
Route::match(['GET','POST'], 'data-kendaraans/actions/{actionKey}', [\App\Http\Controllers\Overrides\DataKendaraanController::class, 'runAction']);
Route::get('data-kendaraans/export-excel', [\App\Http\Controllers\Generate\DataKendaraanController::class, 'exportExcel']);
Route::apiResource('data-kendaraans', \App\Http\Controllers\Overrides\DataKendaraanController::class);

// == menus_START ==


Route::get('menus/tree', [MenuController::class, 'tree']);
Route::post('menus/reorder', [MenuController::class, 'reorder']);
Route::post('menus/{id}/restore', [MenuController::class, 'restore']);
Route::delete('menus/{id}/force', [MenuController::class, 'forceDelete']);
Route::apiResource('menus', MenuController::class);
// == menus_END ==
// Semua endpoint publik harus lewat Warehouse (X-AG-KEY)
Route::middleware([VerifyGatewayKey::class])->group(function () {
    Route::get('/public/features', [FeaturePublicController::class, 'index']);
    Route::get('/public/features/by-product/{idOrCode}', [FeaturePublicController::class, 'byProduct']);
});


// Healthcheck sederhana
Route::get('/health', fn () => response()->json(['ok' => true, 'service' => 'appgenerate']));