import React, { Component } from "react";
import PropTypes 			from "prop-types";
import { Link }				from "react-router-dom";
import {
	Table
}							from "semantic-ui-react";


class UserListElement extends Component {
	static propTypes = {
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		email: PropTypes.string
	};


	static defaultProps = {
		_id: "",
		name: "n/a",
		email: "n/a"
	};


	render() {
		const { _id, name, email } = this.props;

		return (
			<Table.Row>
				<Table.Cell><Link to={"/users/" + _id}>{name}</Link></Table.Cell>
				<Table.Cell><a href={"mailto:" + email}>{email}</a></Table.Cell>
			</Table.Row>
		);
	}
}


export default UserListElement;