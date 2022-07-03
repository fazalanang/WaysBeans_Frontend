import React, { useState, useContext, useEffect } from "react";
import sppSM from "../assets/sppSM.jpg"
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar.js";
import Jumbotron from "../assets/Jumbotron.png"
import { UserContext } from "../context/userContext";



//context
// import { UserContext } from "../context/userContext";

//API config
import { API } from "../config/api";

export default function Landing() {
  const [products, setProduct] = useState([]);
  const [state, dispatch] = useContext(UserContext);
  const [isOrtu1, setisOrtu1] = useState(false);

  const navigate = useNavigate ()
  const handleNavigateToSPP = () => {
      navigate ('/detail-SPP')
  }

  const getProducts = async () => {
    try {
      const response = await API.get("/products");
      setProduct(response.data.data.products);
      console.log(response.data.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const checkOrtu = () =>{
    if(state.user.name == "ortu siswa 1"){
      setisOrtu1(true)
    }
  }


  useEffect(() => {
    getProducts();
    checkOrtu();

  }, [state]);

  return (
    <>
      <Navbar />
      <div className="Hero">
            <img
              src={Jumbotron}
              className="heropic"
              alt="hero"
            />
          </div>
            <div className="products">
              {products?.map((item, index) => (
                  // <div className="product">
                  <Link key={index} to={`/detail-SPP/${item.id}`} className="product">
                      <img
                        src={item.image}
                        // onClick={handLog}
                        style={{ cursor: "pointer", width:231,height:302,marginBottom:0 }}
                        alt="icon"
                      />
                        {/* <img src={item.image} alt="icon" />   */}
                    <p className="productName">{item.name}</p>
                </Link>
              ))};
            </div>
    </>
  );
}