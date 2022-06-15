import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Dropdown, Button, NavDropdown } from "react-bootstrap";
import Icon from "../assets/Icon.png"
import cart from "../assets/cart.png"
import coffee from "../assets/coffee.png"
import uservector from "../assets/uservector.png"
import logout from "../assets/logout.png"
import zayn from "../assets/zayn.png"
import chat from "../assets/chat.png"



export default function Navbar() {

    const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);


  const closeReg = () => setRegister(false);
  const showReg = () => setRegister(true);

//   //login modal toggle
  const closeLogin = () => setLogin(false);
  const showLogin = () => setLogin(true);

const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return (
        <div>
            <nav>             
            <img src={Icon} className="icon" alt="icon" />
                <span className="buttons">
                  <button onClick={showLogin} className="LoginBTN">
                    Login
                  </button>
                  <button onClick={showReg} className="RegisterBTN">
                    Register
                  </button>
                </span>
              <Modal
                show={register}
                onHide={closeReg}
                // className="modalform"
              >
                <Modal.Header
                  style={{
                    paddingBottom: "13px",
                    paddingTop: "25px",
                    width: "416px",
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
                  <form className="form" onSubmit={showReg}>
                    <input
                      type="email"
                      placeholder="Email"
                    //   onChange={handleRegChange}
                    //   value={email}
                      name="email"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                    //   onChange={handleRegChange}
                    //   value={password}
                      name="password"
                    />
                    <input
                      type="text"
                      placeholder="Full Name"
                    //   onChange={handleRegChange}
                    //   value={fullname}
                      name="fullname"
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

              <Modal
                show={login}
                onHide={closeLogin}
                // className="modalform"
              >
                <Modal.Header
                  style={{
                    paddingBottom: "13px",
                    paddingTop: "25px",
                    width: "416px",
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
                  <form className="form" onSubmit={showLogin}>
                    <input
                      type="email"
                      placeholder="Email"
                      id="email"
                    //   onChange={handleLogChange}
                    //   required
                    //   value={logEmail}
                      name="email"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                    //   onChange={handleLogChange}
                    //   value={logPassword}
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
               {/* <span className="buttons">
              
                    <img src={cart} alt="cart" />
              
                  <NavDropdown
                    id="dropdown-basic"
                    title={
                      <img
                        className="avatar"
                        src={zayn}
                        alt="avatar"
                      />
                    }
                  >
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
                      to=""
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
                    <Dropdown.Item
                      className="dropdownItem"
                      href="#"
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
                </span> */}
            </nav>
        </div>
      );

}