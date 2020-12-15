import React, { Component } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


class Logout extends Component {
    constructor(props) {
        super(props);
    
       const username= localStorage.removeItem("username");
       const fullname= localStorage.removeItem("fullname");
       const email= localStorage.removeItem("email");
       const phone= localStorage.removeItem("phone");
       const shopname= localStorage.removeItem("shopname");
       const shopcategory= localStorage.removeItem("shopcategory");
       const address= localStorage.removeItem("address");
       const city= localStorage.removeItem("city");
       const postcode= localStorage.removeItem("postcode");
   

    
        const history = useHistory();
        history.push(`/`);
    }  
   
}

export default Logout;