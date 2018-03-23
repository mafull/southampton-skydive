import React, { Component } from "react";
import axios 				from "axios";
import RigListElement 		from "./RigListElement";
import { Link }				from "react-router-dom";
import {
	Header,
	Grid,
	Container,
	Item,
	Button
}							from "semantic-ui-react";


class RigList extends Component {
	state = {
		rigs: []
	};


	componentDidMount() {
		axios
			.get("/rigs")
			.then(response => {
				const rigs = response.data.map(r => {
					return {
						_id: r._id,
						name: r.name,
						summary: r.main.model + " " + r.main.size
					};
				});

				const newState = Object.assign(
					{},
					this.state,
					{ rigs }
				);
				this.setState(newState);
			})
			.catch(error => {
				console.log(error.response);
			});
	}


	render() {
		const rigListElements = this.state.rigs ? this.state.rigs.map(r => <RigListElement {...r} key={r._id} />) : null;
		
		return (
			<div>
				<Header size="huge">Rig booking</Header>
				<p>Book out a rig and view current rig status</p>

				<Grid stackable as={Container}>
					{rigListElements}

					<Grid.Column width="4" verticalAlign="middle">
						<Item>
							<Item.Content>
								<Button
									size="large"
									color="green"
									as={Link}
										to="/rigs/new">Add rig</Button>
							</Item.Content>
						</Item>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}


export default RigList;