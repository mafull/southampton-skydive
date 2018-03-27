import React, { Component } 	from "react";
import { Switch, Route }		from "react-router-dom";
import Training 				from "./Training";
import Rig 						from "./Rig";
import RigList 					from "./RigList";
import RigNew					from "./RigNew";
import User 					from "./User";
import UserList 				from "./UserList";
import CommitteePosition 		from "./CommitteePosition";
import CommitteePositionEdit 	from "./CommitteePositionEdit";
import CommitteePositionList 	from "./CommitteePositionList";
import CommitteePositionNew 	from "./CommitteePositionNew";
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
				<Segment basic style={{fontSize: "1.1em"}}>
					<Switch>
						<Route path="/training" exact component={Training} />

						<Route path="/rigs" exact component={RigList} />
						<Route path="/rigs/new" exact component={RigNew} />
						<Route path="/rigs/:_id" component={Rig} />
				
						<Route path="/users" exact component={UserList} />
						<Route path="/users/:_id" component={User} />
				
						<Route path="/committee" exact component={CommitteePositionList} />
						<Route path="/committee/new" exact component={CommitteePositionNew} />
						<Route path="/committee/:_id/edit" component={CommitteePositionEdit} />
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