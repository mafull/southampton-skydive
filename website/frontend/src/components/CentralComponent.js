import React, { Component } 	from "react";
import { Switch, Route }		from "react-router-dom";
import Training 				from "./Training";
import Rigs						from "./rigs/Index";
import Users					from "./users/Index";
import Committee				from "./committee/Index";
import Login 					from "./Login";
import Register					from "./Register";
import {
	Container,
	Segment
}								from "semantic-ui-react";


class CentralComponent extends Component {
	render() {
		return (
			<Container className="main segment" text>
				<Segment basic style={{ fontSize: "1.1em" }}>
					<Switch>
						<Route path="/training" exact component={Training} />

						<Route path="/rigs" component={Rigs} />
						<Route path="/users" component={Users} />
						<Route path="/committee" component={Committee} />						
				
						<Route path="/login" exact component={Login} />
						<Route path="/register" exact component={Register} />
						<Route path="*" component={<h1>Under construction!</h1>} />
					</Switch>
				</Segment>
			</Container>
		);
	}
};


export default CentralComponent;