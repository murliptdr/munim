import React, { Component } from 'react';
import axios from 'axios';
import Main from "./main";
import moment from "moment";

  
    class Todays_sell extends Component{
        constructor(props) {
          super(props);
       
          this.state = {
            persons: [],
            fullname: localStorage.getItem("fullname"),
            search:""
          };
        }
       
        componentDidMount() {
            axios.get(`http://localhost:8013/todays_sell`)
            .then(res => {
                const persons = res.data;
                this.setState({ persons });
              })
        }
        search = e => {
          this.setState({search : e.target.value});
        }

   render()
   {
     const {search} = this.state;

     const filtered= this.state.persons.filter(person =>{
       return person.product_name.toLowerCase().indexOf( search.toLowerCase()) !== -1 ||  person.sno.toLowerCase().indexOf( search.toLowerCase()) !== -1 
     })
     var total=0;
     var totAmount=filtered.map(person => total = total + person.total_amount);

    return(
      <>
      <Main/>
      <center>
    <div className="App">
    <h1>TODAYS SELL DETAILS</h1>

       <div className="">
       <input placeholder="Search Product/bill"  icon="search" onChange={this.search}/>

       <table className="data-table">
        <tr>
        <th>#</th>
        <th>BILL ID</th>
          <th>CUSTOMER NAME</th>
          <th>CUSTOMER NUMBER</th>
          <th>PRODUCT NAME</th>
          <th>PRICE</th>
          <th>QUANTITY</th>
          <th>TOTAL AMOUNT</th>
          <th>DATE</th>
          <th>TIME</th>

        </tr>
        { filtered.map((person,idx) => 
          <tr key={idx}>
            <td>{idx+1}</td>
            <td >{person.sno}</td>
            <td >{person.cname}</td>
            <td >{person.cnumber}</td>
            <td >{person.product_name}</td>
            <td >{person.price}</td>
            <td >{person.quantity}</td>
            <td >{person.total_amount}</td>
            <td >{person.date}</td>
            <td >{person.time}</td>

            {/* <td>
               <form onSubmit={this.deleteSubmit}>
               <input className="" type="submit" value="SELL" />
              </form>
              
            </td> */}
            </tr>
        )
        }
         
        </table>
       
            <div className="total">TOTAL AMOUNT = {total}</div>
       
      </div>    </div>
      </center>
      </>
  );
  }
}

export default Todays_sell;