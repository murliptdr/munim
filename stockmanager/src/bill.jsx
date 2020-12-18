import React from 'react';
import ReactToPrint from 'react-to-print';
import axios from 'axios';
import './bill.css';
class Print extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      persons: [],
    };
  }
  shopname= localStorage.getItem("shopname");
  address= localStorage.getItem("address");
  email= localStorage.getItem("email");
  phone= localStorage.getItem("phone");
  cosname= sessionStorage.getItem("cosname");
  sno= sessionStorage.getItem("sno");

  componentDidMount() {

    axios.get(`http://localhost:8013/soldpdetail`)
    .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
    }

  render() {
    var sno1 = sessionStorage.getItem("sno");

    const filtered= this.state.persons.filter(person =>{
      return person.sno == sno1
    })
    var total=0;
    var totAmount=filtered.map(person => total = total + person.total_amount);
   var date = new Date().toJSON().slice(0,10);
    return (
  <div id="invoice-POS"  >
      <div class="logo"></div>

  <center id="top">
    <div class="info"> 
      <br/><h2 className="h2bill">{this.shopname}</h2>
    </div>
  </center>
  <div id="mid">
    <div class="info">
      <h2 className="h2bill">To</h2>
      <p className="pbill"> 
          Name  :{this.cosname} <br/>
          S.No. :{this.sno}<br/>
          Date  :{date}
      </p>
    </div>
  </div>
  <div id="mid">
    <div class="info">
      <h2 className="h2bill">Contact Info</h2>
      <p className="pbill"> 
          Address : {this.address}<br/>
          Email   : {this.email}<br/>
          Phone   : {this.phone}<br/>
      </p>
    </div>
  </div>
  
  <div id="bot">

        <div id="table">
          <table className="tablebill">
            <tr class="tabletitle">
              <td class="item"><h2>Item</h2></td>
              <td class="Hours"><h2>Qty</h2></td>
              <td class="Hours"><h2>Price</h2></td>
              <td class="Rate"><h2>Sub Total</h2></td>
            </tr>
            { filtered.map((person,idx) => 
            <tr class="service">
              <td class="tableitem"><p class="itemtext">{person.product_name}</p></td>
              <td class="tableitem"><p class="itemtext">{person.quantity}</p></td>
              <td class="tableitem"><p class="itemtext">{person.price}</p></td>
              <td class="tableitem"><p class="itemtext">{person.total_amount}</p></td>
            </tr>
            )
        }
            
            <tr class="tabletitle">
              <td></td>
              <td></td>
              <td class="Rate"><h2>Total</h2></td>
              <td class="payment"><h2>{total}</h2></td>
            </tr>

          </table>
        </div>

        <div id="legalcopy">
          <p class="legal"><strong>Thank you for your business!</strong> </p>
        </div>

      </div>

</div>

    );
  }
}
 
class Bill extends React.Component {
  aftersell =(e) => {
    sessionStorage.removeItem("cosname");
    sessionStorage.removeItem("sno");
    window.location = '/dashboard';
  }
  render() {
    return (
      <div>
              <Print ref={el => (this.componentRef = el)} />
       <div className="printbotton">

        <ReactToPrint
          trigger={() => {
         return <a href="#">Print this out!</a>;
          }}
          content={() => this.componentRef}
        />
        <br/>OR<br/><a onClick={e=>this.aftersell(e)}>Move To Dashboard</a>

        </div> 
 
      </div>
    );
  }
}
export default Bill;
