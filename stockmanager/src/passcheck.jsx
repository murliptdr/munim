import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      proname: localStorage.getItem("pname"),
      
    };
  }

  render() {
   
    return (
      <>
        <header>

          <h3>WELCOME {this.state.proname}</h3>

        </header>

        <section>
          <nav>
            <h1>section</h1>
            <ul>
              <li><a href="#">London</a></li>
              <li><a href="#">Paris</a></li>
              <li><a href="#">Tokyo</a></li>
            </ul>
          </nav>

          <article>

          </article>
        </section>

        <footer>
          <h1>Footer</h1>
        </footer>


      </>
    )
  }
}
export default Dashboard;