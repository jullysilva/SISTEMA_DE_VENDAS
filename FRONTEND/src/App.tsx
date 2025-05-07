import client from "./assets/pessoas.jpg";
import loja from "./assets/lojas.jpg";
import vendedor from "./assets/vendedor.jpg";
import produtos from "./assets/produtos.jpg";
import vendas from "./assets/vendas.jpg";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const handleNext = (url: string) => {
    setTimeout(() => {
      navigate(url);
    }, 500);
  };

  return (
    <div className="grid grid-cols-5 md:grid-cols-3 gap-3">
      <figure
        onClick={() => handleNext("/cliente")}
        className="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0"
      >
        <a>
          <img
            src={client}
            className="relative h-auto max-w-full"
            alt="Vite logo"
          />
        </a>
        <figcaption className="absolute z-50 px-4 text-lg text-white bottom-6">
          <p>Cliente</p>
        </figcaption>
      </figure>

      <figure
        onClick={() => handleNext("/loja")}
        className="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0"
      >
        <a href="https://vite.dev">
          <img src={loja} className="h-auto max-w-full" alt="Vite logo" />
        </a>
        <figcaption className="absolute px-4 text-center text-lg text-white bottom-6">
          <p>Lojas</p>
        </figcaption>
      </figure>

      <figure
        onClick={() => handleNext("/vendedor")}
        className="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0"
      >
        <a href="https://vite.dev">
          <img src={vendedor} className="h-auto max-w-full" alt="Vite logo" />
        </a>
        <figcaption className="absolute px-4 text-lg text-white bottom-6">
          <p>Vendedor</p>
        </figcaption>
      </figure>

      <figure
        onClick={() => handleNext("/produtos")}
        className="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0"
      >
        <a href="https://vite.dev">
          <img src={produtos} className="h-auto max-w-full" alt="Vite logo" />
        </a>
        <figcaption className="absolute px-4 text-lg text-white bottom-6">
          <p>Produtos</p>
        </figcaption>
      </figure>

      <figure
        onClick={() => handleNext("/vendas")}
        className="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0"
      >
        <a href="https://vite.dev">
          <img src={vendas} className="h-auto max-w-full" alt="Vite logo" />
        </a>
        <figcaption className="absolute px-4 text-lg text-white bottom-6">
          <p>Vendas</p>
        </figcaption>
      </figure>
    </div>
  );
}

export default App;
