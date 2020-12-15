import React, { Component } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import Main from "./main";


    class Showproduct extends Component{
        constructor(props) {
          super(props);
       
          this.state = {
            product_name:'',
            persons: [],
            fullname: localStorage.getItem("fullname"),
            search:"",
            sortby:""
          };

        }

       
        componentDidMount() {
            axios.get(`http://localhost:8013/showproduct`)
            .then(res => {
                const persons = res.data;
                this.setState({ persons });
              })
        }
        search = e => {
          this.setState({search : e.target.value});
        }

      //   Submit(e) {
      //      e.preventDefault()
      //     const history = useHistory();
      //     history.push(`/passcheck`);

      //  };
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
      <Main/>
      <center>
     <div className="App">
     <h1>PRODUCTS</h1>

     
       <div className="">
       <input placeholder="Search Product"  icon="search" onChange={this.search}/>
       <input placeholder="Search brand"  icon="search" onChange={this.search}/>
      
       <table className="data-table">
        <tr>
        <th>#</th>
          <th>Product Name</th>
          {/* <th>image</th> */}
          <th>price</th>
          <th>Subcategory</th>
          <th>brand</th>
          <th>quantity</th>

        </tr>
        { filtered.map((person,idx)=> 
          <tr key={idx}>
            <td>{idx+1}</td>
            <td>{person.product_name}</td>
            {/* <td><img src={person.image} width="60px" height="40px" /></td> */}
            <td>{person.price}</td>
            <td>{person.sub_category}</td>
            <td>{person.brand}</td>
            <td>{person.quantity}</td>

            <td>
            <Link to="/updateprice"> Update Price</Link><br/>
            </td>
            <td>
            <Link to="/sell"> Sell</Link><br/>
            </td>
            </tr>
        )
        }
        
        </table>
      </div>    </div>
      </center>
      </>
  );
  }
}

export default Showproduct;
