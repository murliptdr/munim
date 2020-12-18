import React, { Component } from 'react';
import axios from 'axios';
import Main from "./main";
import Axios from 'axios';
import moment from "moment";
import uid from 'uid';
import { Redirect } from 'react-router-dom';


class Showproduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product_name: '',
      previousprice: "",
      cname: '',
      cnumber: '',
      total: '',
      taskList: [],
      price: '',
      quantity: '',
      persons: [],
      fullname: localStorage.getItem("fullname"),
      search: "",
      sortby: ""
    };
    this.InputEvent = this.InputEvent.bind(this);
    this.submit = this.submit.bind(this);
  }

  addstock = () => {
    if (
      document.getElementById("addstock") &&
      document.getElementById("notify")
    ) {
      document.getElementById("addstock").style.width = "28%";
      document.getElementById("notify").style.margintop = "0px";
    }
  };
  closeas = () => {
    if (
      document.getElementById("addstock") &&
      document.getElementById("notify")
    ) {
      document.getElementById("addstock").style.width = "0";
      document.getElementById("notify").style.margintop = "0";
    }
  };
  itemcart = () => {
    if (
      document.getElementById("itemcart") &&
      document.getElementById("notify")
    ) {
      document.getElementById("itemcart").style.width = "100%";
      document.getElementById("notify").style.margintop = "0px";
    }
  };
  closecart = () => {
    if (
      document.getElementById("itemcart") &&
      document.getElementById("notify")
    ) {
      document.getElementById("itemcart").style.width = "0";
      document.getElementById("notify").style.margintop = "0";
    }
  };
  updateprice = () => {
    if (
      document.getElementById("updateprice") &&
      document.getElementById("notify")
    ) {
      document.getElementById("updateprice").style.width = "28%";
      document.getElementById("notify").style.margintop = "0px";
    }
  };

  closeup = () => {
    if (
      document.getElementById("updateprice") &&
      document.getElementById("notify")
    ) {
      document.getElementById("updateprice").style.width = "0";
      document.getElementById("notify").style.margintop = "0";
    }
  };

  clickOnDelete(record) {
    this.setState({
      taskList: this.state.taskList.filter(r => r !== record)
    });
  }

  InputEvent(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  componentDidMount() {
    axios.get(`http://localhost:8013/showproduct`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }
  search = e => {
    this.setState({ search: e.target.value });
  }

  submit1 = () => {
    var date = moment().format("YYYY/MM/DD");
    var time = new Date().toLocaleTimeString();
    const data = {
      product_name: this.state.product_name,
      quantity: this.state.quantity,
      date: date,
      time: time,
    }
    if (window.confirm('Confirm ? ')) {
      Axios.post('http://localhost:8013/addstock', data)
        .then(res => {
          if (res.data.status === false) {
            alert(res.data.message);
          } else
            if (res.data.status === true) {
              window.location = '/showproduct';
            }
        })
        .catch(err => {
          console.log(err);
        })
    }

  }
  submit(e) {
    e.preventDefault()
    const data = {
      product_name: this.state.product_name,
      price: this.state.price
    }
    {
      if (window.confirm('Confirm ? ')) {
        Axios.post('http://localhost:8013/updateprice', data)
          .then(res => {
            if (res.data.status === false) {
              alert(res.data.message);
            } else
              if (res.data.status === true) {
                alert(res.data.message);
                window.location = '/showproduct';
              }
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
  }
  handleChange = (e) => {
      if (["quantity"].includes(e.target.name)) {
      let taskList = [...this.state.taskList]
      taskList[e.target.dataset.id][e.target.name] = e.target.value;
      }
    this.setState({ [e.target.name]: e.target.value });
  }

  sellcart = (e) => {
    var date = new Date().toJSON().slice(0, 10);
    var time = new Date().toLocaleTimeString();
    var sno = uid();
    e.preventDefault();
    var total = 0;
    var total1 = 0;
    for (var j = 0; j < this.state.taskList.length; j++) {
      var total_amount1 = this.state.taskList[j].price * this.state.taskList[j].quantity;
      total1 = total1 + total_amount1;
    }
    {
      if (window.confirm(`Confirm ? Total=${total1}`)) {
        for (var i = 0; i < this.state.taskList.length; i++) {

          var total_amount = this.state.taskList[i].price * this.state.taskList[i].quantity;
          total = total + total_amount;
          sessionStorage.setItem('cosname', this.state.cname);
          sessionStorage.setItem('sno', sno);

          let data = {
            sno: sno,
            cname: this.state.cname,
            cnumber: this.state.cnumber,
            product_name: this.state.taskList[i].product_name,
            price: this.state.taskList[i].price,
            quantity: this.state.taskList[i].quantity,
            date: date,
            time: time,
            total_amount: total_amount
          }
          axios.post('http://localhost:8013/sell', data)
            .then(res => {
              if (res.data.status === false) {
                alert(res.data.message);

              } else
                if (res.data.status === true) {
                  this.setState({
                    loggedIn: true
                  })
                }
              axios.post('http://localhost:8013/bill', sno);
            })
            .catch(err => {
              console.log(err);
            })

        };
      }
    }
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/bill" />
    }
    const { search } = this.state;
    const filtered = this.state.persons.filter(person => {
      return person.product_name.toLowerCase().indexOf(search.toLowerCase()) !== -1 || person.brand.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })
    var total=0;
    for (var i = 0; i < this.state.taskList.length; i++) {

      var total_amount = this.state.taskList[i].price * this.state.taskList[i].quantity;
      total = total + total_amount;    
    }

    return (
      <>
        <Main />
        <a id="notify" onClick={this.itemcart} className="carticon"><i className="fa fa-shopping-cart"></i>
          <span className="cartbadge">
            {this.state.taskList.length} </span>
        </a>
        <center>
          <div className="App">
            <h1>PRODUCTS</h1>


            <div className="">
              <input placeholder="Search Product" icon="search" onChange={this.search} />
              <input placeholder="Search brand" icon="search" onChange={this.search} />

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
                {filtered.map((person, idx) =>
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{person.product_name}</td>
                    {/* <td><img src={person.image} width="60px" height="40px" /></td> */}
                    <td>{person.price}</td>
                    <td>{person.sub_category}</td>
                    <td>{person.brand}</td>
                    <td>{person.quantity}</td>
                    <td>
                      <div onClick={() => {
                        var count = 0;
                        var taskListlength = this.state.taskList.length;
                        for (var i = 0; i < taskListlength; i++) {
                          if (this.state.taskList[i].product_name === person.product_name) {
                            count++;
                          }
                        }
                        if (count == 0) {
                          this.setState((prevState) => ({
                            taskList: [...prevState.taskList, { index: Math.random(), product_name: person.product_name, price: person.price, quantity: '1' }],
                          }));
                        }
                      }}>
                        <button >Add to cart</button>
                      </div>
                    </td>
                    <td>
                      <div onClick={() => { this.setState({ product_name: person.product_name, previousprice: person.price }) }}>
                        <button onClick={this.updateprice}>Update Price</button>
                      </div>
                    </td>
                    <td>
                      <div onClick={() => { this.setState({ product_name: person.product_name }) }}>
                        <button onClick={this.addstock}>Add Stock</button>
                      </div>
                    </td>
                  </tr>
                )
                }

              </table>
              <div id="updateprice" className="updateprice">
                <div className="add_product"><br />
                  <div className="add_form">
                    <label className="sfont">PRODUCT NAME</label>
                    <h3>{this.state.product_name}</h3>
                    <label className="sfont">PREVIOUS PRICE</label>
                    <h3>{this.state.previousprice}</h3>
                    <label className="sfont">ENTER NEW PRICE</label>
                    <input type="int" value={this.state.price} onChange={this.InputEvent} className="sinput" name="price" required />
                    <button className="sbutton" onClick={this.submit} >Submit</button>
                    <button className="sbutton" href="javascript:void(0)" onClick={this.closeup} >Cancel</button>
                  </div>
                </div>
              </div>
              <div id="addstock" className="updateprice">
                <div className="add_product"><br />
                  <div className="add_form">
                    <label className="sfont">PRODUCT NAME</label>
                    <h3>{this.state.product_name}</h3>
                    <label className="sfont">QUANTITY</label>
                    <input type="int" value={this.state.quantity} onChange={this.InputEvent} className="sinput" name="quantity" required />
                    <button className="sbutton" onClick={this.submit1} >Submit</button>
                    <button className="sbutton" href="javascript:void(0)" onClick={this.closeas} >Cancel</button>
                  </div>
                </div>
              </div>

              <div id="itemcart" className="itemcart">
                <tr className="sfont">
                  <th>CUSTOMER NAME</th>
                  <th>CUSTOMER MOBILE NO.</th>
                </tr>
                <td><input type="text" value={this.state.cname} onChange={this.handleChange} name="cname" className="sinput" required /></td>
                <td><input type="tel" value={this.state.cnumber} onChange={this.handleChange} name="cnumber" pattern="[0-9]{10}" className="sinput" required /></td>
                <hr />
                <table className="carttable">
                  <thead>
                    <tr className="sfont">
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Amount</th>

                    </tr>
                  </thead>
                  <tbody>
                    {this.state.taskList.map((val, idx) => {
                      let quantity = `quantity-${idx}`

                      return (
                        <tr key={val.index}>
                          <td>
                            {val.product_name}
                          </td>
                          <td>
                            {val.price}
                          </td>
                          <td>
                          <input type="int" onChange={this.handleChange} placeholder="1" name="quantity" id={quantity} data-id={idx} className="idinput"/>
                          </td>
                          <td>
                          {val.price * val.quantity}
                          </td>
                          <td>
                            {
                              idx < 0 ? <i className="ibutton" aria-hidden="true"></i>
                                : <button className="binput" onClick={(() => this.clickOnDelete(val))} >&times;<i className="button" aria-hidden="true"></i></button>
                            }
                          </td>
                        </tr>
                      )
                    })
                    }
                    <td></td>
                    <td></td>
                    <td><h3>TOTAL</h3></td>
                    <td><h3>{total}</h3></td>
                  </tbody>
                  <tfoot>
                  </tfoot>
                </table>
                <div className="card-footer text-center"> <button type="submit" onClick={this.sellcart} className="sellbutton">Submit</button></div>
                <div className="col-sm-1">
                </div>
                <button className="sellbutton" href="javascript:void(0)" onClick={this.closecart} >Cancel</button>
              </div>
            </div>
          </div>
        </center>
      </>
    );
  }
}

export default Showproduct;
