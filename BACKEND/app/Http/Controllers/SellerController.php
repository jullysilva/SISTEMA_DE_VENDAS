<?php

namespace App\Http\Controllers;

use App\Models\Seller;
use Illuminate\Http\Request;

class SellerController extends Controller
{
    public function index() {
        return response()->json(Seller::with('shops')->get());
    }

    public function store(Request $request) {
        $data = $request->validate([
            'id_shop' => 'required|exists:shops,id',
            'name' => 'required|string|max:255',
            'cpf' => 'required|string|max:14',
        ]);

        $seller = Seller::create($data);
        return response()->json($seller, 201);
    }

    public function show(Seller $seller) {
        return response()->json($seller->load('shops'));
    }

    public function update(Request $request, Seller $seller) {
        $data = $request->validate([
            'name' => 'string|max:255',
            'cpf' => 'string|max:14',
        ]);

        $seller->update($data);
        return response()->json($seller);
    }

    public function destroy(Seller $seller) {
        $seller->delete();
        return response()->json(null, 204);
    }
}
