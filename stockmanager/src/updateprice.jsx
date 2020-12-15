import React, { Component } from 'react';
import Axios from 'axios';
import { Redirect } from "react-router-dom";
import Main from "./main";


class Updateprice extends Component{
        constructor(props){
            super(props)
            let loggedIn = false
            this.state={
                product_name:'',
                price:'',
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
            e.preventDefault()
            const data={
                product_name:this.state.product_name,
                price:this.state.price
            }
            {
                if(window.confirm('Confirm ? ')){
            Axios.post('http://localhost:8013/updateprice',data)
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

        <h1 className="heading">UPDATE PRODUCT PRICE</h1>
        <div className="add_form">
        <label className="sfont">PRODUCT NAME</label>
        <input type="text" list="name" value={this.state.product_name} onChange={this.InputEvent} className="sinput" name="product_name" required /> 
        <datalist id="name">
              { filtered.map(person => 
              <option value={person.product_name}/>
              )}
             </datalist>
        <label className="sfont">PRICE</label>
        <input type="int" value={this.state.price} onChange={this.InputEvent} className="sinput" name="price" required />
        <button className="sbutton" onClick={this.submit} >Submit</button>
        </div>
        </div>


        </>
    )
}

}
export default Updateprice;