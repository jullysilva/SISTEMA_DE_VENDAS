<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use Illuminate\Http\Request;

class ShopController extends Controller {
    public function index(){
        $shops = Shop::all();
        return response()->json($shops);
    }

    public function store(Request $request){
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

        return response()-> json($shop, 201);
    }

    public function show(Shop $shop){
        return response()-> json($shop);
    }

    public function update(Request $request, Shop $shop){

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

        return response()-> json($shop, 200);
    }

    public function destroy(Shop $shop){
        $shop->delete();

        return response()->json(null, 204);
    }
}
