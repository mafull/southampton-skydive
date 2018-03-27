import React, { Component } 		from "react";
import axios						from "axios";
import ListElement 					from "./ListElement";
import { Link } 					from "react-router-dom";
import {
	Header,
	Icon,
	Table,
	Segment,
	Button
}									from "semantic-ui-react";


class List extends Component {
	state = {
		positions: [],
		loaded: false
	};


	componentDidMount() {
		axios
			.get("/committee")
			.then(response => {
				const positions = response.data.map(p => {
					return {
						_id: p._id,
						title: p.title,
						userId: p.user ? p.user._id : null,
						name: p.user ? (p.user.forename + " " + p.user.surname) : null,
						email: p.user ? p.user.email : null
					};
				});

				const newState = Object.assign(
					{},
					this.state,
					{ positions, loaded: true }
				);
				this.setState(newState);
			})
			.catch(error => {
				console.log(error.response);
			});
	}


	render() {
		const { loaded, positions } = this.state;

		const listElements = positions.length ? positions.map(p => <ListElement {...p} key={p._id} />) : <Table.Row><Table.Cell><Segment basic loading={!loaded}><i>No committee positions found</i></Segment></Table.Cell></Table.Row>;
		
		return (
			<div>
				<Header size="huge"><Icon name="users" /> Committee</Header>
				<p>View the current committee</p>

				<Table striped celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Position</Table.HeaderCell>
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.HeaderCell>Email</Table.HeaderCell>
						</Table.Row>	
					</Table.Header>
					<Table.Body>
						{listElements}
					</Table.Body>
				</Table>

				<Button
					color="green"
					as={Link}
						to="/committee/new">
					Add committee position
				</Button>
			</div>
		);
	}
}


export default List;