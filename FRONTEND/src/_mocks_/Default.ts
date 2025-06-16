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

interface TableDataItem {
  id: string; // Usaremos UUIDs para IDs únicos
  nome: string;
  email: string;
  telefone: string;
  [key: string]: string; // Para acesso dinâmico às chaves
}

export { cardsData };
export type { TableDataItem };
