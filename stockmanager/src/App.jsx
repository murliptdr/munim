import React from "react";
import {Route,Switch} from "react-router-dom";
import Signup from './signup.jsx';
import Login from './login.jsx';
import Dashboard from './dashboard.jsx';
import Add_product from "./add_product.jsx";
import Addstock from "./addstock.jsx";
import Addstockdetails from "./addstockdetails.jsx";
import Showproduct from './showproduct.jsx';
import Soldpdetail from './soldpdetail.jsx';
import Todays_sell from './todays_sell.jsx';
import Profile from './profile.jsx';
import Forgotpass from './forgotpass.jsx';
import Passcheck from './passcheck.jsx';
import Sell from './sell.js';
import Logout from './logout.jsx';
import Updateprice from "./updateprice.jsx";
import Bill from "./bill.jsx";
import main from './main.jsx';
import landing from './landing.jsx';


const App=()=>{
    return(
        <>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route  path='/signup' component={Signup} />
            <Route  path='/dashboard' component={Dashboard} />
            <Route  path='/add_product' component={Add_product} />
            <Route  path='/showproduct' component={Showproduct} />
            <Route  path='/sell' component={Sell} />
            <Route  path='/soldpdetail' component={Soldpdetail} />
            <Route  path='/todays_sell' component={Todays_sell} />
            <Route  path='/profile' component={Profile} />
            <Route  path='/forgotpass' component={Forgotpass} />
            <Route  path='/addstock' component={Addstock} />
            <Route  path='/addstockdetails' component={Addstockdetails} />
            <Route  path='/updateprice' component={Updateprice} />
            <Route  path='/passcheck' component={Passcheck} />
            <Route  path='/logout' component={Logout} />
            <Route  path='/bill' component={Bill} />
            <Route  path='/main' component={main} />
            <Route  path='/landing' component={landing} />

        </Switch>

        </>
    )
}
export default App;