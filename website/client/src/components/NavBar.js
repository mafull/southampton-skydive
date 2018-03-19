import React, { Component } from "react";
import { Link } 			from "react-router-dom"


// RIGHT ITEM
/*
<% if(!currentUser) { %>
							<a href="/login" className="item">Log in</a>
							<a href="/register" className="item">Sign up</a>
						<% } else { %>
							<a href="/users/<%= currentUser._id %>">Signed in as <strong><%= currentUser.forename + " " + currentUser.surname %></strong></a>
							<a href="/logout" className="item">Log out</a>
						<% } %>
						*/

class NavBar extends Component {
	render() {
		return (
			<div className="ui fixed inverted blue menu">
				<div className="ui container">
					<div className="header item"><i className="child icon"></i>UoS Skydive</div>
					<Link to="/" className="item">Home</Link>
					<Link to="/rigs" className="item">Rig booking</Link>
					<Link to="" className="item">Calendar</Link>
					<Link to="/users" className="item">Users</Link>
					<Link to="/committee" className="item">Committee</Link>

					<div className="right item">
						
					</div>
				</div>
			</div>
		);
	}


};


export default NavBar;