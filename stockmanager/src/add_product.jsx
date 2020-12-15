import React, { useState, Component } from "react";
import axios from 'axios';
import { useHistory, Redirect } from "react-router-dom";
import Main from "./main";

class Add_product extends Component {
    constructor(props) {
        super(props)
        let loggedIn = false
        this.state = {
         persons: [],
        shopname:localStorage.getItem("shopname"),
        product_name:'',
        image: null,
        price:'',
        category:'',
        sub_category:'',
        brand:'',
        quantity:'',
        fullname: localStorage.getItem("fullname"),
        loggedIn
        }
        this.InputEvent = this.InputEvent.bind(this)
        this.formSubmit = this.formSubmit.bind(this)
        this.onImageChange = this.onImageChange.bind(this);
    }

    InputEvent(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onImageChange(e) {
        if (e.target.files && e.target.files[0]) {
          let img = e.target.files[0];
          this.setState({
            image: URL.createObjectURL(img)
          });
        }
      };
    formSubmit(e) {
        e.preventDefault()
        const data={
            shopname:this.state.shopname,
            product_name:this.state.product_name,
            price:this.state.price,
            category:this.state.category,
            sub_category:this.state.sub_category,
            brand:this.state.brand,
            quantity:this.state.quantity,
            image:this.state.image
        }
        {
            if(window.confirm('Confirm ? ')){
       axios.post('http://localhost:8013/add_product',data)
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
    }
    }
    render() {
       
    return(
        <>
        <Main/>
        
        <div className="add_product">
        <h1 className="heading">ADD PRODUCT</h1>

        <div className="pro_info">
            <form onSubmit={this.formSubmit} className="add_form">
                <label className="sfont">PRODUCT NAME</label>
                <input type="text"  value={this.state.product_name} onChange={this.InputEvent} name="product_name" className="sinput" required/>
                <label className="sfont">PRICE</label>
                <input type="int"  value={this.state.price} onChange={this.InputEvent} name="price" className="sinput" required />
                <label className="sfont">CATEGORY</label>
                <input type="text"  value={this.state.category} onChange={this.InputEvent} name="category" className="sinput" required/>
                <label className="sfont"> SUB-CATEGORY</label>
                <input type="text"  value={this.state.sub_category} onChange={this.InputEvent} name="sub_category" className="sinput" required/>
                <label className="sfont">BRAND</label>
                <input type="text"  value={this.state.brand} onChange={this.InputEvent} name="brand" className="sinput" required/>
                <label className="sfont">QUANTITY</label>
                <input type="int"  value={this.state.quantity} onChange={this.InputEvent} name="quantity" className="sinput" required/>
                <label className="sfont">PRODUCT IMAGE</label>
                <input type="file" name="myImage" onChange={this.onImageChange} className="sinput" />
                <input className="sbutton" type="submit" value="submit" />
                </form>
            </div>
            </div>
        </>
    )
}
}
export default Add_product;