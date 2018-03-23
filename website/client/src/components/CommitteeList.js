import React, { Component } from "react";
import axios				from "axios";
import CommitteeListElement from "./CommitteeListElement";
import { Link } 			from "react-router-dom";
import {
	Header,
	Icon,
	Table,
	Button
}							from "semantic-ui-react";


class CommitteeList extends Component {
	state = {
		positions: []
	};


	componentDidMount() {
		axios
			.get("/committee")
			.then(response => {
				const positions = response.data.map(p => {
					return {
						_id: p._id,
						title: p.name,
						name: p.user.forename + " " + p.user.surname,
						email: p.user.email
					};
				});

				const newState = Object.assign(
					{},
					this.state,
					{ positions }
				);
				this.setState(newState);
			})
			.catch(error => {
				console.log(error.response);
			});
	}


	render() {
		const committeeListElements = this.state.positions ? this.state.positions.map(p => <CommitteeListElement {...p} key={p._id} />) : null;
		
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
						{committeeListElements}
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


export default CommitteeList;