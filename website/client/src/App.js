import React, { Component } from "react";
import { Route } 			from "react-router-dom";
import NavBar 				from "./components/NavBar";
import CentralComponent 	from "./components/CentralComponent";
import Footer 				from "./components/Footer";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [
				{
					name: "Max Fuller",
					email: "mf5g14@soton.ac.uk"
				},
				{
					name: "Alex Potter",
					email: "awmp1g14@soton.ac.uk"
				}
			],
			rigs: [
				{
					name: "jav",

				},
				{
					name: "wings",
					
				}
			],
		};
	}
	render() {
		return (
			<div>
				<NavBar />
				<Route path="/" exact component={null} />
				<CentralComponent {...this.state} />
				<Footer />
			</div>
		);
	}
}

export default App;
