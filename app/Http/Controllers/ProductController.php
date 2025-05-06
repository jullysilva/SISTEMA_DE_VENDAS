<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

abstract class ProductController extends Controller
{
    public function index() {
        $products = Product::all();
        return response()->json($products);

    }
    
    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string',
            'color' => 'required|string',
            'price' => 'required|string',
        ]);
        return Product::create($validated);
    }
    
    public function show(Product $product) {
        return response()->json($product);
    }
    
    public function update(Request $request, Product $product) {
        $product->update($request->all());
        return response()->json($product);
    }
    
    public function destroy(Product $product) {
        $product->delete();
        return response()->json(null, 204);
    }
        
}
