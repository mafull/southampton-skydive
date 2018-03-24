import React, { Component } 		from "react";
import axios						from "axios";
import CommitteePositionListElement from "./CommitteePositionListElement";
import { Link } 					from "react-router-dom";
import {
	Header,
	Icon,
	Table,
	Segment,
	Button
}									from "semantic-ui-react";


class CommitteePositionList extends Component {
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
						title: p.name,
						userId: p.user._id,
						name: p.user.forename + " " + p.user.surname,
						email: p.user.email
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

		const listElements = positions.length ? positions.map(p => <CommitteePositionListElement {...p} key={p._id} />) : <Segment basic loading={!loaded}><i>No committee positions found</i></Segment>;
		
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


export default CommitteePositionList;