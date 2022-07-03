import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import allow from "../assets/allow.png"
// import deny from "../assets/deny.png"
import Navbar from "../components/navbar"
import convertRupiah from "rupiah-format";
import dateFormat from "dateformat";
import { UserContext } from "../context/userContext.js";
import { API } from "../config/api.js";


function AdminDashboard () {
    const [transactions, setTransactions] = useState([]);
    const [state, dispatch] = useContext(UserContext);

    const getTransactions = async () => {
        try {
          const response = await API.get("/transactions");
          setTransactions(response.data.data);
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
        getTransactions();
      }, []);

    return (
        <>
            <Navbar/>
            <body>
                <h1 class="h1Admin">List Pembayaran</h1>
                <table className="mb-4">
                    <tr>
                        <th class="no">No</th>
                        <th class="name">Name</th>
                        <th class="addresAdmin">Tgl Pembayaran</th>
                       
                        <th>Jenis Pembayaran</th>
                        <th>Nominal</th>
                        <th>Status</th>
                        <th class="action">Action</th>
                    </tr>
                    {transactions?.map((item, index) => (
                    <tr>
                        <td>{index+1}</td>
                        <td>{item.buyer.name}</td>
                        <td>{dateFormat(item.createdAt, "dddd, d mmmm yyyy")}</td>
                        <td>{item.products?.map((item) =>(`${item.name} `))}</td>
                        <td>{convertRupiah.convert(item.price)}</td>
                        <td class="green">success</td>
                        <td class="btnAction">
                            <button className="cancel" onClick={() => deleteById(item.id)} >Cancel</button>
                        </td>
                    </tr>
                    ))}
                </table>
            </body>
        </>
    )
}

export default AdminDashboard