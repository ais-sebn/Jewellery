import  {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import Products from "./components/pages/Products";
import Cart from "./components/pages/Cart";
import Admin from "./components/pages/Admin";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admindashboard" element={<Admin />} />
      </Routes>
    </Router>
  );
}



