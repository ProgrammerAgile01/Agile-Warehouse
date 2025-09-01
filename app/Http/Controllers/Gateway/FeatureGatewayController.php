<?php

namespace App\Http\Controllers\Gateway;

use App\Http\Controllers\Controller;
use App\Services\AppGenerateClient;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FeatureGatewayController extends Controller
{
    public function __construct(protected AppGenerateClient $ag) {}

    /**
     * GET /api/features
     * Opsional filter: ?product_code=...&type=...  (+ paginate=0 default)
     * Kembalikan data yang SUDAH dinormalisasi agar konsisten dengan FE.
     */
   public function index(Request $request): JsonResponse
{
    $payload = $this->ag->listFeatures([
        'product_code' => $request->query('product_code'),
        'type'         => $request->query('type'),
    ]);

    if (!$payload['ok']) {
        return response()->json([
            'message'  => 'Upstream (AppGenerate) error',
            'upstream' => $payload['error'] ?? $payload['status'],
        ], 502);
    }

    return response()->json(['data' => $payload['json']['data'] ?? []]);
}

public function byProduct(string $idOrCode): JsonResponse
{
    $payload = $this->ag->featuresByProduct($idOrCode);

    if (!$payload['ok']) {
        return response()->json([
            'message'  => 'Upstream (AppGenerate) error',
            'upstream' => $payload['error'] ?? $payload['status'],
        ], 502);
    }

    return response()->json(['data' => $payload['json']['data'] ?? []]);
}
}
