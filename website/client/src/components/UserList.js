import React, { Component } from "react";
import UserListElement 		from "./UserListElement";
import {
	Header,
	Icon,
	Table
}							from "semantic-ui-react";


class UserList extends Component {
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


	render() {
		const userListElements = (this.users) ? this.users.map(u => <UserListElement {...u} key={u._id} />) : null;

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