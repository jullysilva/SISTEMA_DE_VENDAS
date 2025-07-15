<?php

namespace App\Http\Controllers;

use App\Models\Seller;
use Illuminate\Http\Request;

class SellerController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/sellers",
     *     summary="Listar todos os vendedores com suas lojas",
     *     tags={"Sellers"},
     *     @OA\Response(response=200, description="Lista de vendedores retornada com sucesso")
     * )
     */
    public function index() {
        return response()->json(Seller::with('shops')->get());
    }

    /**
     * @OA\Post(
     *     path="/api/sellers",
     *     summary="Criar um novo vendedor",
     *     tags={"Sellers"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"id_shop", "name", "cpf"},
     *             @OA\Property(property="id_shop", type="integer", example=1),
     *             @OA\Property(property="name", type="string", example="João da Silva"),
     *             @OA\Property(property="cpf", type="string", example="123.456.789-00")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Vendedor criado com sucesso"),
     *     @OA\Response(response=422, description="Erro de validação")
     * )
     */
    public function store(Request $request) {
        $data = $request->validate([
            'id_shop' => 'required|exists:shops,id',
            'name' => 'required|string|max:255',
            'cpf' => 'required|string|max:14',
        ]);

        $seller = Seller::create($data);
        return response()->json($seller, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/sellers/{seller}",
     *     summary="Obter detalhes de um vendedor específico",
     *     tags={"Sellers"},
     *     @OA\Parameter(
     *         name="seller",
     *         in="path",
     *         required=true,
     *         description="ID do vendedor",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Vendedor retornado com sucesso"),
     *     @OA\Response(response=404, description="Vendedor não encontrado")
     * )
     */
    public function show(Seller $seller) {
        return response()->json($seller->load('shops'));
    }

    /**
     * @OA\Put(
     *     path="/api/sellers/{seller}",
     *     summary="Atualizar dados de um vendedor",
     *     tags={"Sellers"},
     *     @OA\Parameter(
     *         name="seller",
     *         in="path",
     *         required=true,
     *         description="ID do vendedor",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="João Atualizado"),
     *             @OA\Property(property="cpf", type="string", example="987.654.321-00")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Vendedor atualizado com sucesso"),
     *     @OA\Response(response=422, description="Erro de validação")
     * )
     */
    public function update(Request $request, Seller $seller) {
        $data = $request->validate([
            'name' => 'string|max:255',
            'cpf' => 'string|max:14',
        ]);

        $seller->update($data);
        return response()->json($seller);
    }

    /**
     * @OA\Delete(
     *     path="/api/sellers/{seller}",
     *     summary="Deletar um vendedor",
     *     tags={"Sellers"},
     *     @OA\Parameter(
     *         name="seller",
     *         in="path",
     *         required=true,
     *         description="ID do vendedor",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=204, description="Vendedor deletado com sucesso"),
     *     @OA\Response(response=404, description="Vendedor não encontrado")
     * )
     */
    public function destroy(Seller $seller) {
        $seller->delete();
        return response()->json(null, 204);
    }
}
