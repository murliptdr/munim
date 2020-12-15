import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import Axios from "axios";
import Main from "./main";


class Dashboard extends Component {
 
  render() {
  
    return (
      <>
      <Main/>
      <div className="main_box">
                <div className="big-box">
                    <div className="small-box">
                    <a href="/todays_sell"><button className="botton-class">Today Sell Detail</button></a>
                    </div>
                    <div className="small-box">
                    <a href="/sell"><button className="botton-class">Sell</button></a>
                    </div>
                    <div className="small-box">
                        <a href="/showproduct"><button className="botton-class">Show Product</button></a>
                    </div>
                    <div className="small-box">
                        <a href="/add_product"><button className="botton-class">Add Product</button></a>
                    </div>
                    <div className="small-box">
                        <a href="/addstock"><button className="botton-class">Add Stock</button></a>
                    </div>
                    <div className="small-box">
                        <a href="/updateprice"><button className="botton-class">Update Price</button></a>
                    </div>
                    <div className="small-box">
                        <a href="/addstockdetails"><button className="botton-class">Stock Update Detail</button></a>
                    </div>
                    <div className="small-box">
                        <a href="#"><button className="botton-class">Price Update Detail</button></a>
                    </div>
                    <div className="small-box">
                        <a href="/soldpdetail"><button className="botton-class">Sold Product detail</button></a>
                    </div>
                </div>
            </div>
     
            
          </>
    )
  }
}
export default Dashboard;