import React from "react";
import axios from 'axios';
import moment from "moment";
import uid from 'uid';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Redirect } from "react-router-dom";
import Main from "./main";
class Sell extends React.Component {

	state = {
		taskList: [{ index: Math.random(), product_name: "", price: "", quantity: "" }],
		cname: '',
		cnumber: '',
		total: '',
		search: "",
		persons: []
	}
	handleChange = (e) => {
		if (["product_name", "price", "quantity"].includes(e.target.name)) {
			let taskList = [...this.state.taskList]
			taskList[e.target.dataset.id][e.target.name] = e.target.value;
		} else {
			this.setState({ [e.target.name]: e.target.value })
		}

		for (var i = 0; i < this.state.taskList.length; i++) {
			if (this.state.taskList[i].product_name != '' && this.state.taskList[i].price != '' || this.state.taskList[i].quantity != '') {
				let data = {
					product_name: this.state.taskList[i].product_name,
					quantity: this.state.taskList[i].quantity,
				}
				axios.post('http://localhost:8013/sellcheck', data)
					.then(res => {
						if (res.data.status === false) {
							NotificationManager.warning(res.data.message, '', 2000);

						} else
							if (res.data.status === true) {

							}
					})
					.catch(err => {
						console.log(err);
					})
			}
		}
	}
	addNewRow = (e) => {
		this.setState((prevState) => ({
			taskList: [...prevState.taskList, { index: Math.random(), product_name: "", price: "", quantity: "" }],
		}));
	}

	deteteRow = (index) => {
		this.setState({
			taskList: this.state.taskList.filter((s, sindex) => index !== sindex),
		});

	}

	componentDidMount() {
		axios.get(`http://localhost:8013/showproduct`)
			.then(res => {
				const persons = res.data;
				this.setState({ persons });
			})
	}


	totalamount = (e) => {
		var total = 0;
		for (var i = 0; i < this.state.taskList.length; i++) {
			var total_amount = this.state.taskList[i].price * this.state.taskList[i].quantity;
			total = total + total_amount;
			if (this.state.taskList[i].price != '' && this.state.taskList[i].quantity != '') {
				if (i == this.state.taskList.length - 1) {
					NotificationManager.warning(`Total Amount=${total}`, '', 2500);
				}
			}

		}
	}


	handleSubmit = (e) => {
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
					if (this.state.taskList[i].product_name === '' || this.state.taskList[i].price === '') {
						NotificationManager.warning("Please Fill up Required Field.Please Check Field");
						return false;
					}
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
	clickOnDelete(record) {
		this.setState({
			taskList: this.state.taskList.filter(r => r !== record)
		});
	}
	render() {
		if (this.state.loggedIn) {
			return <Redirect to="/bill" />
		}
		const { search } = this.state;
		const filtered = this.state.persons.filter(person => {
			return person.product_name.toLowerCase().indexOf(search.toLowerCase()) !== -1
		})
		let { taskList } = this.state
		return (
			<>
				<Main />
				<center>
					<h1>SELL PRODUCT</h1>
					<div className="">
						<NotificationContainer />
						<form onSubmit={this.handleSubmit} onChange={this.handleChange} >
							<div style={{ marginTop: 20 }}>
								<tr className="sfont">
									<th>CUSTOMER NAME</th>
									<th>CUSTOMER MOBILE NO.</th>
								</tr>
								<td><input type="text" value={this.state.cname} onChange={this.handleChange} name="cname" className="sinput" required /></td>
								<td><input type="tel" value={this.state.cnumber} onChange={this.handleChange} name="cnumber" pattern="[0-9]{10}" className="sinput" required /></td>
								<hr />
								<table className="">
									<thead>
										<tr className="sfont">
											<th>Product Name</th>
											<th>Price</th>
											<th>Quantity</th>
										</tr>
									</thead>
									<tbody>
										{taskList.map((val, idx) => {
											let product_name = `product_name-${idx}`, price = `price-${idx}`, quantity = `quantity-${idx}`
											return (
												<tr key={val.index}>
													<td>
														<input type="text" list="cityname" name="product_name" data-id={idx} id={product_name} className="sinput" />
														<datalist id="cityname">
															{filtered.map(person =>
																<option value={person.product_name} />
															)}
														</datalist>
													</td>
													<td>
														<input type="int" name="price" id={price} data-id={idx} className="sinput" />
													</td>
													<td>
														<input type="int" name="quantity" id={quantity} data-id={idx} className="sinput" />
													</td>
													<td>
														{
															idx === 0 ? <i className="ibutton" aria-hidden="true"></i>
																: <button className="binput" onClick={(() => this.clickOnDelete(val))} >-<i className="button" aria-hidden="true"></i></button>
														}
													</td>
												</tr>
											)
										})
										}
									</tbody>
									<tfoot>
										<tr><td colSpan="4">
											<button onClick={this.addNewRow} type="button" className="binput">+<i className="binput" aria-hidden="true"></i></button>
										</td></tr>
									</tfoot>
								</table>
								<div className="card-footer text-center"> <button type="submit" className="sellbutton">Submit</button></div>
								<div className="col-sm-1">
									<button onClick={this.totalamount} type="button" className="sellbutton">TOTAL AMOUNT</button>
								</div>
							</div>
						</form>
					</div>
				</center>
			</>
		)

	}

}
export default Sell;
