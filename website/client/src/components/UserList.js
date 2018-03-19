import React, { Component } from "react";
import UserListElement 		from "./UserListElement"


class UserList extends Component {
	render() {
		const userListElements = (this.props.users) ? this.props.users.map(u => <UserListElement {...u} key={u.email} />) : [];

		return (
			<div>
				<div className="ui huge header"><i className="users icon"></i> Users</div>
				<p>View all registered users</p>

				<table className="ui striped celled table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
						</tr>	
					</thead>
					<tbody>
						{userListElements}
					</tbody>
					
				</table>
			</div>
		);
	}
};


export default UserList;