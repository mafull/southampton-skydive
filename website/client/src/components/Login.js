import React, { Component } from "react"
import { Link } 			from "react-router-dom"
import {
	Header,
	Icon,
	Form,
	Button
}							from "semantic-ui-react"
import Validator			from "validator"
import PropTypes			from "prop-types"
import InlineError			from "./InlineError"

// Email input
/*
<input type="text" name="username" placeholder="Email"
							<% if(username) { %> value="<%= username %>"<% } %> autofocus>
*/

class Login extends Component {
	static propTypes = {
		submit: PropTypes.func.isRequired
	};


	state = {
		data: {
			email: "",
			password: ""
		},
		loading: false,
		errors: {}
	};


	onChange = e => 
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value}
		});


	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({errors});
		if(Object.keys(errors).length === 0) {
			//this.props.submit(this.state.data);
			console.log(this.state.data);
		}
	}


	validate = data => {
		const errors = {};
		if(!Validator.isEmail(data.email)) errors.email = "Invalid email";
		if(!Validator.isLength(data.password, {min: 6})) errors.password = "Invalid password (must be at least 6 characters long)";
		return errors;
	}


	render() {
		const { data, errors } = this.state;

		return (
			<div>
				<Header size="huge"><Icon name="sign in" /> Log in</Header>

				<Form onSubmit={this.onSubmit}>
					<Form.Field required error={!!errors.email}>
						<label>Email</label>
						<input
							type="text"
							name="email"
							placeholder="Email"
							value={data.email}
							onChange={this.onChange}
							autoFocus
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
					
					<Button type="submit" fluid size="big" color="blue">Log in</Button>
				</Form>

				<Button as={Link} to="/" color="blue" inverted>Go back</Button>
			</div>
		);
	}
}


export default Login;