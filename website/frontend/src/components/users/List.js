import React, { Component } from "react";
import axios				from "axios";
import UserListElement 		from "./ListElement";
import {
	Header,
	Icon,
	Table,
	Segment
}							from "semantic-ui-react";


class UserList extends Component {
	state = {
		users: [],
		loaded: false
	};


	componentDidMount() {
		axios
			.get("/users")
			.then(response => {
				const users = response.data.map(u => {
					return {
						_id: u._id,
						name: u.forename + " " + u.surname,
						email: u.email
					};
				});
				
				const newState = Object.assign(
					{},
					this.state, 
					{ users, loaded: true }
				);
				this.setState(newState);

			})
			.catch(error =>
				console.log(error.response)
			);
	}


	render() {
		const { loaded, users } = this.state;
		const userListElements = users.length ? users.map(u => <UserListElement {...u} key={u._id} />) : <Table.Row><Table.Cell><Segment basic loading={!loaded}><i>No users found</i></Segment></Table.Cell></Table.Row>;

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