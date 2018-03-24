import React, { Component } from "react";
import { Link } 			from "react-router-dom";
import axios				from "axios";
import {
	Header,
	Icon,
	Segment,
	Item,
	Button
}							from "semantic-ui-react";


class User extends Component {
	state = {
		_id: this.props.match.params._id,
		loaded: false
	};


	componentDidMount() {
		axios
			.get("/users/" + this.state._id)
			.then(response => {
				const user = response.data;

				const newState = Object.assign(
					{},
					this.state,
					{ ...user, loaded: true }
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

			forename,
			surname,
			email,
			approvedRigs,
			created,
			modified
		} = this.state;

		const nameContent = loaded ? (forename + " " + surname) : "";
		const generalInfoContent = loaded ?  
			<div>
				<Header>Username</Header>
				<Item>{email}</Item>
				<Header>Email</Header>
				<Item>{email}</Item>
			</div>
			: <Item>.</Item>;

		const approvedRigsContent = approvedRigs && approvedRigs.length ? approvedRigs.map(r => <Item key={r._id}><Link to={"/rigs/" + r._id}>{r.name}</Link></Item>) : <Item>None</Item>;

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
				<Header size="huge"><Icon name="user" />{nameContent}</Header>
				
				<Header size="large">General info</Header>
				<Segment loading={!loaded}>
					{generalInfoContent}
				</Segment>

				<Header size="large">Approved rigs</Header>
				<Segment loading={!loaded}>
					{approvedRigsContent}
				</Segment>

				{datesContent}

				<Button
					color="blue"
					inverted
					style={{marginTop: "10px"}}
					as={Link}
						to="/users/">
					Go back
				</Button>
			</div>
		);
	}
}


export default User;