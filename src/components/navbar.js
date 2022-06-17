import React, { useContext, useState, useEffect  } from "react";
import { UserContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Dropdown, Button, NavDropdown } from "react-bootstrap";
import Icon from "../assets/Icon.png"
import cart from "../assets/cart.png"
import coffee from "../assets/coffee.png"
import uservector from "../assets/uservector.png"
import logout from "../assets/logout.png"
import zayn from "../assets/zayn.png"
import chat from "../assets/chat.png"

import { API, setAuthToken } from "../config/api";


export default function Navbar() {
  let navigate = useNavigate();
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const { emailLogin, passwordLogin } = formLogin;


  const { name, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginChange = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const closeReg = () => setRegister(false);
  const showReg = () => setRegister(true);

//   //login modal toggle
  const closeLogin = () => setLogin(false);
  const showLogin = () => setLogin(true);

const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/register", body, config);
      console.log(response.data);
      setRegister(false)
    } catch (error) {
    
      console.log(error);
    }
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      
      const body = JSON.stringify({email : formLogin.email, password: formLogin.password});

      const response = await API.post("/login", body, config);
      // setAuthToken(response.data.data.user.token);

      if (response?.status == 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data.user,
        });

        // Status check
        if (response.data.data.user.status == "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }

       
      }
      setLogin(false)
    } catch (error) {
      console.log(formLogin)
      console.log(error);
    }
  };


  useEffect(() => {
    console.log(state.user.status)
  }, [state]);
    return (
        <div>
            <nav>
            <Link to="/">             
            <img src={Icon} className="icon" alt="icon" />
            </Link>
            {!state.isLogin ? (
              <div>
                <span className="buttons">
                  <button onClick={showLogin} className="LoginBTN">
                    Login
                  </button>
                  <button onClick={showReg} className="RegisterBTN">
                    Register
                  </button>
                </span>
            {/* REGISTER */}
              <Modal
                show={register}
                onHide={closeReg}
                // className="modalform"
              >
                <Modal.Header
                  style={{
                    paddingBottom: "13px",
                    paddingTop: "25px",
                    width: "400px",
                    paddingLeft: "25px",
                    borderBottom: "0 none",
                  }}
                >
                  <Modal.Title>
                    <p className="formTitle" style={{ marginBottom: 0 }}>
                      Register
                    </p>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body 
                className="modalBody"
                >
                  <form className="form" onSubmit={handleSubmit}>
                    <input
                      type="email"
                      placeholder="Email"
                      onChange={handleChange}
                      value={email}
                      name="email"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      onChange={handleChange}
                      value={password}
                      name="password"
                    />
                    <input
                      type="name"
                      placeholder="Full Name"
                      onChange={handleChange}
                      value={name}
                      name="name"
                    />

                    <button type="submit">Register</button>
                  </form>
                </Modal.Body>
                <Modal.Footer
                  className="formFooter"
                  style={{ borderTop: "0 none" }}
                >
                  <p>Already have an account ? Click</p>
                  <p
                    style={{ marginLeft: 0 }}
                    onClick={() => {
                      closeReg();
                      showLogin();
                    }}
                    className="footerLink"
                  >
                    Here
                  </p>
                </Modal.Footer>
              </Modal>
            {/* LOGIN */}
              <Modal
                show={login}
                onHide={closeLogin}
                // className="modalform"
              >
                <Modal.Header
                  style={{
                    paddingBottom: "13px",
                    paddingTop: "25px",
                    width: "400px",
                    paddingLeft: "25px",
                    borderBottom: "0 none",
                  }}
                >
                  <Modal.Title>
                    <p className="formTitle" style={{ marginBottom: 0 }}>
                      Login
                    </p>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalBody">
                  <form className="form" onSubmit={handleLogin}>
                    <input
                       type="email"
                       placeholder="Email"
                       onChange={handleLoginChange}
                       value={emailLogin}
                       name="email"
                    />
                    <input
                     type="password"
                     placeholder="Password"
                     onChange={handleLoginChange}
                     value={passwordLogin}
                     name="password"
                    />
                    <button type="submit">Login</button>
                  </form>
                </Modal.Body>
                <Modal.Footer
                  className="formFooter"
                  style={{ borderTop: "0 none" }}
                >
                  <p>Don't have an account ? Click</p>
                  <p
                    style={{ marginLeft: 0 }}
                    onClick={() => {
                      closeLogin();
                      showReg();
                    }}
                    className="footerLink"
                  >
                    Here
                  </p>
                </Modal.Footer> 
               </Modal>
          
               </div>
               ):(
                <span className="buttons">
                  <Link to="/cart">
                    <img src={cart} alt="cart" />
                  </Link>
                  <NavDropdown
                    id="dropdown-basic"
                    title={
                      <img
                        className="avatar"
                        src={zayn}
                        alt="avatar"
                      />
                    }>
                    { state.user.status == "customer" ? (
                      <div>
                    <Link
                      className="dropdownItem"
                      to="/profile"
                      style={{ textDecoration: "none" }}
                    >
                     
                      <img
                        src={uservector}
                        className="dropdownPict"
                        alt="profile"
                      />
                      <span className="dropdownText">Profile</span>
                    </Link>
                    <Dropdown.Divider />
                    <Link
                      className="dropdownItem"
                      to="/complain"
                      style={{ textDecoration: "none" }}
                    >
                     
                      <img
                        src={chat}
                        className="dropdownPict"
                        alt="profile"
                      />
                      <span className="dropdownText">Complain</span>
                    </Link>
                    <Dropdown.Divider />
                    </div>
                    ):(
                      <div>
                      <Link
                      className="dropdownItem"
                      to="/addProduct"
                      style={{ textDecoration: "none" }}
                    >
                     
                      <img
                        src={coffee}
                        className="dropdownPict"
                        alt="profile"
                      />
                      <span className="dropdownText">Add Product</span>
                    </Link>
                    <Dropdown.Divider />
                    <Link
                      className="dropdownItem"
                      to="/complain-admin"
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        src={chat}
                        className="dropdownPict"
                        alt="profile"
                      />
                      <span className="dropdownText">Complain</span>
                    </Link>
                    <Dropdown.Divider />
                    </div>
                    )}
                    <Dropdown.Item
                      className="dropdownItem"
                      onClick={logout}
                      style={{ padding: 0 }}
                    >
                      <img
                        src={logout}
                        className="dropdownPict"
                        alt="logout"
                      />
                      <span className="dropdownText">Logout</span>
                    </Dropdown.Item>
                  </NavDropdown>
                </span> )}
            </nav>
        </div>
      );

}