<?php

use Illuminate\Support\Facades\Route;

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