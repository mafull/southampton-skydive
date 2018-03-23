import React, { Component } from "react";
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
	constructor(props) {
		super(props);

		this.rigs = [
			{
				name: "rig1",

				equipment: {
					main: {
						make: "PS",
						model: "V",
						size: 10
					}
				}
			}
		];
	}


	render() {
		const rigListElements = this.rigs ? this.rigs.map(r => <RigListElement {...r} key={r.name} />) : null;
		
		return (
			<div>
				<Header size="huge">Rig booking</Header>
				<p>Book out a rig and view current rig status</p>

				<Grid stackable as={Container}>
					{rigListElements}

					<Grid.Column size="4">
						<Item>
							<Item.Content>
								<Item.Extra>
									<Button size="big" color="green" as={Link} to="/rigs/new">Add rig</Button>
								</Item.Extra>
							</Item.Content>
						</Item>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}


export default RigList;