import React, { Component } from "react"
import RigListElement from "./RigListElement"


// CONTAINER
/*
	<% rigs.forEach(function(rig) { %>
						<div className="four wide column">
							<div className="item">
								<div className="content">
									<a className="ui huge header" href="/rigs/<%= rig._id %>"><%= rig.name %></a>
									<div className="meta">
										<span><%= rig.main.model + " " + rig.main.size %></span>
									</div>
									<div className="description">

									</div>
									<div className="extra">
										<!-- <a className="ui floated basic blue button" href="/rigs/<%= rig._id %>">Select</a> -->
									</div>
								</div>
							</div>
						</div>
					<% }); %>

					<% if(currentUser && (currentUser.isAdmin || currentUser.canEditRigs)) { %>
						<div className="four wide column">
							<div className="item">
								<div className="content">
									<div className="meta">
										<span></span>
									</div>
									<div className="description">

									</div>
									<div className="extra">
										<a className="ui big green button" href="/rigs/new">Add rig</a>
									</div>
								</div>
							</div>
						</div>
					<% } %>
*/

class RigList extends Component {
	render() {
		const rigListElements = this.props.rigs ? this.props.rigs.map(r => <RigListElement {...r} key={r.name} />) : null;
		return (
			<div>
				<div className="ui huge header">Rig booking</div>
				<p>Book out a rig and view current rig status</p>

				<div className="ui stackable grid container">
					<RigListElement />
					<RigListElement />
				</div>
			</div>
		);
	}
}


export default RigList;