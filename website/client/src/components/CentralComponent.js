import React, { Component } from "react";
import { Switch, Route }	from "react-router-dom";
import RigList 				from "./RigList";
import UserList 			from "./UserList";
import User 				from "./User";
import CommitteeList 		from "./CommitteeList";
import CommitteePosition 	from "./CommitteePosition";
import Login 				from "./Login";
import Register				from "./Register";
import {
	Container,
	Segment }				from "semantic-ui-react";


class CentralComponent extends Component {
	render() {
		return (
			<Container className="main segment" text>
				<Segment basic>
					<Switch>
						<Route path="/rigs" exact component={RigList} />
						<Route path="/users" exact component={UserList} />
							<Route path="/users/:_id" component={User} />
						<Route path="/committee" exact component={CommitteeList} />
							<Route path="/committee/:_id" component={CommitteePosition} />
						<Route path="/login" exact component={Login} />
						<Route path="/register" exact component={Register} />
					</Switch>
				</Segment>
			</Container>
		);
	}
};


export default CentralComponent;