import React, { Component } from "react";
import { Route } 			from "react-router-dom";
import NavBar 				from "./components/NavBar";
import CentralComponent 	from "./components/CentralComponent";
import Footer 				from "./components/Footer";

class App extends Component {
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
