<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/products",
     *     summary="Listar todos os produtos",
     *     tags={"Products"},
     *     @OA\Response(response=200, description="Lista de produtos retornada com sucesso")
     * )
     */
    public function index() {
        return response()->json(Product::all());
    }

    /**
     * @OA\Post(
     *     path="/api/products",
     *     summary="Criar um novo produto",
     *     tags={"Products"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "color", "price"},
     *             @OA\Property(property="name", type="string", example="Notebook Gamer"),
     *             @OA\Property(property="color", type="string", example="Preto"),
     *             @OA\Property(property="price", type="string", example="3499.99")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Produto criado com sucesso"),
     *     @OA\Response(response=422, description="Erro de validação")
     * )
     */
    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string',
            'color' => 'required|string',
            'price' => 'required|string',
        ]);

        return Product::create($validated);
    }

    /**
     * @OA\Get(
     *     path="/api/products/{product}",
     *     summary="Exibir um produto específico",
     *     tags={"Products"},
     *     @OA\Parameter(
     *         name="product",
     *         in="path",
     *         required=true,
     *         description="ID do produto",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Produto retornado com sucesso"),
     *     @OA\Response(response=404, description="Produto não encontrado")
     * )
     */
    public function show(Product $product) {
        return response()->json($product);
    }

    /**
     * @OA\Put(
     *     path="/api/products/{product}",
     *     summary="Atualizar um produto",
     *     tags={"Products"},
     *     @OA\Parameter(
     *         name="product",
     *         in="path",
     *         required=true,
     *         description="ID do produto",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="Notebook Atualizado"),
     *             @OA\Property(property="color", type="string", example="Cinza"),
     *             @OA\Property(property="price", type="string", example="2999.99")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Produto atualizado com sucesso"),
     *     @OA\Response(response=422, description="Erro de validação")
     * )
     */
    public function update(Request $request, Product $product) {
        $product->update($request->all());
        return response()->json($product);
    }

    /**
     * @OA\Delete(
     *     path="/api/products/{product}",
     *     summary="Deletar um produto",
     *     tags={"Products"},
     *     @OA\Parameter(
     *         name="product",
     *         in="path",
     *         required=true,
     *         description="ID do produto",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=204, description="Produto deletado com sucesso"),
     *     @OA\Response(response=404, description="Produto não encontrado")
     * )
     */
    public function destroy(Product $product) {
        $product->delete();
        return response()->json(null, 204);
    }
}
