<?php

// namespace App\Http\Controllers\Gateway;

// use App\Http\Controllers\Controller;
// use App\Services\AppGenerateClient;
// use Illuminate\Http\Request;
// use Illuminate\Http\JsonResponse;

// class ProductGatewayController extends Controller
// {
//     public function __construct(protected AppGenerateClient $ag) {}

//     public function index(Request $request): JsonResponse
//     {
//         $payload = $this->ag->listProducts([
//             'q' => $request->query('q'),
//         ]);

//         return response()->json($payload);
//     }

//     public function show(string $idOrCode): JsonResponse
//     {
//         $payload = $this->ag->getProduct($idOrCode);

//         return response()->json($payload);
//     }
// }

namespace App\Http\Controllers\Gateway;

use App\Http\Controllers\Controller;
use App\Services\PanelStoreClient;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductGatewayController extends Controller
{
    public function __construct(
        protected PanelStoreClient $panel
    ) {}

    /** GET /api/catalog/products */
    /** GET /api/catalog/products */
    public function index(Request $request): JsonResponse
    {
        $query = [
            'q'        => $request->query('q'),
            'per_page' => (int) $request->query('per_page', 200),
        ];

        $resp = $this->panel->listProducts($query);

        if (!$resp['ok']) {
            return response()->json([
                'message'  => 'Upstream (Panel) error',
                'upstream' => $resp['error'] ?? $resp['status'] ?? null,
            ], 502);
        }

        // Panel sudah kirim bentuk {data: [...]} (atau paginator). Proxy apa adanya.
        return response()->json($resp['json']);
    }

    /** GET /api/catalog/products/{codeOrId} */
    public function show(string $codeOrId): JsonResponse
    {
        $resp = $this->panel->getProduct($codeOrId);

        if (!$resp['ok']) {
            $status = 502;
            $body   = ['message' => 'Upstream (Panel) error', 'upstream' => $resp['error'] ?? null];

            // Jika dari panel 404, terjemahkan 404
            if (preg_match('/404/', (string)($resp['error'] ?? ''))) {
                $status = 404;
                $body   = ['message' => 'Product not found'];
            }

            return response()->json($body, $status);
        }

        return response()->json($resp['json']);
    }
}