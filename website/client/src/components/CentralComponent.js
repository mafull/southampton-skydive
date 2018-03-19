import React, { Component } from "react"
import { Route } 			from "react-router-dom"
import RigList 				from "./RigList"
import UserList 			from "./UserList"
import CommitteeList 		from "./CommitteeList"
import Login 				from "./Login"
import Register				from "./Register"


class CentralComponent extends Component {
	render() {
		return (
			<div className="ui main text container segment">
				<Route path="/rigs" exact component={RigList} />
				<Route path="/users" exact component={UserList} />
				<Route path="/committee" exact component={CommitteeList} />

				<Route path="/login" exact component={Login} />
				<Route path="/register" exact component={Register} />
			</div>
		);
	}
};


export default CentralComponent;