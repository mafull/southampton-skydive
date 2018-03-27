import React, { Component } from "react";
import { Switch, Route }	from "react-router-dom";
//import Edit					from "./Edit";
import List					from "./List";
import Show					from "./Show";


class Index extends Component {
	render() {
		const { url } = this.props.match;

		return (
			<Switch>
				<Route path={`${url}/:_id`} exact component={Show} />
				<Route path={`${url}*`} component={List} />
			</Switch>
		);
	}
}


export default Index;