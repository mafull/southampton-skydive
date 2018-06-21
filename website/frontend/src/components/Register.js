import React, { Component } from "react";
import { Link, Redirect } 	from "react-router-dom";
import axios				from "axios";
import Validator			from "validator";

import {
	Header,
	Icon,
	Form,
	Button 
}							from "semantic-ui-react";

import InlineError 			from "./InlineError";


class Register extends Component {
	state = {
		loading: false,
		errors: {},
		redirectToId: "",

		data: {
			forename: "",
			surname: "",
			email: "",
			password: ""
		}
	};


	onChange = e => {
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});
	}


	onSubmit = () => {
		// Validate the form inputs
		const errors = this.validate(this.state.data);

		// Show any errors
		this.setState({ errors });

		// If no errors, attempt to register
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			axios
				.post("/register", this.state.data)
				.then(response => {
					// Registration successful, redirect to the new user's page
					this.setState({ redirectToId: response.data._id });
				})
				.catch(error => {
					// Failed to register
					console.error(error.response);
					this.setState({ loading: false });
				});
		}
	}


	validate = data => {
		const errors = {};

		if (!Validator.isLength(data.forename, {min: 1})) errors.forename = "First name cannot be blank";
		if (!Validator.isLength(data.surname, {min: 1})) errors.surname = "Surname cannot be blank";
		if (!Validator.isEmail(data.email)) errors.email = "Invalid email address";
		if (!Validator.isLength(data.password, {min: 6})) errors.password = "Invalid password (must be at least 6 characters long)";

		return errors;
	}


	render() {
		const {
			loading,
			errors,
			data
		} = this.state;

		if (this.state.redirectToId !== "") {
			return <Redirect to={`/users/${this.state.redirectToId}`} />
		}

		return (
			<div>
				<Header size="huge"><Icon name="add user" /> Sign Up</Header>
					
				<Form onSubmit={this.onSubmit} loading={loading}>
					<Form.Group widths="equal">
						<Form.Field required error={!!errors.forename}>
							<label>First name</label>
							<input
								type="text"
								name="forename"
								placeholder="First name"
								value={data.forename}
								onChange={this.onChange}
								autoFocus
							/>
							{errors.forename && <InlineError text={errors.forename} />}
						</Form.Field>
						<Form.Field required error={!!errors.surname}>
							<label>Surname</label>
							<input
								type="text"
								name="surname"
								placeholder="Surname"
								value={data.surname}
								onChange={this.onChange}
							/>
							{errors.surname && <InlineError text={errors.surname} />}
						</Form.Field>
					</Form.Group>
						
					<Form.Field required error={!!errors.email}>
						<label>Email</label>
						<input
							type="text"
							name="email"
							placeholder="Email"
							value={data.email}
							onChange={this.onChange}
						/>
						{errors.email && <InlineError text={errors.email} />}
					</Form.Field>
					<Form.Field required error={!!errors.password}>
						<label>Password</label>
						<input
							type="password"
							name="password"
							placeholder="********"
							value={data.password}
							onChange={this.onChange}
						/>
						{errors.password && <InlineError text={errors.password} />}
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