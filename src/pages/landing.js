import React, { useState, useContext, useEffect } from "react";
// import styles from "../styles/Landing.module.css";
// import { Modal, Dropdown, NavDropdown } from "react-bootstrap";
// import { Link, Navigate } from "react-router-dom";
// // import Transactions from "../components/Transactions";
// //import stylesN from "../components/Navbar.module.css";
import Navbar from "../components/navbar.js";
import Jumbotron from "../assets/Jumbotron.png"
import product1 from "../assets/product1.png"



//context
// import { UserContext } from "../context/userContext";

//API config
// import { API, setAuthToken } from "../config/api";

export default function Landing() {
  //state

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
                <div className="product">
                 
                    <img
                      src={product1}
                      // onClick={handLog}
                      style={{ 
                        cursor: "pointer",
                        width: 231,
                        height: 302,
                        marginBottom: 0
                       }}
                      alt="product"
                    />
                  <p className="productName">RWANDA Beans</p>
                  <p className="productDesc" style={{ marginBottom: 0 }}>
                    Rp.300.000
                  </p>
                  <p
                    className="productDesc"
                    style={{ marginBottom: "5px" }}
                  >
                    Stock: 23
                  </p>
                </div>
          </div>
    
    </>
  );
}
