import React, { useState } from "react";
import {Link, Redirect, useHistory} from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const Signup=()=>{
    const [data,setData] = useState({
       username:'',
       fullname:'',
        email:'',
        pass:'',
        phone:'',
        shopname:'',
        shop_category:'',
        address:'',
        city:'',
        postcode:''
    });
    const history = useHistory();


const InputEvent = (event) => {
    const { name,value }=event.target;

    setData((preVal)=>{
        return{
             ...preVal,
             [name]:value,
        };
    });
};
    const formSubmit=(e)=>{
        e.preventDefault();
       axios.post('http://localhost:8013/signup',data)
           .then( res=>{
            if (res.data.status === false) {
                alert(res.data.message);
            } else
                if (res.data.status === true) {
                    alert(res.data.message);
                    history.push(`/`);
                } 
           })
           .catch(err=>{
               console.log(err);
           })
    };

    return(
        <div className="sbody">
        <Navbar />
        <div className="boxr">
            <img className="logoimg" src="/img/logo.png" />
            <h2 className="tag">MANAGE YOUR BUSINESS WITH VIRTUAL MUNIM</h2>
            <div className="main_classr">
                <h1 className="headingr">Register</h1>
                <form className="formreg" onSubmit={formSubmit}>
                    <label className="labelr">UserName</label>
                    <input type="text"  value={data.username} pattern="[A-Za-z0-9]{5,15}" title="Don't use space or special charactor" onChange={InputEvent} name="username" className="inputreg" required/>
                    <label className="labelr">Name</label>
                    <input type="text"  value={data.fullname} pattern="[A-Za-z ]{3,}" onChange={InputEvent}  name="fullname" className="inputreg" required/>
                    <label className="labelr">Email Id</label>
                    <input type="email"  value={data.email} onChange={InputEvent} name="email" className="inputreg" required/>
                    <label className="labelr">Password</label>
                    <input type="password"  value={data.pass} pattern=".{8,}" onChange={InputEvent} name="pass" className="inputreg" required/>
                    <label className="labelr">Mobile Number</label>
                    <input type="tel"  value={data.phone} onChange={InputEvent} name="phone" className="inputreg" pattern="[0-9]{10}" required />
                    <label className="labelr">Shop Name</label>
                    <input type="text"  value={data.shopname} pattern="[A-Za-z ]{3,}" onChange={InputEvent} onChange={InputEvent} name="shopname" className="inputreg" required/>
                    <label className="labelr">Shop Category</label>
                    <select onChange={InputEvent} name="shop_category" className="inputreg" required>
                     <option value="AGROCHEMIST">AGROCHEMIST</option>
                     <option value="GROCERY">GROCERY</option>
                     <option value="HARDWARE">HARDWARE</option>
                     <option value="MEDICAL">MEDICAL</option>
                    </select>
                    <label className="labelr">Address</label>
                    <input type="text"  value={data.address} onChange={InputEvent} name="address" className="inputreg"required />
                    <label className="labelr">City</label>
                    <input type="text"  value={data.city} onChange={InputEvent} name="city" className="inputreg" required/>
                    <label className="labelr">Pincode</label>
                    <input type="int"  value={data.postcode} pattern="[0-9]{6}" onChange={InputEvent} name="postcode" className="inputreg" required/>
                    <button className="btnreg" type="submit" color="primary"> Sign Up</button>
                    <div className="anchreg">
                        <p>Already have an account?<Link to="/" >Login</Link></p>
                    </div>

                </form>
            </div>
        </div>
    </div>
    )
}
export default Signup;