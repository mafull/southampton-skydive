import React, { Component } from "react"
import { Link } 			from "react-router-dom"
import {
	Header,
	Icon,
	Form,
	Button 
}							from "semantic-ui-react"

/*
<div className="ui segment">
					<form action="/register" method="POST" className="ui form">
						<div className="field required">
							<label>First name</label>
							<input type="text" name="user[forename]" placeholder="First name"
							<% if(user && user.forename) { %>value="<%= user.forename %>"<% } %> autofocus>
						</div>
						<div className="field required">
							<label>Surname</label>
							<input type="text" name="user[surname]" placeholder="Surname"
							<% if(user && user.surname) { %>value="<%= user.surname %>"<% } %>>
						</div>
						<div className="field required">
							<label>Email</label>
							<input type="text" name="user[email]" placeholder="Email"
							<% if(user && user.email) { %>value="<%= user.email %>"<% } %>>
						</div>
						<div className="field required">
							<label>Password</label>
							<input type="password" name="password" placeholder="********">
						</div>
						<button type="submit" className="ui fluid blue big button">Register</button>
					</form>
				</div>
*/


class Register extends Component {
	render() {
		return (
			<div>
				<Header size="huge"><Icon name="add user" /> Sign Up</Header>
					
				<Form action="/register" method="POST">
					<Form.Group widths="equal">
						<Form.Field required>
							<label>First name</label>
							<input
								type="text"
								name="user[forename]"
								placeholder="First name"
								autoFocus
							/>
						</Form.Field>
						<Form.Field required>
							<label>Surname</label>
							<input
								type="text"
								name="user[surname]"
								placeholder="Surname"
							/>
						</Form.Field>
					</Form.Group>
						
					<Form.Field required>
						<label>Email</label>
						<input
							type="text"
							name="user[email]"
							placeholder="Email"
						/>
					</Form.Field>
					<Form.Field required>
						<label>Password</label>
						<input
							type="password"
							name="password"
							placeholder="********"
						/>
					</Form.Field>

					<Button type="submit" fluid size="big" color="blue">Register</Button>
				</Form>
				
				<Button
					color="yellow"
					fluid
					style={{marginTop: "10px"}}
					as={Link} 
						to="/">
					Cancel
				</Button>
			</div>
		);
	}
}


export default Register;