import React, { useState, useEffect } from "react";
import { 
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar.js";
import Trash from "../assets/trash.svg"
import { API } from "../config/api";
import convertRupiah from "rupiah-format";
import axios from "axios";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [qty, setQty] = useState(0);
  let navigate = useNavigate();
  const [dataAddress, setDataAddress] = useState([]);
  const [postcode, setPostCode] = useState('');
  const [form, setForm] = useState({
    postalcode: "",
  });

  const getProductCart = async () => {
    try {
      const response = await API.get("/cart");
      setProducts(response.data.data);
      console.log(response.data.data)
      const totalqty = response.data.data.reduce(
        (sum, elem) => sum + elem.qty,
        0
      );
        setQty(totalqty)
        console.log(totalqty)

        const totalprice = response.data.data.reduce(
          (sum, elem) => sum + elem.qty * elem.product.price,
          0
        );
          setTotal(totalprice)
          console.log(totalprice)
    } catch (error) {
      console.log(error);
    }
  };
  
  // const increaseCart = async (idProduct) => {
  //   try {
  //     const result = products.find(({ id }) => id == idProduct);
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     };

  //     const body = JSON.stringify({ qty: result.qty + 1 });
  //     const response = await API.patch("/cart/" + idProduct, body, config);
  //     console.log(result.qty++);
  //     getProductCart();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const decreaseCart = async (idProduct) => {
  //   try {
  //     const result = products.find(({ id }) => id == idProduct);
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     };

  //     const body = JSON.stringify({ qty: result.qty - 1 });
  //     const response = await API.patch("/cart/" + idProduct, body, config);
  //     console.log(result.qty--);
  //     getProductCart();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleBuy = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data ={
        price : total,
        qty: qty,
        product: products,
        address: postcode
      }
      
      const body = JSON.stringify(data);
      const response = await API.post(
        "/transaction/",
        body,
        config
      );
      console.log(response);

      const token = response.data.payment.token;

      // // Init Snap for display payment page with token here ...
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          API.delete(`/transaction/${response.data.id}`);
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };


  const deleteById = async (id) => {
    try {
      await API.delete(`/cart/${id}`);
      getProductCart();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductCart();
    sendAddress()
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "Client key here ...";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const { postalcode } = form;
  const handleChange = (e) => {
    setPostCode(
       e.target.value,
    );
    // console.log(e.target.value)
  };

  const sendAddress = async (e) => {
    try {
      const response = await axios.get(
        `https://kodepos.herokuapp.com/search/?q=${e.target.value}`
      );
      setDataAddress(response.data.data) 
      console.log(dataAddress)
    } catch (error) {
      console.log(error)
    }}

  return (
    <>
      <Navbar />

      <Container className="ps-4">
        <Row className="Order justify-content-end" style={{marginLeft: 75, marginTop :90}}>
          <Col sm={12} lg={8} className="mb-2" >
                <InputGroup>
                  <FormControl
                    // value={}
                    size="lg"
                    placeholder="Input Address and Select"
                    style={{
                      fontSize: "0.9em",
                      height: "50px",
                      boxShadow: " 10px 20px 30px rgba(0, 0, 0, 0.25)",
                      backgroundColor: "#e8e8e8",
                      border: "none"
                    }}
                    onKeyPress={sendAddress}
                  />
                </InputGroup>
          </Col>

          <Col sm={12} lg={4} className="mapBtn" >
            <Form.Select size="lg" style={{
                      fontSize: "1em",
                      height: "50px",
                      boxShadow: " 10px 20px 30px rgba(0, 0, 0, 0.25)",
                      backgroundColor: "#e8e8e8",
                      border: "none"
                    }}
                    onChange={handleChange}
                    name="postalcode"
                    aria-label="Default select example" >
                          <option>Select Address</option>
                          {dataAddress.map((item) => (
                          <option  value={`${item.urban}, ${item.postalcode}`}> {`${item.urban} ${item.subdistrict}, ${item.city} ${item.postalcode}. ${item.province}`} </option>
                        ))}
            </Form.Select>
          </Col>
        </Row>
      </Container>

      <h3 className="myCart">My Cart</h3>
          <div className="cart">
            <form>
              <h5>Review Your Order</h5>
              <div className="lines">
                <div className="line1" />
                <div className="line2" />
              </div>

              <div className="Order">
                <div className="menulist">
                {products?.map((item, index) => (
                      <div key={index}>
                        <div className="menu">
                          <div className="productCart" style={{backgroundColor:"white" ,height:100}}>
                            <img src={item.product.image} alt="menu pict" />
                            <div className="qty">
                              <p>{item.product.name}</p>
                              {/* <button
                                type="button"
                                onClick={() => decreaseCart(item.id)}
                              >
                                -
                              </button>
                             <span>{item.qty}</span>
                              <button
                                type="button"
                                onClick={() => increaseCart(item.id)}
                              >
                                +
                              </button> */}
                            </div>
                          </div>
                          <div className="price">
                            <p>
                            {convertRupiah.convert(
                              item.qty * item.product.price
                            )}
                            </p>
                            <a>
                              <img
                                src={Trash}
                                alt="bin"
                                onClick={() => deleteById(item.id)}
                              />
                            </a>
                          </div>
                        </div>
                        <div className="line1" />
                      </div>

                ))}
                 
                </div>

                <div className="details">
                  <div className="detail">
                    <p className="nameDetail">Subtotal</p>
                    <p className="priceDetail">
                    {convertRupiah.convert(total)}
                    </p>
                  </div>
                  <div className="detail">
                    <p className="nameDetail">.</p>
                    <p className="numberDetail">
                     .
                    </p>
                  </div>
                  <div className="line2" />

                  <div className="total">
                    <p>Total</p>
                    <p>{convertRupiah.convert(total)}</p>
                  </div>

                  <div className="orderBtn">
                    <button type="button" 
                   onClick={handleBuy}
                    >
                      Pay
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
    
    </>
  );
}