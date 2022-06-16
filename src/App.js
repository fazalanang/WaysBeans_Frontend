import {  BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import AddProduct from "./pages/addProduct";
import Cart from "./pages/cart";
import Complain from "./pages/complain";
import DetailProduct from "./pages/detailProduct";


import "./styles/App.css";
import Admin from "./pages/adminDashboard";


function App() {
  

  return (
    <Router>
    <Routes>
      
      <Route path="/" element={<Landing />} />
      <Route path="/addProduct" element={<AddProduct />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/complain" element={<Complain/>} />
      <Route path="/Detail-Product" element={<DetailProduct/>}/>
      <Route path="/Admin-Dashboard" element={<Admin/>}/>


     
    </Routes>
    </Router>
  );
}

export default App;