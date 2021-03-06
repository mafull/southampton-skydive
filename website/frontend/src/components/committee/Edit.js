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


class Edit extends Component {
	state = {
		loading: true,
		sending: false,
		redirect: false,

		_id: this.props.match.params._id,
		title: "",
		description: "",
		user: "",

		users: []
	};


	componentDidMount() {
		axios
			.get(`/committee/${this.state._id}/edit`)
			.then(response => {
				const { position, users } = response.data;

				const newState = Object.assign(
					{},
					this.state,
					{ ...position, users, loading: false }
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
			.put(`/committee/${this.state._id}`, data)
			.then(response => {
				this.setState({ redirect: true });
			})
			.catch(error => {
				console.log(error.response);
			});
	}


	render() {
		const {
			loading,
			sending,
			redirect,

			_id,
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
			return <Redirect to={`/committee/${_id}`} />
		}

		return (
			<div>
				<Header size="huge"><Icon name="edit" /> Edit Committee Position</Header>

				<Form loading={loading || sending} onSubmit={onSubmit}>
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
							onChange={(e, d) => onChange({ target: { name: "user", value: d.value }})}>
						</Select>
					</Form.Field>

					<Button
						type="submit"
						fluid
						size="big"
						color="blue">
						Update
					</Button>
				</Form>

				<Button
					color="yellow"
					fluid
					style={{marginTop: "10px"}}
					as={Link}
						to={`/committee/${_id}`}>
					Cancel
				</Button>
			</div>
		);
	}
}


export default Edit;
