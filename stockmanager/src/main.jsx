import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import Axios from "axios";

class Main extends Component {
  constructor(props) {
    super(props)
    let loggedIn = true
    const token = localStorage.getItem("token");
    if (token == null) {
      loggedIn = false
    }
    this.state = {
      persons: [],
      loggedIn,
      username: localStorage.getItem("username"),
      fullname: localStorage.getItem("fullname"),
      email: localStorage.getItem("email"),
      phone: localStorage.getItem("phone"),
      shopname: localStorage.getItem("shopname"),
      shopcategory: localStorage.getItem("shopcategory"),
      address: localStorage.getItem("address"),
      city: localStorage.getItem("city"),
      postcode: localStorage.getItem("postcode"),
    };
  }
  componentDidMount() {
    Axios.get(`http://localhost:8013/notification`)
    .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
}

openNav = () => {
  if (
      document.getElementById("sideNav") &&
      document.getElementById("main_box")
  ) {
      document.getElementById("sideNav").style.width = "250px";
      document.getElementById("main_box").style.marginLeft = "0px";
  }
};

closeNav = () => {
  if (
      document.getElementById("sideNav") &&
      document.getElementById("main_box")
  ) {
      document.getElementById("sideNav").style.width = "0";
      document.getElementById("main_box").style.marginLeft = "0";
  }
};
profile = () => {
  if (
      document.getElementById("profile") &&
      document.getElementById("main_box_profile")
  ) {
      document.getElementById("profile").style.width = "300px";
      document.getElementById("main_box_profile").style.marginRight = "0px";
  }
};
closeNav2 = () => {
  if (
      document.getElementById("profile") &&
      document.getElementById("main_box_profile")
  ) {
      document.getElementById("profile").style.width = "0";
      document.getElementById("main_box_profile").style.marginRight = "0";
  }
};


noti = () => {
  if (
      document.getElementById("noti") &&
      document.getElementById("notify")
  ) {
      document.getElementById("noti").style.width = "540px";
      document.getElementById("notify").style.margintop = "0px";
  }
};
closeNoti= () => {
  if (
      document.getElementById("noti") &&
      document.getElementById("notify")
  ) {
      document.getElementById("noti").style.width = "0";
      document.getElementById("notify").style.margintop = "0";
  }
};

//  openWin() { 
//   var myWindow;
//   myWindow=window.open("", "Window", "width=200, height=100");
//   myWindow.document.write("<p>This is 'myWindow'</p>");
// }

   logoutHandler =(e) => {
    Axios.post('http://localhost:8013/logout');
    localStorage.removeItem("username");
    localStorage.removeItem("fullname");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    localStorage.removeItem("shopname");
    localStorage.removeItem("shopcategory");
    localStorage.removeItem("address");
    localStorage.removeItem("city");
    localStorage.removeItem("postcode");
    window.location = '/';
  }
  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />
    }
    return (
      <>
      <div className="dbody">
      <div className="dheader">
                <a className="mainbox" id="main_box" onClick={this.openNav}><i className="fa fa-bars"></i></a>
                <h3 className="dh1">WELCOME {this.state.fullname}</h3>
                <a className="mainbox2" id="main_box_profile" onClick={this.profile}><i className="fa fa-user-circle"></i></a>
                {/* <Link className="mainbox2" to="/notification" id="main_box_profile" ><i class="fa fa-bell" > <span class="badge">
                        {this.state.persons.length} </span></i></Link> */}
                <a  id="notify" onClick={this.noti} className="notification"><i className="fa fa-bell"></i>
                  <span className="badge">
                    {this.state.persons.length} </span>
                </a>
                </div>
                
                <div id="sideNav" className="side_menu">
                    <img className="menu_logo" src="/img/logo.png" />
                    <Link className="menu_link" to="/dashboard"> Dashboard </Link>
                    <Link className="menu_link" to="/showproduct"> Products </Link>
                    <Link className="menu_link" to="/add_product"> Add Product </Link>
                    <Link className="menu_link" to="/addstock"> Add Stock </Link>
                    <Link className="menu_link" to="/updateprice"> Update Price </Link>
                    <Link className="menu_link" to="/sell"> Sell Product </Link>
                    <Link className="menu_link" to="/soldpdetail"> Sold Products </Link>
                    <a className="menu_link" onClick={e=>this.logoutHandler(e)}>Logout</a>
                    <a className="close_btn" href="javascript:void(0)" onClick={this.closeNav}> &times;</a>
                </div>
                <div id="profile" className="side_menu_profile">
                <h1 className="profile_logo"><i className="fa fa-user-circle"></i></h1>
                <h3 className="ph3">Name : {this.state.fullname} </h3>
                <h3 className="ph3">username : {this.state.username} </h3>
                <h3 className="ph3">email : {this.state.email} </h3>
                <h3 className="ph3">phone : {this.state.phone} </h3>
                <h3 className="ph3">shopname : {this.state.shopname} </h3>
                <h3 className="ph3" >shopcategory : {this.state.shopcategory} </h3>
                <h3 className="ph3">address : {this.state.address} </h3>
                <h3 className="ph3">city : {this.state.city} </h3>
                <h3 className="ph3">postcode : {this.state.postcode} </h3>
                <a className="close_btn" href="javascript:void(0)" onClick={this.closeNav2}> &times;</a>
                </div> 
                <div id="noti" className="notify">
                <div className="head">
               <br/><h2>STOCK ALERT</h2><br/>
                </div>
         <table className="data-table">
            <tr>
            <th>#</th>
               <th>Product Name</th>
               <th>brand</th>
               <th>quantity</th>

            </tr>
            {      this.state.persons.map((person,idx)=> 
               <tr key={idx} className="alertText" >
                  <th>{idx+1}</th>
                  <th>{person.product_name}</th>
                  <th>{person.brand}</th>
                  <th>{person.quantity}</th>
                  </tr>
            )
            }
            
            </table>
                   <a className="close_btn" href="javascript:void(0)" onClick={this.closeNoti}> &times;</a>
                </div>
            </div>
             
          </>
    )
  }
}
export default Main;