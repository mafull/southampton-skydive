import React, { Component } from "react";
import axios				from "axios";
import UserListElement 		from "./UserListElement";
import {
	Header,
	Icon,
	Table
}							from "semantic-ui-react";


class UserList extends Component {
	state = {
		users: []
	};


	constructor(props) {
		super(props);

		this.users = [
			{
				_id: "bd0",
				name: "Max",
				email: "one@two.com"
			},
			{
				_id: "sdh2",
				name: "Ben",
				email: "one@poo.com"
			}
		];
	}


	componentDidMount() {
		axios
			.get("/users")
			.then(response => {
				const users = response.data.map(u => {
					return {
						_id: u._id,
						name: u.forename + " " + u.surname,
						email: u.email
					}
				});
				
				const newState = Object.assign(
					{},
					this.state, 
					{users}
				);
				this.setState(newState);

			})
			.catch(error =>
				console.log(error.response)
			);

	}


	render() {
		const userListElements = (this.state.users) ? this.state.users.map(u => <UserListElement {...u} key={u._id} />) : null;

		return (
			<div>
				<Header size="huge"><Icon name="users" /> Users</Header>
				<p>View all registered users</p>

				<Table striped celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.HeaderCell>Email</Table.HeaderCell>
						</Table.Row>	
					</Table.Header>
					<Table.Body>
						{userListElements}
					</Table.Body>					
				</Table>
			</div>
		);
	}
};


export default UserList;