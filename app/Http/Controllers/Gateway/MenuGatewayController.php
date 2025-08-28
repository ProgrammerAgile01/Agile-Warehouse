<?php

namespace App\Http\Controllers\Gateway;

use App\Http\Controllers\Controller;
use App\Services\AppGenerateClient;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MenuGatewayController extends Controller
{
    public function __construct(protected AppGenerateClient $ag) {}

    /**
     * GET /api/catalog/menus
     * Query: ?product_code=xxx&type=menu|module|group|submenu
     */
    public function index(Request $request): JsonResponse
    {
        $payload = $this->ag->listMenus([
            'product_code' => $request->query('product_code'),
            'type'         => $request->query('type'),
        ]);
        return response()->json($payload);
    }

    /**
     * GET /api/catalog/products/{idOrCode}/menus
     */
    public function byProduct(string $idOrCode): JsonResponse
    {
        $payload = $this->ag->menusByProduct($idOrCode);
        return response()->json($payload);
    }

    /**
     * GET /api/catalog/menus/tree
     * Query: ?product_code=xxx
     */
    public function tree(Request $request): JsonResponse
    {
        $payload = $this->ag->menusTree($request->query('product_code'));
        return response()->json($payload);
    }
}
