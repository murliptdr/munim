import React, { Component } from 'react';
import Axios from 'axios';
import { Redirect } from "react-router-dom";
import Main from "./main";
import moment from "moment";



class Addstock extends Component{
        constructor(props){
            super(props)
            let loggedIn = false
            this.state={
                product_name:'',
                quantity:'',
                persons: [],
                search:"",
                loggedIn  
            }
            this.InputEvent = this.InputEvent.bind(this)
            this.submit = this.submit.bind(this)
        }
        InputEvent(e){
            this.setState({
                [e.target.name]:e.target.value
            })
        }
        componentDidMount() {
            Axios.get(`http://localhost:8013/showproduct`)
            .then(res => {
                const persons = res.data;
                this.setState({ persons });
              })
        }

        submit(e){
            var date=moment().format("YYYY/MM/DD");
            var time=new Date().toLocaleTimeString();
            e.preventDefault()
            const data={
                product_name:this.state.product_name,
                quantity:this.state.quantity,
                date:date,
                time:time,
            }
            {
                if(window.confirm('Confirm ? ')){
            Axios.post('http://localhost:8013/addstock',data)
            .then( res=>{
             if (res.data.status === false) {
                 alert(res.data.message);
             } else
                 if (res.data.status === true) {
                     this.setState({
                         loggedIn: true
                     })
                 } 
            })
                .catch(err=>{
                    console.log(err);
                })
            }
        }  
        }

render(){
    if (this.state.loggedIn) {
        return <Redirect to="/dashboard" />
    }
    const {search} = this.state;
    const filtered= this.state.persons.filter(person =>{
      return person.product_name.toLowerCase().indexOf( search.toLowerCase()) !== -1 
    })

    return(
        <>
        <Main/>
          <div className="add_product">

        <h1 className="heading">ADD STOCK</h1>
        <div className="add_form">
        <label className="sfont">PRODUCT NAME</label>
        <input type="text" list="name" value={this.state.product_name} onChange={this.InputEvent} className="sinput" name="product_name" required /> 
        <datalist id="name">
              { filtered.map(person => 
              <option value={person.product_name}/>
              )}
             </datalist>
        <label className="sfont">QUANTITY</label>
        <input type="int" value={this.state.quantity} onChange={this.InputEvent} className="sinput" name="quantity" required />
        <button className="sbutton" onClick={this.submit} >Submit</button>
        </div>
        </div>


        </>
    )
}

}
export default Addstock;