<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/sales",
     *     summary="Listar todas as vendas com relacionamentos",
     *     tags={"Sales"},
     *     @OA\Response(response=200, description="Lista de vendas retornada com sucesso")
     * )
     */
    public function index() {
        return Sale::with('client', 'shop', 'seller', 'products')->get();
    }

    /**
     * @OA\Post(
     *     path="/api/sales",
     *     summary="Criar uma nova venda",
     *     tags={"Sales"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"id_client", "id_shop", "id_seller", "date_sale", "value_total", "payment_method", "products"},
     *             @OA\Property(property="id_client", type="integer", example=1),
     *             @OA\Property(property="id_shop", type="integer", example=2),
     *             @OA\Property(property="id_seller", type="integer", example=3),
     *             @OA\Property(property="date_sale", type="string", example="2025-07-15"),
     *             @OA\Property(property="value_total", type="number", format="float", example=199.90),
     *             @OA\Property(property="obs", type="string", example="Venda com desconto"),
     *             @OA\Property(property="payment_method", type="string", enum={"Dinheiro", "Crédito", "Débito"}, example="Crédito"),
     *             @OA\Property(
     *                 property="products",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     required={"id", "quantity"},
     *                     @OA\Property(property="id", type="integer", example=1),
     *                     @OA\Property(property="quantity", type="integer", example=2)
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(response=201, description="Venda criada com sucesso"),
     *     @OA\Response(response=422, description="Erro de validação")
     * )
     */
    public function store(Request $request) {
        $validated = $request->validate([
            'id_client' => 'required|exists:clients,id',
            'id_shop' => 'required|exists:shops,id',
            'id_seller' => 'required|exists:sellers,id',
            'date_sale' => 'required|string',
            'value_total' => 'required|numeric',
            'obs' => 'nullable|string',
            'payment_method' => 'required|in:Dinheiro,Crédito,Débito',
            'products' => 'required|array',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        $sale = Sale::create($validated);
        foreach ($validated['products'] as $product) {
            $sale->products()->attach($product['id'], ['quantity' => $product['quantity']]);
        }

        return response()->json($sale->load('products'), 201);
    }

    /**
     * @OA\Get(
     *     path="/api/sales/{sale}",
     *     summary="Visualizar uma venda específica com detalhes",
     *     tags={"Sales"},
     *     @OA\Parameter(
     *         name="sale",
     *         in="path",
     *         required=true,
     *         description="ID da venda",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Venda retornada com sucesso"),
     *     @OA\Response(response=404, description="Venda não encontrada")
     * )
     */
    public function show(Sale $sale) {
        return $sale->load('client', 'shop', 'seller', 'products');
    }

    /**
     * @OA\Put(
     *     path="/api/sales/{sale}",
     *     summary="Atualizar informações de uma venda",
     *     tags={"Sales"},
     *     @OA\Parameter(
     *         name="sale",
     *         in="path",
     *         required=true,
     *         description="ID da venda",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"date_seller", "value_total", "payment_method"},
     *             @OA\Property(property="date_seller", type="string", example="2025-07-20"),
     *             @OA\Property(property="value_total", type="number", format="float", example=299.90),
     *             @OA\Property(property="obs", type="string", example="Atualizado pela gerência"),
     *             @OA\Property(property="payment_method", type="string", enum={"Dinheiro", "Credito", "Debito"}, example="Dinheiro")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Venda atualizada com sucesso"),
     *     @OA\Response(response=422, description="Erro de validação")
     * )
     */
    public function update(Request $request, Sale $sale) {
        $validateData = $request->validate([
            'date_seller' => 'required|string',
            'value_total' => 'required|numeric',
            'obs' => 'nullable|string',
            'payment_method' => 'required|in:Dinheiro,Credito,Debito',
        ]);

        $sale->update($validateData);

        return response()->json($sale, 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/sales/{sale}",
     *     summary="Deletar uma venda",
     *     tags={"Sales"},
     *     @OA\Parameter(
     *         name="sale",
     *         in="path",
     *         required=true,
     *         description="ID da venda",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=204, description="Venda deletada com sucesso"),
     *     @OA\Response(response=404, description="Venda não encontrada")
     * )
     */
    public function destroy(Sale $sale) {
        $sale->delete();
        return response()->json(null, 204);
    }
}
