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
		_id: this.props.match.params._id
	};


	componentDidMount() {
		axios
			.get("/users/" + this.state._id)
			.then(response => {
				const user = response.data;

				const newState = Object.assign(
					{},
					this.state,
					{ ...user }
				);
				this.setState(newState);
			})
			.catch(error => {
				console.log(error.response);
			});
	}


	render() {
		const {
			forename,
			surname,
			email,
			approvedRigs,
			created,
			modified
		} = this.state;

		const approvedRigsItems = approvedRigs && approvedRigs.length ? approvedRigs.map(r => <Item key={r._id}><Link to={"/rigs/" + r._id}>{r.name}</Link></Item>) : <Item>None</Item>;

		const createdDate = created ? new Date(created).toDateString() : null;
		const modifiedDate = modified ? new Date(modified).toDateString() : null;
		
		return (
			<div>
				<Header size="huge"><Icon name="user" />{forename + " " + surname}</Header>
				
				<Header size="large">General info</Header>
				<Segment>
					<Header>Username</Header>
					<Item>{email}</Item>
					<Header>Email</Header>
					<Item>{email}</Item>
				</Segment>

				<Header size="large">Approved rigs</Header>
				<Segment>
					{approvedRigsItems}
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
						to="/users/">
					Go back
				</Button>

			</div>
		);
	}
}


export default User;