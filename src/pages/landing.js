import React, { useState, useContext, useEffect } from "react";
// import styles from "../styles/Landing.module.css";
// import { Modal, Dropdown, NavDropdown } from "react-bootstrap";
// import { Link, Navigate } from "react-router-dom";
// // import Transactions from "../components/Transactions";
// //import stylesN from "../components/Navbar.module.css";
import Navbar from "../components/navbar.js";
import Jumbotron from "../assets/Jumbotron.png"



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
                      src="{}"
                      // onClick={handLog}
                      style={{ cursor: "pointer" }}
                      alt="icon"
                    />
               
                   
                      <img src="" alt="icon" />
                    
                  
                  <p className="productName">kopi</p>
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
