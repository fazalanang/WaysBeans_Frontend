import {  BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import AddProduct from "./pages/addProduct";
import Cart from "./pages/cart";


import "./styles/App.css";


function App() {
  

  return (
    <Router>
    <Routes>
      
      <Route path="/" element={<Landing />} />
      <Route path="/addProduct" element={<AddProduct />} />
      <Route path="/cart" element={<Cart />} />


     
    </Routes>
    </Router>
  );
}

export default App;