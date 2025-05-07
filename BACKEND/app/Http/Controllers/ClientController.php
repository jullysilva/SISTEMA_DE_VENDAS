<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller {
    public function index(){
        $clients = Client::all();
        return response()->json($clients);
    }

    public function store(Request $request){
        $validateData = $request->validate([
            'name' => 'required|string',
            'cpf' => 'required|string',
            'gender' => 'required|string',
            'email' => 'required|string',
        ]);
        $clients = Client::create($validateData);

        return response()-> json($clients, 201);
    }

    public function show(Client $client){
        return response()-> json($client);
    }

    public function update(Request $request, Client $client){

        $validateData = $request->validate([
            'name' => 'required|string',
            'cpf' => 'required|string',
            'gender' => 'required|string',
            'email' => 'required|string',
        ]);
        
        $client->update($validateData);

        return response()-> json($client, 200);
    }

    public function destroy(Client $client){
        $client->delete();

        return response()->json(null, 204);
    }
}
