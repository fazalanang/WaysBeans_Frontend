import React from "react";
import Navbar from "../components/navbar";
import ImageDetail from "../assets/detailProduct.png"

function  DetailProduct() {
    return (
        <>
            <Navbar/>
            <div className="containerDetail">
                <div className="detailLeft">
                    <img src={ImageDetail} alt="detail image"/>
                </div>
                <div className="detailRight">
                    <div className="headingDetail">
                        <h1>GUETEMALA Beans</h1>
                        <p>Stock : 500</p>
                    </div>
                    <div className="contentDetail">
                        <p>Hampir semua referensi sepakat mengatakan bahwa kopi pertama kali ditemukan
                            di Ethiopia, meskipun ada juga beberapa protes yang menyatakan bahwa Coffea 
                            arabica sebenarnya muncul pertama kali di bagian selatan Sudan. Karena para 
                            gembala Ethiopia adalah manusia pertama yang mengonsumsi kopi—walau saat itu 
                            mereka baru mengonsumsi buah/cherry-nya saja, maka gagasan tentang “Ethiopia 
                            sebagai tempat asal kopi” pun semakin kuat.
                        </p>
                    </div>
                    <div className="price">
                        <h3>Rp.300.900</h3>
                    </div>
                    <div className="btnDetail">
                        <button>Add Cart</button>
                    </div>

                </div>
            </div>
        </>
    )
    
}
export default DetailProduct