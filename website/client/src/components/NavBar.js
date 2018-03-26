import React, { Component } from "react";
import { Link }				from "react-router-dom";
import { 
	Menu,
	Container,
	Icon,
	Dropdown
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
					<Menu.Item
						className="header"
						as={Link}
							to="/">
							<Icon name="child" />UoS Skydive
					</Menu.Item>
					<Link to="/training" className="item">Training</Link>
					<Link to="/info" className="item">DZ Info</Link>
					<Link to="/rigs" className="item">Rig Booking</Link>
					<Link to="/lifts" className="item">Lift Sharing</Link>
					<Link to="/calendar" className="item">Calendar</Link>
					<Dropdown item text="Users">
						<Dropdown.Menu>
							<Dropdown.Item as={Link} to="/users">All Users</Dropdown.Item>
							<Dropdown.Item as={Link} to="/committee">Committee</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					

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