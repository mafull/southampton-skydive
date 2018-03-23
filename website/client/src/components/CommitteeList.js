import React, { Component } from "react";
import CommitteeListElement from "./CommitteeListElement";
import { Link } 				from "react-router-dom";
import {
	Header,
	Icon,
	Table,
	Button
}							from "semantic-ui-react";


class CommitteeList extends Component {
	constructor(props) {
		super(props);

		this.committeePositions = [
			{
				title: "Pres",
				name: "Max F",
				email: "one@two.com"
			},
			{
				title: "VP",
			},
			{
				title: "Dog",
				name: "Ben",
				email: "one@poo.com"
			}
		];
	}


	render() {
		const committeeListElements = this.committeePositions ? this.committeePositions.map(p => <CommitteeListElement {...p} key={p.title} />) : null;
		
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

				<Button color="green" as={Link} to="/committee/new">Add committee position</Button>

			</div>
		);
	}
}


export default CommitteeList;