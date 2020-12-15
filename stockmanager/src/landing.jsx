import React, { Component } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import Main from "./main";
import MediaCard from "./card";
import NavBar from './Navbar';
import TextField from '@material-ui/core/TextField';



class Landing extends Component{
        constructor(props) {
          super(props);
       
          this.state = {
            product_name:'',
            persons: [],
            search:"",
            sortby:""
          };

        }

       
        componentDidMount() {
            axios.get(`http://localhost:8013/landing`)
            .then(res => {
                const persons = res.data;
                this.setState({ persons });
              })
        }
        search = e => {
          this.setState({search : e.target.value});
        }

      
      edit = (persons) =>{

      }
      

   render()
   { 
     const {search} = this.state;
     const filtered= this.state.persons.filter(person =>{
       return person.product_name.toLowerCase().indexOf( search.toLowerCase()) !== -1 ||  person.brand.toLowerCase().indexOf( search.toLowerCase()) !== -1 
     })

    return(
            <>
            <NavBar />
            <div className="searchbar">
                <form  noValidate autoComplete="off">
                    {/* <TextField id="standard-basic" label="Search" onChange={this.search}/> */}
                     <label className="labelsearch">Search Product</label><br/>
                     <input className="searchinput" type="text"  onChange={this.search}/>         
                </form>

            </div>
 {filtered.map((person,idx)=>
        <MediaCard shopName={person.shopname} productName={person.product_name} brand={person.brand} quantity={person.quantity} price={person.price} />
       )} 
      </>
  );
  }
}

export default Landing; 
