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


class Show extends Component {
	state = {
		_id: this.props.match.params._id,
		loaded: false
	};


	componentDidMount() {
		axios
			.get("/rigs/" + this.state._id)
			.then(response => {
				const rig = response.data;

				const newState = Object.assign(
					{},
					this.state,
					{ ...rig, loaded: true }
				);
				this.setState(newState);
			})
			.catch(error => {
				console.log(error.response);
			});
	}


	render() {
		const { 
			loaded,

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

		const mainContent = (main && main.make && main.model && main.size) ? <p>{main.make} <strong>{main.model + " " + main.size}</strong></p> : <p><i>Unknown</i></p>;
		const reserveContent = (reserve && reserve.make && reserve.model && reserve.size) ? <p>{reserve.make} <strong>{reserve.model + " " + reserve.size}</strong></p> : <p><i>Unknown</i></p>;
		const equipmentContent = (main || reserve) ?
			<div>
				<Header>Main</Header>
				{mainContent}
				<Header>Reserve</Header>
				{reserveContent}
			</div>
			: "Unknown";

		const approvedUsersContent = approvedUsers && approvedUsers.length ?
			approvedUsers.map(u => <Item key={u._id}><Link to={"/users/" + u._id}>{u.forename + " " + u.surname}</Link></Item>)
			: <Item>None</Item>;

		const createdDate = created ? new Date(created).toDateString() : "Unknown";
		const modifiedDate = modified ? new Date(modified).toDateString() : "Unknown";
		const datesContent = (created || modified) ?
			<div>
				<Header size="small">Date created</Header>
				<Item>{createdDate}</Item>
				<Header size="small">Last modified</Header>
				<Item>{modifiedDate}</Item>
			</div>
			: null;
		
		return (
			<div>
				<Header size="huge"><Icon name="umbrella" />{name}</Header>

				<Header size="large">Equipment</Header>
				<Segment loading={!loaded}>
					{equipmentContent}
				</Segment>

				<Header size="large">Bookings</Header>
				<Segment loading={!loaded}>
					CALENDAR GOES HERE
				</Segment>

				<Header size="large">Approved users</Header>
				<Segment loading={!loaded}>
					{approvedUsersContent}
				</Segment>

				{datesContent}

				<Button
					color="blue"
					inverted
					fluid
					style={{marginTop: "10px"}}
					as={Link}
						to="/rigs/">
					View all Rigs
				</Button>
			</div>
		);
	}
}


export default Show;