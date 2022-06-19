import React from "react"
import allow from "../assets/allow.jpeg"
import deny from "../assets/deny.jpeg"
import Navbar from "../components/navbar"

function Admin () {
    return (
        <>
            <Navbar/>
            <body>
                <h1 class="h1Admin">Income Transaction</h1>
                <table>
                    <tr>
                        <th class="no">No</th>
                        <th class="name">Name</th>
                        <th class="addresAdmin">Address & Post Code</th>
                        <th>Products Order</th>
                        <th>Status</th>
                        <th class="action">Action</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Sugeng No Pants</td>
                        <td>Cileungsi, 16820</td>
                        <td>RWANDA Beans</td>
                        <td class="yellow">Waiting Approve</td>
                        <td class="btnAction">
                            <button class="cancel">Cancel</button>
                            <button class="approve">Approve</button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Haris Game</td>
                        <td>Serang, 42111</td>
                        <td>ETHIOPIA Beans</td>
                        <td class="green">Succes</td>
                        <td><img src={allow}/></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Aziz Union</td>
                        <td>Bekasi, 13450</td>
                        <td>GUETEMALA Beans</td>
                        <td class="red">Cancel</td>
                        <td><img src={deny}/></td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Lee Tanjung Balai</td>
                        <td>Tanjung Balai, 21331</td>
                        <td>NICARAGUA Beans</td>
                        <td class="blue">On The Way</td>
                        <td><img src={allow}/></td>
                    </tr>
                </table>
            </body>
        </>
    )
}

export default Admin