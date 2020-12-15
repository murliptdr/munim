import React, { useState, Component } from "react";
import axios from 'axios';
import { useHistory, Redirect } from "react-router-dom";
import moment from "moment";

class Sell123 extends Component {
    constructor(props) {
        super(props)
        let loggedIn = false
        this.state = {
            product_name:'',
            price:'',
            quantity:'',
            total_amount:'',
            fullname: localStorage.getItem("fullname"),
            persons: [],
            search:"",
            quantity: 1,
            max: 100,
            min: 0,
            loggedIn
        }
        this.InputEvent = this.InputEvent.bind(this)
        this.formSubmit = this.formSubmit.bind(this)

    }
    IncrementItem = () => {
        this.setState(prevState => {
          if(prevState.quantity < 100) {
            return {
              quantity: prevState.quantity + 1
            }
          } else {
            return null;
          }
        });
    }
    DecreaseItem = () => {
      this.setState(prevState => {
        if(prevState.quantity > 0) {
          return {
            quantity: prevState.quantity - 1
          }
        } else {
          return null;
        }
      });
    }
    componentDidMount() {
        axios.get(`http://localhost:8013/showproduct`)
        .then(res => {
            const persons = res.data;
            this.setState({ persons });
          })
    }

    InputEvent(e) {

        this.setState({
            [e.target.name]: e.target.value
        })
    }
    formSubmit(e) {
       var date=moment().format("YYYY/MM/DD");
       var time=new Date().toLocaleTimeString();
       var total_amount=this.state.price * this.state.quantity;
        e.preventDefault()
        const data={
            product_name:this.state.product_name,
            price:this.state.price,
            quantity:this.state.quantity,
            date:date,
            time:time,
            total_amount:total_amount
        }
        axios.post('http://localhost:8013/sell',data)
        .then( res=>{
        if (res.data.status === false) {
            alert(res.data.message);
        } else
            if (res.data.status === true) {
                alert(res.data.message);
                this.setState({
                    loggedIn: true
                })
            } 
       })
           .catch(err=>{
               console.log(err);
           })
    };
    render() {
        if (this.state.loggedIn) {
            return <Redirect to="/dashboard" />
        }
        const {search} = this.state;
        const filtered= this.state.persons.filter(person =>{
          return person.product_name.toLowerCase().indexOf( search.toLowerCase()) !== -1 
        })
    return(
        <>
        
        <div className="add_product">
        <h1 className="heading">SELL PRODUCT</h1>

        <div className="pro_info">
        <div className="add_form">
            <label className="sfont">PRODUCT NAME</label>
             <input  icon="search" onChange={this.search}  value={this.state.product_name} onChange={this.InputEvent} list="cityname"  name="product_name" className="sinput" required/>
              <datalist id="cityname">
              { filtered.map(person => 
              <option value={person.product_name}/>
              )}
             </datalist>

                {/* <input type="text"  value={this.state.product_name} onChange={this.InputEvent} name="product_name" className="sinput" required/> */}
                <label className="sfont">PRICE</label>
                <input type="text"  value={this.state.price} onChange={this.InputEvent} name="price" className="sinput" required/>
                <label className="sfont">QUANTITY</label><br/>
                <button className="binput" onClick = {this.DecreaseItem}>-</button>
                <input type="int"  value={this.state.quantity} onChange={this.InputEvent} name="quantity" className="idinput" required/>
                <button className="binput" onClick={this.IncrementItem}>+</button>
                <button  onClick = {this.formSubmit} className="sbutton" type="submit"  >Submit</button>
                </div>
            </div>
            </div>
        </>
    )
}
}
export default Sell123;