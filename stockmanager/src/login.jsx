import React, { useState, Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import Navbar from './Navbar';
import './login.css';


class Login extends Component {
    constructor(props) {
        super(props)
        let loggedIn = false
        this.state = {
            persons: [],
            email: '',
            password: '',
            loggedIn
        }
        this.InputEvent = this.InputEvent.bind(this)
        this.formSubmit = this.formSubmit.bind(this)

    }

    InputEvent(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    formSubmit(e) {
        e.preventDefault()
        const data = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:8013/login', data)
            .then(res => {
                if (res.data.status === false) {
                    alert(res.data.message);
                } else
                    if (res.data.status === true) {
                        alert(res.data.message);
                        axios.post('http://localhost:8016/data',data)
                        localStorage.setItem("token","ilrumraditap")
                        localStorage.setItem('username', res.data.username);
                        localStorage.setItem('fullname', res.data.fullname);
                        localStorage.setItem('email', res.data.email);  
                        localStorage.setItem('phone', res.data.phone);  
                        localStorage.setItem('shopname', res.data.shopname);  
                        localStorage.setItem('shopcategory', res.data.shopcategory);  
                        localStorage.setItem('address', res.data.address);  
                        localStorage.setItem('city', res.data.city);  
                        localStorage.setItem('postcode', res.data.postcode);  

                        this.setState({
                            loggedIn: true
                        })
                    }
            })
        

    }
    render() {
        if (this.state.loggedIn) {
            return <Redirect to="/dashboard" />
        }
        return (
            <div className="lbody">
            < Navbar />
            <div className="box">
                <img className="logoimg" src="/img/logo.png" />
               <h2 className="tag">MUNIM IS INVENTRY MANAGEMENT SYSTEM WHICH HELPS YOU TO MANAGE YOUR BUSINESS IN EASY WAY.</h2>
                <div className="main_class">
                    <h1 className="headinglogin">Login</h1>
                    <form className="form_c" onSubmit={this.formSubmit}>
                        <div className="inputbox">
                            <label className="labelgn">Email</label><br />
                            <input className="inputlgn"type="email" value={this.state.email} onChange={this.InputEvent} name="email" /><br /></div>
                        <div className="inputbox">
                            <label className="labelgn">Password</label><br />
                            <input className="inputlgn" type="password" value={this.state.password} onChange={this.InputEvent} name="password"/><br /></div>
                        <div className="btn">
                            <button className="btnboxlgn" type="submit" color="primary"> Sign In</button>
                            <Link to="/forgotpass" style={{ textDecoration: 'none' }}>
                                <button className="btnboxlgn" color="primary">Fogot Password</button>
                            </Link>
                        </div>
                        <div className="anch">
                            <p>No account yet?<Link to="/signup" >Register</Link></p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
        )
    }
}



export default Login;