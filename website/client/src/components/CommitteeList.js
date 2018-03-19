import React, { Component } from "react"
import CommitteeListElement from "./CommitteeListElement"


// TBODY
/*
	<% committeePositions.forEach(function(position) { %>
							<tr>
								<td>
									<a href="/committee/<%= position._id %>"><%= position.name %></a>
								</td>
								<td>
									<% if(position.user) { %>
										<a href="/users/<%= position.user._id %>"><%= position.user.forename + " " + position.user.surname %></a>
									<% } %>
								</td>
								<td>
									<% if(position.user) { %>
										<%= position.user.email %>
									<% } %>
								</td>
							</tr>
						<% }); %>
*/


// BELOW TABLE
/*
	<% if(currentUser && (currentUser.isAdmin || currentUser.isCommittee)) { %>
					<a className="ui green button" href="/committee/new">Add comittee role</a>
				<% } %>
*/

class CommitteeList extends Component {
	render() {
		return (
			<div>
				<div className="ui huge header"><i className="users icon"></i> Committee</div>
				<p>View the current committee</p>

				<table className="ui striped celled table">
					<thead>
						<tr>
							<th>Position</th>
							<th>Name</th>
							<th>Email</th>
						</tr>	
					</thead>
					<tbody>
						<CommitteeListElement position="President" name="Max Fuller" email="mf5g14@soton.ac.uk" />
						<CommitteeListElement />
					</tbody>
				</table>

				

			</div>
		);
	}
}


export default CommitteeList;