import React, { Component } from "react";
import axios 				from "axios";
import ListElement 			from "./ListElement";
import { Link }				from "react-router-dom";
import {
	Header,
	Card,
	Icon,
	Segment
}							from "semantic-ui-react";


class List extends Component {
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
						summary: (r.equipment.main.model && r.equipment.main.size) ? (r.equipment.main.model + " " + r.equipment.main.size) : "Unknown",
						isOnline: r.isOnline
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

		const listElements = rigs.length ? rigs.map(r => <ListElement {...r} key={r._id} />) : <Segment basic loading={!loaded}><i>No rigs found</i></Segment>;
		
		return (
			<div>
				<Header size="huge">Rig Booking</Header>
				<p>Book out a rig and view current rig status</p>

				<Card.Group
					centered
					itemsPerRow="3">
					{listElements}

					<Card
						color="green"
						as={Link}
							to="/rigs/new">
						<Card.Content textAlign="center">
							<Card.Header>
								<Icon
									name="add"
									size="large"
									color="green"
									circular
									fitted />
							</Card.Header>
							<Card.Description>
								Add rig
							</Card.Description>
						</Card.Content>
					</Card>
				</Card.Group>
			</div>
		);
	}
}


export default List;