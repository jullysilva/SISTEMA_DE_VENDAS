<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/shops",
     *     summary="Listar todas as lojas",
     *     tags={"Shops"},
     *     @OA\Response(response=200, description="Lista de lojas retornada com sucesso")
     * )
     */
    public function index() {
        return response()->json(Shop::all());
    }

    /**
     * @OA\Post(
     *     path="/api/shops",
     *     summary="Criar uma nova loja",
     *     tags={"Shops"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "cnpj", "cep", "address", "neighborhood", "city", "state"},
     *             @OA\Property(property="name", type="string", example="Loja Central"),
     *             @OA\Property(property="cnpj", type="string", example="12.345.678/0001-99"),
     *             @OA\Property(property="cep", type="string", example="30100-000"),
     *             @OA\Property(property="address", type="string", example="Rua das Flores, 100"),
     *             @OA\Property(property="neighborhood", type="string", example="Centro"),
     *             @OA\Property(property="city", type="string", example="Belo Horizonte"),
     *             @OA\Property(property="state", type="string", example="MG")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Loja criada com sucesso"),
     *     @OA\Response(response=422, description="Erro de validação")
     * )
     */
    public function store(Request $request) {
        $validateData = $request->validate([
            'name' => 'required|string',
            'cnpj' => 'required|string',
            'cep' => 'required|string',
            'address' => 'required|string',
            'neighborhood' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
        ]);
        $shop = Shop::create($validateData);

        return response()->json($shop, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/shops/{shop}",
     *     summary="Exibir uma loja específica",
     *     tags={"Shops"},
     *     @OA\Parameter(
     *         name="shop",
     *         in="path",
     *         required=true,
     *         description="ID da loja",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Loja encontrada com sucesso"),
     *     @OA\Response(response=404, description="Loja não encontrada")
     * )
     */
    public function show(Shop $shop) {
        return response()->json($shop);
    }

    /**
     * @OA\Put(
     *     path="/api/shops/{shop}",
     *     summary="Atualizar uma loja",
     *     tags={"Shops"},
     *     @OA\Parameter(
     *         name="shop",
     *         in="path",
     *         required=true,
     *         description="ID da loja",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "cnpj", "cep", "address", "neighborhood", "city", "state"},
     *             @OA\Property(property="name", type="string", example="Loja Atualizada"),
     *             @OA\Property(property="cnpj", type="string", example="98.765.432/0001-88"),
     *             @OA\Property(property="cep", type="string", example="30130-000"),
     *             @OA\Property(property="address", type="string", example="Av. Amazonas, 200"),
     *             @OA\Property(property="neighborhood", type="string", example="Savassi"),
     *             @OA\Property(property="city", type="string", example="Belo Horizonte"),
     *             @OA\Property(property="state", type="string", example="MG")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Loja atualizada com sucesso"),
     *     @OA\Response(response=422, description="Erro de validação")
     * )
     */
    public function update(Request $request, Shop $shop) {
        $validateData = $request->validate([
            'name' => 'required|string',
            'cnpj' => 'required|string',
            'cep' => 'required|string',
            'address' => 'required|string',
            'neighborhood' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
        ]);

        $shop->update($validateData);

        return response()->json($shop, 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/shops/{shop}",
     *     summary="Excluir uma loja",
     *     tags={"Shops"},
     *     @OA\Parameter(
     *         name="shop",
     *         in="path",
     *         required=true,
     *         description="ID da loja",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=204, description="Loja excluída com sucesso"),
     *     @OA\Response(response=404, description="Loja não encontrada")
     * )
     */
    public function destroy(Shop $shop) {
        $shop->delete();
        return response()->json(null, 204);
    }
}
