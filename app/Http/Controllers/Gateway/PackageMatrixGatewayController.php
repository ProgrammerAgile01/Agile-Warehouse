<!-- app/Http/Controllers/Gateway/PackageMatrixGatewayController.php -->

<?php
namespace App\Http\Controllers\Gateway;

use App\Http\Controllers\Controller;
use App\Services\PanelStoreClient;
use Illuminate\Support\Facades\Cache;

class PackageMatrixGatewayController extends Controller
{
    public function show(string $product, string $package)
    {
        $key = "pkg-matrix:{$product}:{$package}";
        $ttl = (int) env('WAREHOUSE_CACHE_SECONDS', 300);

        $json = Cache::remember($key, $ttl, function () use ($product, $package) {
            /** @var PanelStoreClient $cli */
            $cli  = app(PanelStoreClient::class);
            $resp = $cli->getPackageMatrix($product, $package);
            if (!($resp['ok'] ?? false)) {
                throw new \RuntimeException($resp['error'] ?? 'upstream error');
            }
            return $resp['json'] ?? [];
        });

        // Normalisasi bentuk agar konsisten buat FE
        return response()->json([
            'ok'   => true,
            'data' => [
                'product_code'  => $json['product_code'] ?? $product,
                'package_code'  => $json['package_code'] ?? $package,
                'menu_ids'      => $json['menu_ids'] ?? [],
                'feature_codes' => $json['feature_codes'] ?? [],
                // opsional buat debugging:
                'menus'         => $json['menus'] ?? [],
                'features'      => $json['features'] ?? [],
            ],
        ]);
    }
}
