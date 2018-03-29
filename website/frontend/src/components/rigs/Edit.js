import React, { Component } from "react";
import { Link, Redirect }	from "react-router-dom";
import axios 				from "axios";
import {
	Header,
	Icon,
	Form,
	Button,
	Select
}							from "semantic-ui-react";


class Edit extends Component {
	state = {
		loading: true,
		sending: false,
		redirect: false,

		_id: this.props.match.params._id,

		name: "",

		mainMake: "",
		mainModel: "",
		mainSize: "",

		reserveMake: "",
		reserveModel: "",
		reserveSize: "",

		approvedUsers: [],

		users: []
	};


	componentDidMount() {
		axios
			.get(`/rigs/${this.state._id}/edit`)
			.then(response => {
				const { rig, users } = response.data;

				const { equipment, ...remaining } = rig;

				const { main, reserve } = equipment;

				const reformatted = {
					mainMake: main.make,
					mainModel: main.model,
					mainSize: main.size,

					reserveMake: reserve.make,
					reserveModel: reserve.model,
					reserveSize: reserve.size
				}

				const newState = Object.assign(
					{},
					this.state,
					{
						...remaining,
						...reformatted,
						users,
						loading: false
					}
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
		this.setState(newState, () => {
			console.table(this.state);
		});

	}


	onSubmit = e => {
		this.setState(Object.assign({}, this.state, { sending: true }));

		const equipment = {
			main: {
				make: this.state.mainMake,
				model: this.state.mainModel,
				size: this.state.mainSize
			},
			reserve: {
				make: this.state.reserveMake,
				model: this.state.reserveModel,
				size: this.state.reserveSize
			}
		};

		const data = {
			name: this.state.name,
			equipment,
			approvedUsers: this.state.approvedUsers
		};

		axios
			.post("/rigs", data)
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

			name,

			mainMake,
			mainModel,
			mainSize,

			reserveMake,
			reserveModel,
			reserveSize,

			approvedUsers,

			users
		} = this.state;

		const {
			onChange,
			onSubmit
		} = this;

		let userOptions = [];
		users.forEach(u => {
			userOptions.push({
				text: u.forename + " " + u.surname,
				value: u._id,
				//image
			});
		});

		if(this.state.redirect) {
			return <Redirect to="/rigs" />
		}

		return (
			<div>
				<Header size="huge"><Icon name="plus" /> Add a New Rig</Header>

				<Form loading={loading || sending} onSubmit={onSubmit}>
					<Form.Field required>
						<label>Rig Name</label>
						<input
							type="text"
							name="name"
							placeholder="Rig name"
							value={name}
							onChange={onChange}
							autoFocus />
					</Form.Field>

					<Header size="small">Main Canopy</Header>
					<Form.Group widths="equal">
						<Form.Field>
							<label>Manufacturer</label>
							<input
								type="text"
								name="mainMake"
								placeholder="Main canopy make"
								value={mainMake}
								onChange={onChange} />
						</Form.Field>
						<Form.Field>
							<label>Model</label>
							<input
								type="text"
								name="mainModel"
								placeholder="Main canopy model"
								value={mainModel}
								onChange={onChange} />
						</Form.Field>
						<Form.Field>
							<label>Size (ft<sup>2</sup>)</label>
							<input
								type="text"
								name="mainSize"
								placeholder="Main canopy size"
								value={mainSize}
								onChange={onChange} />
						</Form.Field>
					</Form.Group>

					<Header size="small">Reserve Canopy</Header>
					<Form.Group widths="equal">
						<Form.Field>
							<label>Manufacturer</label>
							<input
								type="text"
								name="reserveMake"
								placeholder="Reserve canopy make"
								value={reserveMake}
								onChange={onChange} />
						</Form.Field>
						<Form.Field>
							<label>Model</label>
							<input
								type="text"
								name="reserveModel"
								placeholder="Reserve canopy model"
								value={reserveModel}
								onChange={onChange} />
						</Form.Field>
						<Form.Field>
							<label>Size (ft<sup>2</sup>)</label>
							<input
								type="text"
								name="reserveSize"
								placeholder="Reserve canopy size"
								value={reserveSize}
								onChange={onChange} />
						</Form.Field>
					</Form.Group>

					<Form.Field>
						<label>Approved Users</label>
						<Select
							name="approvedUsers"
							placeholder="Approved users"
							search
							multiple
							value={approvedUsers}
							options={userOptions}
							onChange={(e, d) =>
								onChange({
									target: {
										name: "approvedUsers",
										value: d.value
									}
								})
							} />
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
					style={{ marginTop: "10px" }}
					as={Link}
						to="/rigs">
					Cancel
				</Button>
			</div>
		);
	}
}


export default Edit;
