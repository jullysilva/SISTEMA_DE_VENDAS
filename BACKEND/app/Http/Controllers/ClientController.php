<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/clients",
     *     summary="Listar todos os clientes",
     *     tags={"Clients"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de clientes retornada com sucesso"
     *     )
     * )
     */
    public function index() {
        return response()->json(Client::all());
    }

    /**
     * @OA\Post(
     *     path="/api/clients",
     *     summary="Criar um novo cliente",
     *     tags={"Clients"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name","cpf","gender","email"},
     *             @OA\Property(property="name", type="string", example="Maria Silva"),
     *             @OA\Property(property="cpf", type="string", example="123.456.789-00"),
     *             @OA\Property(property="gender", type="string", example="feminino"),
     *             @OA\Property(property="email", type="string", example="maria@email.com")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Cliente criado com sucesso"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Erro de validação"
     *     )
     * )
     */
    public function store(Request $request) {
        $validateData = $request->validate([
            'name' => 'required|string',
            'cpf' => 'required|string',
            'gender' => 'required|string',
            'email' => 'required|string',
        ]);
        $client = Client::create($validateData);
        return response()->json($client, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/clients/{client}",
     *     summary="Exibir um cliente específico",
     *     tags={"Clients"},
     *     @OA\Parameter(
     *         name="client",
     *         in="path",
     *         required=true,
     *         description="ID do cliente",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Cliente encontrado com sucesso"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Cliente não encontrado"
     *     )
     * )
     */
    public function show(Client $client) {
        return response()->json($client);
    }

    /**
     * @OA\Put(
     *     path="/api/clients/{client}",
     *     summary="Atualizar um cliente",
     *     tags={"Clients"},
     *     @OA\Parameter(
     *         name="client",
     *         in="path",
     *         required=true,
     *         description="ID do cliente",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name","cpf","gender","email"},
     *             @OA\Property(property="name", type="string", example="Maria Silva"),
     *             @OA\Property(property="cpf", type="string", example="123.456.789-00"),
     *             @OA\Property(property="gender", type="string", example="feminino"),
     *             @OA\Property(property="email", type="string", example="maria@email.com")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Cliente atualizado com sucesso"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Erro de validação"
     *     )
     * )
     */
    public function update(Request $request, Client $client) {
        $validateData = $request->validate([
            'name' => 'required|string',
            'cpf' => 'required|string',
            'gender' => 'required|string',
            'email' => 'required|string',
        ]);
        $client->update($validateData);
        return response()->json($client, 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/clients/{client}",
     *     summary="Excluir um cliente",
     *     tags={"Clients"},
     *     @OA\Parameter(
     *         name="client",
     *         in="path",
     *         required=true,
     *         description="ID do cliente",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Cliente excluído com sucesso"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Cliente não encontrado"
     *     )
     * )
     */
    public function destroy(Client $client) {
        $client->delete();
        return response()->json(null, 204);
    }
}
