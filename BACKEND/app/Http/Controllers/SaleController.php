<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;

abstract class SaleController extends Controller
{
    public function index() {
        return Sale::with('client', 'shop', 'seller', 'products')->get();
    }
    
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
    
    public function show(Sale $sale) {
        return $sale->load('client', 'shop', 'seller', 'products');
    }
    
    public function update(Request $request, Sale $sale) {

        $validateData = $request->validate([
            'date_seller' => 'required|string',
            'value_total' => 'required|numeric',
            'obs' => 'nullable|string',
            'payment_method' => 'required|in:Dinheiro,Credito,Debito',
        ]);
        
        $sale->update($validateData);

        return response()-> json($sale, 200);
    }
    
    public function destroy(Sale $sale) {
        $sale->delete();
        return response()->json(null, 204);

    }
    
}
