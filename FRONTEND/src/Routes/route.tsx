import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cliente from "../Pages/Client";
import Loja from "../Pages/Loja";
import { Panel } from "../Painel";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Panel />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/loja" element={<Loja />} />
        {/* <Route path="/vendedor" element={<Cliente />} />
        <Route path="/produtos" element={<Cliente />} />
        <Route path="/vendas" element={<Cliente />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
