import React, { Component } from "react";
import PropTypes 			from "prop-types";
import { Link } 			from "react-router-dom";
import {
	Grid,
	Header,
	Item
}							from "semantic-ui-react";


class RigListElement extends Component {
	static propTypes = {
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		summary: PropTypes.string
	};


	static defaultProps = {
		_id: "",
		name: "n/a",
		summary: ""
	};


	render() {
		const { _id, name, summary } = this.props;

		return (
			<Grid.Column width="4" verticalAlign="middle">
				<Item>
					<Item.Content>
						<Header size="huge" as={Link} to={"/rigs/" + _id}>{name}</Header>
						<Item.Meta>
							<span>{summary}</span>
						</Item.Meta>
						<Item.Description>

						</Item.Description>
					</Item.Content>
				</Item>
			</Grid.Column>
		);
	}
}


export default RigListElement;