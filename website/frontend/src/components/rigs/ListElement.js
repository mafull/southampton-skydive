import React, { Component } from "react";
import PropTypes 			from "prop-types";
import { Link } 			from "react-router-dom";
import {
	Card
}							from "semantic-ui-react";


class ListElement extends Component {
	static propTypes = {
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		summary: PropTypes.string.isRequired,
		isOnline: PropTypes.bool.isRequired
	};


	static defaultProps = {
		_id: "",
		name: "n/a",
		summary: "Unknown",
		isOnline: false
	};


	render() {
		const {
			_id,
			name,
			summary,
			isOnline
		} = this.props;

		return (
			<Card as={Link} to={"/rigs/" + _id}>
				<Card.Content textAlign="center">
					<Card.Header>
						{name}
					</Card.Header>
					<Card.Meta>
					</Card.Meta>
					<Card.Description>
						{summary}
					</Card.Description>
				</Card.Content>
				<Card.Content extra
					textAlign="center"
					style={
						{
							backgroundColor: isOnline ? "green" : "red",
							color: "white"
						}
					}>
					{isOnline ? "ONLINE" : "OFFLINE"}
				</Card.Content>
			</Card>
		);
	}
}


export default ListElement;