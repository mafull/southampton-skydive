import React, { Component } from "react";
import axios				from "axios";
import { Link, Redirect }	from "react-router-dom";
import {
	Header,
	Icon,
	Form,
	Button,
	Select,
	TextArea
}							from "semantic-ui-react";


class New extends Component {
	state = {
		sending: false,
		redirect: false,

		title: "",
		description: "",
		user: "",

		users: []
	};


	componentDidMount() {
		axios
			.get("/users")
			.then(response => {
				const users = response.data.filter(u => !u.committeePosition);

				const newState = Object.assign(
					{},
					this.state,
					{ users }
				);
				this.setState(newState);
			})
			.catch(error => {
				console.log(error.response);
			});
	}


	onChange = e => { 
		const newState = Object.assign(
			{},
			this.state,
			{ [e.target.name]: e.target.value }
		);
		this.setState(newState);
	}


	onSubmit = e => {
		this.setState(Object.assign({}, this.state, { sending: true }));

		const data = {
			title: this.state.title,
			description: this.state.description,
			user: this.state.user
		};

		axios
			.post("/committee", data)
			.then(response => {
				this.setState({ redirect: true });
			})
			.catch(error => {
				console.log(error.response);
			});
	}


	render() {
		const {
			sending,
			redirect,

			title,
			description,
			user,

			users
		} = this.state;

		const {
			onChange,
			onSubmit
		} = this;

		let userOptions = [];
		userOptions.push({
			text: "None",
			value: "",
			//image: {avatar: true, src: "/assets/images/avatar/small/jenny.jpg"}
		});
		users.forEach(u => {
			userOptions.push({
				text: u.forename + " " + u.surname,
				value: u._id,
				//image
			});
		});

		if(redirect) {
			return <Redirect to="/committee" />
		}

		return (
			<div>
				<Header size="huge"><Icon name="plus" /> Add a New Committee Position</Header>
			
				<Form loading={sending} onSubmit={onSubmit}>
					<Form.Field required>
						<label>Position Title</label>
						<input
							type="text"
							name="title"
							placeholder="Title"
							value={title}
							onChange={onChange}
							autoFocus />
					</Form.Field>

					<Form.Field>
						<label>Description and Responsibilities</label>
						<TextArea
							name="description"
							rows="4"
							placeholder="Description"
							value={description}
							onChange={onChange} />
					</Form.Field>

					<Form.Field>
						<label>User</label>
						<Select						
							name="user"
							placeholder="User"
							search
							value={user}
							options={userOptions}
							onChange={(e, d) => onChange({ target: { name: "user", value: d.value }})} />
					</Form.Field>				

					<Button
						type="submit"
						fluid
						size="big"
						color="blue">
						Add
					</Button>
				</Form>

				<Button
					color="yellow"
					fluid
					style={{marginTop: "10px"}}
					as={Link} 
						to="/committee">
					Cancel
				</Button>
			</div>
		);
	}
}


export default New;