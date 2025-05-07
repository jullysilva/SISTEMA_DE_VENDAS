import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "../App";
import Cliente from "../Pages/Client";
import Loja from "../Pages/Loja";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
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
