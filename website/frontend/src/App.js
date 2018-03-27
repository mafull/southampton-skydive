import React, { Component } from "react";
import NavBar 				from "./components/NavBar";
import CentralComponent 	from "./components/CentralComponent";
import Footer 				from "./components/Footer";

class App extends Component {
	render() {
		return (
			<div>
				<NavBar />
				<CentralComponent {...this.state} />
				<Footer />
			</div>
		);
	}
}

export default App;
