import Axios from "axios";
import React, { Component } from "react";
import Main from "./main";


class Addstockdetails extends Component{
    constructor(props){
    super(props);

        this.state={
            persons:[],
            search:""
        }
      }
        componentDidMount() {
          
            Axios.get(`http://localhost:8013/addstockdetails`)
            .then(res=>{
                const persons = res.data ;
                this.setState({persons});
            })
        }
        search = e => {
          this.setState({search : e.target.value});
        }

   render()
        {
            const {search} = this.state;
            const filtered= this.state.persons.filter(person =>{
              return person.product_name.toLowerCase().indexOf( search.toLowerCase()) !== -1 ||  person.date.toLowerCase().indexOf( search.toLowerCase()) !== -1
            })

            return(
                <>
                <Main/>
                <center>
    <div className="App">
    <h1 className="heading">ADD STOCK DETAILS</h1>

       <div className="">
       <input placeholder="Search Product"  icon="search" onChange={this.search}/>
       <input type="date"  icon="search" onChange={this.search}/>

       <table className="data-table">
        <tr>
        <th>#</th>
          <th>PRODUCT NAME</th>
          <th>QUANTITY</th>
          <th>DATE</th>
          <th>TIME</th>

        </tr>
        { filtered.map((person,idx) => 
          <tr key={idx}>
            <td>{idx+1}</td>
            <td >{person.product_name}</td>
            <td >{person.quantity}</td>
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
      </div>    </div>
      </center>
                </>
            )
        }

    }
export default Addstockdetails;