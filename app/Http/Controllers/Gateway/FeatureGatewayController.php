<?php

namespace App\Http\Controllers\Gateway;

use App\Http\Controllers\Controller;
use App\Services\AppGenerateClient;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FeatureGatewayController extends Controller
{
    public function __construct(protected AppGenerateClient $ag) {}

    public function index(Request $request): JsonResponse
    {
        $payload = $this->ag->listFeatures([
            'product_code' => $request->query('product_code'),
            'type'         => $request->query('type'),
        ]);

        return response()->json($payload);
    }

    public function byProduct(string $idOrCode): JsonResponse
    {
        $payload = $this->ag->featuresByProduct($idOrCode);

        return response()->json($payload);
    }
}
