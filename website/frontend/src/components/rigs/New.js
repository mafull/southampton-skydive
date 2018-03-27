import React, { Component } from "react";
import { Link, Redirect }	from "react-router-dom";
import axios 				from "axios";
import {
	Header,
	Icon,
	Form,
	Button
}							from "semantic-ui-react";


class New extends Component {
	state = {
		sending: false,
		redirect: false,

		name: "",

		mainMake: "",
		mainModel: "",
		mainSize: "",

		reserveMake: "",
		reserveModel: "",
		reserveSize: ""
	};


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
			equipment
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
			sending,

			name,

			mainMake,
			mainModel,
			mainSize,

			reserveMake,
			reserveModel,
			reserveSize
		} = this.state;

		const {
			onChange,
			onSubmit
		} = this;


		if(this.state.redirect) {
			return <Redirect to="/rigs" />
		}

		return (
			<div>
				<Header size="huge"><Icon name="plus" /> Add a new rig</Header>

				<Form loading={sending} onSubmit={onSubmit}>
					<Form.Field required>
						<label>Rig name</label>
						<input
							type="text"
							name="name"
							placeholder="Rig name"
							value={name}
							onChange={onChange}
							autoFocus />
					</Form.Field>
					<Form.Field>
						<label>Main canopy manufacturer</label>
						<input
							type="text"
							name="mainMake"
							placeholder="Main canopy make"
							value={mainMake}
							onChange={onChange} />
					</Form.Field>
					<Form.Field>
						<label>Main canopy model</label>
						<input
							type="text"
							name="mainModel"
							placeholder="Main canopy model"
							value={mainModel}
							onChange={onChange} />
					</Form.Field>
					<Form.Field>
						<label>Main canopy size (ft<sup>2</sup>)</label>
						<input
							type="text"
							name="mainSize"
							placeholder="Main canopy size"
							value={mainSize}
							onChange={onChange} />
					</Form.Field>
					<Form.Field>
						<label>Reserve canopy manufacturer</label>
						<input
							type="text"
							name="reserveMake"
							placeholder="Reserve canopy make"
							value={reserveMake}
							onChange={onChange} />
					</Form.Field>
					<Form.Field>
						<label>Reserve canopy model</label>
						<input
							type="text"
							name="reserveModel"
							placeholder="Reserve canopy model"
							value={reserveModel}
							onChange={onChange} />
					</Form.Field>
					<Form.Field>
						<label>Reserve canopy size (ft<sup>2</sup>)</label>
						<input
							type="text"
							name="reserveSize"
							placeholder="Reserve canopy size"
							value={reserveSize}
							onChange={onChange} />
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
						to="/rigs">
					Cancel
				</Button>
			</div>
		);
	}
}


export default New;