<?php

namespace App\Http\Controllers\Gateway;

use App\Http\Controllers\Controller;
use App\Services\AppGenerateClient;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductGatewayController extends Controller
{
    public function __construct(protected AppGenerateClient $ag) {}

    public function index(Request $request): JsonResponse
    {
        $payload = $this->ag->listProducts([
            'q' => $request->query('q'),
        ]);

        return response()->json($payload);
    }

    public function show(string $idOrCode): JsonResponse
    {
        $payload = $this->ag->getProduct($idOrCode);

        return response()->json($payload);
    }
}
