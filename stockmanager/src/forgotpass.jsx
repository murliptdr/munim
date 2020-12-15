import React, { Component } from "react";
import axios from 'axios';
import { Redirect, Link } from "react-router-dom";
import Navbar from './Navbar';


class Forgotpass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email:'',
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
        const data={
            email:this.state.email,
        }
        axios.post('http://localhost:8013/forgotpass',data)
        .then( res=>{
        if (res.data.status === false) {
            alert(res.data.message);
        } else
            if (res.data.status === true) {
                alert(res.data.message);
            } 
       })
           .catch(err=>{
               console.log(err);
           })
    };
    render() {
       
    return(
        <div className="lbody">
            <Navbar />
            <div className="box">
                <img className="logoimg" src="/img/logo.png"/>
                <h2 className="tag">MANAGE YOUR BUSINESS WITH VIRTUAL MUNIM</h2>
                <div className="fmain_class">
                    <h1 className="heading">Forgot Password</h1>
                    <form className="form_c" onSubmit={this.formSubmit}>
                        <div className="inputbox">
                            <label className="labelgn">Email Id</label><br />
                            <input type="text"  value={this.state.email} onChange={this.InputEvent} name="email" className="inputlgn" required/><br/>
                        <div className="btn">
                            <button className="btnboxlgn" type="submit" color="primary">Reset Password</button>
                        </div>
                        <div className="anch">
                            <p><Link to="/" >Sign In</Link></p>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
}
export default Forgotpass;