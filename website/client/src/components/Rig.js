import React, { Component } from "react";
import axios 				from "axios";
import { Link } 			from "react-router-dom";
import {
	Header,
	Icon,
	Segment,
	Item,
	Button
}							from "semantic-ui-react";


class Rig extends Component {
	state = {
		_id: this.props.match.params._id
	};


	componentDidMount() {
		axios
			.get("/rigs/" + this.state._id)
			.then(response => {
				const rig = response.data;

				const newState = Object.assign(
					{},
					this.state,
					{ ...rig }
				);
				this.setState(newState);
			})
			.catch(error => {
				console.log(error.response);
			});
	}


	render() {
		const { 
			name,
			equipment,
			approvedUsers,
			created,
			modified
		} = this.state;

		const {
			main,
			reserve
		} = equipment ? equipment : {};

		const mainText = main ? 
			<p>{main.make} <strong>{main.model + " " + main.size}</strong></p>
			: "Unknown";

		const reserveText = main ? 
			<p>{reserve.make} <strong>{reserve.model + " " + reserve.size}</strong></p>
			: "Unknown";

		const approvedUsersText = approvedUsers && approvedUsers.length ?
			approvedUsers.map(u => <Item key={u._id}><Link to={"/users/" + u._id}>{u.forename + " " + u.surname}</Link></Item>)
			: <Item>None</Item>;

		const createdDate = created ? new Date(created).toDateString() : null;
		const modifiedDate = modified ? new Date(modified).toDateString() : null;

		return (
			<div>
				<Header size="huge"><Icon name="umbrella" />{name}</Header>

				<Header size="large">Equipment</Header>
				<Segment>
					<Header>Main</Header>
					{mainText}
					<Header>Reserve</Header>
					{reserveText}
				</Segment>

				<Header size="large">Bookings</Header>
				<Segment>
					CALENDAR GOES HERE
				</Segment>

				<Header size="large">Approved users</Header>
				<Segment>
					{approvedUsersText}
				</Segment>

				<Header size="small">Date created</Header>
				<Item>{createdDate}</Item>
				<Header size="small">Last modified</Header>
				<Item>{modifiedDate}</Item>

				<Button
					color="blue"
					inverted
					style={{marginTop: "10px"}}
					as={Link}
						to="/rigs/">
					Go back
				</Button>
			</div>
		);
	}
}


export default Rig;