import type { DataClientItem } from "../_mocks_/Default";
import { api } from "./api";

function getAllClients() {
  const response = api.get("/clients");
  console.log(response);

  return response;
}

function getClient(id: number) {
  const response = api.get<DataClientItem>(`/clients/${id}`);

  return response;
}

function createClient(data: DataClientItem) {
  const response = api.post("/clients", data);

  return response;
}

async function updateClient(id: number, request: DataClientItem) {
  const data = {
    name: request.name,
    cpf: request.cpf,
    email: request.email,
    gender: request.gender,
  };
  const response = await api.put(`/clients/${id}`, data);

  return response;
}

function deleteClient(id: string) {
  const response = api.delete(`/clients/${id}`);

  return response;
}

export { getAllClients, getClient, createClient, updateClient, deleteClient };
