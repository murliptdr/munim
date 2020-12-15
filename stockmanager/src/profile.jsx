import React, { Component } from 'react';
import axios from 'axios';


class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
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

    render() {

        return (
            <div className="App">
                <header>
                    <h3>WELCOME {this.state.fullname}</h3>
                    <h3>YOUR PROFILE</h3>
                </header>
                <div className="profile">
                <h4>Name : {this.state.fullname} </h4>
                <h4>username : {this.state.username} </h4>
                <h4>email : {this.state.email} </h4>
                <h4>phone : {this.state.phone} </h4>
                <h4>shopname : {this.state.shopname} </h4>
                <h4>shopcategory : {this.state.shopcategory} </h4>
                <h4>address : {this.state.address} </h4>
                <h4>city : {this.state.city} </h4>
                <h4>postcode : {this.state.postcode} </h4>
                </div>
            </div>
        );
    }
}

export default Profile;