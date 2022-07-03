import React, { useState, useContext, useEffect } from "react";
// import styles from "../styles/Landing.module.css";
import { Modal, Dropdown, NavDropdown } from "react-bootstrap";
import { Link, Navigate, useParams } from "react-router-dom";
// // import Transactions from "../components/Transactions";
// //import stylesN from "../components/Navbar.module.css";
import Navbar from "../components/navbar.js";
import ProfileIMG from "../assets/ProfileImage.png"
import logoSM from "../assets/logoSM.png"
import Trash from "../assets/trash.svg"
import styles from "../styles/Profile.module.css";
import qrcode from "../assets/qr-code.png"
import iconS from "../assets/logo-small.png"
import dateFormat from "dateformat";
import convertRupiah from "rupiah-format";

import { UserContext } from "../context/userContext.js";
import { API } from "../config/api.js";

export default function Profile() {
  const [profile, setProfile] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [state, dispatch] = useContext(UserContext);
  const [isNull, setIsNull] = useState(false);
// Fetching product data from database
const getProfile = async () => {
  try {
    const response = await API.get("/profile");
    setProfile(response.data.data);
    // console.log(response.data.data.image.slice(-4));
    if(response.data.data.image.slice(-4) == "null"){
      setIsNull(true)
    }
  } catch (error) {
    console.log(error);
  }
};

const getTransactions = async () => {
  try {
    const response = await API.get("/transaction");
    setTransaction(response.data.data);
    console.log(response.data.data);
  } catch (error) {
    console.log(error);
  }
};

const updateStatus = async (id, status) => {
  try {
      const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

      const body = JSON.stringify({status: status});
    const response = await API.patch(`/transaction/${id}`, body,config);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const deleteById = async (id) => {
  try {
    await API.delete(`/transaction/${id}`);
    getTransactions();
  } catch (error) {
    console.log(error);
  }
};


useEffect(() => {
  getProfile();
  getTransactions();
}, []);

  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <div className={styles.mainProfile}>
          <div className={styles.myProfile}>
            <h4>My Profile</h4>
            <div className={styles.infoPerson}>
            {isNull ?(
              <div className="profilePic">
                <img
                  className={styles.profilePhoto}
                  id="outputProfile"
                  src={ProfileIMG}
                  />
                  </div>
                ):(
                  <div className="profilePic">
                  <img
                    className={styles.profilePhoto}
                    id="outputProfile"
                    src={profile?.image}
                    />
                    </div>
                )}
              <article>
                <h5>Full Name</h5>
                <p>{state.user.name}</p>
                <h5>Email</h5>
                <p>{state.user.email}</p>
              </article>
            </div>
          </div>
        </div>
        <div className={styles.products}>
          <h4>My Transaction</h4>

          {transaction?.map((item) => (
              <div className={styles.product} >
                <div className={styles.detailProduct}>
                  <img
                    src={logoSM}
                    className={styles.photoProduct}
                    alt="menu pict"
                    onClick={() => deleteById(item.id)}
                  />
                  <div className={styles.number}>
                    <p className={styles.productName}>{item.products?.map((item) =>(`${item.name} `))}</p>
                    <p className={styles.date}>
                      {dateFormat(item.createdAt, "dddd, d mmmm yyyy")}
                    </p>
                    <p className={styles.productPrice}>
                      Price : {convertRupiah.convert(item.price)}
                    </p>
                    <p className={styles.productQty}>
                      Qty : {item.qty}
                    </p>
                    <p className={styles.subTotal}>
                      Sub Total : {convertRupiah.convert(item.price)}
                    </p>
                  </div>
                </div>
                <div className={styles.productr}>
                  <img
                    src={qrcode}
                    alt="waysbeans icon"
                  />
                <div className={styles.status}>success</div>
                {item.status == 'on the way'? (
                <button
                className={styles.status}
                onClick={()=> {updateStatus(item.id, "success")}}>
                Completed
                </button>
                ):( 
                  <></>
                )}
                </div>
              </div>
          ))}
         
        </div>
      </div>
    </>
  );
}
