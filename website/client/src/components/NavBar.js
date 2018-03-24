import React, { Component } from "react";
import { Link }				from "react-router-dom";
import { 
	Menu,
	Container,
	Icon
}							from "semantic-ui-react";


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
			<Menu inverted fixed="top" color="blue" style={{ height: "40px" }}>
				<Container>
					<Menu.Item className="header"><Icon name="child"></Icon>UoS Skydive</Menu.Item>
					<Link to="/" className="item">Home</Link>
					<Link to="/rigs" className="item">Rig booking</Link>
					<Link to="/calendar" className="item">Calendar</Link>
					<Link to="/users" className="item">Users</Link>
					<Link to="/committee" className="item">Committee</Link>

					<Menu.Item position="right">
						<Link to="/login" className="item">Log in</Link>
						<Link to="/register" className="item">Sign up</Link>
					</Menu.Item>
				</Container>
			</Menu>
		);
	}


};


export default NavBar;