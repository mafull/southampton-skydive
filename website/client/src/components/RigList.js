import React, { Component } from "react";
import axios 				from "axios";
import RigListElement 		from "./RigListElement";
import { Link }				from "react-router-dom";
import {
	Header,
	Grid,
	Container,
	Item,
	Segment,
	Button
}							from "semantic-ui-react";


class RigList extends Component {
	state = {
		rigs: [],
		loaded: false
	};


	componentDidMount() {
		axios
			.get("/rigs")
			.then(response => {
				const rigs = response.data.map(r => {
					return {
						_id: r._id,
						name: r.name,
						summary: (r.main.model && r.main.size) ? (r.main.model + " " + r.main.size) : "Unknown"
					};
				});

				const newState = Object.assign(
					{},
					this.state,
					{ rigs, loaded: true }
				);
				this.setState(newState);
			})
			.catch(error => {
				console.log(error.response);
			});
	}


	render() {
		const { loaded, rigs } = this.state;

		const rigListElements = rigs.length ? rigs.map(r => <RigListElement {...r} key={r._id} />) : <Segment basic loading={!loaded}><i>No rigs found</i></Segment>;
		
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