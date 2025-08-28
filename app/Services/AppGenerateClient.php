<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class AppGenerateClient
{
    protected Client $http;
    protected string $key;

    public function __construct()
    {
        $this->http = new Client([
            'base_uri' => rtrim(config('services.appgenerate.base'), '/') . '/',
            'timeout'  => 10,
        ]);
        $this->key = (string) config('services.appgenerate.key');
    }

    protected function headers(): array
    {
        return [
            'Accept'   => 'application/json',
            'X-AG-KEY' => $this->key, // Warehouse → AppGenerate key
        ];
    }

    public function listProducts(array $query = []): array
    {
        $res = $this->http->get('public/products', [
            'headers' => $this->headers(),
            'query'   => $query,
        ]);
        return json_decode($res->getBody()->getContents(), true);
    }

    public function getProduct(string $idOrCode): array
    {
        $res = $this->http->get("public/products/{$idOrCode}", [
            'headers' => $this->headers(),
        ]);
        return json_decode($res->getBody()->getContents(), true);
    }

    public function listFeatures(array $query = []): array
    {
        $res = $this->http->get('public/features', [
            'headers' => $this->headers(),
            'query'   => $query,
        ]);
        return json_decode($res->getBody()->getContents(), true);
    }

    public function featuresByProduct(string $idOrCode): array
    {
        $res = $this->http->get("public/products/{$idOrCode}/features", [
            'headers' => $this->headers(),
        ]);
        return json_decode($res->getBody()->getContents(), true);
    }
       // === MENUS (baru) ===
    public function listMenus(array $query = []): array
    {
        $res = $this->http->get('public/menus', [
            'headers' => $this->headers(),
            'query'   => $query,
        ]);
        return json_decode($res->getBody()->getContents(), true);
    }

    public function menusByProduct(string $idOrCode): array
    {
        $res = $this->http->get("public/products/{$idOrCode}/menus", [
            'headers' => $this->headers(),
        ]);
        return json_decode($res->getBody()->getContents(), true);
    }

    public function menusTree(?string $productCode = null): array
    {
        $query = [];
        if ($productCode) $query['product_code'] = $productCode;

        $res = $this->http->get('public/menus/tree', [
            'headers' => $this->headers(),
            'query'   => $query,
        ]);
        return json_decode($res->getBody()->getContents(), true);
    }
}
