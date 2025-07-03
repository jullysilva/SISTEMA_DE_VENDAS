import type { DataShopItem } from "../_mocks_/Default";
import { api } from "./api";

function getAllShops() {
  const response = api.get("/shops");

  return response;
}

function getShop(id: number) {
  const response = api.get(`/shops/${id}`);
  console.log(response);

  return response;
}

function createShop(data: DataShopItem) {
  const response = api.post("/shops", data);

  return response;
}

async function updateShop(id: number, request: DataShopItem) {
  const data = {
    name: request.name,
    cnpj: request.cnpj,
    cep: request.cep,
    address: request.address,
    neighborhood: request.neighborhood,
    city: request.city,
    state: request.state,
  };
  const response = await api.put(`/shops/${id}`, data);

  return response;
}

function deleteShop(id: string) {
  const response = api.delete(`/shops/${id}`);

  return response;
}

export { getAllShops, getShop, createShop, updateShop, deleteShop };
