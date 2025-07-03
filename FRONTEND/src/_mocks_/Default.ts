import client from "../assets/pessoas.jpg";
import loja from "../assets/lojas.jpg";
import vendedor from "../assets/vendedor.jpg";
import produtos from "../assets/produtos.jpg";
import vendas from "../assets/vendas.jpg";

const cardsData = [
  {
    id: 1,
    image: client,
    text: "Cliente",
    route: "/cliente",
  },
  {
    id: 2,
    image: loja,
    text: "Loja",
    route: "/loja",
  },
  {
    id: 3,
    image: vendedor,
    text: "Vendedor",
    route: "/vendedore",
  },
  {
    id: 4,
    image: produtos,
    text: "produtos",
    route: "/produto",
  },
  {
    id: 5,
    image: vendas,
    text: "Vendas",
    route: "/venda",
  },
];

interface DataShopItem {
  id?: string;
  id_shop?: string;
  name: string;
  cnpj: string;
  cep: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  updated_at?: string;
  created_at?: string;
}

interface DataClientItem {
  id?: string;
  id_client?: string;
  name: string;
  cpf: string;
  gender: string;
  email: string;
  updated_at?: string;
  created_at?: string;
}

export { cardsData };
export type { DataShopItem, DataClientItem };
